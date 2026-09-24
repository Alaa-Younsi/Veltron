import { zodResolver } from "@hookform/resolvers/zod";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router";
import { Button } from "~/components/ui/button";
import type { Locale } from "~/i18n/config";
import type { Dictionary } from "~/i18n/dictionaries/en";
import { cn } from "~/lib/utils";
import { INCOTERMS, INQUIRY_PRODUCTS, type InquiryProduct } from "~shared/catalog";
import {
  FIELD_ERROR_CODES,
  type FieldErrorCode,
  type InquiryFields,
  type InquiryFieldsInput,
  type InquiryResponse,
  inquiryFieldsSchema,
} from "~shared/contact";
import { controlClasses, Field } from "./field";

type FormCopy = Dictionary["form"];
type Status = "idle" | "submitting" | "success";
type FormError = keyof FormCopy["api"] | "captchaPending" | null;

/** Cloudflare's always-pass test key — only ever used in local development. */
const TURNSTILE_TEST_SITE_KEY = "1x00000000000000000000AA";
const TURNSTILE_SITE_KEY =
  import.meta.env.VITE_TURNSTILE_SITE_KEY || (import.meta.env.DEV ? TURNSTILE_TEST_SITE_KEY : "");

const isInquiryProduct = (value: string | null): value is InquiryProduct =>
  value !== null && (INQUIRY_PRODUCTS as readonly string[]).includes(value);

const isFieldErrorCode = (value: unknown): value is FieldErrorCode =>
  typeof value === "string" && (FIELD_ERROR_CODES as readonly string[]).includes(value);

type InquiryFormProps = { locale: Locale; copy: FormCopy };

export function InquiryForm({ locale, copy }: InquiryFormProps) {
  const formId = useId();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<Status>("idle");
  const [formError, setFormError] = useState<FormError>(null);
  const [token, setToken] = useState("");
  const turnstileRef = useRef<TurnstileInstance>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const startedAt = useRef(0);
  const statusRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    reset,
    formState: { errors },
  } = useForm<InquiryFieldsInput, unknown, InquiryFields>({
    resolver: zodResolver(inquiryFieldsSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
      country: "",
      quantity: "",
      destinationPort: "",
      message: "",
    },
  });

  // Timestamp for the server's bot-speed heuristic (set after hydration, not at build time).
  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  // Pre-select the product when arriving from a product page (?product=cement).
  const productParam = searchParams.get("product");
  useEffect(() => {
    if (isInquiryProduct(productParam)) setValue("product", productParam);
  }, [productParam, setValue]);

  const id = (name: string) => `${formId}-${name}`;
  const errorText = (code: unknown) => (isFieldErrorCode(code) ? copy.errors[code] : undefined);
  const fieldProps = (name: keyof InquiryFields) => ({
    id: id(name),
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": `${id(name)}-error`,
  });

  const onSubmit = async (values: InquiryFields) => {
    setFormError(null);
    if (!token) {
      setFormError("captchaPending");
      return;
    }
    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          locale,
          website: honeypotRef.current?.value ?? "",
          startedAt: startedAt.current,
          turnstileToken: token,
        }),
      });
      const result = (await response.json().catch(() => null)) as InquiryResponse | null;

      if (result?.ok) {
        setStatus("success");
        reset();
        return;
      }

      if (result && !result.ok && result.error === "validation" && result.fields) {
        for (const [field, code] of Object.entries(result.fields)) {
          setError(field as keyof InquiryFields, { type: "server", message: code });
        }
      }
      setFormError(result && !result.ok ? result.error : "server");
      setStatus("idle");
    } catch {
      setFormError("network");
      setStatus("idle");
    } finally {
      // Turnstile tokens are single-use: always request a fresh one.
      setToken("");
      turnstileRef.current?.reset();
    }
  };

  useEffect(() => {
    if (status === "success" || formError) statusRef.current?.focus();
  }, [status, formError]);

  if (status === "success") {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className="flex flex-col items-start gap-5 rounded-[1.5rem] border border-emerald-600/20 bg-emerald-50/60 p-8 outline-none sm:p-10"
      >
        <CheckCircle2 aria-hidden="true" className="size-10 text-emerald-700" strokeWidth={1.6} />
        <h3 className="font-semibold text-2xl text-ink-900 tracking-tight">{copy.success.title}</h3>
        <p className="max-w-lg text-ink-600 leading-relaxed">{copy.success.text}</p>
        <Button variant="outline" onClick={() => setStatus("idle")}>
          {copy.success.again}
        </Button>
      </div>
    );
  }

  const submitting = status === "submitting";
  const formErrorMessage =
    formError === "captchaPending" ? copy.captchaPending : formError ? copy.api[formError] : null;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="relative grid gap-6 sm:grid-cols-2"
      aria-busy={submitting}
    >
      <Field
        id={id("name")}
        label={copy.labels.name}
        required
        error={errorText(errors.name?.message)}
      >
        <input
          {...register("name")}
          {...fieldProps("name")}
          autoComplete="name"
          placeholder={copy.placeholders.name}
          className={controlClasses}
        />
      </Field>

      <Field
        id={id("company")}
        label={copy.labels.company}
        optionalLabel={copy.optional}
        error={errorText(errors.company?.message)}
      >
        <input
          {...register("company")}
          {...fieldProps("company")}
          autoComplete="organization"
          placeholder={copy.placeholders.company}
          className={controlClasses}
        />
      </Field>

      <Field
        id={id("email")}
        label={copy.labels.email}
        required
        error={errorText(errors.email?.message)}
      >
        <input
          {...register("email")}
          {...fieldProps("email")}
          type="email"
          inputMode="email"
          autoComplete="email"
          dir="ltr"
          placeholder={copy.placeholders.email}
          className={cn(controlClasses, "rtl:text-end")}
        />
      </Field>

      <Field
        id={id("phone")}
        label={copy.labels.phone}
        optionalLabel={copy.optional}
        error={errorText(errors.phone?.message)}
      >
        <input
          {...register("phone")}
          {...fieldProps("phone")}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          dir="ltr"
          placeholder={copy.placeholders.phone}
          className={cn(controlClasses, "rtl:text-end")}
        />
      </Field>

      <Field
        id={id("country")}
        label={copy.labels.country}
        required
        error={errorText(errors.country?.message)}
      >
        <input
          {...register("country")}
          {...fieldProps("country")}
          autoComplete="country-name"
          placeholder={copy.placeholders.country}
          className={controlClasses}
        />
      </Field>

      <Field
        id={id("product")}
        label={copy.labels.product}
        required
        error={errorText(errors.product?.message)}
      >
        <select
          {...register("product")}
          {...fieldProps("product")}
          defaultValue=""
          className={controlClasses}
        >
          <option value="" disabled>
            {copy.selectPlaceholder}
          </option>
          {INQUIRY_PRODUCTS.map((product) => (
            <option key={product} value={product}>
              {copy.productOptions[product]}
            </option>
          ))}
        </select>
      </Field>

      <Field
        id={id("quantity")}
        label={copy.labels.quantity}
        optionalLabel={copy.optional}
        error={errorText(errors.quantity?.message)}
      >
        <input
          {...register("quantity")}
          {...fieldProps("quantity")}
          placeholder={copy.placeholders.quantity}
          className={controlClasses}
        />
      </Field>

      <Field
        id={id("destinationPort")}
        label={copy.labels.destinationPort}
        optionalLabel={copy.optional}
        error={errorText(errors.destinationPort?.message)}
      >
        <input
          {...register("destinationPort")}
          {...fieldProps("destinationPort")}
          placeholder={copy.placeholders.destinationPort}
          className={controlClasses}
        />
      </Field>

      <Field
        id={id("incoterm")}
        label={copy.labels.incoterm}
        optionalLabel={copy.optional}
        error={errorText(errors.incoterm?.message)}
        className="sm:col-span-2"
      >
        <select
          {...register("incoterm", { setValueAs: (v: string) => (v === "" ? undefined : v) })}
          {...fieldProps("incoterm")}
          defaultValue=""
          className={controlClasses}
        >
          <option value="">{copy.selectPlaceholder}</option>
          {INCOTERMS.map((term) => (
            <option key={term} value={term}>
              {copy.incotermOptions[term]}
            </option>
          ))}
        </select>
      </Field>

      <Field
        id={id("message")}
        label={copy.labels.message}
        required
        error={errorText(errors.message?.message)}
        className="sm:col-span-2"
      >
        <textarea
          {...register("message")}
          {...fieldProps("message")}
          rows={6}
          placeholder={copy.placeholders.message}
          className={cn(controlClasses, "resize-y")}
        />
      </Field>

      {/* Honeypot — invisible to people, tempting to bots. */}
      <div aria-hidden="true" className="absolute -start-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={id("website")}>Website</label>
        <input
          ref={honeypotRef}
          id={id("website")}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="flex flex-col gap-2 sm:col-span-2">
        <label
          htmlFor={id("consent")}
          className="flex cursor-pointer items-start gap-3 text-ink-600 text-sm leading-relaxed"
        >
          <input
            {...register("consent")}
            {...fieldProps("consent")}
            type="checkbox"
            className="mt-0.5 size-5 shrink-0 cursor-pointer rounded border-ink-900/20 accent-gold-600"
          />
          <span>
            {copy.labels.consent}
            <span aria-hidden="true" className="ms-0.5 text-gold-700">
              *
            </span>
          </span>
        </label>
        <p
          id={`${id("consent")}-error`}
          role={errors.consent ? "alert" : undefined}
          className="text-red-700 text-xs empty:hidden"
        >
          {errorText(errors.consent?.message) ?? ""}
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:col-span-2">
        {TURNSTILE_SITE_KEY ? (
          <Turnstile
            ref={turnstileRef}
            siteKey={TURNSTILE_SITE_KEY}
            onSuccess={setToken}
            onExpire={() => setToken("")}
            onError={() => setToken("")}
            options={{ language: locale, theme: "light", size: "flexible" }}
            className="min-h-[65px]"
          />
        ) : null}
        <p className="text-ink-400 text-xs">{copy.privacyNote}</p>
      </div>

      <div className="flex flex-col gap-4 sm:col-span-2">
        {formErrorMessage ? (
          <div
            ref={statusRef}
            tabIndex={-1}
            role="alert"
            className="flex items-start gap-3 rounded-xl border border-red-600/20 bg-red-50 p-4 text-red-800 text-sm outline-none"
          >
            <AlertCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
            {formErrorMessage}
          </div>
        ) : null}
        <Button
          type="submit"
          variant="ink"
          size="lg"
          disabled={submitting}
          arrow={!submitting}
          className="self-start"
        >
          {submitting ? (
            <span className="flex items-center gap-2">
              <Loader2 aria-hidden="true" className="size-4 animate-spin" />
              {copy.sending}
            </span>
          ) : (
            copy.submit
          )}
        </Button>
      </div>
    </form>
  );
}

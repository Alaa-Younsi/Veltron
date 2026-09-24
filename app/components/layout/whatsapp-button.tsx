import { WhatsAppIcon } from "~/components/brand/whatsapp-icon";
import { SITE, whatsappUrl } from "~/config/site";
import { useLocaleContext } from "~/i18n/use-locale";

/**
 * Floating click-to-chat button (bottom-right), styled in the brand's slate
 * and gold. Opens WhatsApp with a greeting pre-filled in the visitor's language.
 */
export function WhatsAppButton() {
  const { common } = useLocaleContext();
  if (!SITE.contact.whatsapp) return null;

  return (
    <a
      href={whatsappUrl(SITE.contact.whatsapp, common.whatsapp.message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={common.whatsapp.label}
      className="group fixed right-5 bottom-[max(1.25rem,env(safe-area-inset-bottom))] z-40 flex animate-rise items-center [animation-delay:1.2s] [view-transition-name:whatsapp] sm:right-7 sm:bottom-7"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none me-3 hidden translate-x-2 whitespace-nowrap rounded-full border border-gold-500/30 bg-ink-950/95 px-4 py-2.5 font-semibold text-gold-200 text-sm opacity-0 shadow-[0_18px_40px_-18px_rgb(15_23_25/0.7)] backdrop-blur-md transition-all duration-500 ease-out-expo group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 md:block"
      >
        {common.whatsapp.label}
      </span>
      <span className="relative grid size-14 place-items-center rounded-full border border-gold-500/50 bg-ink-950 text-gold-300 shadow-[0_18px_40px_-14px_rgb(15_23_25/0.8),inset_0_1px_0_rgb(255_255_255/0.06)] transition-all duration-500 ease-out-expo group-hover:scale-105 group-hover:border-gold-400 group-hover:bg-gold-500 group-hover:text-ink-950">
        <span
          aria-hidden="true"
          className="absolute inset-0 animate-ping-soft rounded-full border border-gold-400/60"
        />
        <WhatsAppIcon className="relative size-6" />
      </span>
    </a>
  );
}

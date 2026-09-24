import { index, type RouteConfig, route } from "@react-router/dev/routes";

export default [
  index("routes/language-gateway.tsx"),
  route("sitemap.xml", "routes/sitemap.ts"),
  route("robots.txt", "routes/robots.ts"),

  route(":lang", "routes/locale-layout.tsx", { id: "locale" }, [
    index("routes/home.tsx"),
    route("about", "routes/about.tsx"),
    route("products", "routes/products.tsx"),
    route("products/:slug", "routes/product.tsx"),
    route("trade-logistics", "routes/logistics.tsx"),
    route("markets", "routes/markets.tsx"),
    route("quality", "routes/quality.tsx"),
    route("contact", "routes/contact.tsx"),
  ]),

  route("*", "routes/not-found.tsx"),
] satisfies RouteConfig;

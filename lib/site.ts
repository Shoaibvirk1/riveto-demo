// One place for everything the owner might want to change. Values marked "env" can be set in
// Vercel → Project → Settings → Environment Variables without touching code.

function siteUrl(): string {
  const env =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "") ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "");
  return (env || "http://localhost:3000").replace(/\/+$/, "");
}

export const site = {
  name: "Riveto",
  url: siteUrl(),
  slogan: "Built to be lived in.",
  sloganText: "Soft from the first wear, tough enough for the hundredth.",
  description:
    "Jeans, cargo pants and chinos in real waist sizes. Cash on Delivery across Pakistan and an easy 7-day size exchange.",
  footerText:
    "Jeans, cargos and chinos with an easy 7-day exchange and Cash on Delivery across Pakistan.",
  locale: "en_PK",
  currency: "PKR",
  /** env: NEXT_PUBLIC_WHATSAPP, e.g. 03001234567. Leave empty to hide WhatsApp buttons. */
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || "",
  announcement: ["Cash on Delivery all over Pakistan", "Free delivery on orders over Rs 5,000"],
  deliveryTime: "Delivered in 3-5 working days",
  exchangeText: "7-day size exchange",
  shipping: { flat: 250, freeOver: 5000 },
  /** Optional social profiles, used in Organization structured data. */
  sameAs: [] as string[],
};

/** WhatsApp number in international form (923001234567), or "" if not set. */
export function whatsappIntl(): string {
  let n = site.whatsapp.replace(/\D+/g, "");
  if (n.startsWith("0092")) n = n.slice(2);
  else if (n.startsWith("0")) n = "92" + n.slice(1);
  return n;
}

export function whatsappLink(message?: string): string {
  const n = whatsappIntl();
  if (!n) return "";
  return `https://wa.me/${n}${message ? `?text=${encodeURIComponent(message)}` : ""}`;
}

export function whatsappDisplay(): string {
  const n = whatsappIntl();
  if (!n) return "";
  const local = "0" + n.slice(2);
  return local.length === 11 ? `${local.slice(0, 4)} ${local.slice(4)}` : local;
}

export const absUrl = (path = "/") => site.url + (path.startsWith("/") ? path : `/${path}`);

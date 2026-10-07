import type { Metadata } from "next";
import { site, absUrl, whatsappIntl } from "./site";
import type { Category, Product } from "./products";
import { mainImage } from "./products";

/** Shortens text to a search-snippet length at a word boundary. */
export function clip(text: string, max: number) {
  const t = text.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  return t.slice(0, max - 1).replace(/[\s,.;:-]+\S*$/, "") + "…";
}

/** Metadata for a page: title, description, canonical URL and social previews in one call. */
export function pageMeta(opts: {
  title?: string; description: string; path: string; image?: string; noindex?: boolean; type?: "website" | "article";
}): Metadata {
  // WhatsApp and Facebook cannot show SVG previews, so drawings fall back to the share photo.
  const image = opts.image && !opts.image.endsWith(".svg") ? absUrl(opts.image) : absUrl("/img/share.jpg");
  const description = clip(opts.description, 160);
  return {
    ...(opts.title ? { title: opts.title } : {}),
    description,
    alternates: { canonical: opts.path },
    openGraph: {
      type: opts.type || "website",
      url: opts.path,
      siteName: site.name,
      locale: site.locale,
      title: opts.title || `${site.name} | ${site.slogan}`,
      description,
      images: [{ url: image, alt: opts.title || site.name }],
    },
    twitter: { card: "summary_large_image", title: opts.title || site.name, description, images: [image] },
    ...(opts.noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

const ORG_ID = absUrl("/#organization");
const SITE_ID = absUrl("/#website");

export function organizationLd() {
  const tel = whatsappIntl();
  return {
    "@type": "OnlineStore",
    "@id": ORG_ID,
    name: site.name,
    url: absUrl("/"),
    logo: absUrl("/icon.svg"),
    description: site.description,
    areaServed: { "@type": "Country", name: "Pakistan" },
    ...(site.sameAs.length ? { sameAs: site.sameAs } : {}),
    ...(tel ? { contactPoint: { "@type": "ContactPoint", telephone: `+${tel}`, contactType: "customer service", areaServed: "PK", availableLanguage: ["en", "ur"] } } : {}),
    hasMerchantReturnPolicy: returnPolicyLd(),
  };
}

export function websiteLd() {
  return {
    "@type": "WebSite",
    "@id": SITE_ID,
    url: absUrl("/"),
    name: site.name,
    inLanguage: "en-PK",
    publisher: { "@id": ORG_ID },
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: absUrl("/search?q={search_term_string}") },
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: absUrl(it.path) })),
  };
}

function returnPolicyLd() {
  return {
    "@type": "MerchantReturnPolicy",
    applicableCountry: "PK",
    returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
    merchantReturnDays: 7,
    returnMethod: "https://schema.org/ReturnByMail",
    returnFees: "https://schema.org/FreeReturn",
    url: absUrl("/returns"),
  };
}

function shippingLd(price: number) {
  return {
    "@type": "OfferShippingDetails",
    shippingRate: { "@type": "MonetaryAmount", value: price >= site.shipping.freeOver ? 0 : site.shipping.flat, currency: site.currency },
    shippingDestination: { "@type": "DefinedRegion", addressCountry: "PK" },
    deliveryTime: {
      "@type": "ShippingDeliveryTime",
      handlingTime: { "@type": "QuantitativeValue", minValue: 0, maxValue: 1, unitCode: "DAY" },
      transitTime: { "@type": "QuantitativeValue", minValue: 2, maxValue: 5, unitCode: "DAY" },
    },
  };
}

/** Product with every size and colour as a variant, so Google can show price and stock per option. */
export function productLd(p: Product, category?: Category) {
  const url = absUrl(`/product/${p.slug}`);
  const validUntil = `${new Date().getFullYear() + 1}-12-31`;
  return {
    "@type": "ProductGroup",
    "@id": `${url}#product`,
    name: p.name,
    description: p.description || p.short,
    url,
    brand: { "@type": "Brand", name: site.name },
    productGroupID: p.sku,
    ...(category ? { category: category.title } : {}),
    image: (p.images.length ? p.images : [mainImage(p)]).map((i) => absUrl(i)),
    variesBy: ["https://schema.org/size", "https://schema.org/color"],
    hasVariant: p.variants.map((v) => ({
      "@type": "Product",
      sku: v.sku,
      name: `${p.name} - ${v.colour}, waist ${v.size}`,
      size: v.size,
      color: v.colour,
      image: absUrl(p.images[0] || p.art[v.colour] || mainImage(p)),
      ...(p.weightKg ? { weight: { "@type": "QuantitativeValue", value: p.weightKg, unitCode: "KGM" } } : {}),
      offers: {
        "@type": "Offer",
        url: `${url}?colour=${encodeURIComponent(v.colour)}&size=${encodeURIComponent(v.size)}`,
        price: v.price,
        priceCurrency: site.currency,
        priceValidUntil: validUntil,
        availability: v.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
        itemCondition: "https://schema.org/NewCondition",
        seller: { "@id": ORG_ID },
        shippingDetails: shippingLd(v.price),
        hasMerchantReturnPolicy: returnPolicyLd(),
      },
    })),
  };
}

export function itemListLd(list: Product[], name: string) {
  return {
    "@type": "ItemList",
    name,
    numberOfItems: list.length,
    itemListElement: list.map((p, i) => ({ "@type": "ListItem", position: i + 1, url: absUrl(`/product/${p.slug}`), name: p.name })),
  };
}

export function faqLd(faqs: { q: string; a: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

/** Wraps nodes in one @graph so they can reference each other by @id. */
export const graph = (...nodes: object[]) => ({ "@context": "https://schema.org", "@graph": nodes });

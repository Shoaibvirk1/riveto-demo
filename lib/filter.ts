import type { ListProduct } from "./product-utils";
import { isBestSeller, isNew } from "./product-utils";

export const PRICE_BANDS = [
  { id: "under-3000", label: "Under Rs 3,000", min: 0, max: 2999 },
  { id: "3000-3500", label: "Rs 3,000 to 3,500", min: 3000, max: 3500 },
  { id: "over-3500", label: "Over Rs 3,500", min: 3501, max: Infinity },
];

export const SORTS = [
  { id: "", label: "Featured" },
  { id: "new", label: "Newest" },
  { id: "popular", label: "Best-selling" },
  { id: "price-asc", label: "Price: low to high" },
  { id: "price-desc", label: "Price: high to low" },
];

export type Filters = { size: string[]; colour: string[]; price: string; sale: boolean; stock: string; sort: string; q: string };

const list = (v: string | null) => (v ? v.split(",").map((s) => s.trim()).filter(Boolean) : []);
export const colourKey = (c: string) => c.toLowerCase().replace(/[^a-z0-9]+/g, "-");

export function readFilters(sp: URLSearchParams): Filters {
  return {
    size: list(sp.get("size")),
    colour: list(sp.get("colour")),
    price: sp.get("price") || "",
    sale: sp.get("sale") === "1",
    stock: sp.get("stock") || "",
    sort: sp.get("sort") || "",
    q: (sp.get("q") || "").trim(),
  };
}

export function applyFilters(all: ListProduct[], f: Filters, words?: (p: ListProduct) => string): ListProduct[] {
  const band = PRICE_BANDS.find((b) => b.id === f.price);
  const terms = f.q.toLowerCase().split(/\s+/).filter(Boolean);
  let out = all.filter((p) => {
    // A size or colour only counts if it is actually in stock.
    const live = p.variants.filter((v) => v.stock > 0);
    if (f.size.length && !live.some((v) => f.size.includes(v.size))) return false;
    if (f.colour.length && !live.some((v) => f.colour.includes(colourKey(v.colour)))) return false;
    if (f.size.length && f.colour.length && !live.some((v) => f.size.includes(v.size) && f.colour.includes(colourKey(v.colour)))) return false;
    if (band && (p.minPrice < band.min || p.minPrice > band.max)) return false;
    if (f.sale && !p.onSale) return false;
    if (f.stock === "in" && !p.inStock) return false;
    if (f.stock === "out" && p.inStock) return false;
    if (terms.length) {
      const hay = (words ? words(p) : `${p.name} ${p.colours.join(" ")} ${p.tags.join(" ")} ${p.category}`).toLowerCase();
      if (!terms.every((t) => hay.includes(t))) return false;
    }
    return true;
  });
  const by = {
    new: (a: ListProduct, b: ListProduct) => Number(isNew(b)) - Number(isNew(a)) || b.order - a.order,
    popular: (a: ListProduct, b: ListProduct) => Number(isBestSeller(b)) - Number(isBestSeller(a)) || a.order - b.order,
    "price-asc": (a: ListProduct, b: ListProduct) => a.minPrice - b.minPrice,
    "price-desc": (a: ListProduct, b: ListProduct) => b.minPrice - a.minPrice,
  }[f.sort];
  out = by ? [...out].sort(by) : [...out].sort((a, b) => Number(b.featured) - Number(a.featured) || a.order - b.order);
  return out;
}

export function headingFor(f: Filters, fallback: string) {
  if (f.q) return `Results for “${f.q}”`;
  if (f.sale) return "Sale";
  if (f.stock === "out") return "Sold out";
  if (f.sort === "new") return "New arrivals";
  if (f.sort === "popular") return "Best-sellers";
  return fallback;
}

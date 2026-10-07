import data from "@/data/products.json";
import type { Product, Category } from "./product-utils";
import { isNew, isBestSeller } from "./product-utils";
export * from "./product-utils";

export const products = data.products as unknown as Product[];
export const categories = data.categories as unknown as Category[];
export const catalogDate = data.generated;

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
export const productsIn = (slug: string) => products.filter((p) => p.category === slug);


export const featured = (limit = 6) => {
  const f = products.filter((p) => p.featured && p.inStock);
  const rest = products.filter((p) => !p.featured && p.inStock);
  return [...f, ...rest].slice(0, limit);
};
export const bestSellers = (limit = 4) =>
  [...products.filter((p) => isBestSeller(p) && p.inStock), ...products.filter((p) => !isBestSeller(p) && p.inStock)].slice(0, limit);
export const newArrivals = (limit = 4) =>
  [...products.filter((p) => isNew(p) && p.inStock), ...[...products].reverse().filter((p) => !isNew(p) && p.inStock)].slice(0, limit);

export const related = (p: Product, limit = 4) =>
  [...products.filter((x) => x.category === p.category && x.slug !== p.slug), ...products.filter((x) => x.category !== p.category)].slice(0, limit);


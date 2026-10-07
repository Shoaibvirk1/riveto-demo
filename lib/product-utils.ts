export type Variant = {
  sku: string; size: string; colour: string;
  regular: number | null; sale: number | null; price: number; stock: number;
};
export type Product = {
  slug: string; sku: string; name: string; category: string; featured: boolean; tags: string[];
  short: string; description: string; weightKg: number | null; sizes: string[]; colours: string[];
  minPrice: number; maxPrice: number; regularPrice: number; onSale: boolean; inStock: boolean;
  images: string[]; art: Record<string, string>; order: number; variants: Variant[];
};
export type Category = { slug: string; name: string; title: string; intro: string };

/** Main picture: the first photo if the owner added one, else the drawing for the first colour. */
export const mainImage = (p: Pick<Product, "images" | "art">) => p.images[0] || Object.values(p.art)[0];

export const isNew = (p: Pick<Product, "tags">) => p.tags.includes("new");
export const isBestSeller = (p: Pick<Product, "tags">) => p.tags.includes("best-seller");

/** Product without the long text, for lists the browser filters itself. */
export type ListProduct = Omit<Product, "description" | "short">;
export const toList = (p: Product): ListProduct => {
  const { description: _d, short: _s, ...rest } = p;
  return rest;
};

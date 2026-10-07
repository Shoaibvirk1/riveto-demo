// Home page banner slides. Swap the drawings for real photos by putting a wide photo
// (at least 1920 x 1080) in public/img and setting `photo` to its path.
export type Slide = { title: string; text: string; button: string; href: string; theme: string; art: string[]; photo?: string };

export const slides: Slide[] = [
  { title: "New season denim", text: "Slim, straight and wide-leg jeans in soft, sturdy cotton. From Rs 3,290.", button: "Shop new arrivals", href: "/shop?sort=new", theme: "hs-denim", art: ["/img/hero-1-1.svg", "/img/hero-1-2.svg", "/img/hero-1-3.svg"] },
  { title: "Cargo pants for every day", text: "Roomy pockets and tough cotton that keeps its shape. From Rs 2,990.", button: "Shop cargo", href: "/category/cargo-pants", theme: "hs-cargo", art: ["/img/hero-2-1.svg", "/img/hero-2-2.svg", "/img/hero-2-3.svg"] },
  { title: "Chinos for work and weekends", text: "Clean, easy trousers that go with everything. From Rs 2,790.", button: "Shop chinos", href: "/category/chinos-trousers", theme: "hs-chino", art: ["/img/hero-3-1.svg", "/img/hero-3-2.svg", "/img/hero-3-3.svg"] },
  { title: "Best-sellers on sale", text: "Save on our most-loved jeans, while sizes last.", button: "Shop the sale", href: "/shop?sale=1", theme: "hs-sale", art: ["/img/hero-4-1.svg", "/img/hero-4-2.svg", "/img/hero-4-3.svg"] },
];

export const SLIDE_SECONDS = 5;

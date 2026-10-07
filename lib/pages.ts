import { site } from "./site";

export type InfoPage = {
  slug: string;
  title: string;
  description: string;
  /** Paragraphs and sub-headings, in order. Strings starting with "## " become headings. */
  body: string[];
  faqs?: { q: string; a: string }[];
};

const free = `Rs ${site.shipping.freeOver.toLocaleString("en-PK")}`;
const flat = `Rs ${site.shipping.flat}`;

export const faqs = [
  { q: "Can I pay when my parcel arrives?", a: `Yes. Cash on Delivery is available in every city in Pakistan. You pay the rider in cash when your order reaches you.` },
  { q: "How much is delivery and how long does it take?", a: `Delivery is ${flat} anywhere in Pakistan and free on orders over ${free}. Most orders arrive in 3 to 5 working days.` },
  { q: "What if the size does not fit?", a: `Message us within 7 days of delivery and we will swap it for another size. The jeans must be unworn, unwashed and still have their tags.` },
  { q: "How do I choose my waist size?", a: `Pick the waist size you wear in other jeans. Our sizes are real waist measurements in inches, so a 32 fits a 32-inch waist. If you are between sizes, choose the larger one or ask us on WhatsApp.` },
  { q: "How will I know my order is confirmed?", a: `After you place your order we confirm it with you on WhatsApp or by phone before it is shipped. Please keep your phone on.` },
  { q: "Do the colours fade?", a: `Wash your jeans inside out in cold water and dry them in the shade. This keeps the colour deep for much longer.` },
];

export const infoPages: InfoPage[] = [
  {
    slug: "shipping-policy",
    title: "Shipping policy",
    description: `Delivery across Pakistan in 3-5 working days. ${flat} delivery, free over ${free}, with Cash on Delivery in every city.`,
    body: [
      "## Where we deliver",
      "We deliver to every city and town in Pakistan through trusted courier partners.",
      "## Delivery charges",
      `Delivery is ${flat} per order. Orders over ${free} are delivered free.`,
      "## How long it takes",
      "We confirm your order on WhatsApp or by phone, then ship it within 1 working day. Most parcels arrive in 3 to 5 working days. Remote areas can take a little longer.",
      "## Cash on Delivery",
      "Pay the rider in cash when your parcel arrives. Please keep the exact amount ready if you can.",
    ],
  },
  {
    slug: "returns",
    title: "Return and exchange",
    description: "Easy 7-day size exchange on all jeans, cargo pants and chinos. Unworn items with tags can be swapped for another size.",
    body: [
      "## 7-day size exchange",
      "If your item does not fit, message us within 7 days of delivery and we will swap it for another size of the same style.",
      "## Conditions",
      "The item must be unworn, unwashed and have all its tags. Items on final sale cannot be exchanged.",
      "## How to exchange",
      "Send us your order number and the size you need on WhatsApp. We will arrange the pickup and send the new size as soon as the old one is collected.",
      "## Faulty items",
      "If something is wrong with your order, tell us within 48 hours with a photo and we will replace it free of charge.",
    ],
  },
  {
    slug: "faq",
    title: "Frequently asked questions",
    description: "Answers about Cash on Delivery, delivery times and charges, size exchange and choosing your waist size.",
    body: [],
    faqs,
  },
  {
    slug: "about",
    title: "About us",
    description: `${site.name} makes jeans, cargo pants and chinos for everyday life in Pakistan, in real waist sizes with Cash on Delivery.`,
    body: [
      `${site.name} started with one simple idea: trousers that feel good on the first day and still look right a year later.`,
      "We make jeans, cargo pants and chinos in real waist sizes, from fabrics chosen for Pakistani weather, and we price them fairly.",
      "Every order can be paid in cash on delivery, and every size can be exchanged within 7 days.",
    ],
  },
  {
    slug: "privacy-policy",
    title: "Privacy policy",
    description: `How ${site.name} uses your name, phone number and address to deliver your order.`,
    body: [
      "## What we collect",
      "When you order, we collect your name, mobile number, city, address and, if you give it, your email address.",
      "## Why we collect it",
      "We use these details only to confirm, deliver and support your order. We share your name, phone number and address with our courier so they can deliver your parcel.",
      "## What we never do",
      "We never sell your details or send you messages you did not ask for.",
      "## Your choices",
      "You can ask us to see or delete your details at any time by messaging us.",
    ],
  },
  {
    slug: "terms",
    title: "Terms of service",
    description: `The terms that apply when you order from ${site.name}.`,
    body: [
      "## Orders",
      "An order is confirmed once we have confirmed it with you on WhatsApp or by phone. We may cancel an order we cannot confirm.",
      "## Prices",
      "All prices are in Pakistani rupees and include all taxes. Delivery charges are shown at checkout.",
      "## Stock",
      "We do our best to keep stock up to date. If an item sells out after you order, we will tell you and offer another size, colour or a full refund of anything you paid.",
    ],
  },
];

export const getInfoPage = (slug: string) => infoPages.find((p) => p.slug === slug);

import { site } from "./site";

export const shippingFor = (subtotal: number) =>
  subtotal <= 0 ? 0 : subtotal >= site.shipping.freeOver ? 0 : site.shipping.flat;

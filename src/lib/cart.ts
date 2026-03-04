import type { CartData } from "@/types/checkout";

export const DEFAULT_SHIPPING_FEE = 50;

export function computeCartTotals(cart: CartData): {
  subtotal: number;
  grandTotal: number;
} {
  const subtotal = cart.cartItems.reduce(
    (sum, item) => sum + item.product_price * item.quantity,
    0
  );

  const grandTotal = subtotal + cart.shipping_fee - cart.discount_applied;

  return { subtotal, grandTotal };
}

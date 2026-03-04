"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import type { CartData } from "@/types/checkout";
import { computeCartTotals } from "@/lib/cart";

function QuantityControls({
  quantity,
  onUpdate,
}: {
  quantity: number;
  onUpdate: (q: number) => void;
}) {
  return (
    <div className="flex items-center gap-1 rounded-lg border border-gray-200 bg-gray-50 p-1">
      <button
        type="button"
        onClick={() => onUpdate(quantity - 1)}
        className="flex h-8 w-8 items-center justify-center rounded-md text-gray-600 hover:bg-gray-200 hover:text-gray-900"
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span className="min-w-[2rem] text-center text-sm font-medium text-gray-900">
        {quantity}
      </span>
      <button
        type="button"
        onClick={() => onUpdate(quantity + 1)}
        className="flex h-8 w-8 items-center justify-center rounded-md text-gray-600 hover:bg-gray-200 hover:text-gray-900"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}
import { useCheckout } from "@/context/CheckoutContext";
import { formatPrice } from "@/lib/format";

interface CartSummaryProps {
  initialCart: CartData;
}

export function CartSummary({ initialCart }: CartSummaryProps) {
  const { cart, setCart } = useCheckout();

  // Sync server cart into context only when context is empty (e.g. direct visit to /cart)
  useEffect(() => {
    if (!cart || cart.cartItems.length === 0) {
      setCart(initialCart);
    }
  }, [cart, initialCart, setCart]);

  const displayCart = cart ?? initialCart;
  const { cartItems, shipping_fee, discount_applied } = displayCart;
  const { subtotal, grandTotal } = computeCartTotals(displayCart);

  function updateQuantity(productId: number, newQuantity: number) {
    if (newQuantity < 1) {
      const newItems = cartItems.filter((item) => item.product_id !== productId);
      setCart({
        cartItems: newItems,
        shipping_fee: displayCart.shipping_fee,
        discount_applied: displayCart.discount_applied,
      });
      return;
    }
    const newItems = cartItems.map((item) =>
      item.product_id === productId ? { ...item, quantity: newQuantity } : item
    );
    setCart({
      cartItems: newItems,
      shipping_fee: displayCart.shipping_fee,
      discount_applied: displayCart.discount_applied,
    });
  }

  if (cartItems.length === 0) {
    return (
      <div className="mt-6">
        <div className="rounded-lg border border-gray-200 bg-white p-8 text-center shadow-sm">
          <p className="text-gray-600">Your cart is empty.</p>
          <Link
            href="/"
            className="mt-4 inline-block rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-500"
          >
            Continue shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
        <ul className="divide-y divide-gray-200">
          {cartItems.map((item) => (
            <li key={item.product_id} className="flex gap-4 p-4 sm:p-5">
              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 bg-gray-100">
                <Image
                  src={item.image}
                  alt={item.product_name}
                  width={96}
                  height={96}
                  className="h-full w-full object-cover"
                  unoptimized
                />
              </div>
              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <h2 className="font-medium text-gray-900">
                    {item.product_name}
                  </h2>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <QuantityControls
                      quantity={item.quantity}
                      onUpdate={(q) => updateQuantity(item.product_id, q)}
                    />
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.product_id, 0)}
                      className="text-sm text-red-600 hover:text-red-700 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <p className="mt-1 font-medium text-gray-900">
                  {formatPrice(item.product_price * item.quantity)}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <div className="border-t border-gray-200 bg-gray-50 px-4 py-4 sm:px-5">
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-gray-600">Subtotal</dt>
              <dd className="font-medium text-gray-900">
                {formatPrice(subtotal)}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600">Shipping</dt>
              <dd className="font-medium text-gray-900">
                {formatPrice(shipping_fee)}
              </dd>
            </div>
            {discount_applied > 0 && (
              <div className="flex justify-between text-green-600">
                <dt>Discount</dt>
                <dd className="font-medium">-{formatPrice(discount_applied)}</dd>
              </div>
            )}
            <div className="flex justify-between border-t border-gray-200 pt-2 text-base">
              <dt className="font-medium text-gray-900">Grand Total</dt>
              <dd className="font-semibold text-gray-900">
                {formatPrice(grandTotal)}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
        <Link
          href="/checkout/shipping"
          className="inline-flex justify-center rounded-md bg-green-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}

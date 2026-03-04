"use client";

import Image from "next/image";
import { useCheckout } from "@/context/CheckoutContext";
import { formatPrice } from "@/lib/format";
import { DEFAULT_SHIPPING_FEE } from "@/lib/cart";
import type { Product } from "@/types/checkout";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { cart, setCart } = useCheckout();
  const existingItems = cart?.cartItems ?? [];
  const cartItem = existingItems.find(
    (item) => item.product_id === product.product_id
  );
  const quantity = cartItem?.quantity ?? 0;
  const isInCart = quantity > 0;

  function updateQuantity(newQuantity: number) {
    if (newQuantity < 1) {
      const newItems = existingItems.filter(
        (item) => item.product_id !== product.product_id
      );
      setCart({
        cartItems: newItems,
        shipping_fee: cart?.shipping_fee ?? DEFAULT_SHIPPING_FEE,
        discount_applied: cart?.discount_applied ?? 0,
      });
      return;
    }
    const newItems = cartItem
      ? existingItems.map((item) =>
          item.product_id === product.product_id
            ? { ...item, quantity: newQuantity }
            : item
        )
      : [
          ...existingItems,
          { ...product, quantity: newQuantity },
        ];
    setCart({
      cartItems: newItems,
      shipping_fee: cart?.shipping_fee ?? DEFAULT_SHIPPING_FEE,
      discount_applied: cart?.discount_applied ?? 0,
    });
  }

  function addToCart() {
    updateQuantity(quantity + 1);
  }

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:border-emerald-200 hover:shadow-lg">
      <div className="relative block aspect-square overflow-hidden bg-gray-100">
        <Image
          src={product.image}
          alt={product.product_name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-semibold text-gray-900 line-clamp-2">
          {product.product_name}
        </h3>
        <p className="mt-2 text-lg font-bold text-emerald-700">
          {formatPrice(product.product_price)}
        </p>
        {isInCart ? (
          <div className="mt-4 flex items-center gap-2">
            <div className="flex items-center gap-1 rounded-lg border border-gray-200 bg-gray-50 p-1">
              <button
                type="button"
                onClick={() => updateQuantity(quantity - 1)}
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
                onClick={() => updateQuantity(quantity + 1)}
                className="flex h-8 w-8 items-center justify-center rounded-md text-gray-600 hover:bg-gray-200 hover:text-gray-900"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={addToCart}
            className="mt-4 w-full rounded-xl bg-emerald-600 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-emerald-500 active:bg-emerald-700"
          >
            Add to cart
          </button>
        )}
      </div>
    </article>
  );
}

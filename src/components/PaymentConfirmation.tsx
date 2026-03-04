"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCheckout } from "@/context/CheckoutContext";
import { formatPrice } from "@/lib/format";
import type { CartData, ShippingAddress } from "@/types/checkout";
import { computeCartTotals } from "@/lib/cart";

function OrderSummaryBlock({ cart }: { cart: CartData }) {
  const { cartItems, shipping_fee, discount_applied } = cart;
  const { subtotal, grandTotal } = computeCartTotals(cart);

  return (
    <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
      <h2 className="border-b border-gray-200 px-4 py-3 text-sm font-semibold text-gray-900 sm:px-5">
        Order Summary
      </h2>
      <ul className="divide-y divide-gray-200">
        {cartItems.map((item) => (
          <li key={item.product_id} className="flex gap-4 p-4 sm:p-5">
            <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 bg-gray-100">
              <Image
                src={item.image}
                alt={item.product_name}
                width={80}
                height={80}
                className="h-full w-full object-cover"
                unoptimized
              />
            </div>
            <div className="flex flex-1 flex-col justify-center">
              <p className="font-medium text-gray-900">{item.product_name}</p>
              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
              <p className="mt-0.5 font-medium text-gray-900">
                {formatPrice(item.product_price * item.quantity)}
              </p>
            </div>
          </li>
        ))}
      </ul>
      <div className="border-t border-gray-200 bg-gray-50 px-4 py-3 sm:px-5">
        <dl className="space-y-1 text-sm">
          <div className="flex justify-between">
            <dt className="text-gray-600">Subtotal</dt>
            <dd className="font-medium text-gray-900">{formatPrice(subtotal)}</dd>
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
  );
}

function ShippingAddressBlock({ address }: { address: ShippingAddress }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
      <h2 className="border-b border-gray-200 px-4 py-3 text-sm font-semibold text-gray-900 sm:px-5">
        Shipping Address
      </h2>
      <div className="space-y-1 px-4 py-3 text-sm text-gray-700 sm:px-5 sm:py-4">
        <p className="font-medium text-gray-900">{address.fullName}</p>
        <p>{address.email}</p>
        <p>{address.phone}</p>
        <p>
          {address.city}, {address.state} – {address.pinCode}
        </p>
      </div>
    </div>
  );
}

export function PaymentConfirmation() {
  const router = useRouter();
  const { cart, shippingAddress, setCart, setShippingAddress } = useCheckout();
  const [isPaying, setIsPaying] = useState(false);

  useEffect(() => {
    if (cart === null) {
      router.replace("/cart");
      return;
    }
    if (shippingAddress === null) {
      router.replace("/checkout/shipping");
    }
  }, [cart, shippingAddress, router]);

  const handlePay = async () => {
    setIsPaying(true);
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 1200));
    // Clear checkout state after successful "payment"
    setCart(null);
    setShippingAddress(null);
    router.push("/checkout/success");
  };

  if (cart === null || shippingAddress === null) {
    return (
      <div className="flex min-h-[200px] items-center justify-center text-gray-500">
        Redirecting…
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-6">
      <OrderSummaryBlock cart={cart} />
      <ShippingAddressBlock address={shippingAddress} />

      <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-between">
        <Link
          href="/checkout/shipping"
          className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
        >
          Back to Address
        </Link>
        <button
          type="button"
          onClick={handlePay}
          disabled={isPaying}
          className="inline-flex justify-center rounded-md bg-green-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 disabled:pointer-events-none disabled:opacity-70"
        >
          {isPaying ? "Processing…" : "Pay Securely"}
        </button>
      </div>
    </div>
  );
}

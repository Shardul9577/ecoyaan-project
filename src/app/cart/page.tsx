import Link from "next/link";
import { getCartData } from "@/lib/cart-server";
import { CartSummary } from "@/components/CartSummary";

export default async function CartPage() {
  const cart = await getCartData();
  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-emerald-700 hover:text-emerald-600"
          >
            <span aria-hidden>←</span>
            Back to home
          </Link>
        </div>
        <h1 className="text-2xl font-semibold text-gray-900">Your Cart</h1>
        <p className="mt-1 text-sm text-gray-500">
          Review your items and proceed to checkout.
        </p>
        <CartSummary initialCart={cart} />
      </div>
    </main>
  );
}

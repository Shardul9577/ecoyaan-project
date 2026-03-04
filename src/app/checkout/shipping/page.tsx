import Link from "next/link";
import { ShippingAddressForm } from "@/components/ShippingAddressForm";
import { CheckoutSteps } from "@/components/CheckoutSteps";

export default function ShippingPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/cart"
          className="text-sm font-medium text-green-600 hover:text-green-500"
        >
          ← Back to cart
        </Link>
        <CheckoutSteps current="shipping" />
        <h1 className="mt-6 text-2xl font-semibold text-gray-900">
          Shipping Address
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Enter your delivery details. All fields are required.
        </p>
        <div className="mt-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <ShippingAddressForm />
        </div>
      </div>
    </main>
  );
}

import Link from "next/link";
import { PaymentConfirmation } from "@/components/PaymentConfirmation";
import { CheckoutSteps } from "@/components/CheckoutSteps";

export default function PaymentPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/checkout/shipping"
          className="text-sm font-medium text-green-600 hover:text-green-500"
        >
          ← Back to address
        </Link>
        <CheckoutSteps current="payment" />
        <h1 className="mt-6 text-2xl font-semibold text-gray-900">
          Payment & Confirmation
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Review your order and complete the payment.
        </p>
        <PaymentConfirmation />
      </div>
    </main>
  );
}

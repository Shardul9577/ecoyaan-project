import Link from "next/link";
import { CheckoutSteps } from "@/components/CheckoutSteps";

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-md px-4 text-center sm:px-6 lg:px-8">
        <CheckoutSteps current="success" />
        <div className="mt-6 rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <svg
              className="h-6 w-6 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="mt-4 text-2xl font-semibold text-gray-900">
            Order Successful!
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Thank you for your order. We&apos;ll send a confirmation to your
            email shortly.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex w-full justify-center rounded-md bg-green-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}

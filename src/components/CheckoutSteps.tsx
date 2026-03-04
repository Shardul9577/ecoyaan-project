"use client";

interface CheckoutStepsProps {
  current: "cart" | "shipping" | "payment" | "success";
}

const STEPS: { id: CheckoutStepsProps["current"]; label: string }[] = [
  { id: "cart", label: "Cart" },
  { id: "shipping", label: "Shipping" },
  { id: "payment", label: "Payment" },
  { id: "success", label: "Success" },
];

export function CheckoutSteps({ current }: CheckoutStepsProps) {
  return (
    <nav
      aria-label="Checkout progress"
      className="mt-4 flex items-center justify-center gap-3 text-xs font-medium text-gray-500 sm:text-sm"
    >
      {STEPS.map((step, index) => {
        const isActive = step.id === current;
        const isCompleted =
          STEPS.findIndex((s) => s.id === current) > index;

        return (
          <div key={step.id} className="flex items-center gap-3">
            <div
              className={[
                "flex h-7 w-7 items-center justify-center rounded-full border text-xs sm:text-sm",
                isActive
                  ? "border-green-600 bg-green-50 text-green-700"
                  : isCompleted
                  ? "border-green-600 bg-green-600 text-white"
                  : "border-gray-300 bg-white text-gray-500",
              ].join(" ")}
              aria-current={isActive ? "step" : undefined}
            >
              {index + 1}
            </div>
            <span
              className={
                isActive || isCompleted ? "text-gray-900" : "text-gray-500"
              }
            >
              {step.label}
            </span>
            {index < STEPS.length - 1 && (
              <span className="hidden h-px w-6 bg-gray-200 sm:block" />
            )}
          </div>
        );
      })}
    </nav>
  );
}


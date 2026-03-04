"use client";

import { useState, useCallback, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { ShippingAddress } from "@/types/checkout";
import { useCheckout } from "@/context/CheckoutContext";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\d{10}$/;
const PIN_REGEX = /^\d{6}$/;

interface FieldErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  pinCode?: string;
  city?: string;
  state?: string;
}

const initialValues: ShippingAddress = {
  fullName: "",
  email: "",
  phone: "",
  pinCode: "",
  city: "",
  state: "",
};

function validate(values: ShippingAddress): FieldErrors {
  const errors: FieldErrors = {};
  if (!values.fullName?.trim()) errors.fullName = "Full name is required";
  if (!values.email?.trim()) errors.email = "Email is required";
  else if (!EMAIL_REGEX.test(values.email.trim()))
    errors.email = "Please enter a valid email address";
  if (!values.phone?.trim()) errors.phone = "Phone number is required";
  else if (!PHONE_REGEX.test(values.phone.replace(/\s/g, "")))
    errors.phone = "Please enter a valid 10-digit phone number";
  if (!values.pinCode?.trim()) errors.pinCode = "PIN code is required";
  else if (!PIN_REGEX.test(values.pinCode.trim()))
    errors.pinCode = "PIN code must be 6 digits";
  if (!values.city?.trim()) errors.city = "City is required";
  if (!values.state?.trim()) errors.state = "State is required";
  return errors;
}

export function ShippingAddressForm() {
  const router = useRouter();
  const { shippingAddress, setShippingAddress } = useCheckout();
  const [values, setValues] = useState<ShippingAddress>(
    () => shippingAddress ?? initialValues
  );
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof ShippingAddress, boolean>>>({});

  const update = useCallback((field: keyof ShippingAddress, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }, []);

  const handleBlur = useCallback((field: keyof ShippingAddress) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => {
      const errs = validate(values);
      return { ...prev, [field]: errs[field] };
    });
  }, [values]);

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      const errs = validate(values);
      setErrors(errs);
      setTouched({
        fullName: true,
        email: true,
        phone: true,
        pinCode: true,
        city: true,
        state: true,
      });
      if (Object.keys(errs).length > 0) return;
      setShippingAddress(values);
      router.push("/checkout/payment");
    },
    [values, setShippingAddress, router]
  );

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
          Full Name
        </label>
        <input
          id="fullName"
          type="text"
          value={values.fullName}
          onChange={(e) => update("fullName", e.target.value)}
          onBlur={() => handleBlur("fullName")}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 sm:text-sm"
          placeholder="Enter your full name"
          autoComplete="name"
        />
        {touched.fullName && errors.fullName && (
          <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={values.email}
          onChange={(e) => update("email", e.target.value)}
          onBlur={() => handleBlur("email")}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 sm:text-sm"
          placeholder="you@example.com"
          autoComplete="email"
        />
        {touched.email && errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Phone Number
        </label>
        <input
          id="phone"
          type="tel"
          value={values.phone}
          onChange={(e) => update("phone", e.target.value.replace(/\D/g, "").slice(0, 10))}
          onBlur={() => handleBlur("phone")}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 sm:text-sm"
          placeholder="10-digit mobile number"
          autoComplete="tel"
          maxLength={10}
        />
        {touched.phone && errors.phone && (
          <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
        )}
      </div>

      <div>
        <label htmlFor="pinCode" className="block text-sm font-medium text-gray-700">
          PIN Code
        </label>
        <input
          id="pinCode"
          type="text"
          inputMode="numeric"
          value={values.pinCode}
          onChange={(e) => update("pinCode", e.target.value.replace(/\D/g, "").slice(0, 6))}
          onBlur={() => handleBlur("pinCode")}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 sm:text-sm"
          placeholder="6-digit PIN code"
          autoComplete="postal-code"
          maxLength={6}
        />
        {touched.pinCode && errors.pinCode && (
          <p className="mt-1 text-sm text-red-600">{errors.pinCode}</p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">
            City
          </label>
          <input
            id="city"
            type="text"
            value={values.city}
            onChange={(e) => update("city", e.target.value)}
            onBlur={() => handleBlur("city")}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 sm:text-sm"
            placeholder="City"
            autoComplete="address-level2"
          />
          {touched.city && errors.city && (
            <p className="mt-1 text-sm text-red-600">{errors.city}</p>
          )}
        </div>
        <div>
          <label htmlFor="state" className="block text-sm font-medium text-gray-700">
            State
          </label>
          <input
            id="state"
            type="text"
            value={values.state}
            onChange={(e) => update("state", e.target.value)}
            onBlur={() => handleBlur("state")}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 sm:text-sm"
            placeholder="State"
            autoComplete="address-level1"
          />
          {touched.state && errors.state && (
            <p className="mt-1 text-sm text-red-600">{errors.state}</p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:justify-between">
        <Link
          href="/cart"
          className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
        >
          Back to Cart
        </Link>
        <button
          type="submit"
          className="inline-flex justify-center rounded-md bg-green-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
        >
          Continue to Payment
        </button>
      </div>
    </form>
  );
}

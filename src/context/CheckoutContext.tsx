"use client";

import {
  createContext,
  useEffect,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import type { CartData, ShippingAddress } from "@/types/checkout";

interface CheckoutContextValue {
  cart: CartData | null;
  shippingAddress: ShippingAddress | null;
  setCart: (cart: CartData | null) => void;
  setShippingAddress: (address: ShippingAddress | null) => void;
}

const CheckoutContext = createContext<CheckoutContextValue | null>(null);

export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [cart, setCartState] = useState<CartData | null>(null);
  const [shippingAddress, setShippingAddressState] =
    useState<ShippingAddress | null>(null);

  // Restore checkout state from localStorage on first client render
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem("ecoyaan_checkout");
      if (!raw) return;
      const parsed = JSON.parse(raw) as {
        cart?: CartData | null;
        shippingAddress?: ShippingAddress | null;
      };
      if (parsed.cart) setCartState(parsed.cart);
      if (parsed.shippingAddress) setShippingAddressState(parsed.shippingAddress);
    } catch {
      // Ignore malformed data and start with an empty checkout state
    }
  }, []);

  // Persist checkout state to localStorage whenever it changes
  useEffect(() => {
    if (typeof window === "undefined") return;
    const payload = JSON.stringify({ cart, shippingAddress });
    window.localStorage.setItem("ecoyaan_checkout", payload);
  }, [cart, shippingAddress]);

  const setCart = useCallback((value: CartData | null) => {
    setCartState(value);
  }, []);

  const setShippingAddress = useCallback((value: ShippingAddress | null) => {
    setShippingAddressState(value);
  }, []);

  return (
    <CheckoutContext.Provider
      value={{
        cart,
        shippingAddress,
        setCart,
        setShippingAddress,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  const ctx = useContext(CheckoutContext);
  if (!ctx) {
    throw new Error("useCheckout must be used within CheckoutProvider");
  }
  return ctx;
}

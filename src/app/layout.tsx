import type { Metadata } from "next";
import "./globals.css";
import { CheckoutProvider } from "@/context/CheckoutContext";

export const metadata: Metadata = {
  title: "Ecoyaan Checkout",
  description: "Simplified checkout flow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <CheckoutProvider>{children}</CheckoutProvider>
      </body>
    </html>
  );
}

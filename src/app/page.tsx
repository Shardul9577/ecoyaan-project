import Link from "next/link";
import cartData from "@/data/cart.json";
import productsData from "@/data/products.json";
import type { CartData, Product } from "@/types/checkout";
import { ProductGrid } from "@/components/ProductGrid";

export default function Home() {
  // Use cart.json structure: show cart items as products, plus products.json for a fuller catalog
  const cart = cartData as CartData;
  const cartProducts = cart.cartItems.map(({ quantity: _q, ...p }) => p);
  const catalog = productsData as Product[];
  const productIdsFromCart = new Set(cartProducts.map((p) => p.product_id));
  const extraProducts = catalog.filter((p) => !productIdsFromCart.has(p.product_id));
  const products = [...cartProducts, ...extraProducts];

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50/80 to-white">
      <header className="sticky top-0 z-10 border-b border-gray-200/80 bg-white/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight text-emerald-700">
              Ecoyaan
            </span>
            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700">
              Sustainable
            </span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link
              href="/cart"
              className="rounded-xl border border-emerald-200 bg-white px-4 py-2.5 text-sm font-medium text-emerald-700 transition-colors hover:bg-emerald-50 hover:border-emerald-300"
            >
              View Cart
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Eco-friendly products
          </h1>
          <p className="mt-2 text-gray-600">
            Thoughtful choices for a lighter footprint.
          </p>
        </div>

        <ProductGrid products={products} />
      </main>
    </div>
  );
}

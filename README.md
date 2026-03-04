## Ecoyaan Checkout Flow

A small checkout experience built with Next.js 14 (App Router), React 18, TypeScript, and Tailwind CSS.  
The flow covers cart review, shipping address, payment confirmation, and a success screen.

### Architecture overview

- Uses the Next.js App Router** under `src/app` (`page.tsx`, `cart/page.tsx`, `checkout/shipping`, `checkout/payment`, `checkout/success`).
- The cart page is an async server component that reads mock data from `src/data/cart.json` via `getCartData` in `src/lib/cart-server.ts`, so initial cart data is server‑rendered.
- Interactive features (quantity updates, forms, payment) are isolated in client components.
- A `CheckoutProvider` in `src/context/CheckoutContext.tsx` owns the multi‑step checkout state so `/cart → /checkout/shipping → /checkout/payment` share the same source of truth.

### Running the app locally

Prerequisites:
- Node.js 18+ (Next.js 14 requirement)
- npm (or another package manager, commands below assume npm)

Steps:
# Install dependencies
npm install

# Start the development server
npm run dev

Then open `http://localhost:3000` in your browser.

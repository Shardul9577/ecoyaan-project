import { NextResponse } from "next/server";
import cartData from "@/data/cart.json";
import type { CartData } from "@/types/checkout";

export async function GET() {
  try {
    const cart = cartData as CartData;
    return NextResponse.json(cart);
  } catch {
    return NextResponse.json(
      { error: "Failed to load cart" },
      { status: 500 }
    );
  }
}

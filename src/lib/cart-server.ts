import { readFile } from "fs/promises";
import path from "path";
import type { CartData } from "@/types/checkout";

export async function getCartData(): Promise<CartData> {
  const filePath = path.join(process.cwd(), "src/data/cart.json");
  const raw = await readFile(filePath, "utf-8");
  return JSON.parse(raw) as CartData;
}

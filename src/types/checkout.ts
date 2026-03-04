export interface Product {
  product_id: number;
  product_name: string;
  product_price: number;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CartData {
  cartItems: CartItem[];
  shipping_fee: number;
  discount_applied: number;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  pinCode: string;
  city: string;
  state: string;
}

export interface CheckoutState {
  cart: CartData | null;
  shippingAddress: ShippingAddress | null;
  setCart: (cart: CartData | null) => void;
  setShippingAddress: (address: ShippingAddress | null) => void;
}

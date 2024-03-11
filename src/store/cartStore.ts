import { Book } from "@/pages/HomePage";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem extends Book {
  qty: number;
  totalPrice: number;
}

interface IState {
  cart: CartItem[];
  totalItem: number;
  subTotal: number;
}

interface IActions {
  addToCart: (item: CartItem) => void;
  removeItem: (item: CartItem) => void;
  incrementItem: (item: CartItem) => void;
  decrementItem: (item: CartItem) => void;
}

export const useCartStore = create(
  persist<IState & IActions>(
    (set, get) => ({
      cart: [],
      totalItem: 0,
      subTotal: 0,
      addToCart: (item: CartItem) => {
        const cart = get().cart;
        const updateCart = add(cart, item);
        set((state) => ({
          cart: updateCart,
          totalItem: state.totalItem + 1,
          subTotal: state.subTotal + item.price,
        }));
      },
      incrementItem: (item) => {
        const { cart } = get();
        const updateCart = incrementInCart(cart, item);
        set((state) => ({
          cart: updateCart,
          totalItem: state.totalItem + 1,
          subTotal: state.subTotal + item.price,
        }));
      },
      decrementItem: (item) => {
        const { cart } = get();
        const updateCart = decrementInCart(cart, item);
        set((state) => ({
          cart: updateCart,
          totalItem: state.totalItem - 1,
          subTotal: state.subTotal - item.price,
        }));
      },
      removeItem: (item) => {
        const { cart } = get();
        const updateCart = removeFromCart(cart, item);

        set((state) => ({
          cart: updateCart,
          totalItem: state.totalItem - item.qty,
          subTotal: state.subTotal - item.totalPrice,
        }));
      },
    }),
    { name: "cart_storage" }
  )
);

const add = (cart: CartItem[], book: CartItem) => {
  const existingItem = cart.findIndex((i) => i.id === book.id);

  if (existingItem !== -1) {
    return cart.map((item, i) =>
      i === existingItem
        ? { ...item, qty: item.qty + 1, totalPrice: item.price + book.price }
        : item
    );
  }
  return [...cart, { ...book, qty: 1, totalPrice: book.price }];
};

const incrementInCart = (cart: CartItem[], book: CartItem): CartItem[] => {
  const existingItem = cart.findIndex((i) => i.id === book.id);

  if (existingItem !== -1) {
    return cart.map((item, i) =>
      i === existingItem
        ? {
            ...item,
            qty: item.qty + 1,
            totalPrice: item.totalPrice + book.price,
          }
        : item
    );
  }
  return [...cart, { ...book, qty: 1, totalPrice: book.price }];
};

const decrementInCart = (cart: CartItem[], book: CartItem): CartItem[] => {
  const existingItem = cart.findIndex((i) => i.id === book.id);

  if (existingItem !== -1) {
    return cart.map((item, i) =>
      i === existingItem
        ? {
            ...item,
            qty: item.qty - 1,
            totalPrice: item.totalPrice - book.price,
          }
        : item
    );
  }
  return [...cart, { ...book, qty: 1, totalPrice: book.price }];
};

const removeFromCart = (cart: CartItem[], book: CartItem): CartItem[] => {
  const existingItem = cart.findIndex((i) => i.id === book.id);

  return cart.filter((_, index) => index !== existingItem);
};

"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

type CartItem = {
  id: string;
  source: string;
  size?: string;
  qty: number;
};

type CartContextValue = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clear: () => void;
  count: number;
  open: boolean;
  openCart: () => void;
  closeCart: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("cart_items");
      if (raw) setItems(JSON.parse(raw));
    } catch (e) {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("cart_items", JSON.stringify(items));
    } catch (e) {}
  }, [items]);

  const addItem = (item: CartItem) => {
    setItems((prev) => {
      const found = prev.find((p) => p.id === item.id && p.size === item.size);
      if (found) {
        return prev.map((p) =>
          p.id === item.id && p.size === item.size
            ? { ...p, qty: p.qty + item.qty }
            : p
        );
      }
      return [...prev, item];
    });
    setOpen(true);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  };

  const updateQty = (id: string, qty: number) => {
    setItems((prev) => prev.map((p) => (p.id === id ? { ...p, qty } : p)));
  };

  const clear = () => setItems([]);

  const count = items.reduce((s, it) => s + it.qty, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQty,
        clear,
        count,
        open,
        openCart: () => setOpen(true),
        closeCart: () => setOpen(false),
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export type { CartItem };

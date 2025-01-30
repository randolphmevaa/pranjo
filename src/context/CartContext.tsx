// src/app/context/CartContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type CartItem = {
  id: string;
  variantId: string; // from your code
  title: string;
  handle: string;
  quantity: number;
  price: string;     // stored as string; we'll parseFloat() it to calculate totals
  currency: string;
  image?: {
    url: string;
    altText?: string;
  };
};

// 1) Extend your CartContextType to include `getSubtotal` if you want to call it elsewhere
type CartContextType = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  updateItemQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  total: number;
  getSubtotal: () => number; // <--- ADDED
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // On mount: retrieve existing cart from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setItems(JSON.parse(storedCart));
    }
  }, []);

  // Whenever `items` changes, store the new cart in localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  // 2) Define a helper function to compute the subtotal
  const getSubtotal = () => {
    return items.reduce((acc, item) => acc + parseFloat(item.price) * item.quantity, 0);
  };

  // 3) For convenience, total is the same as subtotal here (or you can rename it)
  const total = getSubtotal();

  // 4) Actions to modify the cart
  const addItem = (item: CartItem) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        // If item already in cart, just update quantity
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      } else {
        // Otherwise add a new item
        return [...prevItems, item];
      }
    });
  };

  const updateItemQuantity = (id: string, quantity: number) => {
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const removeItem = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
  };

  // 5) Provide the context value
  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        updateItemQuantity,
        removeItem,
        clearCart,
        total,
        getSubtotal, // <--- Make sure to pass it here
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Hook to consume the CartContext
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

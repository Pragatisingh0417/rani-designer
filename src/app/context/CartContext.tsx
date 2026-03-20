"use client";

import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const CartContext = createContext<any>(null);


export const CartProvider = ({ children }: any) => {
    const [cart, setCart] = useState<any[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Load from localStorage
    useEffect(() => {
        const stored = localStorage.getItem("cart");
        if (stored) setCart(JSON.parse(stored));
    }, []);

    // Save to localStorage
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);


    //add to cart
   const addToCart = (product: any, openDrawer = true) => {
  setCart((prev) => {
    const exists = prev.find((p) => p._id === product._id);

    if (exists) {
      return prev.map((p) =>
        p._id === product._id
          ? { ...p, quantity: p.quantity + 1 }
          : p
      );
    }

    toast.success("Item added to cart 🛍️");
    return [...prev, { ...product, quantity: 1 }];
  });

  if (openDrawer) {
    setIsCartOpen(true);
  }
};


   const increaseQty = (id: string) => {
  setCart((prev) =>
    prev.map((p) =>
      p._id === id ? { ...p, quantity: p.quantity + 1 } : p
    )
  );
};

const decreaseQty = (id: string) => {
  setCart((prev) =>
    prev
      .map((p) =>
        p._id === id
          ? { ...p, quantity: p.quantity - 1 }
          : p
      )
      .filter((p) => p.quantity > 0)
  );
};


    const removeFromCart = (id: string) => {
        setCart((prev) => prev.filter((p) => p._id !== id));
          toast.error("Item removed ❌");

    };

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                increaseQty,
                decreaseQty,
                isCartOpen,
                setIsCartOpen,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
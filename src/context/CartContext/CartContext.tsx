'use client';

import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { IProductProperties } from '@/constants/globalConstant.types';
import { IAuthContextProps, ICart } from './CartContext.types';

export const CartContext = createContext<ICart<IProductProperties[]>>({
  cart: [],
  addProductToCart: () => {},
  deleteProductFromTheCart: () => {},
  numberOfProductsInCart: 0,
});

export const CartProvider = ({ children }: IAuthContextProps) => {
  const [cart, setCart] = useState<IProductProperties[]>([]);

  const addProductToCart = (product: IProductProperties) => {
    const loadedCart = [...cart, product];

    setCart(loadedCart);

    localStorage.setItem('cart', JSON.stringify(loadedCart));
  };

  const deleteProductFromTheCart = (id: string) => {
    const newCart = cart.filter((item) => item.id !== id);

    setCart(newCart);

    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  useEffect(() => {
    const cart = localStorage.getItem('cart');

    if (cart) {
      setCart(JSON.parse(cart));
    }
  }, []);

  const contextValue = useMemo(
    () => ({
      cart,
      addProductToCart,
      deleteProductFromTheCart,
      numberOfProductsInCart: cart.length,
    }),

    // eslint-disable-next-line
    [cart]
  );

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);

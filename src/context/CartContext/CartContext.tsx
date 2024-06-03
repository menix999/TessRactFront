'use client';

import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { IProductProperties } from '@/constants/globalConstant.types';
import { IAuthContextProps, ICart } from './CartContext.types';

export const CartContext = createContext<ICart<IProductProperties[]>>({
  cart: [],
  addProductToCart: () => {},
  deleteProductFromTheCart: () => {},
  numberOfProductsInCart: 0,
  cartListTotalAmount: 0,
  numberOfProducts: {},
  setNumberOfProducts: () => {},
  setCartListTotalAmount: () => {},
});

export const CartProvider = ({ children }: IAuthContextProps) => {
  const [cart, setCart] = useState<IProductProperties[]>([]);
  const [numberOfProducts, setNumberOfProducts] = useState<Record<string, number>>({});
  const [cartListTotalAmount, setCartListTotalAmount] = useState<number>(0);

  const addProductToCart = (product: IProductProperties) => {
    const loadedCart = [...cart, product];

    setCart(loadedCart);

    localStorage.setItem('cart', JSON.stringify(loadedCart));
  };

  const deleteProductFromTheCart = (id: string) => {
    const newCart = cart.filter((item) => item.id !== id);
    const newNumberOfProducts = { ...numberOfProducts };

    setCart(newCart);
    delete newNumberOfProducts[id];
    setNumberOfProducts(newNumberOfProducts);

    localStorage.setItem('numberOfProducts', JSON.stringify(newNumberOfProducts));
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  useEffect(() => {
    const cart = localStorage.getItem('cart');

    const parsedCart = JSON.parse(cart || '');

    if (!parsedCart.length) return;

    setCart(parsedCart);
  }, []);

  useEffect(() => {
    let newTotalPrice = 0;
    cart.forEach((product) => {
      newTotalPrice += (numberOfProducts[product.id] || 0) * product.price;
    });
    setCartListTotalAmount(Number(newTotalPrice.toFixed(2)));
  }, [numberOfProducts, cart]);

  const contextValue = useMemo(
    () => ({
      cart,
      addProductToCart,
      deleteProductFromTheCart,
      numberOfProductsInCart: cart.length,
      numberOfProducts,
      cartListTotalAmount,
      setNumberOfProducts,
      setCartListTotalAmount,
    }),

    // eslint-disable-next-line
    [cart, numberOfProducts, cartListTotalAmount]
  );

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);

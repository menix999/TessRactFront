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
  handleQuantityChange: () => {},
});

export const CartProvider = ({ children }: IAuthContextProps) => {
  const [cart, setCart] = useState<IProductProperties[]>([]);
  const [numberOfProducts, setNumberOfProducts] = useState<Record<string, number>>({});
  const [cartListTotalAmount, setCartListTotalAmount] = useState<number>(0);

  const addProductToCart = (product: IProductProperties) => {
    const preparedProduct = {
      ...product,
      quantity: 1,
    };

    const isProductExist = cart.some((product) => product.id === preparedProduct.id);

    let loadedCart = [...cart];

    if (isProductExist) {
      loadedCart = cart.map((product) => {
        if (product.id === preparedProduct.id) {
          return {
            ...product,
            quantity: product.quantity + 1,
          };
        }
        return product;
      });
    } else {
      loadedCart = [...cart, preparedProduct];
    }

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

  const handleQuantityChange = (id: string, quantity: number) => {
    const newCart = cart.map((product) => {
      if (product.id === id) {
        return {
          ...product,
          quantity,
        };
      }
      return product;
    });

    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  useEffect(() => {
    const cart = localStorage.getItem('cart');

    if (!cart) return;

    const parsedCart = JSON.parse(cart || '');

    if (!parsedCart.length) return;

    setCart(parsedCart);
  }, []);

  useEffect(() => {
    let newTotalPrice = 0;

    cart.forEach((product) => {
      newTotalPrice += product.quantity * product.price;
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
      handleQuantityChange,
    }),

    // eslint-disable-next-line
    [cart, numberOfProducts, cartListTotalAmount]
  );

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);

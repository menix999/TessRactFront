'use client';

import { Fragment, useEffect, useState } from 'react';

import { IProductProperties } from '@/constants/globalConstant.types';
import { ICartSummaryProps } from './CartSummary.types';
import { useCart } from '@/context/CartContext/CartContext';
import BuyOrPayNowSummary from '../BuyOrPayNowSummary/BuyOrPayNowSummary';

const CartSummary = ({ translation, locale }: ICartSummaryProps) => {
  const {
    deleteProductFromTheCart,
    numberOfProductsInCart,
    cart,
    setNumberOfProducts,
    setCartListTotalAmount,
    numberOfProducts,
    cartListTotalAmount,
  } = useCart();

  useEffect(() => {
    if (!cart.length) return;

    const totalAmount = cart.reduce((acc: number, item: IProductProperties) => {
      const totalPrice: number = acc + item.price;
      return totalPrice;
    }, 0);

    const initialNumberOfProducts: Record<string, number> = {};
    cart.forEach((product: IProductProperties) => {
      initialNumberOfProducts[product.id] = 1;
    });

    setNumberOfProducts(initialNumberOfProducts);
    setCartListTotalAmount(totalAmount);
  }, []);

  const handleDeleteProduct = (id: string) => {
    deleteProductFromTheCart(id);
  };

  const handleIncrement = (productId: number) => {
    if (numberOfProducts[productId] >= 99) return;
    setNumberOfProducts((prevQuantities) => ({
      ...prevQuantities,
      [productId]: (numberOfProducts[productId] || 1) + 1,
    }));

    localStorage.setItem('numberOfProducts', JSON.stringify(numberOfProducts));
  };

  const handleChangeNumberOfProducs = (productId: string, quantity: number) => {
    setNumberOfProducts((prevQuantities) => ({
      ...prevQuantities,
      [productId]: quantity,
    }));

    localStorage.setItem('numberOfProducts', JSON.stringify(numberOfProducts));
  };

  const handleDecrement = (productId: number) => {
    if (numberOfProducts[productId] > 1) {
      setNumberOfProducts((prevQuantities) => ({
        ...prevQuantities,
        [productId]: (numberOfProducts[productId] || 1) - 1,
      }));

      localStorage.setItem('numberOfProducts', JSON.stringify(numberOfProducts));
    }
  };

  return (
    <>
      <div className='flex flex-col w-full items-center'>
        <div className='flex flex-col w-full max-w-[700px]'>
          <h2 className='font-bold text-xl sm:text-3xl mb-4'>Koszyk ({numberOfProductsInCart})</h2>
          {cart.map(({ id, base64Image, name, price, color }: IProductProperties) => {
            const totalPrice = (numberOfProducts[id] * price).toFixed(2);
            return (
              <Fragment key={id}>
                <div className='border w-full rounded-2xl border-main-gray' />
                <div className='flex flex-col sm:flex-row gap-4 sm:gap-28 pt-10 pb-4 sm:pl-10 sm:h-64 lg:pr-10'>
                  <div className='flex justify-center sm:justify-start items-center'>
                    <img
                      src={`data:image/;base64,${base64Image}`}
                      alt='Smartwatch in the cart'
                      className='max-w-40 max-h-40 md:max-w-50 md:max-h-50'
                    />
                  </div>

                  <div className='flex flex-col w-full justify-between'>
                    <div className='flex flex-col gap-4 w-full'>
                      <div className='flex justify-between'>
                        <span className='text-base sm:text-xl'>{name}</span>
                        <span className='text-base sm:text-xl font-bold whitespace-nowrap'>
                          {totalPrice} zł
                        </span>
                      </div>
                      <span className='text-main-purple text-sm sm:text-base'>Dostępne</span>
                      <div className='flex'>
                        <span className='text-base font-bold mr-1'>{translation.color}:</span>
                        <span className='text-base'>{color}</span>
                      </div>
                    </div>

                    <div className='flex items-center'>
                      <button onClick={() => handleDecrement(+id)} className='mr-2'>
                        -
                      </button>
                      <div className='flex w-10 justify-center items-center '>
                        <input
                          type='text'
                          maxLength={2}
                          value={numberOfProducts[id] || 0}
                          onChange={(e) => handleChangeNumberOfProducs(id, +e.target.value)}
                          className='h-6 w-6 text-center text-sm outline-none border border-solid rounded-lg border-main-gray focus:border-2 focus:border-main-purple'
                        />
                      </div>
                      <button onClick={() => handleIncrement(+id)} className='ml-2'>
                        +
                      </button>
                      <div className='border h-4 rounded-2xl mx-5 border-main-gray' />
                      <span
                        onClick={() => handleDeleteProduct(id)}
                        className='text-main-purple text-sm cursor-pointer hover:underline'
                      >
                        {translation.delete}
                      </span>
                    </div>
                  </div>
                </div>
              </Fragment>
            );
          })}
        </div>
      </div>
      <BuyOrPayNowSummary
        translation={translation}
        isCartDiscount
        isAcceptedMethodsOfPayment
        total={cartListTotalAmount}
        numberOfProducts={numberOfProducts}
        locale={locale}
        isCartSummary
      />
    </>
  );
};

export default CartSummary;

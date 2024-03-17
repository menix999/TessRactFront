'use client';

import { Fragment, useEffect, useState } from 'react';

import { IProductProperties } from '@/constants/globalConstant.types';
import { ICartSummaryProps } from './CartSummary.types';
import { useCart } from '@/context/CartContext/CartContext';
import BuyOrPayNowSummary from '../BuyOrPayNowSummary/BuyOrPayNowSummary';

const CartSummary = ({ translation }: ICartSummaryProps) => {
  const [cartList, setCartList] = useState<IProductProperties[]>([]);
  const [cartListTotalAmount, setCartListTotalAmount] = useState<number>(0);

  const { deleteProductFromTheCart, numberOfProductsInCart } = useCart();

  useEffect(() => {
    const cartList: IProductProperties[] =
      (localStorage.getItem('cart') && JSON.parse(localStorage.getItem('cart')!)) || [];

    if (!cartList.length) return;

    const totalAmount = cartList.reduce((acc: number, item: IProductProperties) => {
      const totalPrice: number = acc + item.price;
      return totalPrice;
    }, 0);

    setCartList(cartList);
    setCartListTotalAmount(totalAmount);
  }, []);

  const handleDeleteProduct = (id: string) => {
    deleteProductFromTheCart(id);
  };

  return (
    <>
      <div className='flex flex-col w-full items-center'>
        <div className='flex flex-col w-full max-w-[700px]'>
          <h2 className='font-bold text-xl sm:text-3xl mb-4'>Koszyk ({numberOfProductsInCart})</h2>
          {cartList.map(({ id, base64Image, name, price, color }: IProductProperties) => {
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
                          {price} zł
                        </span>
                      </div>
                      <span className='text-main-purple text-sm sm:text-base'>Dostępne</span>
                      <div className='flex'>
                        <span className='text-base font-bold mr-1'>{translation.color}:</span>
                        <span className='text-base'>{color}</span>
                      </div>
                    </div>

                    <div className='flex items-center'>
                      <span>Wybierz ilość</span>
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
      />
    </>
  );
};

export default CartSummary;

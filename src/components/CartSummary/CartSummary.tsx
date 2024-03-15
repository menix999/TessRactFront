'use client';

import { Fragment } from 'react';

import { IProductProperties } from '@/constants/globalConstant.types';
import Button from '../Button/Button';
import CartDiscount from '../CartDiscount/CartDiscount';
import { ICartSummaryProps } from './CartSummary.types';
import { useCart } from '@/context/CartContext/CartContext';
import BlikIcon from '@/assets/BlikIcon';
import VisaIcon from '@/assets/VisaIcon';
import MBankIcon from '@/assets/mBankIcon';
import PayPalIcon from '@/assets/PayPalIcon';
import StripeIcon from '@/assets/StripeIcon';

const CartSummary = ({ translation }: ICartSummaryProps) => {
  const { deleteProductFromTheCart, numberOfProductsInCart } = useCart();

  const cartList =
    (localStorage.getItem('cart') && JSON.parse(localStorage.getItem('cart')!)) || [];
  console.log('cartList', cartList);

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

      <div className='flex flex-col w-full max-w-[700px] xl:w-auto gap-6 xl:mt-12'>
        <div className='flex w-full border-2 rounded-xl lg:min-w-[400px] flex-col p-5 gap-4'>
          <p className='text-base'>{translation.orderSummary}</p>
          <div className='flex justify-between items-center'>
            <span className='text-sm'>{translation.discountOnProducts}</span>
            <span className=' text-main-purple text-sm'>-45,00zł</span>
          </div>
          <div className='flex justify-between items-center mt-10'>
            <span className='text-sm sm:text-base whitespace-nowrap'>
              {translation.totalAmount}
            </span>
            <span className='font-bold text-xl sm:text-3xl whitespace-nowrap'>2510,00 zł</span>
          </div>
          <Button type='button'>{translation.goToDelivery}</Button>
        </div>
        <CartDiscount />
        <span>{translation.acceptedMethodsOfPayment}</span>
        <div className='flex items-center gap-3'>
          <BlikIcon />
          <MBankIcon />
          <VisaIcon />
          <PayPalIcon />
          <StripeIcon />
        </div>
      </div>
    </>
  );
};

export default CartSummary;

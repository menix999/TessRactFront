'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

import Tooltip from '../Tooltip/Tooltip';
import { routes } from '@/constants/constants';
import CartIcon from '@/assets/CartIcon';
import { ICartTooltipProps } from './CartTooltip.types';
import { useCart } from '@/context/CartContext/CartContext';

const CartTooltip = ({ translation }: ICartTooltipProps) => {
  const [isToolTipVisible, setIsToolTipVisible] = useState(true);

  const { numberOfProductsInCart } = useCart();

  return (
    <Link
      href={routes.cart}
      className='flex flex-col relative sm:flex-row items-center sm:gap-3 cursor-pointer sm:w-36 whitespace-nowrap'
    >
      {!!numberOfProductsInCart && (
        <div
          className={`flex justify-center items-center absolute -top-1 left-6 rounded-full ${
            numberOfProductsInCart >= 10 ? 'h-[22px] w-[22px]' : 'h-[18px] w-[18px]'
          } bg-main-purple border border-white`}
        >
          <span className='text-white text-[12px]'>{numberOfProductsInCart}</span>
        </div>
      )}
      <div className='w-8 h-8'>
        <CartIcon />
      </div>
      <span className='flex text-xs sm:text-base'>{translation.cart}</span>
    </Link>
  );
};

export default CartTooltip;

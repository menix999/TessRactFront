import React, { ChangeEvent } from 'react';

import { IProductCardProps } from './ProductCard.types';
import Stars from '../Stars/Stars';
import { routes } from '@/constants/constants';
import CustomLink from '../CustomLink/CustomLink';

const ProductCard = ({
  text,
  photo,
  rate,
  price,
  translation,
  productId,
  locale,
  quantity,
}: IProductCardProps) => {
  return (
    <CustomLink
      href={`${routes.product}/${productId}`}
      locale={locale}
      className='transform transition-transform duration-300 hover:scale-95'
    >
      <div className='flex flex-col w-80 justify-center items-center shadow-xl rounded-xl max-w-52 overflow-x-hidden'>
        <div className='flex h-full justify-center items-center bg-dashboard-watch-background w-full px-4 py-8 rounded-t-xl'>
          <img src={photo} alt='product photo' className='max-w-20 max-h-20 ' />
        </div>
        <div className='flex flex-col items-center w-full h-full p-5 gap-4'>
          <span className='font-bold text-xl max-w-full whitespace-nowrap text-ellipsis overflow-hidden'>
            {text}
          </span>
          <Stars count={rate} readonly />
          <span className={`text-lg ${!!quantity ? 'text-main-green' : 'text-main-error-red'}`}>
            {!!quantity ? translation.available : translation.unavailable}
          </span>
          <span className='text-xl'>{price}</span>
        </div>
      </div>
    </CustomLink>
  );
};

export default ProductCard;

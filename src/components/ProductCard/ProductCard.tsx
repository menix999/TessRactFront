import React, { ChangeEvent } from 'react';
import Link from 'next/link';

import { IProductCardProps } from './ProductCard.types';
import Stars from '../Stars/Stars';
import Button from '../Button/Button';
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
}: IProductCardProps) => {
  return (
    <div className='flex flex-col w-80 justify-center items-center shadow-xl rounded-xl max-w-52'>
      <div className='flex h-full justify-center items-center bg-dashboard-watch-background w-full px-4 py-8 rounded-t-xl'>
        <img src={photo} alt='product photo' className='max-w-20 max-h-20 ' />
      </div>
      <div className='flex flex-col items-center h-full p-5 gap-4'>
        <span className='font-bold text-xl'>{text}</span>
        <Stars count={rate} />
        <span className='text-xl'>{price}</span>
        <CustomLink
          href={`${routes.product}/${productId}`}
          locale={locale}
          className='w-full mt-2 bg-white'
        >
          <Button type='button'>{translation.check}</Button>
        </CustomLink>
      </div>
    </div>
  );
};

export default ProductCard;

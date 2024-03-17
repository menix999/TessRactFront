'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { debounce } from 'lodash';

import { ICategoriesNavBarProps } from './CategoriesNavBar.types';
import { categories, routes } from '@/constants/constants';
import CustomLink from '../CustomLink/CustomLink';

const CategoriesNavBar = ({ translation, locale }: ICategoriesNavBarProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = debounce(() => {
      const currentScrollPos = window.pageYOffset;
      const isVisible = prevScrollPos > currentScrollPos || currentScrollPos < 100;
      setIsVisible(isVisible);
      setPrevScrollPos(currentScrollPos);
    }, 50);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  return (
    <div
      className={`flex fixed cursor-pointer z-40 items-center w-full bg-category-background border-t-2 border-#b0b0b040 transition-height duration-200 ease-in-out overflow-hidden shadow-sm ${
        isVisible ? 'h-12' : 'h-0'
      }`}
    >
      <CustomLink
        href={`${routes.productList}/${categories.headphones}`}
        locale={locale}
        className='flex grow justify-center text-xs sm:text-sm'
      >
        {translation.headphones}
      </CustomLink>
      <div className='border border-main-gray h-3/5 rounded-xl' />
      <CustomLink
        href={`${routes.productList}/${categories.smartwatch}`}
        locale={locale}
        className='flex grow justify-center text-xs sm:text-sm'
      >
        {translation.smartWatch}
      </CustomLink>
      <div className='border border-main-gray h-3/5 rounded-xl' />
      <CustomLink
        href={`${routes.productList}/${categories.watch}`}
        locale={locale}
        className='flex grow justify-center text-xs sm:text-sm'
      >
        {translation.watch}
      </CustomLink>
    </div>
  );
};

export default CategoriesNavBar;

'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { debounce } from 'lodash';

import { ICategoriesNavBarProps } from './CategoriesNavBar.types';
import { routes } from '@/constants/constants';

const CategoriesNavBar = ({ translation }: ICategoriesNavBarProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  const router = useRouter();

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

  const handleNavigateToCategory = (category: string) => {
    router.push(`${routes.productList}/${category}`);
  };

  return (
    <div
      className={`flex fixed cursor-pointer z-40 items-center w-full bg-category-background border-t-2 border-#b0b0b040 transition-height duration-200 ease-in-out overflow-hidden shadow-sm ${
        isVisible ? 'h-12' : 'h-0'
      }`}
    >
      <span
        onClick={() => handleNavigateToCategory('Headphones')}
        className='flex grow justify-center text-xs sm:text-sm'
      >
        {translation.headphones}
      </span>
      <div className='border border-main-gray h-3/5 rounded-xl' />
      <span
        onClick={() => handleNavigateToCategory('Smartwatch')}
        className='flex grow justify-center text-xs sm:text-sm'
      >
        {translation.smartWatch}
      </span>
      <div className='border border-main-gray h-3/5 rounded-xl' />
      <span
        onClick={() => handleNavigateToCategory('Watch')}
        className='flex grow justify-center text-xs sm:text-sm'
      >
        {translation.watch}
      </span>
    </div>
  );
};

export default CategoriesNavBar;

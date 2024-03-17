import React from 'react';

import SearchBar from '../SearchBar/SearchBar';
import { INavBar } from './INavBar.types';
import CartIcon from '@/assets/CartIcon';
import ChangeLanguage from '../ChangeLanguage/ChangeLanguage';
import CustomLink from '../CustomLink/CustomLink';
import Link from 'next/link';
import { routes } from '@/constants/constants';
import AccountTooltip from '../AccountTooltip/AccountTooltip';
import TessRactLogoResize from '@/assets/TessRactLogoResize';
import CartTooltip from '../CartTooltip/CartTooltip';

const NavBar = ({ translation, locale }: INavBar) => {
  return (
    <div className='flex flex-col h-32 sm:h-28 lg:h-16'>
      <header className='flex flex-col lg:flex-row h-32 sm:h-28 lg:h-16 shadow-sm w-full items-center px-2 sm:px-8 py-3 lg:py-0 justify-between fixed z-50 top-0 bg-white'>
        <div className='flex lg:contents items-center sm:items-start'>
          <div className='w-3/4 flex justify-center order-1 mr-2 sm:mr-0'>
            <CustomLink href='/' locale={locale}>
              <div className='flex items-center w-full'>
                <div className='hidden xs:block w-8 h-8 lg:w-14 lg:h-12'>
                  <TessRactLogoResize />
                </div>
                <span className='text-2xl sm:ml-3 ml-1 font-extrabold text-main-purple'>Tess-</span>
                <span className='text-2xl font-extrabold'>ract</span>
              </div>
            </CustomLink>
          </div>
          <div className='flex w-full justify-center gap-2 sm:gap-4 order-3'>
            <div className='flex flex-col sm:flex-row items-center justify-center sm:gap-3 cursor-pointer sm:w-36 whitespace-nowrap'>
              <ChangeLanguage locale={locale} />
              <span className='flex text-xs sm:text-base'>{locale.toUpperCase()}</span>
            </div>
            <AccountTooltip translation={translation} locale={locale} />
            <CartTooltip translation={translation} locale={locale} />
          </div>
        </div>
        <div className='w-full max-w-sm order-2 flex items-center justify-center'>
          <SearchBar placeholder={translation.search} />
        </div>
      </header>
    </div>
  );
};

export default NavBar;

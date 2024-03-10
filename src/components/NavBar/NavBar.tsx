import React from 'react';
import { cookies } from 'next/headers';

import SearchBar from '../SearchBar/SearchBar';
import { INavBar } from './INavBar.types';
import TessRactLogo from '@/assets/TessRactLogo';
import PersonIcon from '@/assets/PersonIcon';
import CartIcon from '@/assets/CartIcon';
import ChangeLanguage from '../ChangeLanguage/ChangeLanguage';
import CustomLink from '../CustomLink/CustomLink';
import Link from 'next/link';
import { routes } from '@/constants/constants';
import AccountTooltip from '../AccountTooltip/AccountTooltip';

const NavBar = ({ translation, locale }: INavBar) => {
  // const userRole = cookies().get('userRole')?.value;
  // const userToken = cookies().get('userRole')?.value;

  return (
    <div className='h-16'>
      <header className='flex h-16 shadow-xl w-full items-center px-8 fixed z-50 top-0 bg-white'>
        <div className='w-3/4 flex justify-center'>
          <CustomLink href='/' locale={locale}>
            <div className='flex items-center w-full'>
              <TessRactLogo width='60' height='54' />
              <span className='text-2xl ml-3 font-extrabold text-main-purple'>Tess-</span>
              <span className='text-2xl font-extrabold'>ract</span>
            </div>
          </CustomLink>
        </div>
        <div className='w-full max-w-lg'>
          <SearchBar placeholder={translation.search} />
        </div>
        <div className='flex w-full justify-center gap-4'>
          <div className='flex items-center gap-2 w-16 ml-4'>
            <ChangeLanguage locale={locale} />
            <span>{locale.toUpperCase()}</span>
          </div>
          <AccountTooltip translation={translation} />
          <div className='flex items-center gap-5 cursor-pointer min-w-32'>
            <CartIcon /> {translation.cart}
          </div>
        </div>
      </header>
    </div>
  );
};

export default NavBar;

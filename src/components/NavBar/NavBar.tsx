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
      {/* <header className='flex h-16 shadow-xl w-full items-center px-8 fixed z-50 top-0 bg-white'>
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
          <Link href={routes.cart} className='flex items-center gap-5 cursor-pointer min-w-32'>
            <CartIcon /> {translation.cart}
          </Link>
        </div>
      </header> */}

      <header className='flex flex-col lg:flex-row h-24 lg:h-16 shadow-xl w-full items-center px-8 fixed z-10 top-0 bg-white'>
        <div className='flex lg:contents'>
          <div className='w-3/4 flex justify-center order-1'>
            <CustomLink href='/' locale={locale}>
              <div className='flex items-center w-full'>
                <div className='w-8 h-8 lg:w-14 lg:h-12'>
                  {/* <TessRactLogo />
                  <TessRactLogoResize width='60' height='54' /> */}
                </div>
                <span className='text-2xl ml-3 font-extrabold text-main-purple'>Tess-</span>
                <span className='text-2xl font-extrabold'>ract</span>
              </div>
            </CustomLink>
          </div>
          <div className='flex w-full justify-center gap-4 order-3'>
            <div className='flex items-center gap-2 w-16 ml-4'>
              <ChangeLanguage locale={locale} />
              <span>{locale.toUpperCase()}</span>
            </div>
            <div className='flex items-center gap-5 cursor-pointer w-36 whitespace-nowrap'>
              <div className='w-8 h-8'>
                <PersonIcon />
              </div>
              {translation.signIn}
            </div>
            <div className='flex items-center gap-5 cursor-pointer min-w-32'>
              <CartIcon /> {translation.cart}
            </div>
          </div>
        </div>
        <div className='w-full max-w-lg order-2 h-full flex items-center justify-center'>
          <SearchBar placeholder={translation.search} />
        </div>
      </header>
    </div>
  );
};

export default NavBar;

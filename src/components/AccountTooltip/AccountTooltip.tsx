'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import Tooltip from '../Tooltip/Tooltip';
import PersonIcon from '@/assets/PersonIcon';
import { IAccountTooltipProps } from './AccountTooltip.types';
import { routes } from '@/constants/constants';
import OrdersIcon from '@/assets/OrdersIcon';
import SettingsIcon from '@/assets/SettingsIcon';
import ManageOrdersIcon from '@/assets/ManageOrdersIcon';
import { useAuth } from '@/context/AuthContext/AuthContext';
import AddProductIcon from '@/assets/AddProductIcon';
import CustomLink from '../CustomLink/CustomLink';
import DiscountIcon from '@/assets/DiscountIcon';
import { useCart } from '@/context/CartContext/CartContext';

const AccountTooltip = ({ translation, locale }: IAccountTooltipProps) => {
  const [isToolTipVisible, setIsToolTipVisible] = useState(false);

  const { logout, userToken, userRole } = useAuth();

  const { handleClearEverything } = useCart();

  const loginRef = useRef<HTMLAnchorElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  const closeTooltip = () => {
    setIsToolTipVisible(false);
  };

  useEffect(() => {
    const checkIfOutside = (e: MouseEvent) => {
      if (
        loginRef.current &&
        !loginRef.current.contains(e.target as Node) &&
        tooltipRef.current &&
        !tooltipRef.current.contains(e.target as Node)
      ) {
        closeTooltip();
      }
    };

    document.addEventListener('mousemove', checkIfOutside);
    return () => {
      document.removeEventListener('mousemove', checkIfOutside);
    };
  }, []);

  const handleLogout = () => {
    handleClearEverything();
    router.push(routes.main);
    logout();
  };

  return (
    <div className='relative'>
      <CustomLink
        href={!userToken ? routes.login : ''}
        locale={locale}
        className='flex flex-col sm:flex-row items-center sm:gap-3 cursor-pointer sm:w-36 whitespace-nowrap z-50'
        onMouseOver={() => setIsToolTipVisible(true)}
        customRef={loginRef}
      >
        <div className='w-8 h-8 z-50'>
          <PersonIcon />
        </div>
        {!userToken ? (
          <span className='flex text-xs sm:text-base'>{translation.signIn}</span>
        ) : (
          <span className='flex text-xs sm:text-base'>{translation.myAccount}</span>
        )}
      </CustomLink>
      {isToolTipVisible && userToken && (
        <Tooltip tooltipRef={tooltipRef}>
          <div className='flex flex-col bg-white rounded-xl w-60'>
            <CustomLink
              href={routes.myAccount}
              locale={locale}
              className='flex items-center gap-3 p-3 cursor-pointer hover:bg-main-gray-hover'
            >
              <PersonIcon width='16' height='16' isBlack />
              <span className='text-sm'>{translation.tooltipAccount.myAccount}</span>
            </CustomLink>
            <CustomLink
              href={routes.myOrders}
              locale={locale}
              className='flex items-center gap-3 p-3 cursor-pointer hover:bg-main-gray-hover'
            >
              <OrdersIcon />
              <span className='text-sm'>{translation.tooltipAccount.orders}</span>
            </CustomLink>
            <CustomLink
              href={routes.accountSettings}
              locale={locale}
              className='flex items-center gap-3 p-3 cursor-pointer hover:bg-main-gray-hover'
            >
              <SettingsIcon />
              <span className='text-sm'>{translation.tooltipAccount.settingsAccount}</span>
            </CustomLink>
            {userRole === 'Administrator' && (
              <>
                <CustomLink
                  href={routes.manageOrders}
                  locale={locale}
                  className='flex items-center gap-3 p-3 cursor-pointer hover:bg-main-gray-hover'
                >
                  <ManageOrdersIcon />
                  <span className='text-sm'>{translation.tooltipAccount.manageOrders}</span>
                </CustomLink>
                <CustomLink
                  href={routes.addProduct}
                  locale={locale}
                  className='flex items-center gap-3 p-3 cursor-pointer hover:bg-main-gray-hover'
                >
                  <AddProductIcon />
                  <span className='text-sm'>{translation.tooltipAccount.addProduct}</span>
                </CustomLink>
                <CustomLink
                  href={routes.addDiscount}
                  locale={locale}
                  className='flex items-center gap-3 p-3 cursor-pointer hover:bg-main-gray-hover'
                >
                  <DiscountIcon />
                  <span className='text-sm'>{translation.tooltipAccount.addDiscountCode}</span>
                </CustomLink>
              </>
            )}
            <div
              onClick={handleLogout}
              className='flex h-12 p-3 justify-center items-center text-sm cursor-pointer border-t border-main-gray hover:bg-main-gray-hover'
            >
              <span>{translation.tooltipAccount.logout}</span>
            </div>
          </div>
        </Tooltip>
      )}
    </div>
  );
};

export default AccountTooltip;

'use client';
import Cookies from 'js-cookie';

import { useEffect, useRef, useState } from 'react';
import Tooltip from '../Tooltip/Tooltip';
import Link from 'next/link';
import PersonIcon from '@/assets/PersonIcon';
import { IAccountTooltipProps } from './AccountTooltip.types';
import { routes } from '@/constants/constants';
import OrdersIcon from '@/assets/OrdersIcon';
import ReturnAndComplaintsIcon from '@/assets/ReturnAndComplaintsIcon';
import SettingsIcon from '@/assets/SettingsIcon';
import ProductToRateIcon from '@/assets/ProductToRateIcon';
import ManageOrdersIcon from '@/assets/ManageOrdersIcon';
import { useAuth } from '@/context/AuthContext/AuthContext';
import AddProductIcon from '@/assets/AddProductIcon';

const AccountTooltip = ({ translation }: IAccountTooltipProps) => {
  const [isToolTipVisible, setIsToolTipVisible] = useState(true);

  const { logout, userToken, userRole } = useAuth();

  const loginRef = useRef<HTMLAnchorElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

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
    logout();
  };

  return (
    <div className='relative'>
      <Link
        href={!userToken ? routes.login : ''}
        className='flex flex-col sm:flex-row items-center sm:gap-3 cursor-pointer sm:w-36 whitespace-nowrap z-50'
        onMouseOver={() => setIsToolTipVisible(true)}
        ref={loginRef}
      >
        <div className='w-8 h-8 z-50'>
          <PersonIcon />
        </div>
        {!userToken ? (
          <span className='flex text-xs sm:text-base'>{translation.signIn}</span>
        ) : (
          <span className='flex text-xs sm:text-base'>{translation.myAccount}</span>
        )}
      </Link>
      {isToolTipVisible && userToken && (
        <Tooltip tooltipRef={tooltipRef}>
          <div className='flex flex-col bg-white rounded-xl w-60'>
            <div className='flex items-center gap-3 p-3 cursor-pointer hover:bg-main-gray-hover'>
              <div className='text-sm'>
                <PersonIcon width='16' height='16' isBlack />
              </div>
              <span className='text-sm'>{translation.tooltipAccount.myAccount}</span>
            </div>
            <div className='flex items-center gap-3 p-3 cursor-pointer hover:bg-main-gray-hover'>
              <OrdersIcon />
              <span className='text-sm'>{translation.tooltipAccount.orders}</span>
            </div>
            <div className='flex items-center gap-3 p-3 cursor-pointer hover:bg-main-gray-hover'>
              <ReturnAndComplaintsIcon />
              <span className='text-sm'>{translation.tooltipAccount.returnAndComplaints}</span>
            </div>
            <Link
              href={routes.accountSettings}
              className='flex items-center gap-3 p-3 cursor-pointer hover:bg-main-gray-hover'
            >
              <SettingsIcon />
              <span className='text-sm'>{translation.tooltipAccount.settingsAccount}</span>
            </Link>
            <div className='flex items-center gap-3 p-3 cursor-pointer hover:bg-main-gray-hover'>
              <ProductToRateIcon />
              <span className='text-sm'>{translation.tooltipAccount.productToRate}</span>
            </div>
            {userRole === 'Administrator' && (
              <>
                <div className='flex items-center gap-3 p-3 cursor-pointer hover:bg-main-gray-hover'>
                  <ManageOrdersIcon />
                  <span className='text-sm'>{translation.tooltipAccount.manageOrders}</span>
                </div>
                <Link
                  href={routes.addProduct}
                  className='flex items-center gap-3 p-3 cursor-pointer hover:bg-main-gray-hover'
                >
                  <AddProductIcon />
                  <span className='text-sm'>{translation.tooltipAccount.addProduct}</span>
                </Link>
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

'use client';

import BlikIcon from '@/assets/BlikIcon';
import Button from '../Button/Button';
import CartDiscount from '../CartDiscount/CartDiscount';
import { IBuyOrPayNowSummaryProps } from './BuyOrPayNowSummary.types';
import MBankIcon from '@/assets/MBankIcon';
import VisaIcon from '@/assets/VisaIcon';
import PayPalIcon from '@/assets/PayPalIcon';
import StripeIcon from '@/assets/StripeIcon';
import { useAuth } from '@/context/AuthContext/AuthContext';
import { useRouter } from 'next/navigation';
import { routes } from '@/constants/constants';
import { createLanguagePath } from '@/utils/functions';

const BuyOrPayNowSummary = ({
  translation,
  isCartDiscount,
  isAcceptedMethodsOfPayment,
  total,
  locale,
}: IBuyOrPayNowSummaryProps) => {
  const { userToken, userRole } = useAuth();

  const router = useRouter();

  const handleGoToDelivery = () => {
    if (!userToken) {
      router.push(createLanguagePath({ href: routes.buyWithoutRegister, locale }));
    } else {
      router.push(createLanguagePath({ href: routes.deliverySummary, locale }));
    }
  };

  return (
    <div className='flex flex-col w-full max-w-[700px] xl:w-auto gap-6 xl:mt-12'>
      <div className='flex w-full border-2 rounded-xl lg:min-w-[400px] flex-col p-5 gap-4'>
        <p className='text-base'>{translation.orderSummary}</p>
        {/* <div className='flex justify-between items-center'>
          <span className='text-sm'>{translation.discountOnProducts}</span>
          <span className=' text-main-purple text-sm'>-45,00zł</span>
        </div> */}
        <div className='flex justify-between items-center mt-10'>
          <span className='text-sm sm:text-base whitespace-nowrap'>{translation.totalAmount}</span>
          <span className='font-bold text-xl sm:text-3xl whitespace-nowrap'>{total} zł</span>
        </div>
        <Button type='button' onClick={handleGoToDelivery}>
          {translation.goToDelivery}
        </Button>
      </div>
      {isCartDiscount && <CartDiscount />}
      {isAcceptedMethodsOfPayment && (
        <>
          <span>{translation.acceptedMethodsOfPayment}</span>
          <div className='flex items-center gap-3'>
            <BlikIcon />
            <MBankIcon />
            <VisaIcon />
            <PayPalIcon />
            <StripeIcon />
          </div>
        </>
      )}
    </div>
  );
};

export default BuyOrPayNowSummary;

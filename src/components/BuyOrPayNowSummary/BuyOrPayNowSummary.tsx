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
import { useCart } from '@/context/CartContext/CartContext';

const BuyOrPayNowSummary = ({
  translation,
  isCartDiscount,
  isAcceptedMethodsOfPayment,
  total,
  locale,
  isCartSummary,
  type,
  text,
}: IBuyOrPayNowSummaryProps) => {
  const { userToken } = useAuth();

  const router = useRouter();

  const { deleteDiscountFromCart, discount } = useCart();

  const handleGoToDelivery = () => {
    if (isCartSummary) {
      if (!userToken) {
        router.push(createLanguagePath({ href: routes.buyWithoutRegister, locale }));
      } else {
        router.push(createLanguagePath({ href: routes.deliverySummary, locale }));
      }
    }
  };

  const priceWithDiscount = discount && total - total * (discount.value / 100);

  return (
    <div className='flex flex-col w-full max-w-[700px] xl:w-auto gap-6 xl:mt-12'>
      <div className='flex w-full border-2 rounded-xl lg:min-w-[400px] flex-col p-5 gap-4'>
        <p className='text-2xl'>{translation.orderSummary}</p>
        {discount?.value && (
          <div className='flex justify-between'>
            <span className='text-base text-main-green'>
              {translation.appliedDiscount}: {discount.value}%
            </span>
            <span
              onClick={deleteDiscountFromCart}
              className='hover:underline text-main-purple hover:text-main-purple-hover cursor-pointer'
            >
              {translation.deleteDiscount}
            </span>
          </div>
        )}
        <div className='flex justify-between items-center mt-10'>
          <span className='text-sm sm:text-base whitespace-nowrap'>{translation.totalAmount}</span>
          {priceWithDiscount ? (
            <div>
              <span className='font-bold text-xl sm:text-2xl whitespace-nowrap text-red-500 line-through mx-4'>
                {total} zł
              </span>
              <span className='font-bold text-xl sm:text-3xl whitespace-nowrap'>
                {(Math.floor(priceWithDiscount * 100) / 100).toFixed(2)} zł
              </span>
            </div>
          ) : (
            <span className='font-bold text-xl sm:text-3xl whitespace-nowrap'>{total} zł</span>
          )}
        </div>
        <Button type={type} onClick={handleGoToDelivery}>
          {text}
        </Button>
      </div>
      {isCartDiscount && <CartDiscount translation={translation} />}
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

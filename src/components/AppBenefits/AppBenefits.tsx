import React from 'react';

import SpecialOfferIcon from '@/assets/SpecialOfferIcon';
import FasterDeliveryIcon from '@/assets/FasterDeliveryIcon';
import TrackDeliveryIcon from '@/assets/TrackDeliveryIcon';
import RateStarIcon from '@/assets/RateStarIcon';
import { getDictionary } from '../../../lib/dictionary';
import Button from '@/components/Button/Button';
import { IAppBenefits } from './AppBenefits.types';

const AppBenefits = async ({ locale, isLackOfAccount, isWithoutAccount }: IAppBenefits) => {
  const translation = await getDictionary(locale);

  return (
    <div className='flex items-center justify-center flex-grow p-6 lg:w-1/2'>
      <div className='flex flex-col items-start gap-10 '>
        <h3 className='text-title-gray font-bold text-2xl'>{translation.benefitsOfRegistration}</h3>
        <div className='flex items-center gap-12'>
          <div>
            <SpecialOfferIcon />
          </div>
          <span className='m-0.5 text-main-gray text-xl'>{translation.discountAndPromotions}</span>
        </div>
        <div className='flex items-center gap-12'>
          <div>
            <FasterDeliveryIcon />
          </div>
          <span className='m-0.5 text-main-gray text-xl'>{translation.orderFaster}</span>
        </div>
        <div className='flex items-center gap-12'>
          <div>
            <TrackDeliveryIcon />
          </div>
          <span className='m-0.5 text-main-gray text-xl'>{translation.trackYourOrder}</span>
        </div>
        <div className='flex items-center gap-12'>
          <div>
            <RateStarIcon />
          </div>
          <span className='m-0.5 text-main-gray text-xl'>{translation.rate}</span>
        </div>
        {isLackOfAccount && (
          <div className='flex w-full justify-center items-center flex-col gap-8'>
            <h3 className='m-0.5 text-title-gray font-bold text-2xl text-center'>
              {translation.dontHaveAccount}
            </h3>
            <div className='max-w-sm w-full'>
              <Button type='button' variant='bordered'>
                {translation.register}
              </Button>
            </div>
          </div>
        )}
        {isWithoutAccount && (
          <div className='flex w-full justify-center items-start flex-col gap-8'>
            <h3 className='m-0.5 text-title-gray font-bold text-2xl'>
              {translation.dontHaveAccount}
            </h3>
            <p className='text-title-gray text-xl font-medium'>{translation.buyWithoutAccount}</p>
            <div className='max-w-sm w-full'>
              <Button type='button' variant='bordered'>
                {translation.continueWithoutRegistration}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppBenefits;

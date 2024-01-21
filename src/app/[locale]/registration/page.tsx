import React from 'react';

import AppBenefits from '@/components/AppBenefits/AppBenefits';
import { Locale } from '../../../../i18n.config';
import TessRactLogo from '@/assets/TessRactLogo';
import { getDictionary } from '../../../../lib/dictionary';
import RegistrationPanel from '@/components/RegistrationPanel/RegistrationPanel';

const RegistrationPage = async ({ params: { locale } }: { params: { locale: Locale } }) => {
  const translation = await getDictionary(locale);

  return (
    <div className='h-full min-h-screen flex justify-center sm:p-16 flex-col lg:flex-row'>
      <div className='flex items-center justify-center flex-grow p-6 lg:w-1/2'>
        <div className='flex flex-col items-start  w-full max-w-sm '>
          <div className='flex items-center w-full mb-10'>
            <TessRactLogo width='100' height='94' />
            <span className='text-4xl ml-6 font-extrabold text-main-purple'>Tess-</span>
            <span className='text-4xl font-extrabold'>ract</span>
          </div>
          <h2 className='text-left mb-14 text-2xl'>{translation.registration}</h2>
          <RegistrationPanel translation={translation} />
        </div>
      </div>
      <div className='border border-main-gray rounded w-0 lg:w-auto' />
      <AppBenefits locale={locale} />
    </div>
  );
};

export default RegistrationPage;

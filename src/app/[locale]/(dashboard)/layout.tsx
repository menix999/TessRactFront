import React, { ReactNode } from 'react';

import NavBar from '@/components/NavBar/NavBar';
import { Locale } from '../../../../i18n.config';
import { getDictionary } from '../../../../lib/dictionary';
import MainFooter from '@/components/MainFooter/MainFooter';
import CategoriesNavBar from '@/components/CategoriesNavBar/CategoriesNavBar';

interface IDashboardLayout {
  children: ReactNode;
  params: { locale: Locale };
}

const DashboardLayout = async ({ params: { locale }, children }: IDashboardLayout) => {
  const translation = await getDictionary(locale);

  return (
    <div className='min-h-full h-full'>
      <NavBar translation={translation} locale={locale} />
      <CategoriesNavBar translation={translation} locale={locale} />
      <div className='flex w-full justify-center min-h-[calc(100%-48px)]'>
        <div className='flex flex-col w-full lg:max-w-7xl sm:px-8 px-4 pb-4 pt-12'>
          {children}
          <MainFooter translation={translation} locale={locale} />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;

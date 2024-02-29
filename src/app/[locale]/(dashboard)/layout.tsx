import React, { ReactNode } from 'react';

import NavBar from '@/components/NavBar/NavBar';
import { Locale } from '../../../../i18n.config';
import { getDictionary } from '../../../../lib/dictionary';
import MainFooter from '@/components/MainFooter/MainFooter';

interface IDashboardLayout {
  children: ReactNode;
  params: { locale: Locale };
}

const DashboardLayout = async ({ params: { locale }, children }: IDashboardLayout) => {
  const translation = await getDictionary(locale);

  return (
    <div>
      <NavBar translation={translation} locale={locale} />
      <div className='flex w-full justify-center bg-dashboard-background-gray'>
        <div className='w-full max-w-7xl'>
          {children}
          <MainFooter translation={translation} />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;

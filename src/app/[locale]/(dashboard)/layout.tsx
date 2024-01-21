import React, { ReactNode } from 'react';

import NavBar from '@/components/NavBar/NavBar';
import { Locale } from '../../../../i18n.config';
import { getDictionary } from '../../../../lib/dictionary';

interface IDashboardLayout {
  children: ReactNode;
  params: { locale: Locale };
}

const DashboardLayout = async ({ params: { locale }, children }: IDashboardLayout) => {
  const translation = await getDictionary(locale);

  return (
    <div>
      <NavBar translation={translation} locale={locale} />
      {children}
    </div>
  );
};

export default DashboardLayout;

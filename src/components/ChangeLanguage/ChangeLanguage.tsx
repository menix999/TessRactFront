'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import EnglandFlagIcon from '@/assets/EnglandFlagIcon';
import PolandFlagIcon from '@/assets/PolandFlagIcon';

const ChangeLanguage = ({ locale }: { locale: string }) => {
  const pathName = usePathname();

  const redirectedPathName = (locale: string) => {
    const language = locale === 'en' ? '/' : 'en';

    if (!pathName) return '/';
    const segments = pathName.split('/');
    segments[1] = language;
    return segments.join('/');
  };
  return (
    <Link href={redirectedPathName(locale)} className='cursor-pointer'>
      {locale === 'en' ? <EnglandFlagIcon /> : <PolandFlagIcon />}
    </Link>
  );
};

export default ChangeLanguage;

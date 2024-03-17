'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import EnglandFlagIcon from '@/assets/EnglandFlagIcon';
import PolandFlagIcon from '@/assets/PolandFlagIcon';

const ChangeLanguage = ({ locale }: { locale: string }) => {
  const pathName = usePathname();

  const redirectedPathName = (locale: string) => {
    if (typeof window !== 'undefined') {
      const base_url = window.location.origin;

      const language = locale === 'en' ? '/' : 'en';

      if (!pathName) return base_url + language;

      const segments = pathName.split('/');

      if (segments[1] === 'en') {
        segments[1] = '';
      } else if (segments[1] === 'pl') {
        segments[1] = 'en';
      } else {
        segments.splice(1, 0, language);
      }

      return base_url + segments.join('/');
    }
    return '/';
  };

  return (
    <Link href={redirectedPathName(locale)} className='cursor-pointer'>
      {locale === 'en' ? <EnglandFlagIcon /> : <PolandFlagIcon />}
    </Link>
  );
};

export default ChangeLanguage;

import TessRactLogo from '@/assets/TessRactLogo';
import React from 'react';
import { Locale } from '../../../i18n.config';
import { getDictionary } from '../../../lib/dictionary';
import Button from '../Button/Button';
import GoogleButtonIcon from '@/assets/GoogleButtonIcon';
import LoginPanel from '../LoginPanel/LoginPanel';

interface ILoginForm {
  lcoale: Locale;
}
const LoginForm = async ({ locale }: { locale: Locale }) => {
  const translation = await getDictionary(locale);
  return (
    <div className='flex items-center justify-center flex-grow p-6 lg:w-1/2'>
      <div className='flex flex-col items-start  w-full max-w-sm '>
        <div className='flex items-center w-full mb-10'>
          <TessRactLogo />
          <span className='text-4xl ml-6 font-extrabold text-main-purple'>Tess-</span>
          <span className='text-4xl font-extrabold'>ract</span>
        </div>
        <h2 className='text-left mb-14 text-2xl'>{translation.signIn}</h2>
        <LoginPanel translation={translation} />
        <div className='flex w-full items-center gap-2 my-14'>
          <div className='border border-main-gray h-0 w-full' />
          <span className='text-main-gray'>{translation.or}</span>
          <div className='border border-main-gray h-0 w-full' />
        </div>
        <div className='flex w-full'>
          <Button type='button' variant='google'>
            <div className='flex gap-4 items-center '>
              <GoogleButtonIcon />
              {translation.signInWinWithGoogle}
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

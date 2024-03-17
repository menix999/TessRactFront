'use client';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import axios from 'axios';

import { IRecoverPasswordPageProps, IRecoverPasswordForm } from './RecoveryPasswordForm.types';
import Input from '../Input/Input';
import { emailRegex } from '@/constants/regex';
import Button from '../Button/Button';
import Link from 'next/link';
import { routes } from '@/constants/constants';
import { useState } from 'react';
import CustomLink from '../CustomLink/CustomLink';

const RecoveryPasswordForm = ({ translation, locale }: IRecoverPasswordPageProps) => {
  const [isLinkSent, setIsLinkSent] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IRecoverPasswordForm>();

  const onSubmit: SubmitHandler<IRecoverPasswordForm> = async ({ email }) => {
    try {
      const response = await axios.put('http://localhost:5250/api/Account/password', {
        email,
      });

      if (response) {
        setIsLinkSent(true);
      }

      console.log('response', response);
    } catch (error) {
      setIsLinkSent(false);
      console.log('LoginPanel error', error);
    }
  };
  return (
    <>
      {!isLinkSent ? (
        <div className='flex flex-col gap-6'>
          <span className=' text-secondary-gray'>{translation.enterAdresEmailToVerificate}</span>
          <form className='flex flex-col gap-8 w-full' onSubmit={handleSubmit(onSubmit)}>
            <Controller
              render={({ field: { onChange, value } }) => (
                <div className='flex flex-col relative'>
                  <Input
                    placeholder={translation.email}
                    value={value}
                    onChange={onChange}
                    required={!!errors.email?.message}
                  />
                  <span className='text-main-error-red pt-2 absolute whitespace-nowrap top-9'>
                    {errors.email?.message}
                  </span>
                </div>
              )}
              rules={{
                required: {
                  value: true,
                  message: translation.errorMessage.thisFieldIsRequired,
                },
                pattern: {
                  value: emailRegex,
                  message: translation.errorMessage.youEnteredTheWrongFormatOfEmailAddress,
                },
              }}
              control={control}
              defaultValue=''
              name='email'
            />
            <div className='flex gap-4'>
              <CustomLink href={routes.login} locale={locale} className='w-full'>
                <Button type='submit' variant='bordered'>
                  {translation.return}
                </Button>
              </CustomLink>
              <div className='w-full'>
                <Button type='submit'>{translation.recoverPassword}</Button>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <div>
          <h2 className='text-2xl font-bold mb-8'>
            {translation.emailVerification.checkYourEmail}
          </h2>
          <div className='flex flex-col gap-3'>
            <p className='font-bold mb-2'>
              {translation.emailVerification.haveNotReceivedYourEmail}
            </p>
            <span className='text-sm'>1.{translation.emailVerification.checkSpamFolder}</span>
            <span className='text-sm'>
              2.{translation.emailVerification.checkYourEmailIsCorrect}
            </span>
            <span className='text-sm'>
              3.{translation.emailVerification.waitAndCheckInFewMinutes}
            </span>
          </div>
          <div className='flex flex-col mt-6 gap-3'>
            <p className='font-bold'>{translation.emailVerification.areYouSendIncorrectEmail}</p>
            <span
              className='text-main-purple cursor-pointer text-sm'
              onClick={() => setIsLinkSent(false)}
            >
              {translation.emailVerification.completeTheFormAgain}
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default RecoveryPasswordForm;

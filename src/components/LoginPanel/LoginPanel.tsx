'use client';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';

import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import Input from '../Input/Input';
import Button from '../Button/Button';
import { ILoginForm, ILoginPanel } from './LoginPanel.types';
import { useState } from 'react';
import OpenEyeIcon from '@/assets/OpenEyeIcon';
import ClosedEyeIcon from '@/assets/ClosedEyeIcon';
import { emailRegex } from '@/constants/regex';
import { routes } from '@/constants/constants';
import { useAuth } from '@/context/AuthContext/AuthContext';
import CustomLink from '../CustomLink/CustomLink';
import { toast } from 'react-toastify';
import ToastifyText from '../ToastifyText/ToastifyText';

const LoginPanel = ({ translation, locale }: ILoginPanel) => {
  const [isEyeOpen, setIsEyeOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>();

  const router = useRouter();

  const { login } = useAuth();

  const onSubmit: SubmitHandler<ILoginForm> = async ({ email, password }) => {
    try {
      setIsLoading(true);
      const { data } = await axios.post('http://localhost:5250/api/Account/login', {
        email,
        password,
      });
      const userToken = data;

      if (userToken) {
        setIsLoading(false);
        const decodedToken = jwtDecode(data);

        const userId = (decodedToken as any)[
          'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
        ];

        const role = (decodedToken as any)[
          'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
        ];

        login(userToken, role, userId);

        router.push(routes.main);
      }
    } catch (error: any) {
      setIsLoading(false);

      if(error.response.data === "ValidCredentials") {
        toast.error(
          <ToastifyText
          title={translation.toastifyMessages.title.error}
          description={translation.toastifyMessages.descriptionError.incorrectEmailOrPassword}
          type='error'
          />
        );
      } else if(error.response.data === "VerifyAccount") {
        toast.error(
          <ToastifyText
          title={translation.toastifyMessages.title.error}
          description={translation.toastifyMessages.descriptionError.verifyYourEmail}
          type='error'
          />
        );
      }
       else {
        toast.error(
          <ToastifyText
          title={translation.toastifyMessages.title.error}
          description={translation.toastifyMessages.descriptionError.problemWithServer}
          type='error'
          />
        );
      }
      console.log('LoginPanel error', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col w-full gap-14' noValidate>
      <Controller
        render={({ field: { onChange, value } }) => (
          <div className='flex flex-col relative'>
            <Input
              placeholder={translation.enterYourEmail}
              value={value}
              title={translation.email}
              onChange={onChange}
              isError={!!errors.email?.message}
            />
            <span className='text-main-error-red pt-2 text-xs absolute whitespace-nowrap -bottom-5'>
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
      <Controller
        render={({ field: { onChange, value } }) => (
          <div className='relative flex flex-col'>
            <div
              onClick={() => setIsEyeOpen((prevValue) => !prevValue)}
              className='flex items-center absolute right-8 bottom-0 top-7 cursor-pointer'
            >
              {isEyeOpen ? <OpenEyeIcon /> : <ClosedEyeIcon />}
            </div>
            <CustomLink href={routes.recoverPassword} locale={locale}>
              <span className='absolute right-0 text-right text-main-purple text-sm hover:text-main-purple-hover cursor-pointer'>
                {translation.forgotPassword}
              </span>
            </CustomLink>
            <Input
              placeholder={translation.enterYourPassword}
              type={isEyeOpen ? 'text' : 'password'}
              value={value}
              onChange={onChange}
              title={translation.password}
              isError={!!errors.password}
            />
            <span className='text-main-error-red pt-2 text-xs absolute whitespace-nowrap -bottom-5'>
              {errors.password?.message}
            </span>
          </div>
        )}
        rules={{
          required: {
            value: true,
            message: translation.errorMessage.thisFieldIsRequired,
          },
        }}
        control={control}
        defaultValue=''
        name='password'
      />
      {/* <Controller
        render={({ field: { onChange, value } }) => (
          <label htmlFor='rememberMe' className='flex cursor-pointer relative mt-[-1rem]'>
            <Checkbox onChange={onChange} checked={value} id='rememberMe' />
            {translation.rememberMe}
            <span className='text-main-error-red pt-2 absolute whitespace-nowrap top-4'>
              {errors.isRememberMe?.message}
            </span>
          </label>
        )}
        control={control}
        defaultValue={false}
        name='isRememberMe'
      /> */}
      <Button type='submit' isLoading={isLoading}>{translation.signIn}</Button>
    </form>
  );
};

export default LoginPanel;

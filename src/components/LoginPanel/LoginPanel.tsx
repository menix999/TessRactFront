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
import Checkbox from '../Checkbox/Checkbox';
import { emailRegex } from '@/constants/regex';
import Link from 'next/link';
import { routes } from '@/constants/constants';
import { useAuth } from '@/context/AuthContext/AuthContext';

const LoginPanel = ({ translation }: ILoginPanel) => {
  const [isEyeOpen, setIsEyeOpen] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>();

  const router = useRouter();

  const { login } = useAuth();

  const onSubmit: SubmitHandler<ILoginForm> = async ({ email, password }) => {
    try {
      const { data } = await axios.post('http://localhost:5250/api/Account/login', {
        email,
        password,
      });
      const userToken = data;

      if (userToken) {
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
    } catch (error) {
      console.log('LoginPanel error', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col w-full gap-14' noValidate>
      <Controller
        render={({ field: { onChange, value } }) => (
          <div className='flex flex-col relative'>
            <Input
              placeholder={translation.login}
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
      <Controller
        render={({ field: { onChange, value } }) => (
          <div className='relative flex flex-col'>
            <div
              onClick={() => setIsEyeOpen((prevValue) => !prevValue)}
              className='flex items-center absolute right-8 bottom-0 top-0 cursor-pointer'
            >
              {isEyeOpen ? <OpenEyeIcon /> : <ClosedEyeIcon />}
            </div>
            <Link href={routes.recoverPassword}>
              <span className='absolute w-full -top-6 text-right text-main-purple text-sm hover:text-main-purple-hover cursor-pointer'>
                {translation.forgotPassword}
              </span>
            </Link>
            <Input
              placeholder={translation.password}
              type={isEyeOpen ? 'text' : 'password'}
              value={value}
              onChange={onChange}
              required={!!errors.password}
            />
            <span className='text-main-error-red pt-2 absolute whitespace-nowrap top-9'>
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
      <Controller
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
      />
      <Button type='submit'>{translation.signIn}</Button>
    </form>
  );
};

export default LoginPanel;

'use client';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import Input from '../Input/Input';
import Button from '../Button/Button';
import { IResetPasswordFormProps, IResetPasswordForm } from './ResetPasswordForm.types';
import { useState } from 'react';
import OpenEyeIcon from '@/assets/OpenEyeIcon';
import ClosedEyeIcon from '@/assets/ClosedEyeIcon';
import { routes } from '@/constants/constants';
import { createLanguagePath } from '@/utils/functions';

const ResetPasswordForm = ({ translation, locale }: IResetPasswordFormProps) => {
  const [isEyeOpen, setIsEyeOpen] = useState(false);
  const [isConfirmPasswordEye, setIsConfirmPasswordEyeOpen] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IResetPasswordForm>();

  const router = useRouter();

  const onSubmit: SubmitHandler<IResetPasswordForm> = async ({ password, confirmPassword }) => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const path = window.location.pathname;
      const match = path.match(/reset-password\/([^/]+)/);
      const token = urlParams.get('token');
      const userId = match && match[1];

      const response = await axios.put(
        `http://localhost:5250/api/Account/${userId}/reset-password`,
        {
          token,
          password,
          confirmPassword,
        }
      );

      if (response) {
        router.push(createLanguagePath({ href: routes.login, locale }));
      }
    } catch (error) {
      console.log('LoginPanel error', error);
    }
  };
  return (
    <form className='flex flex-col gap-8 w-full' onSubmit={handleSubmit(onSubmit)}>
      <Controller
        render={({ field: { onChange, value } }) => (
          <div className='relative flex flex-col'>
            <div
              onClick={() => setIsEyeOpen((prevValue) => !prevValue)}
              className='flex items-center absolute right-8 bottom-0 top-0 cursor-pointer'
            >
              {isEyeOpen ? <OpenEyeIcon /> : <ClosedEyeIcon />}
            </div>
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
          <div className='relative flex flex-col'>
            <div
              onClick={() => setIsConfirmPasswordEyeOpen((prevValue) => !prevValue)}
              className='flex items-center absolute right-8 bottom-0 top-0 cursor-pointer'
            >
              {isConfirmPasswordEye ? <OpenEyeIcon /> : <ClosedEyeIcon />}
            </div>
            <Input
              placeholder={translation.confirmPassword}
              type={isConfirmPasswordEye ? 'text' : 'password'}
              value={value}
              onChange={onChange}
              required={!!errors.confirmPassword}
            />
            <span className='text-main-error-red pt-2 absolute whitespace-nowrap top-9'>
              {errors.confirmPassword?.message}
            </span>
          </div>
        )}
        rules={{
          required: {
            value: true,
            message: translation.errorMessage.thisFieldIsRequired,
          },
          validate: (value) => {
            if (watch('password') != value) {
              return translation.errorMessage.passwordsDoNotMatch;
            }
          },
        }}
        control={control}
        defaultValue=''
        name='confirmPassword'
      />
      <Button type='submit'>{translation.recoverPassword}</Button>
    </form>
  );
};

export default ResetPasswordForm;

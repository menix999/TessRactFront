'use client';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import Input from '../Input/Input';
import Button from '../Button/Button';
import { ILoginForm, ILoginPanel } from './LoginPanel.types';
import { useState } from 'react';
import OpenEyeIcon from '@/assets/OpenEyeIcon';
import ClosedEyeIcon from '@/assets/ClosedEyeIcon';

const LoginPanel = ({ translation }: ILoginPanel) => {
  const [isEyeOpen, setIsEyeOpen] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>();

  const onSubmit: SubmitHandler<ILoginForm> = async ({ login, password }) => {
    try {
      console.log('login', login);
      console.log('password', password);
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
              required={!!errors.login}
            />
            <span className='text-main-error-red pt-2 absolute whitespace-nowrap top-9'>
              {errors.login?.message}
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
        name='login'
      />
      <Controller
        render={({ field: { onChange, value } }) => (
          <div className='relative flex flex-col'>
            <div
              onClick={() => setIsEyeOpen((prevValue) => !prevValue)}
              className='flex items-center absolute right-8 bottom-0 top-0'
            >
              {isEyeOpen ? <OpenEyeIcon /> : <ClosedEyeIcon />}
            </div>
            <span className='absolute w-full -top-6 text-right text-main-purple text-sm hover:text-main-purple-hover cursor-pointer'>
              {translation.forgotPassword}
            </span>
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
      <Button type='submit'>{translation.signIn}</Button>
    </form>
  );
};

export default LoginPanel;

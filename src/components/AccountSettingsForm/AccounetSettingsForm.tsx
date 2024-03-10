'use client';
import axios from 'axios';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

import Input from '../Input/Input';
import Button from '../Button/Button';
import { routes } from '@/constants/constants';
import { IAccountSettingsFormProps, IAccountSettingsForm } from './AccountSettingsForm.types';

const AccounetSettingsForm = ({ translation }: IAccountSettingsFormProps) => {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IAccountSettingsForm>();

  const onSubmit: SubmitHandler<IAccountSettingsForm> = async ({
    dateOfBirth,
    phoneNumber,
    city,
    postalCode,
    street,
    apartmentNumber,
  }) => {
    // try {
    //   const response = await axios.post('http://localhost:5250/api/Account/register', {
    //     firstName: name,
    //     surname,
    //     email,
    //     password,
    //     confirmPassword,
    //   });
    //   if (response) {
    //     // Write nawigation to login page in next js
    //     router.push(routes.login);
    //   }
    //   console.log('response', response);
    // } catch (error) {
    //   console.log('LoginPanel error', error);
    // }
  };

  const userIdFromCookie = Cookies.get();
  console.log('userId', userIdFromCookie);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col w-full gap-10' noValidate>
      <Controller
        render={({ field: { onChange, value } }) => (
          <div className='flex flex-col relative'>
            <Input
              placeholder={translation.dateOfBirth}
              value={value}
              onChange={onChange}
              required={!!errors.dateOfBirth}
            />
            <span className='text-main-error-red pt-2 absolute whitespace-nowrap top-9'>
              {errors.dateOfBirth?.message}
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
        name='dateOfBirth'
      />
      <Controller
        render={({ field: { onChange, value } }) => (
          <div className='flex flex-col relative'>
            <Input
              placeholder={translation.phoneNumber}
              value={value}
              onChange={onChange}
              required={!!errors.phoneNumber}
            />
            <span className='text-main-error-red pt-2 absolute whitespace-nowrap top-9'>
              {errors.phoneNumber?.message}
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
        name='phoneNumber'
      />
      <Controller
        render={({ field: { onChange, value } }) => (
          <div className='flex flex-col relative'>
            <Input
              placeholder={translation.city}
              value={value}
              onChange={onChange}
              required={!!errors.city}
            />
            <span className='text-main-error-red pt-2 absolute whitespace-nowrap top-9'>
              {errors.city?.message}
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
        name='city'
      />
      <Controller
        render={({ field: { onChange, value } }) => (
          <div className='flex flex-col relative'>
            <Input
              placeholder={translation.postalCode}
              value={value}
              onChange={onChange}
              required={!!errors.postalCode}
            />
            <span className='text-main-error-red pt-2 absolute whitespace-nowrap top-9'>
              {errors.postalCode?.message}
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
        name='postalCode'
      />
      <Controller
        render={({ field: { onChange, value } }) => (
          <div className='flex flex-col relative'>
            <Input
              placeholder={translation.street}
              value={value}
              onChange={onChange}
              required={!!errors.street}
            />
            <span className='text-main-error-red pt-2 absolute whitespace-nowrap top-9'>
              {errors.street?.message}
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
        name='street'
      />
      <Controller
        render={({ field: { onChange, value } }) => (
          <div className='flex flex-col relative'>
            <Input
              placeholder={translation.apartmentNumber}
              value={value}
              onChange={onChange}
              required={!!errors.apartmentNumber}
            />
            <span className='text-main-error-red pt-2 absolute whitespace-nowrap top-9'>
              {errors.apartmentNumber?.message}
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
        name='apartmentNumber'
      />

      <Button type='submit'>{translation.save}</Button>
    </form>
  );
};

export default AccounetSettingsForm;

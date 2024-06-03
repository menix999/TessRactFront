'use client';
import axios from 'axios';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
// import { loadStripe } from '@stripe/stripe-js';

import Input from '../Input/Input';
import Button from '../Button/Button';
import { routes } from '@/constants/constants';
import { IDeliverySummaryForm, IDeliverySummaryFormProps } from './DeliverySummaryForm.types';
import { emailRegex } from '@/constants/regex';
import BuyOrPayNowSummary from '../BuyOrPayNowSummary/BuyOrPayNowSummary';
import { useAuth } from '@/context/AuthContext/AuthContext';

const DeliverySummaryForm = ({ translation, locale }: IDeliverySummaryFormProps) => {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IDeliverySummaryForm>();

  const { userId, userToken } = useAuth();

  const getAccountSettingsData = async () => {
    try {
      if (!userId || !userToken) return;

      const response = await fetch(`${process.env.NEXT_PUBLIC_DB_BASEURL}/api/Account/${userId}`, {
        method: 'GET',
        cache: 'no-cache',
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      if (!response) return;

      const data = await response.json();

      if (!data) return;
      setValue('name', data.firstName);
      setValue('surname', data.surname);
      setValue('email', data.email);
      setValue('phoneNumber', data.phoneNumber);
      setValue('city', data.city);
      setValue('postalCode', data.postalCode);
      setValue('street', data.street);
      setValue('apartmentNumber', data.apartmentNumber);
    } catch (error) {
      console.log('Delivery summary getAccountSettingsData - error', error);
    }
  };

  useEffect(() => {
    getAccountSettingsData();
  });

  const onSubmit: SubmitHandler<IDeliverySummaryForm> = async ({
    name,
    surname,
    email,
    city,
    street,
    postalCode,
    apartmentNumber,
    phoneNumber,
  }) => {
    console.log('onSubmit', {
      name,
      surname,
      email,
      city,
      street,
      postalCode,
      apartmentNumber,
      phoneNumber,
    });
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

  // const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

  // const handleTest = async () => {
  //   const stripe = await stripePromise;

  //   if (!stripe) return;

  //   const { error } = await stripe.redirectToCheckout({
  //     mode: 'payment',
  //     lineItems: [{ price: '1', quantity: 1 }],
  //     successUrl: 'http://localhost:3000/success',
  //     cancelUrl: 'http://localhost:3000/canceled',
  //   });

  //   if (error) {
  //     console.error('Error:', error);
  //   }
  // };

  return (
    <div className='flex flex-col w-full gap-10'>
      {/* <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col w-full gap-10' noValidate> */}
      <Controller
        render={({ field: { onChange, value } }) => (
          <div className='flex flex-col relative'>
            <Input
              placeholder={translation.name}
              value={value}
              onChange={onChange}
              required={!!errors.name}
            />
            <span className='text-main-error-red pt-2 absolute whitespace-nowrap top-9'>
              {errors.name?.message}
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
        name='name'
      />
      <Controller
        render={({ field: { onChange, value } }) => (
          <div className='flex flex-col relative'>
            <Input
              placeholder={translation.surname}
              value={value}
              onChange={onChange}
              required={!!errors.surname}
            />
            <span className='text-main-error-red pt-2 absolute whitespace-nowrap top-9'>
              {errors.surname?.message}
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
        name='surname'
      />
      <Controller
        render={({ field: { onChange, value } }) => (
          <div className='flex flex-col relative'>
            <Input
              placeholder={translation.email}
              value={value}
              onChange={onChange}
              required={!!errors.email}
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
      {/* <button onClick={handleTest}>Checkout</button> */}
      <BuyOrPayNowSummary
        translation={translation}
        isCartDiscount
        isAcceptedMethodsOfPayment
        locale={locale}
      />
    </div>
    // </form>
  );
};

export default DeliverySummaryForm;

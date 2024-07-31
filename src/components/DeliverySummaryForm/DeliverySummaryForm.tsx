'use client';

import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import Input from '../Input/Input';
import { IDeliverySummaryForm, IDeliverySummaryFormProps } from './DeliverySummaryForm.types';
import { emailRegex } from '@/constants/regex';
import BuyOrPayNowSummary from '../BuyOrPayNowSummary/BuyOrPayNowSummary';
import { useAuth } from '@/context/AuthContext/AuthContext';
import { useCart } from '@/context/CartContext/CartContext';
import { toast } from 'react-toastify';
import ToastifyText from '../ToastifyText/ToastifyText';
import { createLanguagePath } from '@/utils/functions';
import { routes } from '@/constants/constants';
import apiClient from '@/utils/api';

const DeliverySummaryForm = ({ translation, locale }: IDeliverySummaryFormProps) => {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IDeliverySummaryForm>();

  const { userId, userToken } = useAuth();

  const { cart, cartListTotalAmount, discount } = useCart();

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

      if (data.firstName) {
        setValue('name', data.firstName);
      }

      if (data.surname) {
        setValue('surname', data.surname);
      }

      if (data.email) {
        setValue('email', data.email);
      }

      if (data.phoneNumber) {
        setValue('phoneNumber', data.phoneNumber);
      }

      if (data.city) {
        setValue('city', data.city);
      }

      if (data.postalCode) {
        setValue('postalCode', data.postalCode);
      }

      if (data.street) {
        setValue('street', data.street);
      }

      if (data.apartmentNumber) {
        setValue('apartmentNumber', data.apartmentNumber);
      }
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
    try {
      const preparedOrderPosition = cart.map((item) => ({
        productId: item.id,
        // productName: item.name,
        quantity: item.quantity,
        price: item.price,
      }));

      const response = await apiClient.post(
        '/api/Order',
        {
          firstName: name,
          surname,
          email,
          postalCode,
          street,
          city,
          apartmentNumber,
          orderPosition: preparedOrderPosition,
          discountSymbol: discount?.symbol || '',
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      if (response) {
        toast.success(
          <ToastifyText
            title={translation.toastifyMessages.title.success}
            description={translation.toastifyMessages.descriptionSuccess.yourOrderHasBeenPlaced}
            type='success'
          />
        );
        router.push(createLanguagePath({ href: routes.orderSummary, locale }));
      }
    } catch (error) {
      console.log('LoginPanel error', error);
    }
  };

  return (
    <div className='flex flex-col w-full gap-10'>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col w-full gap-10' noValidate>
        <Controller
          render={({ field: { onChange, value } }) => (
            <div className='flex flex-col relative'>
              <Input
                placeholder={translation.enterYourName}
                title={translation.name}
                value={value}
                onChange={onChange}
                isError={!!errors.name}
              />
              <span className='text-main-error-red pt-2 text-xs absolute whitespace-nowrap -bottom-5'>
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
                placeholder={translation.enterYourSurname}
                title={translation.surname}
                value={value}
                onChange={onChange}
                isError={!!errors.surname}
              />
              <span className='text-main-error-red pt-2 text-xs absolute whitespace-nowrap -bottom-5'>
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
                placeholder={translation.enterYourEmail}
                title={translation.email}
                value={value}
                onChange={onChange}
                isError={!!errors.email}
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
            <div className='flex flex-col relative'>
              <Input
                placeholder={translation.enterYourCity}
                title={translation.city}
                value={value}
                onChange={onChange}
                isError={!!errors.city}
              />
              <span className='text-main-error-red pt-2 text-xs absolute whitespace-nowrap -bottom-5'>
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
                placeholder={translation.enterYourStreet}
                title={translation.street}
                value={value}
                onChange={onChange}
                isError={!!errors.street}
              />
              <span className='text-main-error-red pt-2 text-xs absolute whitespace-nowrap -bottom-5'>
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
                placeholder={translation.enterYourPostalCode}
                title={translation.postalCode}
                value={value}
                onChange={onChange}
                isError={!!errors.postalCode}
              />
              <span className='text-main-error-red pt-2 text-xs absolute whitespace-nowrap -bottom-5'>
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
                title={translation.apartmentNumber}
                placeholder={translation.apartmentNumber}
                value={value}
                onChange={onChange}
                isError={!!errors.apartmentNumber}
              />
              <span className='text-main-error-red pt-2 text-xs absolute whitespace-nowrap -bottom-5'>
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
                placeholder={translation.enterYourPhoneNumber}
                title={translation.phoneNumber}
                value={value}
                onChange={onChange}
                isError={!!errors.phoneNumber}
              />
              <span className='text-main-error-red pt-2 text-xs absolute whitespace-nowrap -bottom-5'>
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
        <BuyOrPayNowSummary
          translation={translation}
          isAcceptedMethodsOfPayment
          locale={locale}
          total={cartListTotalAmount}
          text={translation.submitYourOrder}
          type='submit'
        />
      </form>
    </div>
  );
};

export default DeliverySummaryForm;

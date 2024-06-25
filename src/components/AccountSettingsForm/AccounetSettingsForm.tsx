'use client';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import Input from '../Input/Input';
import Button from '../Button/Button';
import { IAccountSettingsFormProps, IAccountSettingsForm } from './AccountSettingsForm.types';
import { phoneNumberRegex, postalCodeRegex } from '@/constants/regex';
import { useAuth } from '@/context/AuthContext/AuthContext';
import { useEffect } from 'react';
import ToastifyText from '../ToastifyText/ToastifyText';
import { toast } from 'react-toastify';

const AccounetSettingsForm = ({ translation }: IAccountSettingsFormProps) => {
  const router = useRouter();

  const { userId, userToken } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IAccountSettingsForm>();

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

      console.log('response', response);
      if (!response) return;

      const data = await response.json();
      console.log('data', data);

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
      console.log('getAccountSettingsData - error', error);
    }
  };

  useEffect(() => {
    getAccountSettingsData();
  }, [userId]);

  const onSubmit: SubmitHandler<IAccountSettingsForm> = async ({
    phoneNumber,
    city,
    postalCode,
    street,
    apartmentNumber,
  }) => {
    try {
      const params = {
        phoneNumber,
        city,
        postalCode,
        street,
        apartmentNumber,
      };

      console.log('USTAWIENIA', {
        phoneNumber,
        city,
        postalCode,
        street,
        apartmentNumber,
      });

      const response = await fetch(`${process.env.NEXT_PUBLIC_DB_BASEURL}/api/Account/${userId}`, {
        cache: 'no-cache',
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify(params),
      });

      if (response) {
        toast.success(
          <ToastifyText
            title={translation.toastifyMessages.title.success}
            description={
              translation.toastifyMessages.descriptionSuccess.settingsOfAccountHasBeenChanged
            }
            type='success'
          />
        );
      }
    } catch (error) {
      console.log('AccountSettingsForm - error ', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col w-full gap-10' noValidate>
      <Controller
        render={({ field: { onChange, value } }) => (
          <div className='flex flex-col relative'>
            <Input
              placeholder={translation.enterYourPhoneNumber}
              value={value}
              title={translation.phoneNumber}
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
          validate: {
            isPhoneNumberLengthValid: (value) =>
              value.length <= 9 || translation.errorMessage.isPhoneNumberLengthValid,
            isValidPhoneNumber: (value) =>
              phoneNumberRegex.test(value) || translation.errorMessage.isValidPhoneNumber,
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
              placeholder={translation.enterYourCity}
              value={value}
              onChange={onChange}
              title={translation.city}
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
              placeholder={translation.enterYourPostalCode}
              value={value}
              onChange={onChange}
              isError={!!errors.postalCode}
              title={translation.postalCode}
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
          pattern: {
            value: postalCodeRegex,
            message: translation.errorMessage.invalidFormatOfPostalCode,
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
              placeholder={translation.enterYourStreet}
              value={value}
              onChange={onChange}
              title={translation.street}
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
              placeholder={translation.enterYourApartmentNumber}
              value={value}
              onChange={onChange}
              title={translation.apartmentNumber}
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

      <Button type='submit'>{translation.save}</Button>
    </form>
  );
};

export default AccounetSettingsForm;

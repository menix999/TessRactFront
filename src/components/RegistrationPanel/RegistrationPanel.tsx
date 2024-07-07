'use client';
import axios, { AxiosError } from 'axios';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import Input from '../Input/Input';
import Button from '../Button/Button';
import OpenEyeIcon from '@/assets/OpenEyeIcon';
import ClosedEyeIcon from '@/assets/ClosedEyeIcon';
import { IRegistration, IRegistrationForm } from './RegistrationPanel.types';
import Checkbox from '../Checkbox/Checkbox';
import { emailRegex, onlyLettersRegex } from '@/constants/regex';
import { routes } from '@/constants/constants';
import { createLanguagePath } from '@/utils/functions';
import ToastifyText from '../ToastifyText/ToastifyText';

const RegistrationPanel = ({ translation, locale }: IRegistration) => {
  const [isEyeOpen, setIsEyeOpen] = useState(false);
  const [isConfirmPasswordEye, setIsConfirmPasswordEyeOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IRegistrationForm>();

  const onSubmit: SubmitHandler<IRegistrationForm> = async ({
    name,
    surname,
    email,
    password,
    confirmPassword,
  }) => {
    try {
      setIsLoading(true);
      const response = await axios.post('http://localhost:5250/api/Account/register', {
        firstName: name,
        surname,
        email,
        password,
        confirmPassword,
      });

      if (response) {
        setIsLoading(false);
        toast.success(
          <ToastifyText
            title={translation.toastifyMessages.title.success}
            description={translation.toastifyMessages.descriptionSuccess.accountCreatedSuccessfully}
            type='success'
          />
        );
        router.push(createLanguagePath({ href: routes.login, locale }));
      }
    } catch (error) {
      setIsLoading(false);
      console.log('error', error);
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;

        if (axiosError.response?.status === 400) {
          toast.error(
            <ToastifyText
              title={translation.toastifyMessages.title.error}
              description={translation.toastifyMessages.descriptionError.incorrectEmailOrPassword}
              type='error'
            />
          );
        } else {
          toast.error(
            <ToastifyText
              title={translation.toastifyMessages.title.error}
              description={translation.toastifyMessages.descriptionError.noResponseFromServer}
              type='error'
            />
          );
        }
      } else {
        toast.error(
          <ToastifyText
            title={translation.toastifyMessages.title.error}
            description={translation.toastifyMessages.descriptionError.unexpectedError}
            type='error'
          />
        );
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col w-full gap-6' noValidate>
      <Controller
        render={({ field: { onChange, value } }) => (
          <div className='flex flex-col relative'>
            <Input
              placeholder={translation.enterYourName}
              value={value}
              onChange={onChange}
              isError={!!errors.name}
              title={translation.name}
              maxLength={100}
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
          pattern: {
            value: onlyLettersRegex,
            message: translation.errorMessage.onlyLettersAllowed,
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
              value={value}
              onChange={onChange}
              isError={!!errors.surname}
              title={translation.surname}
              maxLength={100}
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
          pattern: {
            value: onlyLettersRegex,
            message: translation.errorMessage.onlyLettersAllowed,
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
              value={value}
              onChange={onChange}
              isError={!!errors.email}
              title={translation.email}
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
            <Input
              placeholder={translation.enterYourPassword}
              type={isEyeOpen ? 'text' : 'password'}
              value={value}
              onChange={onChange}
              isError={!!errors.password}
              title={translation.password}
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
      <Controller
        render={({ field: { onChange, value } }) => (
          <div className='relative flex flex-col'>
            <div
              onClick={() => setIsConfirmPasswordEyeOpen((prevValue) => !prevValue)}
              className='flex items-center absolute right-8 bottom-0 top-7 cursor-pointer'
            >
              {isConfirmPasswordEye ? <OpenEyeIcon /> : <ClosedEyeIcon />}
            </div>
            <Input
              placeholder={translation.enterYourConfirmPassword}
              type={isConfirmPasswordEye ? 'text' : 'password'}
              value={value}
              onChange={onChange}
              isError={!!errors.confirmPassword}
              title={translation.confirmPassword}
            />
            <span className='text-main-error-red pt-2 text-xs absolute whitespace-nowrap -bottom-5'>
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
      <Controller
        render={({ field: { onChange, value } }) => (
          <label htmlFor='acceptRules' className='flex cursor-pointer relative my-1'>
            <Checkbox onChange={onChange} isChecked={value} id='acceptRules' isError={!!errors.isAcceptedRules?.message}/>
            {translation.acceptTermsAndConditions}
            <span className='text-main-error-red pt-2 text-xs absolute whitespace-nowrap top-4'>
              {errors.isAcceptedRules?.message}
            </span>
          </label>
        )}
        rules={{
          required: {
            value: true,
            message: translation.errorMessage.thisFieldIsRequired,
          },
        }}
        control={control}
        defaultValue={false}
        name='isAcceptedRules'
      />
      <Button type='submit' isLoading={isLoading}>{translation.createAccount}</Button>
    </form>
  );
};

export default RegistrationPanel;

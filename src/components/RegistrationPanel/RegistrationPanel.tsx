'use client';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import Input from '../Input/Input';
import Button from '../Button/Button';
import { ChangeEvent, useState } from 'react';
import OpenEyeIcon from '@/assets/OpenEyeIcon';
import ClosedEyeIcon from '@/assets/ClosedEyeIcon';
import { IRegistration, IRegistrationForm } from './RegistrationPanel.types';
import Checkbox from '../Checkbox/Checkbox';

const RegistrationPanel = ({ translation }: IRegistration) => {
  const [isEyeOpen, setIsEyeOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegistrationForm>();

  const onSubmit: SubmitHandler<IRegistrationForm> = async ({
    name,
    surname,
    email,
    password,
    isAcceptedRules,
  }) => {
    try {
      console.log('name', name);
      console.log('surname', surname);
      console.log('email', email);
      console.log('password', password);
      console.log('isAcceptedRules', isAcceptedRules);
    } catch (error) {
      console.log('LoginPanel error', error);
    }
  };

  console.log('errors', errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col w-full gap-10' noValidate>
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
          <label htmlFor='acceptRules' className='flex cursor-pointer relative'>
            <Checkbox onChange={onChange} checked={value} id='acceptRules' />
            {translation.acceptTermsAndConditions}
            <span className='text-main-error-red pt-2 absolute whitespace-nowrap top-4'>
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
      <Button type='submit'>{translation.createAccount}</Button>
    </form>
  );
};

export default RegistrationPanel;

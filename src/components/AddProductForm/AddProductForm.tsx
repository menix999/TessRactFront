'use client';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';

import Input from '../Input/Input';
import Button from '../Button/Button';
import { ConstantProduct, routes } from '@/constants/constants';
import { IAddProductForm, IAddProductFormProps } from './AddProductForm.types';
import DropdownInput from '../DropdownInput/DropdownInput';
import UploadPhotoIcon from '@/assets/UploadPhotoIcon';
import TextareaInput from '../TextareaInput/TextareaInput';
import apiClient from '@/utils/api';

const AddProductForm = ({ translation }: IAddProductFormProps) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const { categoryOptions } = ConstantProduct();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IAddProductForm>();

  const onSubmit: SubmitHandler<IAddProductForm> = async ({
    name,
    mark,
    category,
    price,
    quantity,
    color,
    material,
    description,
  }) => {
    try {
      const quantityValue = !quantity ? 1 : quantity;

      const formData = new FormData();
      if (selectedImage) {
        formData.append('image', selectedImage);

        // In order to see the data in the console
        // formData.forEach((value, key) => {
        //   console.log(key, value);
        // });
      }

      const response = await apiClient.post('/api/Product', {
        name,
        mark,
        category,
        price,
        color,
        material,
        description,
        quantity: quantityValue,
      });

      if (response) {
        reset();
      }
    } catch (error) {
      console.log('LoginPanel error', error);
    }
  };

  const handleDrop = (event: any) => {
    event.preventDefault();
    console.log('event', event);
    const file = event.dataTransfer.files[0];
    if (
      file &&
      (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png')
    ) {
      console.log('file', file);
      setSelectedImage(file);
    } else {
      setSelectedImage(null);
    }
  };

  const handleDragOver = (event: any) => {
    event.preventDefault();
  };

  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    if (
      file &&
      (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png')
    ) {
      setSelectedImage(file);
    } else {
      setSelectedImage(null);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col w-full gap-10' noValidate>
      <Controller
        render={({ field: { onChange, value } }) => (
          <div className='flex flex-col relative'>
            <Input
              placeholder={translation.nameOfProduct}
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
              placeholder={translation.companyName}
              value={value}
              onChange={onChange}
              required={!!errors.mark}
            />
            <span className='text-main-error-red pt-2 absolute whitespace-nowrap top-9'>
              {errors.mark?.message}
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
        name='mark'
      />
      <Controller
        render={({ field: { onChange, value } }) => (
          <div className='flex flex-col relative'>
            <DropdownInput
              placeholder={translation.category}
              value={value}
              onChange={onChange}
              error={!!errors.category}
              options={categoryOptions}
              isArrow
            />
            <span className='text-main-error-red pt-2 absolute whitespace-nowrap top-9'>
              {errors.category?.message}
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
        defaultValue='Headphones'
        name='category'
      />
      <Controller
        render={({ field: { onChange, value } }) => {
          return (
            <div className='flex flex-col relative'>
              <Input
                placeholder={translation.price}
                value={value}
                onChange={onChange}
                required={!!errors.price}
              />
              <span className='text-main-error-red pt-2 absolute whitespace-nowrap top-9'>
                {errors.price?.message}
              </span>
            </div>
          );
        }}
        rules={{
          required: {
            value: true,
            message: translation.errorMessage.thisFieldIsRequired,
          },
        }}
        defaultValue={undefined}
        control={control}
        name='price'
      />
      <Controller
        render={({ field: { onChange, value } }) => (
          <div className='flex flex-col relative'>
            <Input
              placeholder={translation.quantityOfProduct}
              value={value}
              onChange={onChange}
              required={!!errors.quantity}
            />
            <span className='text-main-error-red pt-2 absolute whitespace-nowrap top-9'>
              {errors.quantity?.message}
            </span>
          </div>
        )}
        defaultValue={undefined}
        control={control}
        name='quantity'
      />
      <Controller
        render={({ field: { onChange, value } }) => (
          <div className='flex flex-col relative'>
            <Input
              placeholder={translation.color}
              value={value}
              onChange={onChange}
              required={!!errors.color}
            />
            <span className='text-main-error-red pt-2 absolute whitespace-nowrap top-9'>
              {errors.color?.message}
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
        name='color'
      />
      <Controller
        render={({ field: { onChange, value } }) => (
          <div className='flex flex-col relative'>
            <Input
              placeholder={translation.productMaterial}
              value={value}
              onChange={onChange}
              required={!!errors.material}
            />
            <span className='text-main-error-red pt-2 absolute whitespace-nowrap top-9'>
              {errors.material?.message}
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
        name='material'
      />
      <Controller
        render={({ field: { onChange, value } }) => (
          <div className='flex flex-col relative'>
            <TextareaInput
              placeholder={translation.description}
              value={value}
              onChange={onChange}
              required={!!errors.description}
            />
            <span className='text-main-error-red pt-2 absolute whitespace-nowrap top-9'>
              {errors.description?.message}
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
        name='description'
      />
      <div className='flex items-center justify-center'>
        <div
          className='flex items-center flex-col w-full justify-center border-dashed border-2 rounded-xl border-main-gray h-60 relative'
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <input
            type='file'
            accept='.jpg, .jpeg, .png'
            onChange={handleImageChange}
            className='opacity-0 absolute inset-0 w-full h-full cursor-pointer'
          />
          <UploadPhotoIcon />
          <span className='font-bold text-xs sm:text-lg'>
            {translation.choosePhotoAndDragItHere}
          </span>
          <span className='text-[10px] text-xs'>{translation.supportsJpgJpegPngGif}</span>
        </div>
      </div>
      <Button type='submit'>{translation.add}</Button>
    </form>
  );
};

export default AddProductForm;

'use client';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import Input from '../Input/Input';
import Button from '../Button/Button';
import { ConstantProduct, routes } from '@/constants/constants';
import { IAddProductForm, IAddProductFormProps } from './AddProductForm.types';
import DropdownInput from '../DropdownInput/DropdownInput';
import UploadPhotoIcon from '@/assets/UploadPhotoIcon';
import TextareaInput from '../TextareaInput/TextareaInput';
import apiClient from '@/utils/api';
import TrashIcon from '@/assets/TrashIcon';
import ToastifyText from '../ToastifyText/ToastifyText';

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

      let formData = new FormData();
      if (selectedImage) {
        formData.append('imageFile', selectedImage);
      }

      formData.append('name', name);
      formData.append('mark', mark);
      formData.append('category', category.nameValue);
      formData.append('price', String(price));
      formData.append('color', color);
      formData.append('material', material);
      formData.append('description', description);
      formData.append('quantity', String(quantityValue));

      const response = await apiClient.post('/api/Product', formData);

      if (response) {
        toast.success(
          <ToastifyText
            title={translation.toastifyMessages.title.success}
            description={translation.toastifyMessages.descriptionSuccess.productAddedSuccessfully}
            type='success'
          />
        );

        reset();
        setSelectedImage(null);
      }
    } catch (error) {
      console.log('LoginPanel error', error);

      toast.error(
        <ToastifyText
          title={translation.toastifyMessages.title.error}
          description={translation.toastifyMessages.descriptionError.problemAddingProduct}
          type='error'
        />
      );
    }
  };

  const handleDrop = (event: any) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (
      file &&
      (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png')
    ) {
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

  const handleDeletePhoto = () => {
    setSelectedImage(null);
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
        defaultValue={{
          id: 1,
          name: 'Headphones',
          nameValue: 'Headphones',
        }}
        control={control}
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
        defaultValue=''
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
        defaultValue=''
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
          className='flex items-center relative flex-col w-full justify-center border-dashed border-2 rounded-xl border-main-gray h-60 relative'
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          {selectedImage ? (
            <>
              <img src={URL.createObjectURL(selectedImage)} className='max-w-40 max-h-40 ' />
              <div
                className='absolute z-30 top-4 right-4 cursor-pointer'
                onClick={handleDeletePhoto}
              >
                <TrashIcon />
              </div>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
      <Button type='submit'>{translation.add}</Button>
    </form>
  );
};

export default AddProductForm;

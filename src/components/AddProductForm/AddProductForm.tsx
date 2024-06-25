'use client';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
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
import { onlyNumbersRegex, priceRegex } from '@/constants/regex';

const AddProductForm = ({ translation }: IAddProductFormProps) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const { categoryOptions } = ConstantProduct(translation);

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
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col w-full gap-8' noValidate>
      <Controller
        render={({ field: { onChange, value } }) => (
          <div className='flex flex-col relative'>
            <Input
              placeholder={translation.enterYourNameOfProduct}
              title={translation.nameOfProduct}
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
              placeholder={translation.enterYourCompanyName}
              title={translation.companyName}
              value={value}
              onChange={onChange}
              isError={!!errors.mark}
            />
            <span className='text-main-error-red pt-2 text-xs absolute whitespace-nowrap -bottom-5'>
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
              inputTitle={translation.category}
              placeholder={translation.enterYourCategory}
              value={value}
              onChange={onChange}
              error={!!errors.category}
              options={categoryOptions}
              isArrow
            />
            <span className='text-main-error-red pt-2 text-xs absolute whitespace-nowrap -bottom-5'>
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
          name: translation.headphones,
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
                placeholder={translation.enterYourPrice}
                title={translation.price}
                value={value}
                onChange={onChange}
                isError={!!errors.price}
              />
              <span className='text-main-error-red pt-2 text-xs absolute whitespace-nowrap -bottom-5'>
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
          pattern: {
            value: priceRegex,
            message: translation.errorMessage.onlyNumbersAllowed,
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
              title={translation.quantityOfProduct}
              placeholder={translation.enterYourAmountOfProduct}
              value={value}
              onChange={onChange}
              isError={!!errors.quantity}
            />
            <span className='text-main-error-red pt-2 text-xs absolute whitespace-nowrap -bottom-5'>
              {errors.quantity?.message}
            </span>
          </div>
        )}
        rules={{
          pattern: {
            value: onlyNumbersRegex,
            message: translation.errorMessage.onlyNumbersAllowed,
          },
        }}
        defaultValue=''
        control={control}
        name='quantity'
      />
      <Controller
        render={({ field: { onChange, value } }) => (
          <div className='flex flex-col relative'>
            <Input
              placeholder={translation.enterYourColor}
              title={translation.color}
              value={value}
              onChange={onChange}
              isError={!!errors.color}
            />
            <span className='text-main-error-red pt-2 text-xs absolute whitespace-nowrap -bottom-5'>
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
              placeholder={translation.enterYourProductMaterial}
              title={translation.productMaterial}
              value={value}
              onChange={onChange}
              isError={!!errors.material}
            />
            <span className='text-main-error-red pt-2 text-xs absolute whitespace-nowrap -bottom-5'>
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
              title={translation.description}
              placeholder={translation.enterYourDescription}
              value={value}
              onChange={onChange}
            />
            {/* <span className='text-main-error-red pt-2 absolute whitespace-nowrap top-9'>
              {errors.description?.message}
            </span> */}
          </div>
        )}
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

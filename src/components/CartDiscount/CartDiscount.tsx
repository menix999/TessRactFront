'use client';

import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';

import Input from '../Input/Input';
import Button from '../Button/Button';
import { ICartDiscountForm, ICartDiscountProps } from './CartDiscount.types';
import { useAuth } from '@/context/AuthContext/AuthContext';
import ToastifyText from '../ToastifyText/ToastifyText';
import { useCart } from '@/context/CartContext/CartContext';
import apiClient from '@/utils/api';

const CartDiscount = ({ translation }: ICartDiscountProps) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ICartDiscountForm>();

  const { userToken } = useAuth();

  const { addDiscountToCart } = useCart();

  const { discount } = useCart();

  const onSubmit: SubmitHandler<ICartDiscountForm> = async ({ discountCode }) => {
    try {
      if (!discountCode) return;
      if (discount) {
        toast.error(
          <ToastifyText
            title={translation.toastifyMessages.title.error}
            description={translation.toastifyMessages.descriptionError.discountAlreadyInUse}
            type='error'
          />
        );

        return;
      }

      const response = await apiClient.get(`/api/Discount/${discountCode}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      if (response) {
        addDiscountToCart(response.data);

        toast.success(
          <ToastifyText
            title={translation.toastifyMessages.title.success}
            description={translation.toastifyMessages.descriptionSuccess.discountAddedSuccessfully}
            type='success'
          />
        );

        reset();
      }
    } catch (error: any) {
      console.error('cartDiscount - error ', error);

      const errorCode = error.response.statusText;

      if (error.response.data === 'DiscountExpired') {
        toast.error(
          <ToastifyText
            title={translation.toastifyMessages.title.error}
            description={translation.toastifyMessages.descriptionError.discountExpired}
            type='error'
          />
        );
      } else if (errorCode === 'Not Found') {
        toast.error(
          <ToastifyText
            title={translation.toastifyMessages.title.error}
            description={translation.toastifyMessages.descriptionError.discountNotFound}
            type='error'
          />
        );
      } else {
        toast.error(
          <ToastifyText
            title={translation.toastifyMessages.title.error}
            description={translation.toastifyMessages.descriptionError.problemAddingDiscount}
            type='error'
          />
        );
      }
    }
  };

  return (
    <form className='flex gap-4' onSubmit={handleSubmit(onSubmit)}>
      <Controller
        render={({ field: { onChange, value } }) => (
          <div className='flex flex-col w-full relative'>
            <Input placeholder={translation.enterDiscountCode} value={value} onChange={onChange} />
            <span className='text-main-error-red pt-2 absolute whitespace-nowrap top-9'>
              {errors.discountCode?.message}
            </span>
          </div>
        )}
        control={control}
        defaultValue=''
        name='discountCode'
      />
      <div>
        <Button type='submit' variant='bordered'>
          {translation.apply}
        </Button>
      </div>
    </form>
  );
};

export default CartDiscount;

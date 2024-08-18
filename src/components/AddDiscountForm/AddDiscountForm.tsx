'use client';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Datepicker } from 'flowbite-react';

import Input from '../Input/Input';
import Button from '../Button/Button';
import ToastifyText from '../ToastifyText/ToastifyText';
import { IAddDiscountForm, IAddDiscountFormProps } from './AddDiscountForm.types';
import { promotionCodeRegex } from '@/constants/regex';
import { useAuth } from '@/context/AuthContext/AuthContext';
import apiClient from '@/utils/api';

const AddDiscountForm = ({ translation }: IAddDiscountFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IAddDiscountForm>();

  const { userToken } = useAuth();

  const onSubmit: SubmitHandler<IAddDiscountForm> = async ({
    discountSymbol,
    discountValue,
    discountExpirationDate,
  }) => {
    try {
      const response = await apiClient.post(
        `/api/Discount`,
        {
          symbol: discountSymbol,
          value: discountValue,
          expirationDate: discountExpirationDate,
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
            description={translation.toastifyMessages.descriptionSuccess.discountAddedSuccessfully}
            type='success'
          />
        );

        reset();
      }
    } catch (error: any) {
      console.log('AddDiscountForm error', error);

      if (error.response.data === 'DiscountExists') {
        toast.error(
          <ToastifyText
            title={translation.toastifyMessages.title.error}
            description={translation.toastifyMessages.descriptionError.discountAlreadyExists}
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

  const getWeekLaterDate = () => {
    const currentDate = new Date();

    const weekLaterDate = new Date(currentDate);
    weekLaterDate.setDate(currentDate.getDate() + 7);

    return new Date(weekLaterDate.setHours(23, 59, 59, 999));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col w-full gap-8' noValidate>
      <Controller
        render={({ field: { onChange, value } }) => (
          <div className='flex flex-col relative'>
            <Input
              placeholder={translation.enterNameOfDiscount}
              title={translation.nameOfDiscount}
              value={value}
              onChange={onChange}
              isError={!!errors.discountSymbol}
            />
            <span className='text-main-error-red pt-2 text-xs absolute whitespace-nowrap -bottom-5'>
              {errors.discountSymbol?.message}
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
        name='discountSymbol'
      />
      <Controller
        render={({ field: { onChange, value } }) => (
          <div className='flex flex-col relative'>
            <Input
              placeholder={translation.enterValueOfDiscount}
              title={translation.valueOfDiscount}
              value={value}
              onChange={onChange}
              isError={!!errors.discountValue}
            />
            <span className='text-main-error-red pt-2 text-xs absolute whitespace-nowrap -bottom-5'>
              {errors.discountValue?.message}
            </span>
          </div>
        )}
        rules={{
          required: {
            value: true,
            message: translation.errorMessage.thisFieldIsRequired,
          },
          pattern: {
            value: promotionCodeRegex,
            message: translation.errorMessage.maxDiscount,
          },
        }}
        control={control}
        defaultValue=''
        name='discountValue'
      />
      <Controller
        render={({ field: { onChange, value } }) => (
          <div>
            {<span className='mb-1 text-sm'>{translation.expirationDate}</span>}
            <Datepicker
              minDate={new Date()}
              language='pl'
              onSelectedDateChanged={onChange}
              defaultDate={getWeekLaterDate()}
              theme={{
                root: {
                  input: {
                    field: {
                      input: {
                        base: '!pl-10 w-full !border-main-gray !rounded-xl',
                      },
                    },
                  },
                },
                popup: {
                  footer: {
                    button: {
                      today: 'bg-main-purple text-white',
                    },
                  },
                },
                views: {
                  days: {
                    items: {
                      item: {
                        selected: 'text-main-purple bg-dashboard-watch-background',
                      },
                    },
                  },
                  months: {
                    items: {
                      item: {
                        selected: 'text-main-purple bg-dashboard-watch-background',
                      },
                    },
                  },
                  years: {
                    items: {
                      item: {
                        selected: 'text-main-purple bg-dashboard-watch-background',
                      },
                    },
                  },
                  decades: {
                    items: {
                      item: {
                        selected: 'text-main-purple bg-dashboard-watch-background',
                      },
                    },
                  },
                },
              }}
            />
          </div>
        )}
        rules={{
          required: {
            value: true,
            message: translation.errorMessage.thisFieldIsRequired,
          },
        }}
        control={control}
        defaultValue={getWeekLaterDate()}
        name='discountExpirationDate'
      />
      <div className='flex items-center justify-center'></div>
      <Button type='submit'>{translation.add}</Button>
    </form>
  );
};

export default AddDiscountForm;

'use client';

import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';

import { IAddOpinionForm, IAddOpionionProps } from './AddOpinionForm.types';
import TextareaInput from '../TextareaInput/TextareaInput';
import Stars from '../Stars/Stars';
import Button from '../Button/Button';
import ToastifyText from '../ToastifyText/ToastifyText';
import { useAuth } from '@/context/AuthContext/AuthContext';

const AddOpinionForm = ({ translation, productId, setOpinionsData }: IAddOpionionProps) => {
  const { control, handleSubmit, reset } = useForm<IAddOpinionForm>();

  const { userToken } = useAuth();

  const onSubmit = async ({ commentContent, rate }: IAddOpinionForm) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DB_BASEURL}/api/product/${productId}/opinion`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken}`,
          },
          body: JSON.stringify({
            commentContent,
            rate,
          }),
        }
      );

      if (response) {
        toast.success(
          <ToastifyText
            title={translation.toastifyMessages.title.success}
            description={translation.toastifyMessages.descriptionSuccess.opinionAddedSuccessfully}
            type='success'
          />
        );

        setOpinionsData((prev) => [
          ...prev,
          {
            commentContent,
            rate,
            creationDate: new Date().toISOString(),
            opinionId: prev.length + 1,
            firstName: 'Ty',
            surname: '',
          },
        ]);

        reset();
      }
    } catch (error) {
      console.error('addOpinion - error ', error);

      toast.error(
        <ToastifyText
          title={translation.toastifyMessages.title.error}
          description={translation.toastifyMessages.descriptionError.errorWhileAddingOpinion}
          type='error'
        />
      );
    }
  };

  return (
    <div className='flex flex-col items-start gap-4 w-full mb-12'>
      <h2 className='text-2xl font-bold'>{translation.addOpinion}</h2>
      <form className='flex flex-col w-full gap-6' onSubmit={handleSubmit(onSubmit)}>
        <Controller
          render={({ field: { onChange, value } }) => (
            <Stars count={0} translation={translation} onChange={onChange} />
          )}
          control={control}
          defaultValue={0}
          name='rate'
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
            </div>
          )}
          control={control}
          defaultValue=''
          name='commentContent'
        />
        <Button type='submit'>{translation.leaveReview}</Button>
      </form>
    </div>
  );
};

export default AddOpinionForm;

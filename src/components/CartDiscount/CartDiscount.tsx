'use client';

import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import Input from '../Input/Input';
import Button from '../Button/Button';

interface ICartDiscountForm {
  discountCode: string;
}
const CartDiscount = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ICartDiscountForm>();

  const onSubmit: SubmitHandler<ICartDiscountForm> = async ({ discountCode }) => {
    // try {
    //   const response = await axios.post('http://localhost:5250/api/Account/register', {
    //     firstName: name,
    //     surname,
    //     email,
    //     password,
    //     confirmPassword,
    //   });
    //   if (response) {
    //     // Write nawigation to login page in next js
    //     router.push(routes.login);
    //   }
    //   console.log('response', response);
    // } catch (error) {
    //   console.log('LoginPanel error', error);
    // }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex gap-4'>
      <Controller
        render={({ field: { onChange, value } }) => (
          <div className='flex flex-col w-full relative'>
            <Input
              placeholder='Wpisz kod rabatowy'
              value={value}
              onChange={onChange}
              required={!!errors.discountCode}
            />
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
          Zastosuj
        </Button>
      </div>
    </form>
  );
};

export default CartDiscount;

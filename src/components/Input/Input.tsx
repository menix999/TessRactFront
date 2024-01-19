import React, { ChangeEvent } from 'react';

interface IInput {
  placeholder?: string;
  type?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  errorMessage?: string;
  required?: boolean;
}

const Input = ({ placeholder, type, value, onChange, required }: IInput) => {
  return (
    <input
      placeholder={placeholder}
      //   type={type ? ('password' && isEyeOpen ? 'text' : 'password') : 'text'}
      //   error={isError}
      onChange={onChange}
      value={value}
      maxLength={255}
      type={type}
      //   pattern='.{7,}'
      required={required}
      className='invalid:border-main-error-red invalid:border-2 h-10 w-full text-sm p-3 transition duration-100 outline-none border border-solid rounded-xl border-main-gray focus:border-2 focus:border-main-purple'
    />
  );
};

export default Input;

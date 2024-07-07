import React, { ChangeEvent } from 'react';

interface IInput {
  placeholder?: string;
  type?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value?: string | number;
  errorMessage?: string;
  isError?: boolean;
  title?: string;
  maxLength?: number
}

const Input = ({ placeholder, type, value, onChange, isError, title, maxLength }: IInput) => {
  return (
    <>
      {title && <span className='mb-1 text-sm'>{title}</span>}
      <input
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        maxLength={maxLength || 255}
        type={type}
        className={`${
          isError ? 'border-2 border-main-error-red' : 'border-main-gray'
        } h-10 w-full placeholder:text-xs text-sm p-3 transition duration-100 outline-none border border-solid rounded-xl  focus:border-2 focus:border-main-purple`}
      />
    </>
  );
};

export default Input;

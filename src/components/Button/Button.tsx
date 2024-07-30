'use client';
import React from 'react';

import { IButtonProps } from './Button.types';
import CircleLoader from '../CircleLoader/CircleLoader';

const Button = ({ type, onClick, variant, children, isLoading, isDisabled }: IButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={
        isDisabled
          ? 'bg-main-gray hover:bg-main-gray cursor-not-allowed text-white border-main-gray flex justify-center items-center h-10 py-3 px-6 text-sm w-full transition duration-100 ease-in-out whitespace-nowrap rounded-xl '
          : `flex justify-center items-center h-10 py-3 px-6 text-sm w-full transition duration-100 ease-in-out cursor-pointer whitespace-nowrap ${
              variant === 'bordered'
                ? `bg-transparenth-10 font-medium rounded-xl border border-main-purple bg-white text-main-purple hover:text-white hover:bg-main-purple`
                : `font-medium rounded-xl bg-main-purple hover:bg-main-purple-hover hover:duration-200 text-white`
            }`
      }
    >
      {isLoading ? <CircleLoader /> : children}
    </button>
  );
};

export default Button;

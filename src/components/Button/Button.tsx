'use client';
import React from 'react';

import { IButtonProps } from './Button.types';
import CircleLoader from '../CircleLoader/CircleLoader';

//TODO: Dodać children żeby loader był komponentem serwerowym
const Button = ({ type, onClick, variant, children, isLoading }: IButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={
        variant === 'bordered'
          ? 'flex justify-center bg-transparent items-center h-10 py-3 px-6 text-sm font-medium rounded-xl w-full transition duration-100 ease-in-out cursor-pointer whitespace-nowrap border border-main-purple bg-white text-main-purple hover:text-white hover:bg-main-purple'
          : variant === 'google'
          ? 'flex justify-center items-center h-10 py-3 px-6 text-sm font-bold rounded-xl w-full transition duration-100 ease-in-out cursor-pointer whitespace-nowrap bg-gradient-to-b from-white to-google-gradient text-google-content '
          : 'flex justify-center items-center h-10 py-3 px-6 text-sm font-medium rounded-xl w-full transition duration-100 ease-in-out cursor-pointer whitespace-nowrap bg-main-purple hover:bg-main-purple-hover hover:duration-200 text-white'
      }
    >
      {isLoading ? <CircleLoader/> : children}
    </button>
  );
};

export default Button;

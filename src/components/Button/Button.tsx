import React from 'react';

import { IButtonProps } from './Button.types';

const Button = ({ text }: IButtonProps) => {
  return <button className='bg-main-purple'>{text}</button>;
};

export default Button;

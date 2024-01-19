import { ReactNode } from 'react';

export interface IButtonProps {
  type: 'button' | 'submit' | 'reset' | undefined;
  onClick?: () => void;
  variant?: 'filled' | 'bordered' | 'google';
  children: ReactNode;
}

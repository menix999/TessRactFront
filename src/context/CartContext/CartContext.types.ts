import { IProductProperties } from '@/constants/globalConstant.types';
import { ReactNode } from 'react';

export interface IAuthContextProps {
  children: ReactNode;
}

export interface ICart<T> {
  cart: T;
  addProductToCart: (product: IProductProperties) => void;
  deleteProductFromTheCart: (id: string) => void;
  numberOfProductsInCart: number;
}

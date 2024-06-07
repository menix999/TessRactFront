import { IProductProperties } from '@/constants/globalConstant.types';
import { Dispatch, ReactNode, SetStateAction } from 'react';

export interface IAuthContextProps {
  children: ReactNode;
}

export interface ICart<T> {
  cart: T;
  addProductToCart: (product: IProductProperties) => void;
  deleteProductFromTheCart: (id: string) => void;
  numberOfProductsInCart: number;
  cartListTotalAmount: number;
  numberOfProducts: Record<string, number>;
  setNumberOfProducts: Dispatch<SetStateAction<Record<string, number>>>;
  setCartListTotalAmount: Dispatch<SetStateAction<number>>;
  handleQuantityChange: (productId: number, quantity: number) => void;
}

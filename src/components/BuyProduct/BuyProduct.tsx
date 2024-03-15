'use client';

import { useCart } from '@/context/CartContext/CartContext';
import Button from '../Button/Button';
import { IBuyProductProps } from './BuyProduct.types';

const BuyProduct = ({ productData }: IBuyProductProps) => {
  const { addProductToCart } = useCart();

  const handleAddToCart = () => {
    addProductToCart(productData);
  };

  const handleBuyAndPay = () => {};

  return (
    <>
      <Button type='button' onClick={handleAddToCart}>
        Dodaj do koszyka
      </Button>
      <Button type='button' onClick={handleBuyAndPay} variant='bordered'>
        Kup i zapłać
      </Button>
    </>
  );
};

export default BuyProduct;

'use client';

import { useCart } from '@/context/CartContext/CartContext';
import Button from '../Button/Button';
import { IBuyProductProps } from './BuyProduct.types';
import { useRouter } from 'next/navigation';
import { routes } from '@/constants/constants';

const BuyProduct = ({ productData, translation, quantity }: IBuyProductProps) => {
  const { addProductToCart } = useCart();

  const router = useRouter();

  const handleAddToCart = () => {
    addProductToCart(productData);
  };

  const handleBuyAndPay = () => {
    addProductToCart(productData);
    router.push(routes.cart);
  };

  return (
    <>
      <Button type='button' onClick={handleAddToCart} isDisabled={!quantity}>
        {translation.addToCart}
      </Button>
      <Button type='button' onClick={handleBuyAndPay} isDisabled={!quantity} variant='bordered'>
        {translation.buyAndPay}
      </Button>
    </>
  );
};

export default BuyProduct;

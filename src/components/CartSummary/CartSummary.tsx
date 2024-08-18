'use client';

import { Fragment, useEffect } from 'react';
import { toast } from 'react-toastify';

import { IProductProperties } from '@/constants/globalConstant.types';
import { ICartSummaryProps } from './CartSummary.types';
import { useCart } from '@/context/CartContext/CartContext';
import BuyOrPayNowSummary from '../BuyOrPayNowSummary/BuyOrPayNowSummary';
import ToastifyText from '../ToastifyText/ToastifyText';
import { oneNumberRegex } from '@/constants/regex';

const CartSummary = ({ translation, locale }: ICartSummaryProps) => {
  const {
    deleteProductFromTheCart,
    numberOfProductsInCart,
    cart,
    setNumberOfProducts,
    setCartListTotalAmount,
    numberOfProducts,
    cartListTotalAmount,
    handleQuantityChange,
  } = useCart();

  useEffect(() => {
    if (!cart.length) return;

    const totalAmount = cart.reduce((acc: number, item: IProductProperties) => {
      const totalPrice: number = acc + item.price;
      return totalPrice;
    }, 0);

    const initialNumberOfProducts: Record<string, number> = {};
    cart.forEach((product: IProductProperties) => {
      initialNumberOfProducts[product.id] = 1;
    });

    setNumberOfProducts(initialNumberOfProducts);
    setCartListTotalAmount(totalAmount);
  }, []);

  const handleDeleteProduct = (id: string) => {
    deleteProductFromTheCart(id);
  };

  const handleIncrement = (
    productId: number,
    quantity: number,
    availableAmountOfProduct: number
  ) => {
    if (quantity >= 99) return;

    if (quantity >= availableAmountOfProduct) {
      toast.error(
        <ToastifyText
          title={translation.toastifyMessages.title.error}
          description={
            translation.toastifyMessages.descriptionError.exceededAvailableLimitOfProduct
          }
          type='error'
        />
      );

      return;
    }

    handleQuantityChange(productId, quantity + 1);
  };

  const handleChangeNumberOfProducs = (
    productId: number,
    quantity: number,
    availableAmountOfProduct: number
  ) => {
    if (quantity > availableAmountOfProduct) {
      toast.error(
        <ToastifyText
          title={translation.toastifyMessages.title.error}
          description={
            translation.toastifyMessages.descriptionError.exceededAvailableLimitOfProduct
          }
          type='error'
        />
      );

      return;
    }

    handleQuantityChange(productId, quantity);
  };

  const handleDecrement = (productId: number, quantity: number) => {
    if (quantity <= 1) return;

    handleQuantityChange(productId, quantity - 1);
  };

  return (
    <>
      <div className='flex flex-col w-full items-center h-full'>
        <div className='flex flex-col w-full max-w-[700px] h-full'>
          {!!cart.length && (
            <h2 className='font-bold text-xl sm:text-3xl mb-4'>
              {translation.cart} ({numberOfProductsInCart})
            </h2>
          )}
          {!cart.length ? (
            <span className='flex min-h-full justify-center items-center text-4xl font-medium w-full'>
              {translation.yourCartIsActuallyEmpty}
            </span>
          ) : (
            cart.map(
              ({
                id,
                base64Image,
                name,
                price,
                color,
                quantity,
                availableAmountOfProduct,
              }: IProductProperties) => {
                const totalPrice = (quantity * price).toFixed(2);
                return (
                  <Fragment key={id}>
                    <div className='border w-full rounded-2xl border-main-gray' />
                    <div className='flex flex-col sm:flex-row gap-4 sm:gap-24 pt-10 pb-4 sm:pl-10 sm:h-64 lg:pr-10'>
                      <div className='flex justify-center items-center min-w-32'>
                        <img
                          src={`data:image/;base64,${base64Image}`}
                          alt='Smartwatch in the cart'
                          className='max-w-40 max-h-40'
                        />
                      </div>

                      <div className='flex flex-col w-full justify-between'>
                        <div className='flex flex-col gap-4 w-full'>
                          <div className='flex justify-between'>
                            <span className='text-base sm:text-xl max-w-48 overflow-hidden text-ellipsis'>
                              {name}
                            </span>
                            <span className='text-base sm:text-xl font-bold whitespace-nowrap'>
                              {totalPrice} zł
                            </span>
                          </div>
                          <span
                            className={`${
                              !availableAmountOfProduct ? 'text-main-error-red' : 'text-main-purple'
                            } text-sm sm:text-base`}
                          >
                            {!availableAmountOfProduct
                              ? translation.noAvailableProducts
                              : translation.available}
                          </span>
                          <div className='flex'>
                            <span className='text-base font-bold mr-1'>{translation.color}:</span>
                            <span className='text-base'>{color}</span>
                          </div>
                        </div>

                        <div className='flex items-center'>
                          <button onClick={() => handleDecrement(+id, quantity)} className='mr-2'>
                            -
                          </button>
                          <div className='flex w-10 justify-center items-center '>
                            <input
                              type='text'
                              maxLength={2}
                              value={quantity}
                              readOnly
                              onChange={(e) =>
                                handleChangeNumberOfProducs(
                                  +id,
                                  +e.target.value,
                                  availableAmountOfProduct
                                )
                              }
                              className='h-6 w-6 text-center p-0 text-sm outline-none border border-solid rounded-lg border-main-gray'
                            />
                          </div>
                          <button
                            onClick={() => handleIncrement(+id, quantity, availableAmountOfProduct)}
                            className='ml-2'
                          >
                            +
                          </button>
                          <div className='border h-4 rounded-2xl mx-5 border-main-gray' />
                          <span
                            onClick={() => handleDeleteProduct(id)}
                            className='text-main-purple text-sm cursor-pointer hover:underline'
                          >
                            {translation.delete}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Fragment>
                );
              }
            )
          )}
        </div>
      </div>
      {!!cart.length && (
        <BuyOrPayNowSummary
          translation={translation}
          isCartDiscount
          isAcceptedMethodsOfPayment
          total={cartListTotalAmount}
          text={translation.goToDelivery}
          locale={locale}
          isCartSummary
          type='button'
        />
      )}
    </>
  );
};

export default CartSummary;

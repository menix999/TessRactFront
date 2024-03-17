import Button from '@/components/Button/Button';
import { Locale } from '../../../../../../i18n.config';
import { getDictionary } from '../../../../../../lib/dictionary';
import smartWatchLogo from '../../../../assets/smartWatch.png';
import CartDiscount from '@/components/CartDiscount/CartDiscount';
import CartSummary from '@/components/CartSummary/CartSummary';

const CartPage = async ({ params: { locale } }: { params: { locale: Locale } }) => {
  const translation = await getDictionary(locale);

  // const cartList = localStorage.getItem('cart');
  // console.log('cartList', cartList);

  return (
    <div className='flex flex-col xl:flex-row items-center xl:items-start gap-12 justify-between mt-24'>
      <CartSummary translation={translation} />
    </div>
  );
};

export default CartPage;

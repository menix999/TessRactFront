import { Locale } from '../../../../../../i18n.config';
import { getDictionary } from '../../../../../../lib/dictionary';
import CartSummary from '@/components/CartSummary/CartSummary';

const CartPage = async ({ params: { locale } }: { params: { locale: Locale } }) => {
  const translation = await getDictionary(locale);

  return (
    <div className='flex flex-col xl:flex-row items-center xl:items-start gap-12 justify-between mt-24 h-full'>
      <CartSummary translation={translation} locale={locale} />
    </div>
  );
};

export default CartPage;

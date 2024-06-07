import Button from '@/components/Button/Button';
import { Locale } from '../../../../../../i18n.config';
import { getDictionary } from '../../../../../../lib/dictionary';
import { routes } from '@/constants/constants';
import CustomLink from '@/components/CustomLink/CustomLink';

const OrderSummaryPage = async ({ params: { locale } }: { params: { locale: Locale } }) => {
  const translation = await getDictionary(locale);

  return (
    <div className='flex flex-col justify-center items-center h-[calc(100%-64px)]'>
      <span className='mb-8 text-2xl font-medium'>
        {translation.orderThanksSummary.thanksForOrder}
      </span>
      <span className='mb-8 text-base'>{translation.orderThanksSummary.inOrderToTrack}</span>
      <span className='mb-8 text-base'>{translation.orderThanksSummary.followYourOrder}</span>
      <CustomLink href={`${routes.main}`} locale={locale} className='mt-2 w-96 bg-white'>
        <Button type='button'>{translation.goToOrder}</Button>
      </CustomLink>
    </div>
  );
};

export default OrderSummaryPage;

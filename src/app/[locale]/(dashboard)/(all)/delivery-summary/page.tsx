import DeliverySummaryForm from '@/components/DeliverySummaryForm/DeliverySummaryForm';
import { Locale } from '../../../../../../i18n.config';
import { getDictionary } from '../../../../../../lib/dictionary';

const DeliverySummaryPage = async ({ params: { locale } }: { params: { locale: Locale } }) => {
  const translation = await getDictionary(locale);

  return (
    <div className='flex flex-col justify-center items-center h-[calc(100%-64px)]'>
      <div className='flex flex-col w-full max-w-[700px] gap-8 '>
        <h1 className='text-xl font-bold'>1. {translation.shipAddress}</h1>
        <DeliverySummaryForm translation={translation} locale={locale} />
      </div>
    </div>
  );
};

export default DeliverySummaryPage;

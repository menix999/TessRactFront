import { Locale } from '../../../../../i18n.config';
import ActivateLinkForm from '@/components/ActivateLinkForm/ActivateLinkForm';
import { getDictionary } from '../../../../../lib/dictionary';

const ActivateLinkPage = async ({ params: { locale } }: { params: { locale: Locale } }) => {
  const translation = await getDictionary(locale);

  return (
    <div className='flex justify-center min-h-full items-center mt-6'>
      <ActivateLinkForm translation={translation} locale={locale} />
    </div>
  );
};

export default ActivateLinkPage;

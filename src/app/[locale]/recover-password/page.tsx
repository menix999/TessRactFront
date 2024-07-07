import { getDictionary } from '../../../../lib/dictionary';
import { Locale } from '../../../../i18n.config';
import RecoveryPasswordForm from '@/components/RecoveryPasswordForm/RecoveryPasswordForm';

const RecoverPasswordPage = async ({ params: { locale } }: { params: { locale: Locale } }) => {
  const translation = await getDictionary(locale);

  return (
    <div className='flex justify-center items-center w-full min-h-full'>
      <div className='flex flex-col max-w-96 w-full h-full p-6'>
        <RecoveryPasswordForm translation={translation} locale={locale} />
      </div>
    </div>
  );
};

export default RecoverPasswordPage;

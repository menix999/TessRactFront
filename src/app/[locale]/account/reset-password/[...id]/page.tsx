import ActivateLinkForm from '@/components/ActivateLinkForm/ActivateLinkForm';
import ResetPasswordForm from '@/components/ResetPasswordForm/ResetPasswordForm';
import { getDictionary } from '../../../../../../lib/dictionary';
import { Locale } from '../../../../../../i18n.config';

const ResetPasswordPage = async ({ params: { locale } }: { params: { locale: Locale } }) => {
  const translation = await getDictionary(locale);

  return (
    <div className='flex justify-center items-center mt-64 w-full'>
      <div className='flex flex-col max-w-96 w-full h-full'>
        <span className='mb-6 text-secondary-gray'>
          {translation.enterNewPasswordForYourAccount}
        </span>
        <ResetPasswordForm translation={translation} locale={locale} />
      </div>
    </div>
  );
};

export default ResetPasswordPage;

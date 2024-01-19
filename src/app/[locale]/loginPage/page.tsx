import LoginPanel from '@/components/LoginPanel/LoginPanel';
import TessRactLogo from '@/assets/TessRactLogo';
import Button from '@/components/Button/Button';
import GoogleButtonIcon from '@/assets/GoogleButtonIcon';
import { getDictionary } from '../../../../lib/dictionary';
import { Locale } from '../../../../i18n.config';
import AppBenefits from '../../../components/AppBenefits/AppBenefits';
import LoginForm from '@/components/LoginForm/LoginForm';

const LoginPage = async ({ params: { locale } }: { params: { locale: Locale } }) => {
  return (
    <div className='h-full min-h-screen flex justify-center sm:p-16 flex-col lg:flex-row'>
      <LoginForm locale={locale} />
      <div className='border border-main-gray rounded w-0 lg:w-auto' />
      <AppBenefits locale={locale} />
    </div>
  );
};

export default LoginPage;

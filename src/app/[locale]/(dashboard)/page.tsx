import { useEffect } from 'react';
import { Locale } from '../../../../i18n.config';
import { getDictionary } from '../../../../lib/dictionary';

const Home = async ({ params: { locale } }: { params: { locale: Locale } }) => {
  const translation = await getDictionary(locale);

  return <div className=' bg-dashboard-background-gray min-h-screen'>aasdsd</div>;
};

export default Home;

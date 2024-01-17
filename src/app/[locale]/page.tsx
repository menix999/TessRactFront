import { Locale } from '../../../i18n.config';
import { getDictionary } from '../../../lib/dictionary';

const Home = async ({ params: { locale } }: { params: { locale: Locale } }) => {
  console.log('test', locale);
  const translation = await getDictionary(locale);

  return (
    <div className='bg-main'>
      <h1 className='text-2xl text-black'>{translation.test}</h1>
    </div>
  );
};

export default Home;

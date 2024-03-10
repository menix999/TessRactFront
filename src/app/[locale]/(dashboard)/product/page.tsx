import Button from '@/components/Button/Button';
import { Locale } from '../../../../../i18n.config';
import { getDictionary } from '../../../../../lib/dictionary';
import DeliveryIcon from '@/assets/DeliveryIcon';
import Stars from '@/components/Stars/Stars';
import smartWatchLogo from '../../../../assets/smartWatch.png';
import UserAvatar from '@/components/UserAvatar/UserAvatar';

const getProduct = async (id: number) => {
  console.log('process.env.DB_BASEURL', process.env.DB_BASEURL);
  const response = await fetch(`${process.env.DB_BASEURL}/api/Product/${id}`, {
    cache: 'no-cache',
  });

  return response.json();
};

const ProductPage = async ({ params: { locale } }: { params: { locale: Locale } }) => {
  const translation = await getDictionary(locale);

  const { description, category, name, price, color, material, mark, ratesAmount, averageRate } =
    await getProduct(1);

  return (
    <div className='flex flex-col items-center'>
      <div className='flex mt-52 w-full md:w-auto h-fit flex-col md:flex-row'>
        <div className='flex justify-center items-center'>
          <img
            src={smartWatchLogo.src}
            alt='New smartWatch'
            className='max-w-60 max-h-60 md:max-w-80 md:max-h-80'
          />
        </div>
        <div className='border-2 border-main-gray w-full md:w-auto my-12 md:my-0 md:mx-20' />
        <div className='flex flex-col gap-4 mb-12'>
          <div className='flex gap-2'>
            <DeliveryIcon />
            <span className='text-main-green'>Bezpłatna dostawa</span>
          </div>
          <h2 className='font-bold text-2xl'>{name}</h2>
          <span>
            <Stars count={averageRate} numberOfRates={ratesAmount} />
          </span>
          <div>
            <span className='text-secondary-gray mr-1'>Firma:</span>
            <span>{mark}</span>
          </div>
          <div>
            <span className='text-secondary-gray mr-1'>Materiał:</span>
            <span>{material}</span>
          </div>
          <div>
            <span className='text-secondary-gray mr-1'>Kolor:</span>
            <span>{color}</span>
          </div>
          <span className='underline cursor-pointer'>Zobacz pełen opis</span>
          <span className='flex text-3xl'>{price} zł</span>
          <Button type='button'>Dodaj do koszyka</Button>
          <Button type='button' variant='bordered'>
            Kup i zapłać
          </Button>
        </div>
      </div>
      <div className='flex flex-col items-start border-b-2 border-main-gray w-full pb-10 gap-4 mb-12'>
        <h2 className='text-2xl font-bold'>Opis</h2>
        <span className='text-base'>{description}</span>
      </div>
      <div className='flex flex-col items-start border-b-2 border-main-gray w-full pb-10 gap-4 mb-12'>
        <h2 className='text-2xl font-bold'>Szczegóły produktu</h2>
        <div>
          <span className='text-secondary-gray mr-1'>Nazwa produktu:</span>
          <span>{name}</span>
        </div>
        <div>
          <span className='text-secondary-gray mr-1'>Firma:</span>
          <span>{mark}</span>
        </div>
        <div>
          <span className='text-secondary-gray mr-1'>Kategoria:</span>
          <span>{category}</span>
        </div>
        <div>
          <span className='text-secondary-gray mr-1'>Kolor:</span>
          <span>{color}</span>
        </div>
        <div>
          <span className='text-secondary-gray mr-1'>Materiał:</span>
          <span>{material}</span>
        </div>
      </div>
      <div className='flex flex-col items-start border-b-2 border-main-gray w-full pb-10 gap-4 mb-12'>
        <h2 className='text-2xl font-bold mb-3'>Opinie</h2>
        <div className='flex flex-col gap-4'>
          <div className='flex gap-3 items-center'>
            <UserAvatar firstName={'Damian'} lastName={'Smolinski'} />
            <span>Damian Smoliński</span>
          </div>
          <div>
            <Stars count={2} translation={translation} opinionDateTime={new Date().toISOString()} />
          </div>
          <div>
            <span>
              Fajny produkt polecam z całego serduszka noszę na codzień cała rodzinka podziwia.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;

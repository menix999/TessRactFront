import Button from '@/components/Button/Button';
import { Locale } from '../../../../../i18n.config';
import { getDictionary } from '../../../../../lib/dictionary';
import DeliveryIcon from '@/assets/DeliveryIcon';
import Stars from '@/components/Stars/Stars';

const ProductPage = async ({ params: { locale } }: { params: { locale: Locale } }) => {
  const translation = await getDictionary(locale);

  return (
    <div className='flex h-screen justify-center mt-52'>
      <div>Photo Side</div>

      <div className='flex flex-col gap-4'>
        <div className='flex gap-2'>
          <DeliveryIcon />
          <span className='text-main-green'>Bezpłatna dostawa</span>
        </div>
        <h2 className='font-bold text-2xl'>Product name</h2>
        <span>
          <Stars count={2} numberOfRates={3} />
        </span>
        <div>
          <span className='text-secondary-gray mr-1'>Materiał:</span>
          <span>85% bawełna 15% poliester</span>
        </div>
        <div>
          <span className='text-secondary-gray mr-1'>Fason:</span>
          <span>mężczyzna</span>
        </div>
        <span>Dostępne rozmiary:</span>
        <div className='flex gap-2'>
          <div className='w-20'>
            <Button type='button' variant='bordered'>
              S
            </Button>
          </div>
          <div className='w-20'>
            <Button type='button' variant='bordered'>
              M
            </Button>
          </div>
          <div className='w-20'>
            <Button type='button' variant='bordered'>
              L
            </Button>
          </div>
          <div className='w-20'>
            <Button type='button' variant='bordered'>
              XL
            </Button>
          </div>
          <div className='w-20'>
            <Button type='button' variant='bordered'>
              XXL
            </Button>
          </div>
        </div>
        <span className='underline cursor-pointer'>Zobacz pełen opis</span>
        <span className='flex text-3xl'>3600,00 zł</span>
        <Button type='button'>Dodaj do koszyka</Button>
        <Button type='button' variant='bordered'>
          Kup i zapłać
        </Button>
      </div>
    </div>
  );
};

export default ProductPage;

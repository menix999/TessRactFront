import Button from '@/components/Button/Button';
import { Locale } from '../../../../../i18n.config';
import { getDictionary } from '../../../../../lib/dictionary';
import smartWatchLogo from '../../../../assets/smartWatch.png';
import CartDiscount from '@/components/CartDiscount/CartDiscount';

const CartPage = async ({ params: { locale } }: { params: { locale: Locale } }) => {
  const translation = await getDictionary(locale);

  return (
    <div className='flex flex-col md:flex-row items-center gap-12 lg:gap-24 flex-wrap justify-between mt-24'>
      <div>
        <h2 className='font-bold text-3xl mb-4'>Koszyk (2)</h2>
        <div className='border w-full rounded-2xl border-main-gray' />
        <div className='flex gap-28 pt-16 pb-4 mb-16 pl-10'>
          <div>
            <img
              src={smartWatchLogo.src}
              alt='Smartwatch in the cart'
              className='max-w-40 max-h-40 md:max-w-60 md:max-h-60'
            />
          </div>

          <div className='flex flex-col w-full justify-between'>
            <div className='flex flex-col gap-4 w-full'>
              <div className='flex justify-between'>
                <span className='text-xl'>Super nowa koszulka</span>
                <span className='text-xl font-bold'>250,00 zł</span>
              </div>
              <span className='text-main-purple'>Dostępne</span>
              <div className='flex'>
                <span className='text-base font-bold'>Kolor: </span>
                <span className='text-base'>Biały</span>
              </div>
            </div>

            <div className='flex items-center'>
              <span>Wybierz ilość</span>
              <div className='border h-4 rounded-2xl mx-5 border-main-gray' />
              <span className='text-main-purple text-sm'>usuń</span>
            </div>
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-6'>
        <div className='flex w-full border-2 rounded-xl md:min-w-96 md:max-w-96 flex-col p-5 gap-4'>
          <p className='text-base'>Podsumowanie zamówienia</p>
          <div className='flex justify-between items-center'>
            <span className=' text-sm'>Zniżka na produkt</span>
            <span className=' text-main-purple text-sm'>-45,00zł</span>
          </div>
          <div className='flex justify-between items-center mt-10'>
            <span className='text-base whitespace-nowrap'>Łączna kwota</span>
            <span className='font-bold text-3xl whitespace-nowrap'>2510,00 zł</span>
          </div>
          <Button type='button'>Przejdź do dostawy</Button>
        </div>
        <CartDiscount />
      </div>
    </div>
  );
};

export default CartPage;

import Button from '@/components/Button/Button';
import { Locale } from '../../../../i18n.config';
import { getDictionary } from '../../../../lib/dictionary';
import logo from '../../../assets/watchMainPage.png';
import smartWatchLogo from '../../../assets/smartWatch.png';
import CareAboutHealthIcon from '@/assets/CareAboutHealthIcon';
import RecommendedSmartWatchIcon from '@/assets/RecommendedSmartWatchIcon';
import PhoneSmartWatchIcon from '@/assets/PhoneSmartWatchIcon';
import CompanyTraitsCard from '@/components/CompanyTraitsCard/CompanyTraitsCard';
import OnlinePaymentIcon from '@/assets/OnlinePaymentIcon';
import GuaranteeIcon from '@/assets/GuaranteeIcon';
import SafetyTransactionIcon from '@/assets/SafetyTransactionIcon';
import ProductCard from '@/components/ProductCard/ProductCard';

const Home = async ({ params: { locale } }: { params: { locale: Locale } }) => {
  const translation = await getDictionary(locale);

  return (
    <div className='flex flex-col min-h-screen sm:px-8 px-4 mb-64'>
      <div className='absolute w-full bg-dashboard-watch-background h-[760px] lg:h-[500px] top-40 left-0 ' />
      <div className='flex flex-col md:flex-row mb-40'>
        <div className='flex flex-col mt-40 items-start justify-star w-full z-10 relative gap-8'>
          <h1 className='text-4xl lg:text-6xl text-dashboard-watch-title font-extrabold'>
            NAJLEPSZE AKCESORIA W ZASIĘGU RĘKI
          </h1>
          <span className='text-dashboard-watch-text'>
            Jesteśmy nową firmą, która zajmuje się sprzedażą wyszukanych akcesoriów, gadżetów i nie
            tylko. Przeglądaj najnowsze oferty już teraz.
          </span>
        </div>
        <div className='flex justify-center w-full my-10 sm:mt-40 '>
          <img
            src={logo.src}
            alt='watch'
            className='transform rotate-12 max-w-40 max-h-40 sm:max-w-80 sm:max-h-80'
          />
        </div>
        <div className='flex flex-col sm:flex-row gap-4 lg:w-96 w-full z-10 '>
          <Button type='button' variant='bordered'>
            Zobacz więcej
          </Button>
          <Button type='button'>Kup teraz</Button>
        </div>
      </div>

      <div className='flex flex-col lg:flex-row items-center justify-center gap-20 mb-40 z-10'>
        <CompanyTraitsCard text='Płatności Online' icon={<OnlinePaymentIcon />} />
        <CompanyTraitsCard text='Gwarancja satysfakcji' icon={<GuaranteeIcon />} />
        <CompanyTraitsCard text='Bezpieczne transakcje' icon={<SafetyTransactionIcon />} />
      </div>

      <div className='flex flex-col gap-6 mb-40 w-full'>
        <span className='font-bold text-xl text-main-purple'>POPULARNE</span>
        <span className='font-bold text-2xl'>NOWE PRODUKTY</span>
        <div className='flex flex-col md:flex-row items-center gap-8 w-full justify-center'>
          <div className='md:w-full'>
            <ProductCard photo={logo.src} text='Roli roli' rate={4} price='40,00zł' />
          </div>
          <div className='md:w-full'>
            <ProductCard photo={logo.src} text='Roli roli' rate={2} price='40,00zł' />
          </div>
          <div className='md:w-full'>
            <ProductCard photo={logo.src} text='Roli roli' rate={1} price='40,00zł' />
          </div>
        </div>
      </div>

      <div className='flex flex-col z-10 w-full justify-center items-center'>
        <div className='flex flex-col gap-10 md:mb-40 mb-20 w-full items-center'>
          <h2 className='text-6xl text-dashboard-watch-title font-extrabold '>Nowości</h2>
          <p>Odkryj nowy wymiar funkcjonalności i stylu z naszym smartwatchem!</p>
        </div>
        <div className='flex flex-col md:flex-row md:gap-10 gap-20'>
          <div className='flex flex-col justify-center items-center w-80 gap-4'>
            <CareAboutHealthIcon />
            <h3 className='font-bold text-xl'>Zadbaj o swoje zdrowie</h3>
            <span className='text-dashboard-watch-text md:text-xl text-base text-center sm:text-left'>
              Smartwatch umożliwia kontrolę tętna, snu, kalorii i nie tylko
            </span>
          </div>
          <div className='flex w-full justify-center'>
            <img
              src={smartWatchLogo.src}
              alt='New smartWatch'
              className='max-w-60 max-h-60 sm:max-w-80 sm:max-h-80'
            />
          </div>
          <div className='flex flex-col md:gap-32 gap-20 md:ml-28 items-center '>
            <div className='flex flex-col gap-4 w-full items-center'>
              <RecommendedSmartWatchIcon />
              <h3 className='font-bold text-xl text-center'>Polecany przez sportowców</h3>
            </div>

            <div className='flex flex-col gap-4 items-center'>
              <PhoneSmartWatchIcon />
              <h3 className='font-bold text-xl'>Rozmawiaj i pisz z innymi</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

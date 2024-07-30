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
import CustomLink from '@/components/CustomLink/CustomLink';
import { categories, routes } from '@/constants/constants';

const getNewProducts = async () => {
  const params = new URLSearchParams({
    pageSize: '50',
    sortDirection: '0',
    pageNumber: '1',
    // sortBy: 'Headphones',
  });

  const respone = await fetch(`${process.env.NEXT_PUBLIC_DB_BASEURL}/api/Product?${params}`, {
    cache: 'no-cache',
  });

  return respone.json();
};

const Home = async ({ params: { locale } }: { params: { locale: Locale } }) => {
  const translation = await getDictionary(locale);

  const { items } = await getNewProducts();

  const newItems = items.slice(0, 3);

  return (
    <div className='flex flex-col sm:px-8 px-4 mb-64 '>
      <div className='flex flex-col lg:flex-row mb-40 lg:max-w-7xl py-14'>
        <div className='flex flex-col items-start justify-star w-full gap-8'>
          <h1 className='text-4xl lg:text-6xl text-dashboard-watch-title font-extrabold'>
            {translation.bestAccessoriesToReach}
          </h1>
          <span className='text-dashboard-watch-text'>{translation.presentCompanyMainPage}</span>
          <div className='flex-col sm:flex-row gap-4 lg:w-96 w-full z-10 hidden lg:flex'>
            <CustomLink
              href={`${routes.productList}/${categories.smartwatch}`}
              locale={locale}
              className='w-full'
            >
              <Button type='button' variant='bordered'>
                {translation.seeMore}
              </Button>
            </CustomLink>
            <CustomLink href={`${routes.product}/3`} locale={locale} className='w-full'>
              <Button type='button'>{translation.buyNow}</Button>
            </CustomLink>
          </div>
        </div>
        <div className='flex items-center w-full flex-col gap-4 lg:gap-8'>
          <img
            src={logo.src}
            alt='watch'
            className='transform rotate-12 max-w-40 max-h-40 sm:max-w-72 sm:max-h-72 my-8 sm:my-12 lg:my-0'
          />
          <span className='font-bold text-2xl text-dashboard-watch-title mb-8'>
            G3X Elite Smartwatch {translation.isAvailable} !!!
          </span>
        </div>
        <div className='flex flex-col sm:flex-row gap-4 lg:w-96 w-full z-10 lg:hidden'>
          <CustomLink
            href={`${routes.productList}/${categories.smartwatch}`}
            locale={locale}
            className='w-full'
          >
            <Button type='button' variant='bordered'>
              {translation.seeMore}
            </Button>
          </CustomLink>
          <CustomLink href={`${routes.product}/3`} locale={locale} className='w-full'>
            <Button type='button'>{translation.buyNow}</Button>
          </CustomLink>
        </div>
      </div>

      <div className='flex flex-col lg:flex-row items-center justify-center gap-20 mb-32 z-10'>
        <CompanyTraitsCard text={translation.onlinePayments} icon={<OnlinePaymentIcon />} />
        <CompanyTraitsCard text={translation.satisfactionGuaranteed} icon={<GuaranteeIcon />} />
        <CompanyTraitsCard text={translation.secureTransactions} icon={<SafetyTransactionIcon />} />
      </div>

      <div className='flex flex-col gap-6 mb-40 w-full'>
        <span className='font-bold text-xl text-main-purple'>{translation.popular}</span>
        <span className='font-bold text-2xl'>{translation.newProducts}</span>
        <div className='flex flex-col md:flex-row items-center gap-8 w-full md:justify-around'>
          {newItems.map(
            ({ name, price, averageRate, base64Image, id, quantity }: any, index: number) => {
              return (
                <ProductCard
                  photo={`data:image/;base64,${base64Image}`}
                  text={name}
                  rate={averageRate}
                  productId={id}
                  price={`${price} zł`}
                  translation={translation}
                  locale={locale}
                  quantity={quantity}
                />
              );
            }
          )}
        </div>
      </div>

      <div className='flex flex-col z-10 w-full justify-center items-center'>
        <div className='flex flex-col gap-10 md:mb-40 mb-20 w-full items-center'>
          <h2 className='text-6xl text-dashboard-watch-title font-extrabold '>
            {translation.advertisementSmartwatch.news}
          </h2>
          <p>{translation.advertisementSmartwatch.description}</p>
        </div>
        <div className='flex flex-col md:flex-row md:gap-10 gap-20'>
          <div className='flex flex-col justify-center items-center w-full xs:w-80 gap-4'>
            <CareAboutHealthIcon />
            <h3 className='font-bold text-xl'>
              {translation.advertisementSmartwatch.healthControl}
            </h3>
            <span className='text-dashboard-watch-text md:text-xl text-base text-center sm:text-left'>
              {translation.advertisementSmartwatch.healthControlDescription}
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
              <h3 className='font-bold text-xl text-center'>
                {translation.advertisementSmartwatch.recommendedBySportsman}
              </h3>
            </div>

            <div className='flex flex-col gap-4 items-center'>
              <PhoneSmartWatchIcon />
              <h3 className='font-bold text-xl'>
                {translation.advertisementSmartwatch.talkAndChat}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

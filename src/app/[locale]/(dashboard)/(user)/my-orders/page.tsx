import OrderStatus from '@/components/OrderStatus/OrderStatus';
import { Locale } from '../../../../../../i18n.config';
import { getDictionary } from '../../../../../../lib/dictionary';

import { cookies } from 'next/headers';

const getUserOrders = async (userId: string, userToken: string) => {
  const respone = await fetch(
    `${process.env.NEXT_PUBLIC_DB_BASEURL}/api/Account/${userId}/orders`,
    {
      method: 'GET',
      cache: 'no-cache',
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    }
  );

  return respone.json();
};

const MyOrdersPage = async ({ params: { locale } }: { params: { locale: Locale } }) => {
  const translation = await getDictionary(locale);

  const cookieStore = cookies();

  const userId = cookieStore.get('userId')?.value;

  const userToken = cookieStore.get('userToken')?.value;

  // TODO: Add proper handling
  if (!userId || !userToken) return;

  const userOrders = await getUserOrders(userId, userToken);
  console.log('userOrders', userOrders);

  return (
    <div className='flex flex-col justify-center items-center h-[calc(100%-64px)]'>
      <div className='flex flex-col w-full max-w-[700px] gap-12 mt-20'>
        <h1 className='font-medium text-5xl'>Twoje zamówienia</h1>

        <div className='flex flex-col'>
          <h2 className='font-medium text-3xl mb-6'>Zamówienie nr: 1</h2>
          <div className='flex flex-col border p-6 shadow-xl rounded-xl'>
            <div className='flex justify-between mb-7'>
              <span className='text-xl'>Data zamówienia: 08.06.2024</span>
              <span className='flex text-xl gap-4 items-center'>
                Status: <OrderStatus status='InProgress' translation={translation} />
              </span>
            </div>
            <div className='flex mb-6 w-full'>
              <div className='mr-6'>ZDJĘCIE</div>
              <div className='flex flex-col grow'>
                <span className='text-xl'>Zegarek 513-Z</span>
                <span className='text-base text-main-gray'>1 szt</span>
              </div>
              <span className='text-2xl font-medium'>1900 Zł</span>
            </div>
            <div className='flex mb-6 w-full'>
              <div className='mr-6'>ZDJĘCIE</div>
              <div className='flex flex-col grow'>
                <span className='text-xl'>Zegarek 513-Z</span>
                <span className='text-base text-main-gray'>1 szt</span>
              </div>
              <span className='text-2xl font-medium'>1900 Zł</span>
            </div>
            <div className='flex mb-6 w-full'>
              <div className='mr-6'>ZDJĘCIE</div>
              <div className='flex flex-col grow'>
                <span className='text-xl'>Zegarek 513-Z</span>
                <span className='text-base text-main-gray'>1 szt</span>
              </div>
              <span className='text-2xl font-medium'>1900 Zł</span>
            </div>
            <div className='flex w-full justify-end'>
              <span className='text-2xl font-medium'>Cena łącznie: 3000zł</span>
            </div>
          </div>
        </div>
        <div className='flex flex-col'>
          <h2 className='font-medium text-3xl mb-6'>Zamówienie nr: 1</h2>
          <div className='flex flex-col border p-6 shadow-xl rounded-xl'>
            <div className='flex justify-between mb-7'>
              <span className='text-xl'>Data zamówienia: 08.06.2024</span>
              <span className='flex text-xl gap-4 items-center'>
                Status: <OrderStatus status='InProgress' translation={translation} />
              </span>
            </div>
            <div className='flex mb-6 w-full'>
              <div className='mr-6'>ZDJĘCIE</div>
              <div className='flex flex-col grow'>
                <span className='text-xl'>Zegarek 513-Z</span>
                <span className='text-base text-main-gray'>1 szt</span>
              </div>
              <span className='text-2xl font-medium'>1900 Zł</span>
            </div>
            <div className='flex mb-6 w-full'>
              <div className='mr-6'>ZDJĘCIE</div>
              <div className='flex flex-col grow'>
                <span className='text-xl'>Zegarek 513-Z</span>
                <span className='text-base text-main-gray'>1 szt</span>
              </div>
              <span className='text-2xl font-medium'>1900 Zł</span>
            </div>
            <div className='flex mb-6 w-full'>
              <div className='mr-6'>ZDJĘCIE</div>
              <div className='flex flex-col grow'>
                <span className='text-xl'>Zegarek 513-Z</span>
                <span className='text-base text-main-gray'>1 szt</span>
              </div>
              <span className='text-2xl font-medium'>1900 Zł</span>
            </div>
            <div className='flex w-full justify-end'>
              <span className='text-2xl font-medium'>Cena łącznie: 3000zł</span>
            </div>
          </div>
        </div>
        <div className='flex flex-col'>
          <h2 className='font-medium text-3xl mb-6'>Zamówienie nr: 1</h2>
          <div className='flex flex-col border p-6 shadow-xl rounded-xl'>
            <div className='flex justify-between mb-7'>
              <span className='text-xl'>Data zamówienia: 08.06.2024</span>
              <span className='flex text-xl gap-4 items-center'>
                Status: <OrderStatus status='InProgress' translation={translation} />
              </span>
            </div>
            <div className='flex mb-6 w-full'>
              <div className='mr-6'>ZDJĘCIE</div>
              <div className='flex flex-col grow'>
                <span className='text-xl'>Zegarek 513-Z</span>
                <span className='text-base text-main-gray'>1 szt</span>
              </div>
              <span className='text-2xl font-medium'>1900 Zł</span>
            </div>
            <div className='flex mb-6 w-full'>
              <div className='mr-6'>ZDJĘCIE</div>
              <div className='flex flex-col grow'>
                <span className='text-xl'>Zegarek 513-Z</span>
                <span className='text-base text-main-gray'>1 szt</span>
              </div>
              <span className='text-2xl font-medium'>1900 Zł</span>
            </div>
            <div className='flex mb-6 w-full'>
              <div className='mr-6'>ZDJĘCIE</div>
              <div className='flex flex-col grow'>
                <span className='text-xl'>Zegarek 513-Z</span>
                <span className='text-base text-main-gray'>1 szt</span>
              </div>
              <span className='text-2xl font-medium'>1900 Zł</span>
            </div>
            <div className='flex w-full justify-end'>
              <span className='text-2xl font-medium'>Cena łącznie: 3000zł</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOrdersPage;

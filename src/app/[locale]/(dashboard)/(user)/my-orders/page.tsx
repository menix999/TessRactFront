import { format } from 'date-fns';
import { cookies } from 'next/headers';

import OrderStatus from '@/components/OrderStatus/OrderStatus';
import { Locale } from '../../../../../../i18n.config';
import { getDictionary } from '../../../../../../lib/dictionary';
import { IUserOrders } from './page.types';


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

  const userOrders: IUserOrders[] = await getUserOrders(userId, userToken);

  return (
    <div className='flex flex-col justify-center items-center h-[calc(100%-64px)]'>
      <div className='flex flex-col w-full max-w-[700px] gap-12 mt-20'>
        {!!userOrders.length && <h1 className='font-medium text-5xl'>{translation.yourOrders}</h1>}
        {!!userOrders.length ? userOrders.map(({id, orderDate, status, totalPrice, positions}) => {
          return (
            <div className='flex flex-col' key={id}>
          <h2 className='font-medium text-3xl mb-6'>{translation.orderNumber}: {id}</h2>
            <div className='flex flex-col border p-6 shadow-xl rounded-xl'>
              <div className='flex justify-between mb-7'>
                <span className='text-xl'>{translation.orderDate}: {format(new Date(orderDate), 'yyyy.MM.dd | HH:mm')}</span>
                <span className='flex text-xl gap-4 items-center'>
                  Status: <OrderStatus status={status} translation={translation} />
                </span>
              </div>
              {positions.map(({productName, base64Image}) => {
                return (
                  <div className='flex mb-6 w-full' key={id}>
                  <div className='mr-6'>
                  <img
                  src={`data:image/;base64,${base64Image}`}
                  alt='Watch photo in your order'
                  className='max-w-20 max-h-20 md:max-w-16 md:max-h-16'
                  />
                  </div>
                  <div className='flex flex-col grow'>
                    <span className='text-xl'>{productName}</span>
                    <span className='text-base text-main-gray'>1 szt</span>
                  </div>
                  <span className='flex items-center text-2xl font-medium'>1900 Zł</span>
                </div>
                )
              })}
              <div className='flex w-full justify-end'>
                <span className='text-2xl font-medium'>{translation.totalAmount}: {totalPrice} zł</span>
              </div>
            </div>
          </div>
          )
        }) : <span className='flex justify-center text-4xl'>{translation.actuallyYouDontHaveAnyOrders}</span>}
      </div>
    </div>
  );
};

export default MyOrdersPage;

import { cookies } from 'next/headers';
import { Locale } from '../../../../../../i18n.config';
import { getDictionary } from '../../../../../../lib/dictionary';
import ManageOrdersForm from '@/components/ManageOrdersForm/ManageOrdersForm';

const getOrdersList = async (userToken: string) => {
  const params = new URLSearchParams({
    // searchPhrase: '',
    // SortBy: '',
    sortDirection: '1',
    pageNumber: '1',
    PageSize: '50',
  });

  const response = await fetch(`${process.env.NEXT_PUBLIC_DB_BASEURL}/api/order?${params}`, {
    method: 'GET',
    cache: 'no-cache',
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });

  return response.json();
};

const ManageProductsPage = async ({ params: { locale } }: { params: { locale: Locale } }) => {
  const translation = await getDictionary(locale);

  const cookieStore = cookies();

  const userToken = cookieStore.get('userToken')?.value;

  if (!userToken) return;

  const ordersList = await getOrdersList(userToken);

  return (
    <div className='flex flex-col justify-center items-center h-[calc(100%-64px)] px-8'>
      <ManageOrdersForm translation={translation} ordersListData={ordersList.items} />
    </div>
  );
};

export default ManageProductsPage;

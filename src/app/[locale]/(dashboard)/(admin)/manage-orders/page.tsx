import { Locale } from '../../../../../../i18n.config';
import { getDictionary } from '../../../../../../lib/dictionary';
import ManageOrdersForm from '@/components/ManageOrdersForm/ManageOrdersForm';

const getOrdersList = async () => {
  const params = new URLSearchParams({
    // searchPhrase: '',
    // SortBy: '',
    sortDirection: '1',
    pageNumber: '1',
    PageSize: '50',
  });

  const respone = await fetch(`${process.env.NEXT_PUBLIC_DB_BASEURL}/api/order?${params}`, {
    cache: 'no-cache',
  });

  return respone.json();
};

const ManageProductsPage = async ({ params: { locale } }: { params: { locale: Locale } }) => {
  const translation = await getDictionary(locale);

  const ordersList = await getOrdersList();
  console.log('ordersList', ordersList);

  return (
    <div className='flex flex-col justify-center items-center h-[calc(100%-64px)] px-8'>
      <ManageOrdersForm translation={translation} ordersListData={ordersList.items} />
    </div>
  );
};

export default ManageProductsPage;

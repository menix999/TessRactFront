import { Locale } from '../../../../../../../i18n.config';
import { getDictionary } from '../../../../../../../lib/dictionary';
import ProductCard from '@/components/ProductCard/ProductCard';
import { IProductProperties } from '@/constants/globalConstant.types';

const getListProduct = async (slug: string) => {
  const params = new URLSearchParams({
    pageSize: '50',
    sortDirection: '0',
    pageNumber: '1',
    sortBy: slug,
  });

  const respone = await fetch(`${process.env.NEXT_PUBLIC_DB_BASEURL}/api/Product?${params}`, {
    cache: 'no-cache',
  });

  return respone.json();
};

const ProductListPage = async ({
  params: { locale, slug },
}: {
  params: { locale: Locale; slug: string };
}) => {
  const translation = await getDictionary(locale);

  const { items: productListData } = await getListProduct(slug);

  return (
    <div className='h-full mt-24'>
      {!!productListData.length ? (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-32'>
          {productListData.map(
            ({ id, base64Image, name, price, averageRate, quantity }: IProductProperties) => {
              return (
                <div className='flex justify-center items-start' key={id}>
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
                </div>
              );
            }
          )}
        </div>
      ) : (
        <span className='flex justify-center items-center w-full h-full text-4xl font-medium'>
          {translation.noAvailableProducts}
        </span>
      )}
    </div>
  );
};

export default ProductListPage;

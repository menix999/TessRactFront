import { cookies } from 'next/headers';

import { Locale } from '../../../../../../../i18n.config';
import { getDictionary } from '../../../../../../../lib/dictionary';
import DeliveryIcon from '@/assets/DeliveryIcon';
import Stars from '@/components/Stars/Stars';
import BuyProduct from '@/components/BuyProduct/BuyProduct';
import SeeFullDescription from '@/components/SeeFullDescription/SeeFullDescription';
import ProductOpinions from '@/components/ProductOpinions/ProductOpinions';

const getProduct = async (id: number) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_DB_BASEURL}/api/Product/${id}`, {
    cache: 'no-cache',
  });

  return response.json();
};

const getInfoAboutUser = async (userId?: string, userToken?: string) => {
  try {
    if (!userId || !userToken) return;

    const respone = await fetch(`${process.env.NEXT_PUBLIC_DB_BASEURL}/api/Account/${userId}`, {
      method: 'GET',
      cache: 'no-cache',
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });

    return respone.json();
  } catch (error) {
    console.log('error', error);
  }
};

const ProductPage = async ({
  params: { locale, id },
}: {
  params: { locale: Locale; id: string };
}) => {
  const translation = await getDictionary(locale);

  const productData = await getProduct(Number(id));

  const cookieStore = cookies();

  const userId = cookieStore.get('userId')?.value;
  const userToken = cookieStore.get('userToken')?.value;

  const infoAboutUser = await getInfoAboutUser(userId, userToken);

  const {
    id: productId,
    name,
    description,
    price,
    color,
    material,
    mark,
    category,
    ratesAmount,
    averageRate,
    base64Image,
    opinions,
    quantity,
  } = productData;

  return (
    <div className='flex flex-col items-center'>
      <div className='flex mt-52 w-full md:w-auto h-fit flex-col md:flex-row'>
        <div className='flex justify-center items-center'>
          <img
            src={`data:image/;base64,${base64Image}`}
            alt='New smartWatch'
            className='max-w-60 max-h-60 md:max-w-80 md:max-h-80'
          />
        </div>
        <div className='border rounded-xl border-main-gray w-full md:w-auto my-12 md:my-0 md:mx-20' />
        <div className='flex flex-col gap-4 mb-12 max-w-96 overflow-x-hidden'>
          <div className='flex gap-2'>
            <DeliveryIcon />
            <span className='text-main-green'>{translation.freeDelivery}</span>
          </div>
          <h2 className='font-bold text-2xl text-ellipsis whitespace-nowrap overflow-hidden'>
            {name}
          </h2>
          <span>
            <Stars count={averageRate} numberOfRates={ratesAmount} readonly />
          </span>
          <div className='flex'>
            <span className='text-secondary-gray mr-1 '>{translation.company}:</span>
            <span className='whitespace-nowrap overflow-hidden text-ellipsis'>{mark}</span>
          </div>
          <div className='flex'>
            <span className='text-secondary-gray mr-1 '>{translation.product}:</span>
            <span
              className={`whitespace-nowrap overflow-hidden text-ellipsis ${
                !!quantity ? 'text-main-green' : 'text-main-error-red'
              }`}
            >
              {!!quantity ? translation.available : translation.unavailable}
            </span>
          </div>
          <div className='flex'>
            <span className='text-secondary-gray mr-1 '>
              {translation.availableQuantityOfProduct}:
            </span>
            <span className='whitespace-nowrap overflow-hidden text-ellipsis'>{quantity}</span>
          </div>
          <div>
            <span className='text-secondary-gray mr-1'>{translation.material}:</span>
            <span>{material}</span>
          </div>
          <div>
            <span className='text-secondary-gray mr-1'>{translation.color}:</span>
            <span>{color}</span>
          </div>
          <SeeFullDescription seeFullDescriptionText={translation.seeFullDescription} />
          <span className='flex text-3xl'>{price} zł</span>
          <BuyProduct productData={productData} translation={translation} quantity={quantity} />
        </div>
      </div>
      <div
        className='flex flex-col items-start border-b-2 border-main-gray w-full pb-10 gap-4 mb-12'
        id='full-description'
      >
        <h2 className='text-2xl font-bold'>{translation.description}</h2>
        <span className='text-base break-all'>{description}</span>
      </div>
      <div className='flex flex-col items-start border-b-2 border-main-gray w-full pb-10 gap-4 mb-12'>
        <h2 className='text-2xl font-bold'>{translation.productDetails}</h2>
        <div>
          <span className='text-secondary-gray mr-1 whitespace-nowrap'>
            {translation.productName}:
          </span>
          <span className='break-all'>{name}</span>
        </div>
        <div>
          <span className='text-secondary-gray mr-1'>{translation.company}:</span>
          <span className='break-all'>{mark}</span>
        </div>
        <div>
          <span className='text-secondary-gray mr-1'>{translation.category}:</span>
          <span>{category}</span>
        </div>
        <div>
          <span className='text-secondary-gray mr-1'>{translation.color}:</span>
          <span>{color}</span>
        </div>
        <div>
          <span className='text-secondary-gray mr-1'>{translation.material}:</span>
          <span>{material}</span>
        </div>
      </div>
      <ProductOpinions
        translation={translation}
        productId={productId}
        opinions={opinions}
        firstName={infoAboutUser?.firstName}
        surname={infoAboutUser?.surname}
      />
    </div>
  );
};

export default ProductPage;

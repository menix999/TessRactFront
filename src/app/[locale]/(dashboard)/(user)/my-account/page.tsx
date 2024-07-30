import { cookies } from 'next/headers';

import { Locale } from '../../../../../../i18n.config';
import { getDictionary } from '../../../../../../lib/dictionary';

const getInfoAboutUser = async (userId: string, userToken: string) => {
  try {
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

interface IInforAboutUser {
  firstName: string;
  surname: string;
  email: string;
  phoneNumber: string;
  city: string;
  postalCode: string;
  street: string;
  apartmentNumber: string;
}

const MyAccountPage = async ({ params: { locale } }: { params: { locale: Locale } }) => {
  const translation = await getDictionary(locale);

  const cookieStore = cookies();

  const userId = cookieStore.get('userId')?.value;
  const userToken = cookieStore.get('userToken')?.value;

  if (!userId || !userToken) return;

  const infoAboutUser: IInforAboutUser = await getInfoAboutUser(userId, userToken);

  const { firstName, surname, email, phoneNumber, city, postalCode, street, apartmentNumber } =
    infoAboutUser;
  return (
    <div className='flex flex-col justify-center items-center h-[calc(100%-64px)]'>
      <div className='flex flex-col w-full max-w-[700px] gap-8 '>
        <h1 className='font-medium text-4xl mb-4'>{translation.myAccount}:</h1>
        {firstName && (
          <div className='flex'>
            <span className='mr-2 font-bold'>{translation.name}:</span>
            <span>{firstName}</span>
          </div>
        )}
        {surname && (
          <div className='flex'>
            <span className='mr-2 font-bold'>{translation.surname}:</span>
            <span>{surname}</span>
          </div>
        )}
        {email && (
          <div className='flex'>
            <span className='mr-2 font-bold'>{translation.email}:</span>
            <span>{email}</span>
          </div>
        )}
        {phoneNumber && (
          <div className='flex'>
            <span className='mr-2 font-bold'>{translation.phoneNumber}:</span>
            <span>{phoneNumber}</span>
          </div>
        )}
        {city && (
          <div className='flex'>
            <span className='mr-2 font-bold'>{translation.city}:</span>
            <span>{city}</span>
          </div>
        )}
        {postalCode && (
          <div className='flex'>
            <span className='mr-2 font-bold'>{translation.postalCode}:</span>
            <span>{postalCode}</span>
          </div>
        )}
        {street && (
          <div className='flex'>
            <span className='mr-2 font-bold'>{translation.street}:</span>
            <span>{street}</span>
          </div>
        )}
        {apartmentNumber && (
          <div className='flex'>
            <span className='mr-2 font-bold'>{translation.apartmentNumber}:</span>
            <span>{apartmentNumber}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAccountPage;

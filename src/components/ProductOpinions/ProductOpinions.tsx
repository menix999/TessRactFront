'use client';

import { useEffect, useState } from 'react';
import AddOpinionForm from '../AddOpinionForm/AddOpinionForm';
import Stars from '../Stars/Stars';
import UserAvatar from '../UserAvatar/UserAvatar';
import { IOpinionProduct, IProductOpinionsProps } from './ProductOpinions.types';
import { useAuth } from '@/context/AuthContext/AuthContext';

const ProductOpinions = ({
  translation,
  productId,
  opinions,
  firstName,
  surname,
}: IProductOpinionsProps) => {
  const [opinionsData, setOpinionsData] = useState<IOpinionProduct[]>([]);

  useEffect(() => {
    setOpinionsData(opinions);
  }, [opinions]);

  const { userToken } = useAuth();
  return (
    <>
      {userToken && (
        <AddOpinionForm
          translation={translation}
          productId={productId}
          setOpinionsData={setOpinionsData}
          firstName={firstName}
          surname={surname}
        />
      )}
      <div className='flex flex-col items-start w-full pb-10 gap-4 mb-12'>
        <h2 className='text-2xl font-bold mb-4'>{translation.opinions}</h2>
        {!!opinionsData.length ? (
          opinionsData.map(
            ({
              opinionId,
              firstName,
              surname,
              commentContent,
              creationDate,
              rate,
            }: IOpinionProduct) => {
              return (
                <div
                  className='flex flex-col gap-4 border-b-2 border-main-gray pb-8 w-full mb-4'
                  key={opinionId}
                >
                  <div className='flex gap-3 items-center'>
                    <UserAvatar firstName={firstName} lastName={surname} />
                    <span>
                      {firstName} {surname}
                    </span>
                  </div>
                  <div>
                    <Stars
                      count={rate}
                      translation={translation}
                      opinionDateTime={creationDate}
                      readonly
                    />
                  </div>
                  <div>
                    <span>{commentContent}</span>
                  </div>
                </div>
              );
            }
          )
        ) : (
          <span className='flex w-full justify-center text-2xl font-medium'>
            {translation.noOpionionsAboutThisProduct}
          </span>
        )}
      </div>
    </>
  );
};

export default ProductOpinions;

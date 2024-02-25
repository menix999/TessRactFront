'use client';

import axios from 'axios';
import Button from '../Button/Button';
import { useEffect, useState } from 'react';
import { getDictionary } from '../../../lib/dictionary';
import Link from 'next/link';
import { routes } from '@/constants/constants';

interface IActivateLinkFormProps {
  translation: Awaited<ReturnType<typeof getDictionary>>;
}

const ActivateLinkForm = ({ translation }: IActivateLinkFormProps) => {
  const [isVerified, setIsVerified] = useState(false);

  const handleActivateAccount = async () => {
    try {
      const url = window.location.href;
      const finalUrl = url.replace('localhost:3000/account', 'localhost:5250/api/Account');

      const response = await axios.put(finalUrl);

      if (response) {
        setIsVerified(true);
      }
    } catch (error) {
      console.log('ActivateLinkForm error', error);
    }
  };

  useEffect(() => {
    handleActivateAccount();
  }, []);

  return (
    <div className='ml-4'>
      {isVerified ? (
        <span>{translation.yourAccountHasBeenActivated}</span>
      ) : (
        <span>{translation.errorMessage.thereIsAProblemWithActivatingYourAccount}</span>
      )}
      <Link className='mt-4' href={routes.main}>
        <Button type='button'>Powrót do strony głównej</Button>
      </Link>
    </div>
  );
};

export default ActivateLinkForm;

import React from 'react';

import { IMainFooterProps } from './MainFooter.types';
import PhoneIcon from '@/assets/PhoneIcon';
import EnvelopIcon from '@/assets/EnvelopIcon';
import MapIcon from '@/assets/MapIcon';

const MainFooter = ({ translation }: IMainFooterProps) => {
  return (
    <footer className='flex h-64 px-8 pt-8 justify-center'>
      <div className='flex flex-col w-full items-start'>
        <p className='font-bold mb-6'>Informacje</p>
        <span>Promocje</span>
      </div>

      <div className='flex flex-col w-full items-start'>
        <p className='font-bold mb-6'>Tess-ract</p>
        <span>Regulamin</span>
        <span>O nas</span>
      </div>

      <div className='flex flex-col w-full items-start'>
        <p className='font-bold mb-6'>Kontakt</p>
        <div className='flex gap-3 flex-col'>
          <div className='flex gap-6'>
            <PhoneIcon />
            <span>663 339 122</span>
          </div>
          <div className='flex gap-6'>
            <EnvelopIcon />
            <span>damiansmolinski32@gmail.com</span>
          </div>
          <div className='flex gap-6'>
            <MapIcon />
            <span>Bydgoszcz</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default MainFooter;

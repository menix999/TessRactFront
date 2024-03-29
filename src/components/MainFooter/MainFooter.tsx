'use client';

import React, { useState } from 'react';
import Link from 'next/link';

import { IMainFooterProps } from './MainFooter.types';
import PhoneIcon from '@/assets/PhoneIcon';
import EnvelopIcon from '@/assets/EnvelopIcon';
import MapIcon from '@/assets/MapIcon';
import useIsMobile from '@/hooks/useIsMobile';
import PlusIcon from '@/assets/PlusIcon';
import { routes } from '@/constants/constants';
import CustomLink from '../CustomLink/CustomLink';

const MainFooter = ({ translation, locale }: IMainFooterProps) => {
  const isMobile = useIsMobile();
  const [infoOpen, setInfoOpen] = useState(false);
  const [tessRactOpen, setTessRactOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <footer className='flex sm:h-64 pt-8 justify-center'>
      {isMobile ? (
        <div className='flex flex-col w-full items-start mb-8'>
          <button
            className='flex w-full justify-between font-bold mb-4'
            onClick={() => setInfoOpen(!infoOpen)}
          >
            {translation.footer.informations}
            <PlusIcon />
          </button>
          {infoOpen && (
            <CustomLink
              href={routes.regulations}
              locale={locale}
              className='hover:underline cursor-pointer'
            >
              {translation.footer.regulations}
            </CustomLink>
          )}

          <button
            className='flex w-full justify-between font-bold mb-4 mt-3'
            onClick={() => setTessRactOpen(!tessRactOpen)}
          >
            Tess-ract
            <PlusIcon />
          </button>
          {tessRactOpen && (
            <div className='flex flex-col gap-3'>
              <CustomLink
                href={routes.aboutUs}
                locale={locale}
                className='hover:underline cursor-pointer'
              >
                {translation.footer.aboutUs}
              </CustomLink>
            </div>
          )}

          <button
            className='flex w-full justify-between font-bold mb-4 mt-3'
            onClick={() => setContactOpen(!contactOpen)}
          >
            {translation.footer.contact}
            <PlusIcon />
          </button>
          {contactOpen && (
            <div className='flex flex-col gap-3'>
              <div className='flex gap-6'>
                <PhoneIcon />
                <span>663 339 122</span>
              </div>
              <div className='flex gap-6'>
                <EnvelopIcon />
                <span>dawid.borowik400@gmail.com</span>
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
          )}
        </div>
      ) : (
        <div className='flex flex-col sm:flex-row w-full items-start'>
          <div className='flex flex-col w-full items-start'>
            <p className='font-bold mb-6'>{translation.footer.informations}</p>
            <CustomLink
              href={routes.regulations}
              locale={locale}
              className='hover:underline cursor-pointer'
            >
              {translation.footer.regulations}
            </CustomLink>
          </div>

          <div className='flex flex-col w-full items-start'>
            <p className='font-bold mb-6'>Tess-ract</p>
            <CustomLink
              href={routes.aboutUs}
              locale={locale}
              className='hover:underline cursor-pointer'
            >
              {translation.footer.aboutUs}
            </CustomLink>
          </div>

          <div className='flex flex-col w-full items-start'>
            <p className='font-bold mb-6'>{translation.footer.contact}</p>
            <div className='flex gap-3 flex-col'>
              <div className='flex gap-6'>
                <PhoneIcon />
                <span>663 339 122</span>
              </div>
              <div className='flex gap-6'>
                <EnvelopIcon />
                <span>dawid.borowik400@gmail.com</span>
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
        </div>
      )}
    </footer>
  );
};

export default MainFooter;

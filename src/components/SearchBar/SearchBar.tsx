'use client';

import React, { ChangeEvent, useEffect, useRef, useState } from 'react';

import MagnifierIcon from '@/assets/MagnifierIcon';
import useDebounce from '@/hooks/useDebounce';
import { IProductProperties } from '@/constants/globalConstant.types';
import { ISearchBarProps } from './SearchBar.types';
import CustomLink from '../CustomLink/CustomLink';
import { routes } from '@/constants/constants';
import { useDetectOutsideClick } from '@/hooks/useDetectOutsideClick';

const getListProduct = async (debouncedSearchValue: string) => {
  const params = new URLSearchParams({
    pageSize: '50',
    sortDirection: '0',
    pageNumber: '1',
    searchPhrase: debouncedSearchValue,
  });

  const response = await fetch(`${process.env.NEXT_PUBLIC_DB_BASEURL}/api/Product?${params}`, {
    cache: 'no-cache',
  });

  return response.json();
};

const SearchBar = ({ placeholder, type, value, locale, translation }: ISearchBarProps) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [productList, setProductList] = useState<IProductProperties[] | null>([]);
  const debouncedSearchValue = useDebounce<string>(searchValue, 500);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const refSearch = useRef<HTMLDivElement>(null);

  useDetectOutsideClick(refSearch, () => setIsOpen(false));

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value.toLowerCase());
  };

  const fetchData = async () => {
    const productList = await getListProduct(debouncedSearchValue);

    if (!productList.items.length) {
      return setProductList(null);
    }

    setProductList(productList.items);
    setIsOpen(true);
  };

  useEffect(() => {
    if (!debouncedSearchValue) {
      setProductList([]);
      return;
    }

    fetchData();
  }, [debouncedSearchValue]);

  return (
    <div className='flex w-full relative' ref={refSearch}>
      <input
        placeholder={placeholder}
        onChange={handleSearch}
        onClick={() => setIsOpen(true)}
        value={value}
        maxLength={255}
        type={type}
        className='h-10 w-full text-sm p-3 transition duration-100 outline-none border border-solid rounded-l-xl border-main-gray focus:border-2 focus:border-main-purple'
      />
      <div className='flex justify-center hover:bg-main-purple-hover items-center h-10 w-14 rounded-r-xl bg-main-purple cursor-pointer'>
        <MagnifierIcon />
      </div>
      {isOpen && (
        <div className='absolute flex flex-col top-12 w-full max-h-96 overflow-auto bg-white shadow-xl rounded-xl z-10'>
          {!productList && (
            <span className='flex justify-center whitespace-nowrap font-medium items-center text-center w-full h-16'>
              {translation.lackOfSearchedProducts}
            </span>
          )}
          {productList &&
            !!productList.length &&
            productList.map(({ id, base64Image, name, price }: IProductProperties, index) => {
              return (
                <>
                  <CustomLink
                    key={id}
                    href={`${routes.product}/${id}`}
                    locale={locale}
                    className='flex justify-between px-4 py-5 items-center cursor-pointer'
                  >
                    <div className='flex justify-center w-16 h-16'>
                      <img
                        src={`data:image/;base64,${base64Image}`}
                        alt={name}
                        className='items-center max-w-16 max-h-16'
                      />
                    </div>
                    <span className='text-base flex-grow ml-4'>{name}</span>
                    <span className='text-base '>{price} zł</span>
                  </CustomLink>
                  {productList.length !== index + 1 && (
                    <div className='ml-auto mr-auto border w-4/5 rounded-2xl border-main-gray' />
                  )}
                </>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default SearchBar;

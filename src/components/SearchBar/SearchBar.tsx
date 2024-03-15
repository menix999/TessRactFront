import React, { ChangeEvent } from 'react';

import MagnifierIcon from '@/assets/MagnifierIcon';

interface ISearchBar {
  placeholder?: string;
  type?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  errorMessage?: string;
}

const SearchBar = ({ placeholder, type, value, onChange }: ISearchBar) => {
  return (
    <div className='flex w-full'>
      <input
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        maxLength={255}
        type={type}
        className='h-10 w-full text-sm p-3 transition duration-100 outline-none border border-solid rounded-l-xl border-main-gray focus:border-2 focus:border-main-purple'
      />
      <div className='flex justify-center hover:bg-main-purple-hover items-center h-10 w-14 rounded-r-xl bg-main-purple cursor-pointer'>
        <MagnifierIcon />
      </div>
    </div>
  );
};

export default SearchBar;

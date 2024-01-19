'use client';
import React from 'react';

import { ICheckbox } from './Checkbox.types';

const Checkbox = ({ id, checked, onChange, indeterminateCheckbox }: ICheckbox) => {
  return (
    <div className='flex justify-center items-center'>
      <input
        id={id}
        checked={checked}
        onChange={onChange}
        type='checkbox'
        className='hidden border-0 h-px -m-px overflow-hidden p-0 absolute whitespace-nowrap w-px mr-2'
      />
      <div
        className={
          checked
            ? 'inline-block w-5 z-10 mr-2 bg-main-purple rounded transition duration-150 border-2 border-main-purple border-solid visible'
            : 'inline-block w-5 z-10 mr-2 bg-white rounded transition duration-150 border-2 border-main-gray border-solid'
        }
      >
        <svg className='fill-none stroke-white stroke-2' viewBox='0 0 24 24'>
          {indeterminateCheckbox ? (
            <polyline points='12 12 3 12 21 12' />
          ) : (
            <polyline points='20 6 9 17 4 12' />
          )}
        </svg>
      </div>
    </div>
  );
};

export default Checkbox;

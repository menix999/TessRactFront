'use client';
import React from 'react';

import { ICheckbox } from './Checkbox.types';

const Checkbox = ({ id, isChecked, onChange, indeterminateCheckbox, isError }: ICheckbox) => {
  return (
    <div className='flex justify-center items-center'>
      <input
        id={id}
        checked={isChecked}
        onChange={onChange}
        type='checkbox'
        className='hidden border-0 h-px -m-px overflow-hidden p-0 absolute whitespace-nowrap w-px mr-2'
      />
      <div
        className={
          `inline-block w-5 z-10 mr-2 rounded transition duration-150 border-2 border-solid ${isChecked ? 'bg-main-purple border-main-purple visible' : 'bg-white border-main-gray'} `
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

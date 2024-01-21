import React from 'react';

const PolandFlagIcon = () => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' fill='none' viewBox='0 0 32 32'>
      <g clipPath='url(#clip0_312_255)'>
        <mask
          id='mask0_312_255'
          style={{ maskType: 'luminance' }}
          width='32'
          height='32'
          x='0'
          y='0'
          maskUnits='userSpaceOnUse'
        >
          <path
            fill='#fff'
            d='M0 16C0 7.163 7.163 0 16 0s16 7.163 16 16-7.163 16-16 16S0 24.837 0 16z'
          />
        </mask>
        <g mask='url(#mask0_312_255)'>
          <path fill='#F7FCFF' fillRule='evenodd' d='M0 0v32h32V0H0z' clipRule='evenodd' />
          <mask
            id='mask1_312_255'
            style={{ maskType: 'luminance' }}
            width='32'
            height='32'
            x='0'
            y='0'
            maskUnits='userSpaceOnUse'
          >
            <path fill='#fff' fillRule='evenodd' d='M0 0v32h32V0H0z' clipRule='evenodd' />
          </mask>
          <g mask='url(#mask1_312_255)'>
            <path fill='#F50D0B' fillRule='evenodd' d='M0 16v16h32V16H0z' clipRule='evenodd' />
          </g>
        </g>
      </g>
      <rect
        width='31.5'
        height='31.5'
        x='0.25'
        y='0.25'
        stroke='#B0B0B0'
        strokeWidth='0.5'
        rx='15.75'
      />
      <defs>
        <clipPath id='clip0_312_255'>
          <rect width='32' height='32' fill='#fff' rx='16' />
        </clipPath>
      </defs>
    </svg>
  );
};

export default PolandFlagIcon;

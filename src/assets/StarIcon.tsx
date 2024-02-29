import React from 'react';

function StarIcon({ isGold }: { isGold: boolean }) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='26' height='25' fill='none' viewBox='0 0 26 25'>
      <g filter='url(#filter0_d_251_103)'>
        <path
          fill={isGold ? '#FFF621' : '#B0B0B0'}
          d='M13 3l2.02 6.219h6.54l-5.29 3.843 2.02 6.22L13 15.437 7.71 19.28l2.02-6.219L4.44 9.22h6.54L13 3z'
        ></path>
      </g>
      <defs>
        <filter
          id='filter0_d_251_103'
          width='25.119'
          height='24.281'
          x='0.441'
          y='0'
          colorInterpolationFilters='sRGB'
          filterUnits='userSpaceOnUse'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix'></feFlood>
          <feColorMatrix
            in='SourceAlpha'
            result='hardAlpha'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
          ></feColorMatrix>
          <feOffset dy='1'></feOffset>
          <feGaussianBlur stdDeviation='2'></feGaussianBlur>
          <feComposite in2='hardAlpha' operator='out'></feComposite>
          <feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0'></feColorMatrix>
          <feBlend in2='BackgroundImageFix' result='effect1_dropShadow_251_103'></feBlend>
          <feBlend in='SourceGraphic' in2='effect1_dropShadow_251_103' result='shape'></feBlend>
        </filter>
      </defs>
    </svg>
  );
}

export default StarIcon;

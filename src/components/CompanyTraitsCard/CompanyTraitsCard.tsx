import React, { ChangeEvent } from 'react';

import { ICompanyTraitsCardProps } from './CompanyTraitsCard.types';

const CompanyTraitsCard = ({ text, icon }: ICompanyTraitsCardProps) => {
  return (
    <div className='flex flex-col w-full xs:w-80 justify-center items-center shadow-xl py-4 px-6 rounded-xl bg-white'>
      {icon}
      <span className='font-bold text-2xl whitespace-nowrap'>{text}</span>
    </div>
  );
};

export default CompanyTraitsCard;

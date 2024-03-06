import React, { ChangeEvent } from 'react';

import { ICompanyTraitsCardProps } from './CompanyTraitsCard.types';

const CompanyTraitsCard = ({ text, icon }: ICompanyTraitsCardProps) => {
  return (
    <div className='flex flex-col w-80 justify-center items-center shadow-xl p-4 rounded-xl bg-white'>
      {icon}
      <span className='font-bold text-2xl'>{text}</span>
    </div>
  );
};

export default CompanyTraitsCard;

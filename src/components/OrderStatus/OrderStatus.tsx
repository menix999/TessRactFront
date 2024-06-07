import React from 'react';

import { IOrderStatusProps } from './OrderStatus.types';

const OrderStatus = ({ status, translation }: IOrderStatusProps) => {
  const handleContentStatus = (status: string) => {
    return 'asd';
  };

  const colorStatuses = {
    New: '#4CAF50',
    InProgress: '#03A9F4',
    Sent: '#9C27B0',
    Delivered: '#84DA21',
    Cancelled: '#FF3434',
  };

  return (
    <div className='flex justify-center items-center rounded h-8 w-[120px] bg-main-green'>
      <span className='text-white text-base'>{translation.statuses.new}</span>
    </div>
  );
};

export default OrderStatus;

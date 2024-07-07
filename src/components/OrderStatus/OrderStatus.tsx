import React from 'react';
import clsx from 'clsx';

import { IOrderStatusProps } from './OrderStatus.types';
import { OrderStatuses } from '@/constants/constants';

const OrderStatus = ({ status, translation }: IOrderStatusProps) => {
  const handleContentStatus = (status: string) => {
    return statuses.map(({ nameValue, name, color, id }) => {
      if (status === nameValue) {
        return (
          <div
            className={'flex justify-center items-center rounded h-8 w-[120px]'}
            key={id}
            style={{ backgroundColor: color }}
          >
            <span className='text-white text-base'>{name}</span>
          </div>
        );
      }
    });
  };

  const { statuses } = OrderStatuses(translation);

  return handleContentStatus(status);
};

export default OrderStatus;

'use client';

import { format, isToday, isYesterday } from 'date-fns';
import pl from 'date-fns/locale/pl';
import { useState } from 'react';

import StarIcon from '@/assets/StarIcon';
import { IStarsProps } from './Stars.types';

const Stars = ({
  count,
  numberOfRates,
  opinionDateTime,
  translation,
  readonly,
  onChange,
}: IStarsProps) => {
  const [hoveredStars, setHoveredStars] = useState<number | null>(null);
  const [selectedStars, setSelectedStars] = useState<number>(count);

  const handleMouseEnter = (index: number) => {
    if (readonly) return;
    setHoveredStars(index);
  };

  const handleMouseLeave = () => {
    if (readonly) return;
    setHoveredStars(null);
  };

  const handleClick = (index: number) => {
    if (readonly) return;
    setSelectedStars(index + 1);

    if (onChange) {
      onChange(index + 1);
    }
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => {
      const isGold = hoveredStars !== null ? index <= hoveredStars : index < selectedStars;
      return (
        <div
          key={index}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(index)}
          className={`${readonly ? 'normal' : 'cursor-pointer'} inline-block`}
        >
          <StarIcon isGold={isGold} />
        </div>
      );
    });
  };

  const handleGetFormattedData = (dateTime: string) => {
    if (!dateTime || !translation) return;

    const startedDateTime = new Date(dateTime);

    if (isToday(startedDateTime)) return `${translation.today}`;
    if (isYesterday(startedDateTime)) return `${translation.yesterday}`;
    return `${format(startedDateTime, 'eee dd MMMM', {
      locale: pl,
    })} o ${format(startedDateTime, 'HH:mm')}`;
  };

  return (
    <div className='flex'>
      {renderStars()}
      {!!numberOfRates && (
        <span className='text-secondary-gray ml-4'>
          {numberOfRates && `${numberOfRates} oceny`}
        </span>
      )}
      {opinionDateTime && (
        <div className='flex justify-center'>
          <div className='border ml-4 border-main-gray h-6' />
          <span className='text-secondary-gray ml-4'>
            {handleGetFormattedData(opinionDateTime)}
          </span>
        </div>
      )}
    </div>
  );
};

export default Stars;

import { format, isToday, isYesterday } from 'date-fns';
import pl from 'date-fns/locale/pl';

import StarIcon from '@/assets/StarIcon';
import { IStarsProps } from './Stars.types';

const Stars = async ({ count, numberOfRates, opinionDateTime, translation }: IStarsProps) => {
  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => {
      return <StarIcon key={index} isGold={index < count} />;
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

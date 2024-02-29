import StarIcon from '@/assets/StarIcon';
import { IStarsProps } from './Stars.types';

const Stars = async ({ count, numberOfRates }: IStarsProps) => {
  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => {
      return <StarIcon key={index} isGold={index < count} />;
    });
  };

  return (
    <div className='flex'>
      {renderStars()}
      {numberOfRates && <span className='text-secondary-gray ml-4'>({numberOfRates} oceny)</span>}
    </div>
  );
};

export default Stars;

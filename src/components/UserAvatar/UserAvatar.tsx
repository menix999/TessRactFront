import React from 'react';

import { avatarColors } from '@/constants/constants';
import { IUserAvatarProps } from './UserAvatar.types';

const UserAvatar = ({ firstName, lastName }: IUserAvatarProps) => {
  const generateColor = (initials: string) => {
    const index = initials.charCodeAt(0) % avatarColors.length;
    return avatarColors[index];
  };

  const getInitials = (firstName: string, lastName: string) => {
    const firstInitial = firstName ? firstName[0].toUpperCase() : '';
    const lastInitial = lastName ? lastName[0].toUpperCase() : '';
    return firstInitial + lastInitial;
  };

  const initials = getInitials(firstName, lastName);
  const backgroundColor = generateColor(initials);

  return (
    <div
      className='rounded-full w-12 h-12 flex items-center justify-center'
      style={{ backgroundColor }}
    >
      <span className='text-white text-lg font-bold'>{initials}</span>
    </div>
  );
};

export default UserAvatar;

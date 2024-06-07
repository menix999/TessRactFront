'use client';

import ActionIcon from '@/assets/ActionIcon';
import { useDetectOutsideClick } from '@/hooks/useDetectOutsideClick';
import { useState, useRef } from 'react';

interface IActionButtonProps {
  handleContent: any;
}

const ActionButton = ({ handleContent }: IActionButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const actionRef = useRef<HTMLDivElement>(null);

  useDetectOutsideClick(actionRef, () => setIsOpen(false));
  console.log('isOpen', isOpen);

  return (
    <div ref={actionRef} className='cursor-pointer' onClick={() => setIsOpen(true)}>
      <ActionIcon />

      {isOpen && <div className='absolute top-10 right-8 z-50'>{handleContent()}</div>}
    </div>
  );
};

export default ActionButton;

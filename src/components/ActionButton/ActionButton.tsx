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

  return (
    <div ref={actionRef} className='cursor-pointer' onClick={() => setIsOpen((prevValue) => !prevValue)}>
      <ActionIcon />

      {isOpen && <div className='absolute top-7 right-5 z-50'>{handleContent()}</div>}
    </div>
  );
};

export default ActionButton;

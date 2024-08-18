import { useEffect, useRef, useState } from 'react';
import { useDetectOutsideClick } from '../../hooks/useDetectOutsideClick';
import { IDropdownInputProps } from './DropdownInput.types';
import ArrowIcon from '@/assets/ArrowIcon';

const DropdownInput = ({
  placeholder,
  inputTitle,
  disabled,
  options,
  value,
  isArrow,
  onChange,
  isDropdownPositionOnUp,
  isDropdownListPositionOnUp,
  isRequired,
  error,
  setFunction,
  additionalHandler,
  isCalendarForm,
}: IDropdownInputProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const refDropdown = useRef<HTMLDivElement>(null);

  const refInput = useRef<HTMLInputElement>(null);

  useDetectOutsideClick(refDropdown, () => setIsOpen(false));

  const handleAddValue = (valueKey: any) => {
    setIsOpen(false);
    if (onChange) onChange(valueKey);
    if (setFunction) setFunction(valueKey);

    if (additionalHandler) {
      additionalHandler();
    }
  };

  const handleRemoveOurValue = () => {
    setFunction('');
    if (refInput.current) refInput.current.value = '';

    if (additionalHandler) {
      additionalHandler();
    }
  };

  useEffect(() => {
    if (isCalendarForm) {
      if (!value) {
        if (refInput.current) refInput.current.value = '';
      }
    }
  }, [value]);

  return (
    <>
      {inputTitle && (
        <span className='flex ml-0 mb-2 w-auto text-sm'>
          {inputTitle}
          {isRequired && <div className='h-4 ml-1 text-base text-main-error-red'>*</div>}
        </span>
      )}
      <div ref={refDropdown} className='flex flex-col relative w-full'>
        <div className='flex w-full relative'>
          <input
            onClick={() => setIsOpen((prevValue) => !prevValue)}
            readOnly
            placeholder={placeholder}
            disabled={disabled}
            value={value?.name || value || ''}
            onChange={onChange}
            ref={refInput}
            className={`flex p-3 border border-main-gray h-10 w-full rounded-xl outline-none cursor-pointer whitespace-nowrap overflow-hidden text-ellipsis ${
              error && 'border-main-error-red'
            }`}
          />
          <div>
            {isArrow && !disabled && (
              <div
                onClick={() => setIsOpen((prevValue) => !prevValue)}
                className={`absolute flex h-full items-center right-6 cursor-pointer ${
                  isDropdownPositionOnUp ? 'rotate-180' : 'rotate-0'
                } transition duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
              >
                <ArrowIcon />
              </div>
            )}
          </div>
        </div>
        {isOpen && (
          <div
            className={`flex flex-col absolute max-h-56 z-20 top-[48px] bg-white w-full border border-main-gray rounded-xl overflow-y-auto cursor-pointer ${
              isDropdownListPositionOnUp && '-top-40'
            } top-[74px]`}
          >
            {!!options ? (
              options.map(({ id, name, nameValue }) => (
                <span
                  key={id}
                  onClick={() => handleAddValue({ id, name, nameValue })}
                  className='py-3 px-4 text-sm m-0 hover:bg-main-gray-hover'
                >
                  {name}
                </span>
              ))
            ) : (
              <div className='flex justify-center py-3 px-4 m-0 font-medium'>
                Brakuje opcji do wyboru
              </div>
            )}
          </div>
        )}
        <div className='flex absolute -bottom-5'>
          <span className='flex font-medium mt-1 text-xs text-main-error-red'>{error}</span>
        </div>
      </div>
    </>
  );
};

export default DropdownInput;

import React, { useState } from 'react';

const MAX_LENGTH = 500;

export interface ITextAreaProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

const TextareaInput = ({ placeholder, value, onChange, required }: ITextAreaProps) => {
  const [charCount, setCharCount] = useState(value ? value.length : 0);

  const handleInputChange = (e: any) => {
    const inputValue = e.target.value;
    if (inputValue.length <= MAX_LENGTH) {
      setCharCount(inputValue.length);
      onChange(inputValue);
    }
  };

  return (
    <div className='flex flex-col'>
      <textarea
        className='invalid:border-main-error-red w-full p-2 border border-main-gray rounded-xl focus:outline-none focus:border-main-purple focus:border-2 min-h-20'
        placeholder={placeholder}
        value={value}
        required={required}
        onChange={handleInputChange}
      />
      <span className='text-sm text-main-gray mt-1'>
        {charCount}/{MAX_LENGTH} characters
      </span>
    </div>
  );
};

export default TextareaInput;

import { ChangeEvent } from 'react';

export interface IOptionsProps {
  id: string | number;
  name: string | number;
  nameValue?: string | boolean;
}

export interface IDropdownInputProps {
  placeholder?: string;
  inputTitle?: string;
  disabled?: boolean;
  isArrow?: boolean;
  isRequired?: boolean;
  options: IOptionsProps[];
  onChange?: (event: ChangeEvent<HTMLDivElement> | string | IOptionsProps) => void;
  value?: any;
  isDropdownPositionOnUp?: boolean;
  isDropdownListPositionOnUp?: boolean;
  error?: boolean;
  isTopSizeDropdownWithoutInputTitle?: boolean;
  setFunction?: any;
  isDropdownWithDisablePossibility?: boolean;
  additionalHandler?: () => void;
  isSkeletonLoading?: boolean;
  isWidthAuto?: boolean;
  clearRef?: boolean;
  handleClear?: Function;
  isCalendarForm?: boolean;
  isPagination?: boolean;
  isWithoutFrames?: boolean;
}
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
setCurrentValueLimit,
currentValueLimit,
setCurrentPage,
setAmountOfRecordNumberToShow,
error,
setFunction,
additionalHandler,
isCalendarForm,

export interface IArrowDropdown {
  isOpen: boolean;
  isDropdownPositionOnUp?: boolean;
  isPagination?: boolean;
}

export interface IDropdownInputWrapper {
  width?: string;
}

export interface IDropdownInputInformation {
  isDropdownListPositionOnUp?: boolean;
  isTopSizeDropdownWithoutInputTitle?: boolean;
  isWidthAuto?: boolean;
  topValue?: string;
}

export interface IDropdownInputFormat {
  inputHeight?: string;
  isListDropdown?: boolean;
  isError?: boolean;
  isOpen?: boolean;
  isWithoutFrames?: boolean;
}

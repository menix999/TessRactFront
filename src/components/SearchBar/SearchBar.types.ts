import { ChangeEvent } from 'react';

export interface ISearchBarProps {
  placeholder?: string;
  type?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  errorMessage?: string;
  locale: string;
}

import { ChangeEvent } from 'react';
import { type getDictionary } from '../../../lib/dictionary';

export interface ISearchBarProps {
  placeholder?: string;
  type?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  errorMessage?: string;
  locale: string;
  translation: Awaited<ReturnType<typeof getDictionary>>;
}

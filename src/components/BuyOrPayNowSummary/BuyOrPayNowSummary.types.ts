import { type getDictionary } from '../../../lib/dictionary';

export interface IBuyOrPayNowSummaryProps {
  translation: Awaited<ReturnType<typeof getDictionary>>;
  isCartDiscount?: boolean;
  isAcceptedMethodsOfPayment?: boolean;
  total: number;
  locale: string;
  numberOfProducts?: Record<string, number>;
  isCartSummary?: boolean;
  type: 'button' | 'reset' | 'submit';
}

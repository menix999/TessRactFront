import { type getDictionary } from '../../../lib/dictionary';

export interface IDeliverySummaryFormProps {
  translation: Awaited<ReturnType<typeof getDictionary>>;
  locale: string;
}

export interface IDeliverySummaryForm {
  name: string;
  surname: string;
  email: string;
  city: string;
  street: string;
  postalCode: string;
  apartmentNumber: string;
  phoneNumber: string;
  // methodOfPayment: string;
}

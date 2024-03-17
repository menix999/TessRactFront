import { type getDictionary } from '../../../lib/dictionary';

export interface IAccountSettingsForm {
  // dateOfBirth: string;
  phoneNumber: string;
  city: string;
  postalCode: string;
  street: string;
  apartmentNumber: string;
}

export interface IAccountSettingsFormProps {
  translation: Awaited<ReturnType<typeof getDictionary>>;
}

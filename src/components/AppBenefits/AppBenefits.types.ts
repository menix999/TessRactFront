import { Locale } from '../../../i18n.config';

export interface IAppBenefits {
  locale: Locale;
  isLackOfAccount?: boolean;
  isWithoutAccount?: boolean;
}

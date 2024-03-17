import { i18n } from '../../i18n.config';

interface ICreateLanguagePath {
  href: string;
  locale: string;
}

export const createLanguagePath = ({ href, locale }: ICreateLanguagePath) => {
  const isDefaultLang = locale === i18n.defaultLocale;
  const newPathname = isDefaultLang ? href : `/${locale}${href}`;

  return newPathname;
};

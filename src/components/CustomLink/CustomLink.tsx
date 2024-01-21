import Link from 'next/link';
import { i18n } from '../../../i18n.config';

interface CustomLinkProps {
  href: string;
  locale: string;
  children: React.ReactNode;
  [key: string]: any;
}

export default function CustomLink({ href, locale, ...props }: CustomLinkProps) {
  const isDefaultLang = locale === i18n.defaultLocale;
  const path = isDefaultLang ? href : `/${locale}${href}`;
  return <Link href={path} {...props} />;
}

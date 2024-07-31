import Link from 'next/link';
import { i18n } from '../../../i18n.config';

interface CustomLinkProps {
  href: string;
  locale: string;
  children: React.ReactNode;
  [key: string]: any;
  customRef?: React.RefObject<HTMLAnchorElement>;
  isLink?: boolean;
}

export default function CustomLink({ href, locale, customRef, isLink, ...props }: CustomLinkProps) {
  const isDefaultLang = locale === i18n.defaultLocale;
  const path = isDefaultLang ? href : `/${locale}${href}`;

  if (isLink) return <Link href={path} ref={customRef} {...props} />;
  return <a href={path} ref={customRef} {...props} />;
}

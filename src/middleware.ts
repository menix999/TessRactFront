import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { i18n } from '../i18n.config';

import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { routesPermissionConfig } from './constants/constants';

function getLocale(request: NextRequest): string | undefined {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales;
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

  const locale = matchLocale(languages, locales, i18n.defaultLocale);
  return locale;
}

export function middleware(request: NextRequest) {
  const role = request.cookies.get('userRole')?.value || 'Guest';

  const pathname = request.nextUrl.pathname;

  const locale = getLocale(request);
  const myPersonalLocale = pathname.startsWith('/en') ? 'en' : 'pl';

  const routeConfig = routesPermissionConfig.find((route) => pathname.includes(route.path));

  if (routeConfig) {
    if (!routeConfig.roles.includes(role)) {
      return NextResponse.redirect(new URL(`/${myPersonalLocale}`, request.url));
    }
  }

  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    if (locale === i18n.defaultLocale) {
      return NextResponse.rewrite(
        new URL(`/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`, request.url)
      );
    }

    return NextResponse.redirect(
      new URL(`/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`, request.url)
    );
  }
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

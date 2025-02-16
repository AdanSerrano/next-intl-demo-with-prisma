import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
    locales: ['es', 'en', 'de', 'ru'],
    defaultLocale: 'es',
    localePrefix: 'never' // but you can use 'never' and 'always' for show or not locale prefix
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
    createNavigation(routing);
import { getTranslations, setRequestLocale } from 'next-intl/server';

import BaseLayout from '@/components/BaseLayout';
import { ReactNode } from 'react';
import { SupportedLocale } from '@/globals';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

type Props = {
    children: ReactNode;
    params: { locale: SupportedLocale };
};

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
    params
}: Omit<Props, 'children'>) {
    // Await params here
    const { locale } = await params;

    // Now you can safely use locale
    const t = await getTranslations({ locale, namespace: 'LocaleLayout' });

    return {
        title: t('title')
    };
}

export default async function LocaleLayout({
    children,
    params
}: Props) {
    const { locale } = await params;
    // Ensure that the incoming `locale` is valid
    if (!routing.locales.includes(locale)) {
        notFound();
    }

    // Enable static rendering
    setRequestLocale(locale);

    return <BaseLayout locale={locale}>{children}</BaseLayout>;
}
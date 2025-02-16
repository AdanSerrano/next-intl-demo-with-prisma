import { getTranslations, setRequestLocale } from 'next-intl/server';

import BaseLayout from '@/components/BaseLayout';
import { Metadata } from 'next';
import { ReactNode } from 'react';
import { SupportedLocale } from '@/globals';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

interface LayoutProps {
    children: ReactNode;
    params: Promise<{ locale: SupportedLocale }>;
}

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
    params
}: {
    params: Promise<{ locale: SupportedLocale }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({
        locale,
        namespace: 'LocaleLayout'
    });

    return {
        title: t('title')
    };
}

export default async function LocaleLayout({
    children,
    params
}: LayoutProps) {
    const { locale } = await params;

    if (!routing.locales.includes(locale)) {
        notFound();
    }

    setRequestLocale(locale);

    return <BaseLayout locale={locale}>{children}</BaseLayout>;
}
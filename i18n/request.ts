import { SupportedLocale } from '@/globals';
import { getRequestConfig } from 'next-intl/server';
import { prisma } from '@/prisma/prisma';
import { routing } from './routing';

type Messages = {
    [section: string]: {
        [key: string]: string;
    };
};

export default getRequestConfig(async ({ requestLocale }) => {
    let locale = await requestLocale;

    if (!locale || !routing.locales.includes(locale as SupportedLocale)) {
        locale = routing.defaultLocale;
    }

    const translations = await prisma.translation.findMany({
        where: { language: { code: locale } },
        select: { key: true, section: true, value: true }
    });

    const messages = translations.reduce((acc: Messages, { key, section, value }) => {
        if (!acc[section]) acc[section] = {};
        acc[section][key] = value;
        return acc;
    }, {} as Messages);

    return {
        locale,
        messages
    };
});
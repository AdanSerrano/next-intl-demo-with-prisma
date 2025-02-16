import { Inter } from 'next/font/google';
import Navigation from '@/components/Navigation';
import { NextIntlClientProvider } from 'next-intl';
import { ReactNode } from 'react';
import { clsx } from 'clsx';
import { getMessages } from 'next-intl/server';

const inter = Inter({ subsets: ['latin'] });

type Props = {
    children: ReactNode;
    locale: string;
};

export default async function BaseLayout({ children, locale }: Props) {
    const messages = await getMessages();

    return (
        <html className="h-full" lang={locale}>
            <body className={clsx(inter.className, 'flex h-full flex-col')}>
                <NextIntlClientProvider messages={messages}>
                    <Navigation />
                    {children}
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
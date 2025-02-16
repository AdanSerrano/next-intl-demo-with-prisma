import { Inter } from 'next/font/google';
import { Navigation } from './Navigation';
import { NextIntlClientProvider } from 'next-intl';
import { ReactNode } from 'react';
import { clsx } from 'clsx';
import { getMessages } from 'next-intl/server';

const inter = Inter({ subsets: ['latin'] });

interface BaseLayoutProps {
    children: ReactNode;
    locale: string;
};

export default async function BaseLayout({ children, locale }: BaseLayoutProps) {
    const messages = await getMessages();

    return (
        <html className="h-full" lang={locale} suppressHydrationWarning>
            <body className={clsx(inter.className, 'flex h-full flex-col')} suppressHydrationWarning>
                <NextIntlClientProvider messages={messages}>
                    <Navigation />
                    {children}
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
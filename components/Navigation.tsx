import LocaleSwitcher from './LocaleSwitcher';
import NavigationLink from './NavigationLink';
import { useTranslations } from 'next-intl';

export const Navigation = () => {
    const t = useTranslations('Navigation');
    return (
        <div className="bg-slate-850">
            <nav className="container flex justify-between p-2 text-white">
                <div>
                    <NavigationLink href="/">{t('home')}</NavigationLink>
                </div>
                <LocaleSwitcher />
            </nav>
        </div>
    );
}
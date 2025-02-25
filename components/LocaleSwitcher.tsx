import { useLocale, useTranslations } from 'next-intl';

import LocaleSwitcherSelect from './LocaleSwitcherSelect';
import { SelectItem } from './ui/select';
import { routing } from '@/i18n/routing';

export default function LocaleSwitcher() {
    const t = useTranslations('LocaleSwitcher');
    const locale = useLocale();

    return (
        <LocaleSwitcherSelect defaultValue={locale} label={t('label')}>
            {routing.locales.map((cur) => (
                <SelectItem key={cur} value={cur}>
                    {t('locale', { locale: cur })}
                </SelectItem>
            ))}
        </LocaleSwitcherSelect>
    );
}
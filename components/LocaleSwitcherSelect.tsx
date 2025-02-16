'use client';

import {
    Select,
    SelectContent,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { usePathname, useRouter } from '@/i18n/routing';

import { useTransition } from 'react';

interface LocaleSwitcherSelectProps {
    defaultValue: string;
    label: string;
    children: React.ReactNode;
};

export default function LocaleSwitcherSelect({
    children,
    defaultValue,
    label
}: LocaleSwitcherSelectProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const pathname = usePathname();
    function onSelectChange(value: string) {
        startTransition(() => {
            const newPathname = pathname;
            router.replace(newPathname, { locale: value });
        });
    }

    return (
        <Select onValueChange={onSelectChange} defaultValue={defaultValue}>
            <SelectTrigger className="w-[180px] text-black dark:text-white">
                <SelectValue className='text-black' placeholder={label} />
            </SelectTrigger>
            <SelectContent aria-disabled={isPending}>
                {children}
            </SelectContent>
        </Select>
    );
}
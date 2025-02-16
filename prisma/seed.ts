import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Añadimos los idiomas existentes
    const spanish = await prisma.language.upsert({
        where: { code: 'es' },
        update: {},
        create: {
            code: 'es',
            name: 'Español',
        },
    });

    const english = await prisma.language.upsert({
        where: { code: 'en' },
        update: {},
        create: {
            code: 'en',
            name: 'English',
        },
    });

    // Añadimos alemán
    const german = await prisma.language.upsert({
        where: { code: 'de' },
        update: {},
        create: {
            code: 'de',
            name: 'Deutsch',
        },
    });

    // Añadimos ruso
    const russian = await prisma.language.upsert({
        where: { code: 'ru' },
        update: {},
        create: {
            code: 'ru',
            name: 'Русский',
        },
    });

    const translations = [
        // Español
        {
            languageId: spanish.id,
            section: 'Navigation',
            key: 'home',
            value: 'Inicio'
        },
        {
            languageId: spanish.id,
            section: 'LocaleSwitcher',
            key: 'label',
            value: 'Cambiar idioma'
        },
        {
            languageId: spanish.id,
            section: 'LocaleSwitcher',
            key: 'locale',
            value: '{locale, select, es {🇪🇸 Español} en {🇺🇸 English} de {🇩🇪 Deutsch} ru {🇷🇺 Русский} other {{locale}}}'
        },
        {
            languageId: spanish.id,
            section: 'LocaleLayout',
            key: 'title',
            value: 'Mi Aplicación'
        },
        // English
        {
            languageId: english.id,
            section: 'Navigation',
            key: 'home',
            value: 'Home'
        },
        {
            languageId: english.id,
            section: 'LocaleSwitcher',
            key: 'label',
            value: 'Change language'
        },
        {
            languageId: english.id,
            section: 'LocaleSwitcher',
            key: 'locale',
            value: '{locale, select, es {🇪🇸 Español} en {🇺🇸 English} de {🇩🇪 Deutsch} ru {🇷🇺 Русский} other {{locale}}}'
        },
        {
            languageId: english.id,
            section: 'LocaleLayout',
            key: 'title',
            value: 'My Application'
        },
        // Deutsch (Alemán)
        {
            languageId: german.id,
            section: 'Navigation',
            key: 'home',
            value: 'Startseite'
        },
        {
            languageId: german.id,
            section: 'LocaleSwitcher',
            key: 'label',
            value: 'Sprache ändern'
        },
        {
            languageId: german.id,
            section: 'LocaleSwitcher',
            key: 'locale',
            value: '{locale, select, es {🇪🇸 Español} en {🇺🇸 English} de {🇩🇪 Deutsch} ru {🇷🇺 Русский} other {{locale}}}'
        },
        {
            languageId: german.id,
            section: 'LocaleLayout',
            key: 'title',
            value: 'Meine Anwendung'
        },
        // Русский (Ruso)
        {
            languageId: russian.id,
            section: 'Navigation',
            key: 'home',
            value: 'Главная'
        },
        {
            languageId: russian.id,
            section: 'LocaleSwitcher',
            key: 'label',
            value: 'Изменить язык'
        },
        {
            languageId: russian.id,
            section: 'LocaleSwitcher',
            key: 'locale',
            value: '{locale, select, es {🇪🇸 Español} en {🇺🇸 English} de {🇩🇪 Deutsch} ru {🇷🇺 Русский} other {{locale}}}'
        },
        {
            languageId: russian.id,
            section: 'LocaleLayout',
            key: 'title',
            value: 'Мое Приложение'
        },
    ];

    for (const translation of translations) {
        await prisma.translation.upsert({
            where: {
                key_section_languageId: {
                    key: translation.key,
                    section: translation.section,
                    languageId: translation.languageId,
                },
            },
            update: { value: translation.value },
            create: translation,
        });
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
import 'server-only';

export type Locale = 'en' | 'sv';

type Dictionary = {
    greeting: string
}

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
    en: () => import('@/dictionaries/en.json').then((module) => module.default),
    sv: () => import('@/dictionaries/sv.json').then((module) => module.default)
}

export const getDictionary = async (locale: Locale) => dictionaries[locale]()
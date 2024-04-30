import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import translationEnglish from './English/translation.json'
import translationArabic from './Arabic/translation.json'
import store from "../store/store";

const resources = {
    en: {
        translation: translationEnglish
    },
    ab: {
        translation: translationArabic
    }
}

const currentLang = store.getState().language.language

i18next
    .use(initReactI18next)
    .init({
        compatibilityJSON: 'v3',
        resources,
        lng: currentLang,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
    })

export default i18next;
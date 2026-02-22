import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./locales/en.json";
import vi from "./locales/vi.json";
import { DEFAULT_LANGUAGE, I18N_STORAGE_KEY, SUPPORTED_LANGUAGES } from "./constants";

// Re-export so existing imports from "@/i18n/config" keep working
export { DEFAULT_LANGUAGE, I18N_STORAGE_KEY, SUPPORTED_LANGUAGES } from "./constants";
export type { LanguageCode } from "./constants";

if (!i18n.isInitialized) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources: {
        en: { translation: en },
        vi: { translation: vi },
      },
      // Always initialize with the default language so the first render matches
      // SSR output. I18nContextProvider's useEffect will switch to the user's
      // stored language after hydration, avoiding the hydration mismatch error.
      lng: DEFAULT_LANGUAGE,
      fallbackLng: DEFAULT_LANGUAGE,
      supportedLngs: SUPPORTED_LANGUAGES.map((l) => l.code),
      interpolation: {
        escapeValue: false, // React already escapes
      },
      detection: {
        order: ["localStorage"],
        caches: ["localStorage"],
        lookupLocalStorage: I18N_STORAGE_KEY,
      },
    });
}

export default i18n;

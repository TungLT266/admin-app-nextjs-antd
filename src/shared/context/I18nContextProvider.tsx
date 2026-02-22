"use client";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { ConfigProvider } from "antd";
import enUS from "antd/locale/en_US";
import viVN from "antd/locale/vi_VN";
import type { Locale as AntdLocale } from "antd/lib/locale";
import "@/i18n/config"; // Initialize i18next
import i18n, { DEFAULT_LANGUAGE, LanguageCode, SUPPORTED_LANGUAGES } from "@/i18n/config";

/* ------------------------------------------------------------------ */
/*  Antd locale map                                                      */
/* ------------------------------------------------------------------ */
const antdLocaleMap: Record<LanguageCode, AntdLocale> = {
  en: enUS,
  vi: viVN,
};

/* ------------------------------------------------------------------ */
/*  Context                                                              */
/* ------------------------------------------------------------------ */
interface I18nContextValue {
  language: LanguageCode;
  changeLanguage: (lang: LanguageCode) => void;
  supportedLanguages: typeof SUPPORTED_LANGUAGES;
}

const I18nContext = createContext<I18nContextValue>({
  language: DEFAULT_LANGUAGE,
  changeLanguage: () => {},
  supportedLanguages: SUPPORTED_LANGUAGES,
});

/* ------------------------------------------------------------------ */
/*  Provider                                                             */
/* ------------------------------------------------------------------ */
export function I18nContextProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<LanguageCode>(DEFAULT_LANGUAGE);

  // Sync initial language from localStorage / i18next on mount
  useEffect(() => {
    const stored =
      (localStorage.getItem("i18n_language") as LanguageCode) ?? DEFAULT_LANGUAGE;
    const valid = SUPPORTED_LANGUAGES.some((l) => l.code === stored)
      ? stored
      : DEFAULT_LANGUAGE;
    setLanguage(valid);
    i18n.changeLanguage(valid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeLanguage = useCallback((lang: LanguageCode) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
    localStorage.setItem("i18n_language", lang);
  }, []);

  return (
    <I18nContext.Provider value={{ language, changeLanguage, supportedLanguages: SUPPORTED_LANGUAGES }}>
      <ConfigProvider locale={antdLocaleMap[language]}>
        {children}
      </ConfigProvider>
    </I18nContext.Provider>
  );
}

/* ------------------------------------------------------------------ */
/*  Hook                                                                 */
/* ------------------------------------------------------------------ */
export function useI18nContext() {
  return useContext(I18nContext);
}

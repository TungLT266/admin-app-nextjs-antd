"use client";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ConfigProvider } from "antd";
import enUS from "antd/locale/en_US";
import viVN from "antd/locale/vi_VN";
import type { Locale as AntdLocale } from "antd/lib/locale";
import "@/i18n/config"; // Initialize i18next
import i18n, { DEFAULT_LANGUAGE, I18N_STORAGE_KEY, LanguageCode, SUPPORTED_LANGUAGES } from "@/i18n/config";

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
export function I18nContextProvider({
  children,
  initialLanguage = DEFAULT_LANGUAGE,
}: {
  children: React.ReactNode;
  initialLanguage?: LanguageCode;
}) {
  // Synchronously update i18next BEFORE children render so the first render
  // on both server and client uses the same language → no hydration mismatch.
  // All resources are pre-loaded so changeLanguage resolves synchronously.
  useMemo(() => {
    if (i18n.language !== initialLanguage) {
      i18n.changeLanguage(initialLanguage);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialLanguage]);

  const [language, setLanguage] = useState<LanguageCode>(initialLanguage);

  // One-time migration: if no cookie exists yet but localStorage has a language
  // (set by the previous implementation), write the cookie so the server can
  // read it on the next request. Also restores the correct language on first
  // load before the cookie is set.
  useEffect(() => {
    const hasCookie = document.cookie
      .split("; ")
      .some((c) => c.startsWith(`${I18N_STORAGE_KEY}=`));
    if (!hasCookie) {
      const stored = localStorage.getItem(I18N_STORAGE_KEY) as LanguageCode | null;
      const valid =
        stored && SUPPORTED_LANGUAGES.some((l) => l.code === stored)
          ? stored
          : DEFAULT_LANGUAGE;
      // Persist in cookie so the server can read it on the next request
      document.cookie = `${I18N_STORAGE_KEY}=${valid}; path=/; max-age=31536000; SameSite=Lax`;
      // Apply the language for the current page render
      if (valid !== language) {
        setLanguage(valid);
        i18n.changeLanguage(valid);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeLanguage = useCallback((lang: LanguageCode) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
    // Write to cookie (read by server on next request for SSR)
    document.cookie = `${I18N_STORAGE_KEY}=${lang}; path=/; max-age=31536000; SameSite=Lax`;
    // Keep localStorage in sync (read by API axios interceptor)
    localStorage.setItem(I18N_STORAGE_KEY, lang);
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

/**
 * Shared i18n constants — safe to import in both server and client components.
 * Do NOT import browser-dependent packages (i18next, react-i18next, etc.) here.
 */

export const SUPPORTED_LANGUAGES = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "vi", label: "Tiếng Việt", flag: "🇻🇳" },
] as const;

export type LanguageCode = (typeof SUPPORTED_LANGUAGES)[number]["code"];

export const DEFAULT_LANGUAGE: LanguageCode = "en";

/** Key used for both the cookie and localStorage entry */
export const I18N_STORAGE_KEY = "i18n_language";

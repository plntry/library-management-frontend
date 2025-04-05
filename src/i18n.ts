import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import resources from "./types/resources";

export const defaultNS = "translation";
export const DEFAULT_LANGUAGE = "uk";

if (!localStorage.getItem("i18nextLng")) {
  localStorage.setItem("i18nextLng", DEFAULT_LANGUAGE);
}

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    defaultNS,
    fallbackLng: DEFAULT_LANGUAGE,
    lng: localStorage.getItem("i18nextLng") || DEFAULT_LANGUAGE,
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
    interpolation: { escapeValue: false },
  });

export default i18n;

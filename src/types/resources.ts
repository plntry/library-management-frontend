import ukTranslation from "../../public/locales/uk/translation.json";
import enTranslation from "../../public/locales/en/translation.json";

export const resources = {
  uk: { translation: ukTranslation },
  en: { translation: enTranslation },
} as const;

export default resources;

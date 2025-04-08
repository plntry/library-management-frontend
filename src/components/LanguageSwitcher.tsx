import { useTranslation } from "react-i18next";

const LanguageSwitcher: React.FC = () => {
  const { i18n, t } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng).then(() => {
      window.location.reload();
    });
  };

  return (
    <div className="flex justify-end space-x-2 max-w-md w-full">
      <button
        onClick={() => changeLanguage("uk")}
        className={`px-3 py-1 rounded font-semibold ${
          i18n.language === "uk"
            ? "bg-primary-100 text-primary-600"
            : "text-gray-700 hover:text-primary-600"
        }`}
      >
        {t("languageSelectors.ua")}
      </button>
      <button
        onClick={() => changeLanguage("en")}
        className={`px-3 py-1 rounded font-semibold ${
          i18n.language === "en"
            ? "bg-primary-100 text-primary-600"
            : "text-gray-700 hover:text-primary-600"
        }`}
      >
        {t("languageSelectors.en")}
      </button>
    </div>
  );
};

export default LanguageSwitcher;

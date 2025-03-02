import { useTranslation } from "react-i18next";
import logo from "../assets/library-logo.png";

const Header: React.FC = () => {
  const { t } = useTranslation();

  const headerNavElements = [
    {
      title: t("header.allBooks"),
    },
    {
      title: t("header.logout"),
    },
  ];

  return (
    <header className="fixed flex items-center gap-5 w-full min-h-15 px-5 bg-base-bg shadow-xs">
      <div className="flex items-center">
        <img src={logo} className="max-w-10" />
        <span className="font-semibold text-xl text-primary-600 hidden sm:inline">
          {t("appName")}
        </span>
      </div>

      {headerNavElements.map((el) => (
        <div key={el.title} className="justify-self-end">
          {el.title}
        </div>
      ))}
    </header>
  );
};

export default Header;

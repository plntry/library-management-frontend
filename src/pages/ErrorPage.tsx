import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { PATHS } from "../routes/paths";

const ErrorPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section>
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-500">
            404
          </h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl">
            {t("errorPage.title")}
          </p>
          <p className="mb-4 text-lg font-light text-gray-500">
            {t("errorPage.description")}
          </p>
          <Link
            to={PATHS.HOME}
            className="inline-flex text-white bg-primary-500 hover:bg-primary-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4"
          >
            {t("errorPage.navigationText")}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;

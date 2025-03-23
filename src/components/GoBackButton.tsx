import { ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
// import { back } from "lucide-react";

interface GoBackButtonProps {
  justifyContent?:
    | "justify-start"
    | "justify-end"
    | "justify-center"
    | "justify-between"
    | "justify-around"
    | "justify-evenly";
}

const GoBackButton: React.FC<GoBackButtonProps> = ({
  justifyContent = "justify-end",
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className={`flex ${justifyContent}`}>
      <button
        className="flex items-center  button button--secondary"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft size={20} />
        <span>{t("additionalButtons.goBack")}</span>
      </button>
    </div>
  );
};

export default GoBackButton;

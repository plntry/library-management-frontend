import { useNavigate, useSubmit } from "react-router";
import { MenuItem } from "../constants/availableHeaderTabs";
import { PATHS } from "../routes/paths";

type HeaderItemProps = {
  item: MenuItem;
  isSelected: boolean;
  mobile?: boolean;
  onClick?: (key: string) => void;
};

const HeaderItem: React.FC<HeaderItemProps> = ({
  item,
  isSelected,
  mobile = false,
  onClick,
}) => {
  const navigate = useNavigate();
  const submit = useSubmit();

  const handleClick = () => {
    if (onClick) {
      onClick(item.key);
      return;
    }

    if (item.key === PATHS.LOGOUT.link) {
      submit(null, { action: PATHS.LOGOUT.link, method: "POST" });
    } else {
      navigate(item.key);
    }
  };

  const baseClass = mobile
    ? "space-x-2 px-4 py-3"
    : "cursor-pointer space-x-1 px-3 py-2 rounded-md transition-colors";
  const selectedClass = mobile
    ? isSelected
      ? "text-primary-600 font-semibold"
      : "text-gray-700 hover:text-primary-500"
    : isSelected
    ? "bg-primary-100 text-primary-600 font-bold"
    : "text-gray-700 hover:text-primary-600";
  const pushClass = !mobile && item.pushToTheEnd ? "ml-auto" : "";

  return (
    <button
      onClick={handleClick}
      className={`relative group flex items-center font-semibold ${baseClass} ${selectedClass} ${pushClass}`}
    >
      {item.icon && <span>{item.icon}</span>}
      <span>{item.label}</span>
    </button>
  );
};

export default HeaderItem;

import logo from "../assets/library-logo.png";
import { useLocation, useNavigate, useSubmit, Link } from "react-router";
import { UserRoles } from "../models/User";
import { availableHeaderTabs } from "../constants/availableHeaderTabs";
import { MenuItem } from "../constants/availableHeaderTabs";
import HeaderItem from "./HeaderItem";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { PATHS } from "../routes/paths";

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const submit = useSubmit();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems: MenuItem[] = availableHeaderTabs[UserRoles.READER]; // TODO: add role after login
  const selectedKey = location.pathname;

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleMobileItemClick = (key: string) => {
    setIsMobileMenuOpen(false);
    if (key === "/logout") {
      submit(null, { action: key, method: "POST" });
    } else {
      navigate(key);
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 flex items-center gap-5 w-full min-h-15 px-5 bg-base-bg shadow-xs z-50">
        <Link to={PATHS.HOME.link}>
          <img src={logo} alt="Logo" className="max-w-10" />
        </Link>
        <div className="hidden md:flex w-full">
          {menuItems.map((item) => (
            <HeaderItem
              key={item.key}
              item={item}
              isSelected={selectedKey === item.key}
            />
          ))}
        </div>
        <div className="md:hidden ml-auto">
          <button onClick={toggleMobileMenu} aria-label="Toggle menu">
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="md:hidden fixed top-[4rem] left-0 right-0 bg-base-bg shadow-xs z-40">
          <div className="flex flex-col items-center">
            {menuItems.map((item) => (
              <HeaderItem
                key={item.key}
                item={item}
                isSelected={selectedKey === item.key}
                mobile={true}
                onClick={handleMobileItemClick}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;

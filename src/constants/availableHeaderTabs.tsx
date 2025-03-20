import { JSX } from "react";
import i18next from "i18next";
import { LogInIcon, LogOutIcon } from "lucide-react";
import { UserRoles } from "../models/User";
import { PATHS, ROLE_PATHS } from "../routes/paths";

export interface MenuItem {
  key: string;
  label: string;
  icon?: JSX.Element;
  pushToTheEnd?: boolean;
}

type UserAvailableHeaderTabs = {
  [role: string]: MenuItem[];
};

export const headerTabs: MenuItem[] = [
  {
    key: PATHS.HOME.link,
    label: i18next.t("header.home"),
  },
  {
    key: PATHS.BOOKS.link,
    label: i18next.t("header.allBooks"),
  },
  {
    key: PATHS.RESERVED_BOOKS.link,
    label: i18next.t("header.reservedBooks"),
  },
  {
    key: PATHS.LOGOUT.link,
    label: i18next.t("header.logout"),
    icon: <LogOutIcon className="w-5 h-5 text-primary-500" />,
    pushToTheEnd: true,
  },
  {
    key: PATHS.AUTH.link,
    label: i18next.t("header.login"),
    icon: <LogInIcon className="w-5 h-5 text-primary-500" />,
    pushToTheEnd: true,
  },
];

export const availableHeaderTabs: UserAvailableHeaderTabs = {};

for (const role in ROLE_PATHS) {
  const userRole = role as UserRoles;
  const paths = ROLE_PATHS[userRole];
  const tabs = headerTabs.filter((tab) => paths.includes(tab.key));
  availableHeaderTabs[role] = tabs;
}

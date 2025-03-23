import { userAvailableBookActions } from "../constants/availableBookActions";
import { UserAvailableBookActions } from "../models/Book";

export const getUserAvailableBookActionsByPage = (
  page: keyof (typeof userAvailableBookActions)[keyof typeof userAvailableBookActions][number]["visible"]
): UserAvailableBookActions => {
  return Object.keys(userAvailableBookActions).reduce((acc, role) => {
    acc[role] = userAvailableBookActions[role].filter(
      (action) => action.visible[page]
    );
    return acc;
  }, {} as UserAvailableBookActions);
};

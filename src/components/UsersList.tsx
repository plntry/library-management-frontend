import React, { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { UserRegistration } from "../models/User";
import UserItem from "./UserItem";
import { SearchBar, CardsContainer } from "./ui";

const UsersList: React.FC<{
  data: UserRegistration[];
}> = ({ data }) => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState(data);

  const filteredUsers = useMemo(() => {
    const lowerQuery = searchQuery.toLowerCase();
    return users.filter((user) => {
      const matchesSearch =
        user.email.toLowerCase().includes(lowerQuery) ||
        user.first_name.toLowerCase().includes(lowerQuery) ||
        user.last_name.toLowerCase().includes(lowerQuery) ||
        user.role.toLowerCase().includes(lowerQuery);
      return matchesSearch;
    });
  }, [users, searchQuery]);

  const handleUserStatusChange = (userId: number, isBlocked: boolean) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, is_blocked: isBlocked } : user
      )
    );
  };

  return (
    <div className="p-4 flex flex-col gap-5">
      <div className="self-center page-title">{t("users.title")}</div>
      <SearchBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        placeholderKey="users.searchPlaceholder"
      />
      <CardsContainer
        items={filteredUsers}
        renderItem={(user) => (
          <UserItem
            key={user.id}
            user={user}
            onStatusChange={handleUserStatusChange}
          />
        )}
        emptyStateKey="noUsersMessage"
        mode="users"
      />
    </div>
  );
};

export default UsersList;

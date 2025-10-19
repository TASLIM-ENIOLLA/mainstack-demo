import { createContext, useContext } from "react";

import { useGetUser } from "@/hooks/user";
import { User } from "@/hooks/user/types";

export const UserProvider = createContext<User | undefined>(undefined);

export function UserStoreBase({ children }: {
  children: React.ReactNode;
}) {
  const { data } = useGetUser();

  return (
    <UserProvider.Provider value={data}>
      {children}
    </UserProvider.Provider>
  );
}

export function useUserStore() {
  return useContext(UserProvider);
}
import { api } from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";

import { User } from "./types";

export function useGetUser() {
  return useQuery({
    queryKey: ["get-user"],
    queryFn: async function() {
      const request = await api.get<User>("/user");
      const response = request.data;

      return response;
    }
  });
}
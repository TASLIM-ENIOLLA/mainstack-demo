import { api } from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";

import { Wallet } from "./types";

export function useGetWallet() {
  return useQuery({
    queryKey: ["get-wallet"],
    queryFn: async function() {
      const request = await api.get<Wallet>("/wallet");
      const response = request.data;

      return response;
    }
  });
}
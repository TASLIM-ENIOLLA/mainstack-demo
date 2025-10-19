import { api } from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";

import { Transaction } from "./types";

export function useGetTransactions(filters: {
  to: string | null;
  from: string | null;
  type: string | null;
  status: string | null;
  duration: string | null;
}) {
  return useQuery({
    queryKey: ["get-transaction"],
    queryFn: async function() {
      const request = await api.get<Transaction[]>("/transactions");
      const response = request.data;

      const to = filters.to ? new Date(filters.to) : null;
      const from = filters.from ? new Date(filters.from) : null;
      const types = filters.type ? filters.type.split('|').map(t => t.toLowerCase()) : [];
      const statuses = filters.status ? filters.status.split("|").map(s => s.toLocaleLowerCase()) : [];

      return response.filter((txn) => {
        const txnType = txn.type?.toLowerCase();
        const txnStatus = txn.status?.toLowerCase();
        const txnDate = new Date(txn.date as string);

        const matchDate =
          (!from || txnDate >= from) &&
          (!to || txnDate <= to);

        const matchType =
          !types.length ||
          (txnType === 'deposit' && types.includes('store_transactions')) ||
          (txnType === 'withdrawal' && types.includes('withdrawals')) ||
          (txnType && types.includes(txnType));

        const matchStatus = !statuses.length || statuses.includes(txnStatus as string);

        return matchDate && matchType && matchStatus;
      });
    },
  });
}
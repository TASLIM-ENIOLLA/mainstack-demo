"use client";

import { useSearchParams } from "next/navigation";

import { Separator } from "@/components/shadcn/ui/separator";

import { useGetTransactions } from "@/hooks/transactions";

import { Lists } from "./Lists";
import { Header } from "./Header";
import { useEffect } from "react";

export function Transactions() {
  const searchParams = useSearchParams();

  const to = searchParams.get("to");
  const from = searchParams.get("from");
  const type = searchParams.get("type");
  const status = searchParams.get("status");
  const duration = searchParams.get("duration");

  const { data: transactions, refetch } = useGetTransactions({ to, from, type, status, duration });

  useEffect(() => {
    refetch();
  }, [searchParams]);

  return (
    <div className="py-5">
      <div className="container">
        <Header no={transactions?.length} />
        <Separator className="my-5" />
        <Lists transactions={transactions} />
      </div>
    </div>
  );
}
import { Fragment } from "react";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";

import { usePathname, useRouter } from "next/navigation";

import { Button } from "@/components/shadcn/ui/button";

import { cn } from "@/components/shadcn/lib/utils";
import { Transaction } from "@/hooks/transactions/types";
import { Bill } from "./svg";

export function Lists({ transactions }: {
  transactions?: Transaction[]
}) {
  const router = useRouter();
  const pathname = usePathname();

  function clearFilters() {
    router.push(pathname);
  }

  if(!transactions?.length) {
    return (
      <div className="mx-auto max-w-sm">
        <div className="p-5">
          <div className="space-y-5">
            <Button size="icon-lg" variant="secondary" className="text-sm size-14 [&_svg]:!size-7">
              <Bill />
            </Button>
            <h4 className="text-xl font-semibold">
              <span className="sentence">
                no matching transaction found for the selected filters
              </span>
            </h4>
            <p className="text-sm font-normal">
              <span className="sentence text-muted-foreground">
                change your filter to see more results
              </span>
            </p>
            <Button size={null} onClick={clearFilters} variant="secondary" className="py-3 px-10 text-sm font-medium rounded-full">
              <span className="capitalize">
                clear
              </span>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {transactions?.map((transaction, index) => (
        <Fragment key={index}>
          <TransactionSummary
            type={transaction.type}
            date={transaction.date}
            status={transaction.status}
            amount={transaction.amount}
            senderName={transaction.metadata?.name}
            productName={transaction.metadata?.product_name || transaction.metadata?.type}

          />
        </Fragment>
      ))}
    </div>
  );
}

function TransactionSummary({ type, date, status, amount, senderName, productName }: Partial<{
  type: string;
  date: string;
  status: string;
  amount: number;
  senderName: string;
  productName: string;
}>) {
  return (
    <Button asChild size={null} variant="ghost" className="gap-5 w-full whitespace-normal">
      <div className="!bg-transparent !justify-between">
        <div className="flex-none">
          <Button asChild size="icon" variant="ghost" className="size-12 rounded-full">
            <div className={cn("!text-green-600 !bg-green-300/50 [&_svg]:!size-5", type === "deposit" ? "!text-green-600 !bg-green-300/50" : "!text-red-600 !bg-red-300/50")}>
              {
                type === "deposit"
                ? <ArrowDownLeft />
                : <ArrowUpRight />
              }
            </div>
          </Button>
        </div>
        <div className="flex-1">
          <h5 className="text-base font-normal">
            <span className="sentence">
              {productName || type}
            </span>
          </h5>
          <p className="text-sm font-light">
            <span className={cn("sentence", (
              type === "deposit"
              ? "text-muted-foreground"
              : (
                status === "successful"
                ? "text-green-600"
                : (
                  status === "pending"
                  ? "text-yellow-600"
                  : "text-red-600"
                )
              )
            ))}>
              {senderName || status}
            </span>
          </p>
        </div>
        <div className="flex-none text-right">
          <h5 className="text-base font-medium">
            <span className="sentence">
              USD {amount}
            </span>
          </h5>
          <p className="text-sm font-light">
            <span className="sentence text-muted-foreground">
              {((date?: string) => {
                if(!date) return;
                
                const parsedDate = new Date(date);
                
                const day = parsedDate.getDay();
                const year = parsedDate.getFullYear();
                const month = parsedDate.toLocaleString("default", { month: "short" });
                
                return `${month} ${day}, ${year}`;
              })(date)}
            </span>
          </p>
        </div>
      </div>
    </Button>
  );
}
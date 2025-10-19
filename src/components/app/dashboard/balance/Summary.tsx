import { Info } from "lucide-react";

import { Button } from "@/components/shadcn/ui/button";
import { Skeleton } from "@/components/shadcn/ui/skeleton";

export function Summary({ totalPayout, totalRevenue, ledgerBalance, pendingPayout }: Partial<{
  totalPayout: number;
  totalRevenue: number;
  ledgerBalance: number;
  pendingPayout: number;
}>) {
  return (
    <div className="space-y-5">
      <EachSummary title="ledger balance" amount={ledgerBalance} />
      <EachSummary title="total payout" amount={totalPayout} />
      <EachSummary title="total revenue" amount={totalRevenue} />
      <EachSummary title="pending layout" amount={pendingPayout} />
    </div>
  );
}

function EachSummary({ title, amount }: {
  title: string;
  amount?: number;
}) {
  return (
    <div className="space-y-2">
      <Button asChild size={null} variant="ghost" className="w-full whitespace-normal">
        <div className="!bg-transparent !justify-between">
          <div className="flex-none">
            <p className="text-sm font-normal">
              <span className="capitalize text-muted-foreground">
                {title}
              </span>
            </p>
          </div>
          <div className="flex-none">
            <Info className="text-muted-foreground" />
          </div>
        </div>
      </Button>
      {
        typeof amount === "undefined"
        ? <Skeleton className="h-10" />
        : (
          <h4 className="text-2xl font-bold">
            <span className="capitalize">
              USD {Number(amount || 0).toLocaleString("en-US")}
            </span>
          </h4>
        )
      }
    </div>
  );
}
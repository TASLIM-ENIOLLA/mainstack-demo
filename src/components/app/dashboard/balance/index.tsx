"use client";

import { useGetWallet } from "@/hooks/wallet";

import { Summary } from "./Summary";
import { Withdrawal } from "./Withdrawal";

export function Balance() {
  const { data: wallet } = useGetWallet();

  return (
    <div className="py-5">
      <div className="container @container/grid">
        <div className="grid gap-5 items-center grid-cols-12">
          <div className="col-span-12 @4xl/grid:col-span-9">
            <Withdrawal balance={wallet?.balance} />
          </div>
          <div className="col-span-12 @4xl/grid:col-span-3">
            <Summary
              totalPayout={wallet?.total_payout}
              totalRevenue={wallet?.total_revenue}
              ledgerBalance={wallet?.ledger_balance}
              pendingPayout={wallet?.pending_payout}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
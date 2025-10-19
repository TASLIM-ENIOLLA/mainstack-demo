import { Suspense } from "react";

import { Balance } from "@/components/app/dashboard/balance";
import { FixedBar } from "@/components/app/dashboard/fixedbar";
import { Transactions } from "@/components/app/dashboard/transactions";

export default function Page() {
  return (
    <section className="mx-auto max-w-7xl">
      <Balance />
      <Suspense fallback={null}>
        <Transactions />
      </Suspense>
      <FixedBar />
    </section>
  );
}
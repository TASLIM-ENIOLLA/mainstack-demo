"use client";

import { Header } from "@/components/app/dashboard/@header";

import { UserStoreBase } from "@/store/user";
import { QueryClientBase } from "@/utils/query";

export default function Layout({ children }: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientBase>
      <UserStoreBase>
        <main className="pb-20">
          <Header />
          {children}
        </main>
      </UserStoreBase>
    </QueryClientBase>
  );
}
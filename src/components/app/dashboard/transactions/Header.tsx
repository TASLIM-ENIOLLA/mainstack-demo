"use client";

import { Fragment, useEffect, useMemo, useState } from "react";
import { ChevronDown, Download } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Badge } from "@/components/shadcn/ui/badge";
import { Button } from "@/components/shadcn/ui/button";
import { ScrollArea } from "@/components/shadcn/ui/scroll-area";
import { MultiSelect } from "@/components/shadcn/ui/multi-select";
import { CalendarBtn } from "@/components/shadcn/ui/calendar-button";
import { Sheet, SheetTitle, SheetTrigger } from "@/components/shadcn/ui/sheet";
import { ToggleGroup, ToggleGroupItem } from "@/components/shadcn/ui/toggle-group";
import { SheetContent, SheetFooter, SheetHeader } from "@/components/shadcn/ui/sheet";

import { durations } from "./props";

export function Header({ no }: {
  no?: number;
}) {
  return (
    <div className="@container/flex">
      <div className="flex gap-5 flex-col @2xl/flex:flex-row @2xl/flex:items-center justify-between">
        <div className="flex-none">
          <h4 className="text-2xl font-semibold">
            <span className="capitalize">
              {no} transactions
            </span>
          </h4>
          <p className="text-sm font-normal">
            <span className="sentence text-muted-foreground">
              your transactions for the last 7 days
            </span>
          </p>
        </div>
        <div className="flex-none">
          <div className="flex gap-5 flex-wrap items-center">
            <div className="flex-none">
              <FilterSheet />
            </div>
            <div className="flex-none">
              <Button size={null} variant="secondary" className="py-3 px-5 text-sm font-medium rounded-full !h-auto">
                <span className="capitalize">
                  export list
                </span>
                <Download />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterSheet() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState({
    to: "",
    from: "",
    type: "",
    status: "",
    duration: "",
  });

  const appliedFiltersNo = useMemo(() => {
    let count = 0;

    for(const [, value] of Object.entries(filters)) {
      if(value) {
        count++;
      }
    }

    return count;
  }, [filters]);

  function applyFilters() {
    const searchParams = new URLSearchParams()

    Object.entries(filters).forEach(([key, value]) => {
      if(value) {
        searchParams.append(key, value);
      }
    });

    router.push(pathname + "?" + searchParams.toString());

    setOpen(false);
  }
  
  function clearFilters() {
    setOpen(false);
    setFilters({
      to: "",
      from: "",
      type: "",
      status: "",
      duration: "",
    });
    
    router.push(pathname);
  }

  function onOpenChange(state: boolean) {
    setOpen(state);
  
    if(!state) {
      applyFilters();
    }
  }

  useEffect(() => {
    const to = searchParams.get("to");
    const from = searchParams.get("from");
    const type = searchParams.get("type");
    const status = searchParams.get("status");
    const duration = searchParams.get("duration");

    setFilters({
      to: to || "",
      from: from || "",
      type: type || "",
      status: status || "",
      duration: duration || "",
    });
  }, [searchParams]);

  useEffect(() => console.log({ filters }), [filters]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button size={null} variant="secondary" className="py-3 px-5 text-sm font-medium rounded-full !h-auto">
          <span className="capitalize">
            filter
          </span>
          {
            appliedFiltersNo
            ? (
              <Badge className="px-1 size-5 rounded-full tabular-nums">
                <span className="capitalize">
                  {appliedFiltersNo}
                </span>
              </Badge>
            )
            : null
          }
          <ChevronDown />
        </Button>
      </SheetTrigger>
      <SheetContent className="mx-3 gap-0 w-sm top-1/2 rounded-lg -translate-y-1/2" style={{ height: "98%" }}>
        <SheetHeader>
          <SheetTitle className="text-xl font-semibold">
            <span className="capitalize">filter</span>
          </SheetTitle>
        </SheetHeader>
        <ScrollArea className="flex-1 overflow-y-auto">
          <div className="px-4 space-y-5">
            <ToggleGroup
              type="single"
              className="flex gap-3 flex-wrap items-center"

              value={filters.duration}
              onValueChange={(value) => {
                setFilters((filters) => ({
                  ...filters,
                  duration: value
                }));
              }}>
              {durations.map(({ name, value }, index) => (
                <Fragment key={index}>
                  <div className="flex-none">
                    <ToggleGroupItem value={value} variant="outline" className="px-4 text-sm font-normal !rounded-full">
                      <span className="sentence">
                        {name}
                      </span>
                    </ToggleGroupItem>
                  </div>
                </Fragment>
              ))}
            </ToggleGroup>
            <div className="space-y-1">
              <p className="text-sm font-medium">
                <span className="capitalize">
                  date range
                </span>
              </p>
              <div className="flex gap-3 items-center">
                <div className="flex-1">
                  <CalendarBtn
                    className="h-10 shadow-none !bg-transparent"
                    
                    value={filters.from}
                    onValueChange={(value) => {
                      if(value) {
                        setFilters((filters) => ({
                          ...filters,
                          from: value.toISOString()
                        }));
                      }
                    }}
                    formatValue={(date) => {
                      const day = date.getDate();
                      const year = date.getFullYear();
                      const month = date.toLocaleString("default", { month: "short" });

                      return `${day} ${month} ${year}`;
                    }}
                  />
                </div>
                <div className="flex-1">
                  <CalendarBtn
                    className="h-10 shadow-none !bg-transparent"

                    value={filters.to}
                    onValueChange={(value) => {                      
                      if(value) {
                        setFilters((filters) => ({
                          ...filters,
                          to: value.toISOString()
                        }));
                      }
                    }}
                    formatValue={(date) => {
                      const day = date.getDate();
                      const year = date.getFullYear();
                      const month = date.toLocaleString("default", { month: "short" });

                      return `${day} ${month} ${year}`;
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">
                <span className="capitalize">
                  transaction type
                </span>
              </p>
              <MultiSelect
                className="h-10 shadow-none !bg-transparent"
                
                value={filters.type}
                onValueChange={(options) => {
                  setFilters((filters) => ({
                    ...filters,
                    type: options.join("|")
                  }))
                }}
                options={[
                  { name: "store transactions", value: "STORE_TRANSACTIONS" },
                  { name: "get tipped", value: "GET_TIPPED" },
                  { name: "withdrawals", value: "WITHDRAWALS" },
                  { name: "chargebacks", value: "CHARGEBACKS" },
                  { name: "cashbacks", value: "CASHBACKS" },
                  { name: "refer & earn", value: "REFER_AND_EARN" },
                ]}
              />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">
                <span className="capitalize">
                  transaction status
                </span>
              </p>
              <MultiSelect
                className="h-10 shadow-none !bg-transparent"

                value={filters.status}
                onValueChange={(options) => {
                  setFilters((filters) => ({
                    ...filters,
                    status: options.join("|")
                  }))
                }}
                options={[
                  { name: "successful", value: "SUCCESSFUL" },
                  { name: "pending", value: "PENDING" },
                  { name: "failed", value: "FAILED" },
                ]}
              />
            </div>
          </div>
        </ScrollArea>
        <SheetFooter className="@container/flex">
          <div className="flex gap-5">
            <div className="flex-1">
              <Button size={null} onClick={clearFilters} variant="outline" className="py-3 px-5 w-full text-sm font-medium rounded-full">
                <span className="capitalize">
                  clear
                </span>
              </Button>
            </div>
            <div className="flex-1">
              <Button size={null} onClick={applyFilters} className="py-3 px-5 w-full text-sm font-medium rounded-full">
                <span className="capitalize">
                  apply
                </span>
              </Button>
            </div>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
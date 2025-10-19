"use client"

import { Line, LineChart, XAxis } from "recharts";

import { Button } from "@/components/shadcn/ui/button";
import { Skeleton } from "@/components/shadcn/ui/skeleton";
import { ChartContainer } from "@/components/shadcn/ui/chart";
import { ChartTooltip, ChartTooltipContent } from "@/components/shadcn/ui/chart";

export function Withdrawal({ balance }: {
  balance?: number;
}) {
  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <Button asChild size={null} variant="ghost" className="gap-5 w-full max-w-lg">
          <div className="!bg-transparent !justify-between">
            <div className="flex-1">
              <div className="space-y-2">
                <p className="text-sm font-normal">
                  <span className="capitalize text-muted-foreground">
                    available balance
                  </span>
                </p>
                {
                  typeof balance === "undefined"
                  ? <Skeleton className="h-14 w-full" />
                  : (
                    <h4 className="text-3xl font-bold">
                      <span className="capitalize">
                        USD {balance}
                      </span>
                    </h4>
                  )
                }
              </div>
            </div>
            <div className="flex-none">
              <Button size="lg" variant="default" className="p-4 w-40 text-sm rounded-full font-semibold !h-auto">
                <span className="capitalize">
                  withdraw
                </span>
              </Button>
            </div>
          </div>
        </Button>
      </div>
      <ChartContainer config={chartConfig}>
        <LineChart
          accessibilityLayer
          data={chartData}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={true}
            tickMargin={8}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Line
            dataKey="desktop"
            type="natural"
            stroke="var(--color-desktop)"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
}

const chartData = [
  { month: "April 1, 2022", desktop: 186 },
  { month: "April 6, 2022", desktop: 305 },
  { month: "April 12, 2022", desktop: 237 },
  { month: "April 19, 2022", desktop: 73 },
  { month: "April 24, 2022", desktop: 209 },
  { month: "April 30, 2022", desktop: 214 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
}
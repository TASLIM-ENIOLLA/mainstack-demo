"use client"

import { useEffect, useState } from "react";
import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/shadcn/ui/button";
import { Calendar } from "@/components/shadcn/ui/calendar";
import { PopoverContent } from "@/components/shadcn/ui/popover";
import { Popover, PopoverTrigger } from "@/components/shadcn/ui/popover";

import { cn } from "@/components/shadcn/lib/utils";

export function CalendarBtn({ value, className, formatValue, onValueChange, ...props }: {
  formatValue?: (value: Date) => string;
  onValueChange?: (value: Date | undefined) => void;
} & React.ComponentProps<typeof Button>) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>();

  function formatDate(date: Date) {
    if(typeof formatValue === "function") {
      return formatValue(date);
    }

    return date.toLocaleDateString();
  }

  useEffect(() => {
    let newDate;
    
    if (!value || value === "") {
      newDate = undefined;
    }
    else {
      const parsed = Date.parse(value.toString());

      newDate = isNaN(parsed) ? new Date() : new Date(parsed);
    }

    setDate(newDate);
  }, [value]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className={cn("w-full font-normal justify-between whitespace-normal", className)} {...props}>
          <span className="one-line">
            {date ? formatDate(date) : "Select date"}
          </span>
          <ChevronDownIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent side="bottom" align="end" className="p-0 min-w-[var(--radix-popover-trigger-width)]">
        <Calendar
          mode="single"
          className="w-full"
          captionLayout="dropdown"

          selected={date}
          onSelect={(date) => {
            setDate(date);
            setOpen(false);

            onValueChange?.(date);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
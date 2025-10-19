import { Fragment, useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

import { Button } from "@/components/shadcn/ui/button";
import { Checkbox } from "@/components/shadcn/ui/checkbox";
import { PopoverContent } from "@/components/shadcn/ui/popover";
import { Command, CommandGroup } from "@/components/shadcn/ui/command";
import { Popover, PopoverTrigger } from "@/components/shadcn/ui/popover";
import { CommandItem, CommandList } from "@/components/shadcn/ui/command";

import { cn } from "@/components/shadcn/lib/utils";

export function MultiSelect({ value = "", options = [], className, onValueChange, ...props }: {
  className?: string;
  onValueChange?: (value: string[]) => void;
  options?: Array<{ name: string; value: string }>;
} & React.ComponentProps<typeof Button>) {
  const [open, setOpen] = useState(false);
  const [list, setList] = useState<string[]>([]);

  function joinOptions() {    
    return options
    .filter((option) => list.includes(option.value))
    .map(({ name }) => name).join(", ");
  }

  function onOptionSelect(value: string) {
    let result = list

    if(list.includes(value)) {
      result = list.filter(((item) => item !== value));
    }
    else {
      result.push(value);
    }

    setList(result);
    onValueChange?.(result);
  }

  useEffect(() => setList(String(value).split("|").filter(e => e !== "")), [value]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className={cn("w-full text-left justify-between whitespace-normal", className)} {...props}>
          <p className={cn("font-normal", list.length ? "capitalize" : "sentence")}>
            <span className="one-line">
              {list.length ? joinOptions() : "Select one or multiple options"}
            </span>
          </p>
          {open ? <ChevronUp /> : <ChevronDown />}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 min-w-[var(--radix-popover-trigger-width)]">
        <Command>
          <CommandList>
            <CommandGroup>
              {options?.map((option) => {
                const isSelected = list.includes(option.value);

                return (
                  <Fragment key={option.value}>
                    <CommandItem asChild value={option.value} className="h-10">
                      <div onClick={onOptionSelect.bind(null, option.value)}>
                        <Checkbox checked={isSelected} />
                        <span className="capitalize">
                          {option.name}
                        </span>
                      </div>
                    </CommandItem>
                  </Fragment>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
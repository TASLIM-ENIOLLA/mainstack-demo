import { Fragment } from "react";
import { EllipsisVertical } from "lucide-react";

import { Button } from "@/components/shadcn/ui/button";
import { PopoverTrigger } from "@/components/shadcn/ui/popover";
import { Popover, PopoverContent } from "@/components/shadcn/ui/popover";

import { Invoice, Store } from "./svg";
import { LinkInBio, MediaKit } from "./svg";

export function FixedBar() {
  return (
    <Fragment>
      <div className="z-0 top-1/2 fixed left-0 -translate-y-1/2">
        <div className="px-3">
          <div className="py-5 px-3 bg-white shadow-lg rounded-full opacity-0 lg:opacity-100">
            <div className="flex gap-3 flex-col">
              <div className="flex-none">
                <Button size="icon" variant="ghost" className="size-14 [&_svg]:!size-7 [&_svg]:!filter [&_svg]:!grayscale">
                  <LinkInBio />
                </Button>
              </div>
              <div className="flex-none">
                <Button size="icon" variant="ghost" className="size-14 [&_svg]:!size-7 [&_svg]:!filter [&_svg]:!grayscale">
                  <Store />
                </Button>
              </div>
              <div className="flex-none">
                <Button size="icon" variant="ghost" className="size-14 [&_svg]:!size-7 [&_svg]:!filter [&_svg]:!grayscale">
                  <MediaKit />
                </Button>
              </div>
              <div className="flex-none">
                <Button size="icon" variant="ghost" className="size-14 [&_svg]:!size-7 [&_svg]:!filter [&_svg]:!grayscale">
                  <Invoice />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Popover>
        <PopoverTrigger asChild className="px-3">
          <div className="opacity-100 lg:opacity-0 bottom-1/20 z-0 fixed left-0">
            <div className="px-3">
              <Button size="icon" variant="outline" className="size-14 shadow-lg rounded-full [&_svg]:!size-6 !bg-white">
                <EllipsisVertical />
              </Button>
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent side="top" align="center" className="p-3 opacity-100 lg:opacity-0 w-auto border rounded-full shadow-none">
          <div className="flex flex-col gap-5">
            <div className="flex-none">
              <Button size="icon" variant="ghost" className="size-14 [&_svg]:!size-7 [&_svg]:!filter [&_svg]:!grayscale">
                <LinkInBio />
              </Button>
            </div>
            <div className="flex-none">
              <Button size="icon" variant="ghost" className="size-14 [&_svg]:!size-7 [&_svg]:!filter [&_svg]:!grayscale">
                <Store />
              </Button>
            </div>
            <div className="flex-none">
              <Button size="icon" variant="ghost" className="size-14 [&_svg]:!size-7 [&_svg]:!filter [&_svg]:!grayscale">
                <MediaKit />
              </Button>
            </div>
            <div className="flex-none">
              <Button size="icon" variant="ghost" className="size-14 [&_svg]:!size-7 [&_svg]:!filter [&_svg]:!grayscale">
                <Invoice />
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </Fragment>
  );
}
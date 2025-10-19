"use client";

import Link from "next/link";

import { Fragment } from "react";
import { usePathname } from "next/navigation";

import { Button } from "@/components/shadcn/ui/button";
import { Skeleton } from "@/components/shadcn/ui/skeleton";
import { AvatarFallback } from "@/components/shadcn/ui/avatar";
import { Avatar, AvatarImage } from "@/components/shadcn/ui/avatar";
import { DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/shadcn/ui/dropdown-menu";
import { DropdownMenu, DropdownMenuContent } from "@/components/shadcn/ui/dropdown-menu";
import { DropdownMenuGroup, DropdownMenuItem } from "@/components/shadcn/ui/dropdown-menu";

import { useUserStore } from "@/store/user";

import { Bell, Messages } from "./svg";
import { Hamburger, Logo } from "./svg";
import { menuRoutes, navs } from "./props";

const NAV_BASEURL = "/";

export function Header() {
  const pathname = usePathname();

  return (
    <header className="z-5 py-3 top-0 left-0 sticky backdrop-blur">
      <div className="container">
        <div className="py-2 bg-white shadow-lg rounded-full">
          <div className="container @container/flex">
            <div className="flex gap-5 items-center justify-between">
              <div className="flex-none">
                <div className="[&_svg]:!size-10">
                  <Logo />
                </div>
              </div>
              <div className="flex-none hidden xl:block">
                <div className="flex gap-3 items-center">
                  {navs.map(({ name, href, Icon }, index) => {
                    const derivedHref = NAV_BASEURL + href;
                    const isActive = derivedHref !== "/" ? pathname.startsWith(derivedHref) : pathname === derivedHref;

                    return (
                      <Fragment key={index}>
                        <div className="flex-none">
                          <Button asChild size="lg" variant={isActive ? "default": "ghost"} className="text-sm font-medium items-center rounded-full [&_svg]:!size-6">
                            <Link href={derivedHref}>
                              <Icon />
                              <span className="capitalize">
                                {name}
                              </span>
                            </Link>
                          </Button>
                        </div>
                      </Fragment>
                    );
                  })}
                </div>
              </div>
              <div className="flex-none">
                <div className="flex gap-5 items-center">
                  <div className="flex-none">
                    <Button size="icon" variant="ghost" className="[&_svg]:!size-6">
                      <Bell />
                    </Button>
                  </div>
                  <div className="flex-none">
                    <Button size="icon" variant="ghost" className="[&_svg]:!size-6">
                      <Messages />
                    </Button>
                  </div>
                  <div className="flex-none">
                    <ProfileMenu />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function ProfileMenu() {
  const user = useUserStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button asChild size="lg" variant="secondary" className="rounded-full !p-2 !h-auto">
          <Button className="gap-3">
            {
              typeof user === "undefined"
              ? <Skeleton className="size-10 rounded-full" />
              : (
                <Avatar className="size-10">
                  <AvatarImage src="" />
                  <AvatarFallback className="text-base font-semibold bg-foreground text-background">
                    <span className="uppercase">
                      {user?.first_name[0]}{user?.last_name[0]}
                    </span>
                  </AvatarFallback>
                </Avatar>
              )
            }
            <span className="[&_svg]:!size-8">
              <Hamburger />
            </span>
          </Button>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="end" className="@container/flex w-sm">
        <DropdownMenuGroup>
          <DropdownMenuItem className="gap-3">
            {
              typeof user === "undefined"
              ? <Skeleton className="size-10 rounded-full" />
              : (
                <Avatar className="size-10">
                  <AvatarImage src="" />
                  <AvatarFallback className="text-base font-semibold bg-foreground text-background">
                    <span className="uppercase">
                      {user?.first_name[0]}{user?.last_name[0]}
                    </span>
                  </AvatarFallback>
                </Avatar>
              )
            }
            <div className="flex-1">
              <div className="space-y-0">
                {
                  typeof user === "undefined"
                  ? <Skeleton className="h-6 mb-0.5 w-full border bg-red-600" />
                  : (
                    <p className="text-base font-semibold">
                      <span className="capitalize">
                        {user?.first_name} {user?.last_name}
                      </span>
                    </p>
                  )
                }
                {
                  typeof user === "undefined"
                  ? <Skeleton className="h-4" />
                  : (
                    <Button asChild size={null} variant="link" className="text-sm font-normal">
                      <Link href={`mailto:${user?.email}`} className="lowercase">
                        {user?.email}
                      </Link>
                    </Button>
                  )
                }
              </div>
            </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuGroup className="xl:hidden">
          {navs.map(({ name, href, Icon }, index) => (
            <Fragment key={index}>
              <DropdownMenuItem asChild className="py-4">
                <Link href={NAV_BASEURL + href} className="[&_svg]:!size-6">
                  <Icon />
                  <span className="capitalize">
                    {name}
                  </span>
                </Link>
              </DropdownMenuItem>
            </Fragment>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="xl:hidden" />
        <DropdownMenuGroup>
          {menuRoutes.map(({ name, href, Icon }, index) => (
            <Fragment key={index}>
              <DropdownMenuItem asChild className="py-4">
                <Link href={NAV_BASEURL + href} className="[&_svg]:!size-5">
                  <Icon />
                  <span className="capitalize">
                    {name}
                  </span>
                </Link>
              </DropdownMenuItem>
            </Fragment>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
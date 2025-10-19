import { LogOut, ScrollText, Settings } from "lucide-react";
import { Blocks, Bug, SquareUser, Link } from "lucide-react";

import { Home, CRM, Apps } from "./svg";
import { Analytics, Revenue } from "./svg";

export const navs = [
  { Icon: Home, name: "home", href: "" },
  { Icon: Analytics, name: "analytics", href: "analytics" },
  { Icon: Revenue, name: "revenue", href: "revenue" },
  { Icon: CRM, name: "CRM", href: "crm" },
  { Icon: Apps, name: "apps", href: "apps" },
];

export const menuRoutes = [
  { Icon: Settings, name: "settings", href: "/settings" },
  { Icon: ScrollText, name: "purchase history", href: "/purchase-history" },
  { Icon: Link, name: "refer and earn", href: "/refer-and-earn" },
  { Icon: Blocks, name: "integrations", href: "/integrations" },
  { Icon: Bug, name: "report bug", href: "/report-bug" },
  { Icon: SquareUser, name: "switch account", href: "/switch-account" },
  { Icon: LogOut, name: "log out", href: "/log-out" },
];
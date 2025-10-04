import {Grid, type LucideIcon} from "lucide-react";
import {
  Home,
  CreditCard,
  FilePlus,
  History,
  FileText,
  Users,
  Zap,
  FileSpreadsheet,
  Headphones,
} from "lucide-react";

export type SidebarLink = {
  href: string;
  title: string;
  icon: LucideIcon;
  children?: SidebarLink[];
  order?: number;
};

const sidebarLinks: SidebarLink[] = [
  {
    href: "/",
    title: "Dashboard",
    icon: Home,
    order: 1,
  },
  {
    href: "/billing",
    title: "Billing",
    icon: CreditCard,
    order: 2,
    children: [
      {
        href: "/billing/create",
        title: "New Billing",
        icon: FilePlus,
      },
      {
        href: "/billing/history",
        title: "Billing History",
        icon: History,
      },
    ],
  },
  {
    href: "/contract",
    title: "Contracts",
    icon: FileText,
    order: 3,
  },
  {
    href: "/tenants",
    title: "Tenants",
    icon: Users,
    order: 4,
  },
  {
    href: "/user-management",
    title: "User Management",
    icon: Users,
    order: 5,
  },
  {
    href: "/utility-units",
    title: "Utility Units",
    icon: Zap,
    order: 6,
    children: [
      {
        href: "/utility-units/electricity",
        title: "Electricity",
        icon: Zap,
      },
      {
        href: "/utility-units/water",
        title: "Water",
        icon: FilePlus,
      },
    ],
  },
  {
    href: "/invoice",
    title: "Invoices",
    icon: FileSpreadsheet,
    order: 7,
  },
  {
    href: "/customer-service",
    title: "Customer Support",
    icon: Headphones,
    order: 8,
  },
  {
    href: "/room",
    title: "Rooms",
    icon: Grid,
    order: 9,
  }
];

export default sidebarLinks;

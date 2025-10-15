import type { BreadCrumbs } from "@/types/breadcrumb";

export const breadcrumbs: BreadCrumbs = {
  example: [
    {
      href: "/",
      label: "Home",
    },
    {
      href: "/somewhere",
      label: "Somewhere",
    },
    {
      href: "/components",
      label: "Components",
    },
  ],
  roomList: [
    {
      href: "/",
      label: "Home",
    },
    {
      href: "/rooms",
      label: "Rooms",
    },
  ],
  roomDetail: [
    {
      href: "/",
      label: "Home",
    },
    {
      href: "/rooms",
      label: "Rooms",
    },
    {
      href: "/details",
      label: "Details",
    },
  ],
  roomEdit: [
    {
      href: "/",
      label: "Home",
    },
    {
      href: "/rooms",
      label: "Rooms",
    },
    {
      href: "/edit",
      label: "Edit",
    },
  ],
  userList: [
    {
      href: "/",
      label: "Home",
    },
    {
      href: "/user-management/users",
      label: "Users",
    },
  ],
  userDetail: [
    {
      href: "/",
      label: "Home",
    },
    {
      href: "/user-management/users",
      label: "Users",
    },
    {
      href: "/details",
      label: "Details",
    },
  ],
  userEdit: [
    {
      href: "/",
      label: "Home",
    },
    {
      href: "/user-management/users",
      label: "Users",
    },
    {
      href: "/edit",
      label: "Edit",
    },
  ],
};

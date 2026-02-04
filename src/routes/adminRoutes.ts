import { Routes } from "@/types/routes.type";

export const adminRoutes: Routes[] = [
  {
    title: "Admin Dashboard",
    items: [
      {
        title: "Dashboard",
        url: "/admin",
      },
      {
        title: "Categories",
        url: "/admin/categories",
      },
      {
        title: "Create Category",
        url: "/admin/categories",
      },
      {
        title: "Orders",
        url: "/admin/orders",
      },
      {
        title: "Manage Users",
        url: "/admin/users",
      },
      {
        title: "Profile",
        url: "/admin/me",
      },
    ],
  },
];

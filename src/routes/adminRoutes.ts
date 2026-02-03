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
        title: "Users",
        url: "/admin/users",
      },
      {
        title: "Orders",
        url: "/admin/orders",
      },
      {
        title: "Categories",
        url: "/admin/categories",
      },
    ],
  },
];

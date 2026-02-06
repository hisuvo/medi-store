import { Routes } from "@/types/routes.type";

export const adminRoutes: Routes[] = [
  {
    title: "Admin Dashboard",
    items: [
      {
        title: "Dashboard",
        url: "/admin-dashboard/admin-home",
      },
      {
        title: "Categories",
        url: "/admin-dashboard/categories",
      },
      {
        title: "Create Category",
        url: "/admin-dashboard/categories",
      },
      {
        title: "Orders",
        url: "/admin-dashboard/orders",
      },
      {
        title: "Manage Users",
        url: "/admin-dashboard/users",
      },
      {
        title: "Profile",
        url: "/admin-dashboard/profile",
      },
    ],
  },
];

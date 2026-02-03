import { Routes } from "@/types/routes.type";

export const sellerRoutes: Routes[] = [
  {
    title: "seller Dashboard",
    items: [
      {
        title: "Dashboard",
        url: "/seller/dashboard",
      },
      {
        title: "Inventory",
        url: "/seller/medicines",
      },
      {
        title: "Orders",
        url: "/seller/orders",
      },
    ],
  },
];

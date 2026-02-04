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
        title: "Create Medicine",
        url: "/seller/create-medicine",
      },
      {
        title: "Medicines",
        url: "/seller/medicines",
      },
      {
        title: "Inventory",
        url: "/seller/medicines",
      },
      {
        title: "Orders",
        url: "/seller/orders",
      },
      {
        title: "Profile",
        url: "/seller/me",
      },
    ],
  },
];

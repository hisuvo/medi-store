import { Routes } from "@/types/routes.type";

export const sellerRoutes: Routes[] = [
  {
    title: "seller Dashboard",
    items: [
      {
        title: "Seller Dashboard",
        url: "/seller-dashboard",
      },
      {
        title: "Create Medicine",
        url: "/seller-dashboard/create-medicine",
      },
      {
        title: "All Medicins",
        url: "/seller-dashboard/medicine",
      },
      {
        title: "Orders",
        url: "/seller-dashboard/orders",
      },
      {
        title: "Profile",
        url: "/seller-dashboard/profile",
      },
    ],
  },
];

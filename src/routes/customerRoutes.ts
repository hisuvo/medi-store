import { Routes } from "@/types/routes.type";
import { HomeIcon } from "lucide-react";

export const customerRoutes: Routes[] = [
  {
    title: "Customer Dashboard",
    items: [
      {
        title: "User Home",
        url: "/dashboard",
      },
      {
        title: "Orders",
        url: "/dashboard/my-orders",
      },
      {
        title: "Checkout",
        url: "/dashboard/checkout",
      },
      {
        title: "Cart",
        url: "/dashboard/my-cart",
      },
      {
        title: "Review",
        url: "/dashboard/add-review",
      },
      {
        title: "Profile",
        url: "/dashboard/profile",
      },
    ],
  },
];

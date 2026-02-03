import { Routes } from "@/types/routes.type";

export const customerRoutes: Routes[] = [
  {
    title: "Customer Dashboard",
    items: [
      {
        title: "card",
        url: "/card",
      },
      {
        title: "Checkout",
        url: "/checkout",
      },
      {
        title: "Orders",
        url: "/orders",
      },
      {
        title: "Profile",
        url: "/profile",
      },
    ],
  },
];

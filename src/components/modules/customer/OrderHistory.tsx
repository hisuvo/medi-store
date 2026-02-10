"use client";

import { useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Search } from "lucide-react";

/*
  Orders → My Orders → Order History
  ---------------------------------
  ✅ Next.js App Router safe
  ✅ shadcn/ui only
  ✅ No framer-motion
  ✅ No next/image
  ✅ Responsive table/cards
  ✅ Filter + Search + Status badges
*/

// -----------------------------
// Types
// -----------------------------
type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

type Order = {
  id: string;
  date: string;
  items: number;
  total: number;
  status: OrderStatus;
};

// -----------------------------
// Mock Data
// -----------------------------
const initialOrders: Order[] = [
  {
    id: "ORD-1001",
    date: "2026-02-01",
    items: 3,
    total: 45,
    status: "delivered",
  },
  {
    id: "ORD-1002",
    date: "2026-02-03",
    items: 1,
    total: 10,
    status: "processing",
  },
  {
    id: "ORD-1003",
    date: "2026-02-05",
    items: 2,
    total: 30,
    status: "shipped",
  },
  {
    id: "ORD-1004",
    date: "2026-02-07",
    items: 5,
    total: 75,
    status: "pending",
  },
];

// -----------------------------
// Helpers
// -----------------------------
const statusColor = (status: OrderStatus) => {
  switch (status) {
    case "delivered":
      return "bg-green-500/10 text-green-600";
    case "processing":
      return "bg-blue-500/10 text-blue-600";
    case "shipped":
      return "bg-purple-500/10 text-purple-600";
    case "cancelled":
      return "bg-red-500/10 text-red-600";
    default:
      return "bg-yellow-500/10 text-yellow-600";
  }
};

export default function OrdersHistory() {
  const [orders] = useState<Order[]>(initialOrders);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string>("all");

  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const matchSearch = o.id.toLowerCase().includes(search.toLowerCase());
      const matchFilter = filter === "all" || o.status === filter;
      return matchSearch && matchFilter;
    });
  }, [orders, search, filter]);

  const totalSpent = useMemo(
    () => orders.reduce((acc, o) => acc + o.total, 0),
    [orders],
  );

  // -----------------------------
  // UI
  // -----------------------------
  return (
    <Card>
      <div className="min-h-screen p-6">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold">My Orders</h1>
            <p className="text-muted-foreground">
              Track and view your order history
            </p>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="rounded-2xl">
              <CardContent className="p-5">
                <p className="text-sm text-muted-foreground">Total Orders</p>
                <p className="text-2xl font-bold">{orders.length}</p>
              </CardContent>
            </Card>

            <Card className="rounded-2xl">
              <CardContent className="p-5">
                <p className="text-sm text-muted-foreground">Total Spent</p>
                <p className="text-2xl font-bold">${totalSpent}</p>
              </CardContent>
            </Card>

            <Card className="rounded-2xl">
              <CardContent className="p-5">
                <p className="text-sm text-muted-foreground">Delivered</p>
                <p className="text-2xl font-bold">
                  {orders.filter((o) => o.status === "delivered").length}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="rounded-2xl">
            <CardContent className="p-4 flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  className="pl-9"
                  placeholder="Search by order id..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Orders List */}
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>Order History</CardTitle>
              <CardDescription>All your past purchases</CardDescription>
            </CardHeader>

            <CardContent className="space-y-3">
              {filteredOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex flex-col md:flex-row md:items-center justify-between gap-3 border rounded-xl p-4 hover:bg-muted/50 transition"
                >
                  <div className="space-y-1">
                    <p className="font-semibold">{order.id}</p>
                    <p className="text-sm text-muted-foreground">
                      {order.date}
                    </p>
                  </div>

                  <div className="text-sm text-muted-foreground">
                    {order.items} items
                  </div>

                  <div className="font-medium">${order.total}</div>

                  <Badge className={statusColor(order.status)}>
                    {order.status}
                  </Badge>

                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                </div>
              ))}

              {filteredOrders.length === 0 && (
                <div className="text-center text-muted-foreground py-10">
                  No orders found
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Card>
  );
}

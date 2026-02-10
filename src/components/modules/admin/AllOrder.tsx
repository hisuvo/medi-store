"use client";

import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Eye, Truck, CheckCircle2, Clock, XCircle } from "lucide-react";

/*
=================================================
Admin → Orders → All Orders Page
Next.js + shadcn/ui + Tailwind
=================================================

Included Features (important for real admin panel):

✅ View all orders
✅ Search (order id / customer)
✅ Filter by status
✅ Status badge colors
✅ Quick status update
✅ Order summary stats
✅ Items count
✅ Payment method
✅ Address preview
✅ Total calculation
✅ Mobile responsive

Replace mock data with API later:
GET    /api/orders
PATCH  /api/orders/:id
*/

// ----------------------
// Types
// ----------------------

type Status = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

type Order = {
  id: string;
  customer: string;
  email: string;
  items: number;
  total: number;
  payment: string;
  address: string;
  date: string;
  status: Status;
};

// ----------------------
// Mock Data
// ----------------------

const initialOrders: Order[] = [
  {
    id: "ORD-1001",
    customer: "Rahim Uddin",
    email: "rahim@mail.com",
    items: 3,
    total: 45,
    payment: "COD",
    address: "Dhaka, Bangladesh",
    date: "2026-02-01",
    status: "pending",
  },
  {
    id: "ORD-1002",
    customer: "Karim Ahmed",
    email: "karim@mail.com",
    items: 5,
    total: 90,
    payment: "Card",
    address: "Chittagong",
    date: "2026-02-03",
    status: "shipped",
  },
  {
    id: "ORD-1003",
    customer: "Sumaiya",
    email: "sumaiya@mail.com",
    items: 2,
    total: 20,
    payment: "Bkash",
    address: "Sylhet",
    date: "2026-02-05",
    status: "delivered",
  },
];

// ----------------------
// Helpers
// ----------------------

function statusBadge(status: Status) {
  const map = {
    pending: "secondary",
    processing: "outline",
    shipped: "default",
    delivered: "default",
    cancelled: "destructive",
  } as const;

  return map[status];
}

// ----------------------
// Component
// ----------------------

export default function AllOrder() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string>("all");

  // ----------------------
  // Update status
  // ----------------------

  const updateStatus = (id: string, status: Status) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  };

  // ----------------------
  // Filters
  // ----------------------

  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const matchSearch =
        o.id.toLowerCase().includes(search.toLowerCase()) ||
        o.customer.toLowerCase().includes(search.toLowerCase());

      const matchFilter = filter === "all" || o.status === filter;

      return matchSearch && matchFilter;
    });
  }, [orders, search, filter]);

  // ----------------------
  // Stats
  // ----------------------

  const totalRevenue = orders.reduce((a, b) => a + b.total, 0);
  const pendingCount = orders.filter((o) => o.status === "pending").length;
  const deliveredCount = orders.filter((o) => o.status === "delivered").length;

  // ----------------------
  // UI
  // ----------------------

  return (
    <Card>
      <div className="min-h-screen bg-muted/40 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold">All Orders</h1>
            <p className="text-muted-foreground">
              Manage and track customer orders
            </p>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="rounded-2xl">
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <h2 className="text-2xl font-bold">${totalRevenue}</h2>
              </CardContent>
            </Card>

            <Card className="rounded-2xl">
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">Pending Orders</p>
                <h2 className="text-2xl font-bold">{pendingCount}</h2>
              </CardContent>
            </Card>

            <Card className="rounded-2xl">
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">Delivered</p>
                <h2 className="text-2xl font-bold">{deliveredCount}</h2>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-3">
            <Input
              placeholder="Search order or customer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
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
          </div>

          {/* Orders List */}
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <Card key={order.id} className="rounded-2xl shadow-sm">
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div>
                      <CardTitle className="text-lg">{order.id}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {order.date}
                      </p>
                    </div>

                    <Badge variant={statusBadge(order.status)}>
                      {order.status}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Customer</p>
                      <p className="font-medium">{order.customer}</p>
                      <p className="text-xs text-muted-foreground">
                        {order.email}
                      </p>
                    </div>

                    <div>
                      <p className="text-muted-foreground">Items</p>
                      <p className="font-medium">{order.items}</p>
                    </div>

                    <div>
                      <p className="text-muted-foreground">Payment</p>
                      <p className="font-medium">{order.payment}</p>
                    </div>

                    <div>
                      <p className="text-muted-foreground">Total</p>
                      <p className="font-bold">${order.total}</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <p className="text-sm text-muted-foreground truncate">
                      📍 {order.address}
                    </p>

                    <div className="flex gap-2">
                      <Button size="icon" variant="outline">
                        <Eye className="w-4 h-4" />
                      </Button>

                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => updateStatus(order.id, "processing")}
                      >
                        <Clock className="w-4 h-4" />
                      </Button>

                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => updateStatus(order.id, "shipped")}
                      >
                        <Truck className="w-4 h-4" />
                      </Button>

                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => updateStatus(order.id, "delivered")}
                      >
                        <CheckCircle2 className="w-4 h-4" />
                      </Button>

                      <Button
                        size="icon"
                        variant="destructive"
                        onClick={() => updateStatus(order.id, "cancelled")}
                      >
                        <XCircle className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {filteredOrders.length === 0 && (
              <Card className="p-10 text-center text-muted-foreground">
                No orders found
              </Card>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}

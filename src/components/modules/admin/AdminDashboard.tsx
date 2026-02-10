"use client";

import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Users,
  ShoppingCart,
  DollarSign,
  Pill,
  AlertTriangle,
  Truck,
  CheckCircle2,
} from "lucide-react";

/*
=====================================================
Admin → Dashboard → Statistics (Medicine Store)
Next.js + shadcn/ui + Tailwind
=====================================================

Real‑world sections included:

✅ Revenue stats
✅ Orders summary
✅ Users count
✅ Low stock alert
✅ Recent orders list
✅ Top selling medicines
✅ Clean professional layout
✅ No charts libraries (SSR safe)

Later you can connect:
GET /api/admin/stats
GET /api/orders?recent=true
GET /api/products/top
*/

// ---------------------------------
// Mock data
// ---------------------------------

const orders = [
  { id: "ORD-1001", customer: "Rahim", total: 45, status: "delivered" },
  { id: "ORD-1002", customer: "Karim", total: 90, status: "processing" },
  { id: "ORD-1003", customer: "Sumaiya", total: 20, status: "pending" },
];

const lowStock = [
  { name: "Paracetamol", stock: 5 },
  { name: "Insulin", stock: 2 },
  { name: "Vitamin D", stock: 7 },
];

const topProducts = [
  { name: "Napa", sold: 120 },
  { name: "Seclo", sold: 95 },
  { name: "Ace", sold: 80 },
];

export default function AdminDashboard() {
  // ----------------------------
  // Calculations
  // ----------------------------

  const totalRevenue = useMemo(
    () => orders.reduce((a, b) => a + b.total, 0),
    [],
  );

  const totalOrders = orders.length;
  const totalUsers = 132; // mock
  const totalProducts = 58; // mock

  // ----------------------------
  // UI
  // ----------------------------

  return (
    <Card>
      <div className="min-h-screen p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Medicine store statistics and business overview
            </p>
          </div>

          {/* ================= Stats Cards ================= */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="rounded-2xl">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Revenue</p>
                  <h2 className="text-2xl font-bold">${totalRevenue}</h2>
                </div>
                <DollarSign className="w-7 h-7 opacity-60" />
              </CardContent>
            </Card>

            <Card className="rounded-2xl">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Orders</p>
                  <h2 className="text-2xl font-bold">{totalOrders}</h2>
                </div>
                <ShoppingCart className="w-7 h-7 opacity-60" />
              </CardContent>
            </Card>

            <Card className="rounded-2xl">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Users</p>
                  <h2 className="text-2xl font-bold">{totalUsers}</h2>
                </div>
                <Users className="w-7 h-7 opacity-60" />
              </CardContent>
            </Card>

            <Card className="rounded-2xl">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Products</p>
                  <h2 className="text-2xl font-bold">{totalProducts}</h2>
                </div>
                <Pill className="w-7 h-7 opacity-60" />
              </CardContent>
            </Card>
          </div>

          {/* ================= Main Grid ================= */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* -------- Recent Orders -------- */}
            <Card className="lg:col-span-2 rounded-2xl">
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                {orders.map((o) => (
                  <div
                    key={o.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-muted/50"
                  >
                    <div>
                      <p className="font-medium">{o.id}</p>
                      <p className="text-sm text-muted-foreground">
                        {o.customer}
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="font-semibold">${o.total}</span>

                      <Badge>
                        {o.status === "delivered" && (
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                        )}
                        {o.status === "processing" && (
                          <Truck className="w-3 h-3 mr-1" />
                        )}
                        {o.status}
                      </Badge>

                      <Button size="sm" variant="outline">
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* -------- Low Stock Alert -------- */}
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" /> Low Stock
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-3">
                {lowStock.map((item) => (
                  <div key={item.name} className="flex justify-between text-sm">
                    <span>{item.name}</span>
                    <Badge variant="destructive">{item.stock} left</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* ================= Bottom Grid ================= */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Top selling */}
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle>Top Selling Medicines</CardTitle>
              </CardHeader>

              <CardContent className="space-y-3">
                {topProducts.map((p) => (
                  <div key={p.name}>
                    <div className="flex justify-between text-sm">
                      <span>{p.name}</span>
                      <span className="font-medium">{p.sold} sold</span>
                    </div>
                    <Separator className="mt-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick actions */}
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>

              <CardContent className="grid grid-cols-2 gap-3">
                <Button>Add Medicine</Button>
                <Button variant="outline">Add Category</Button>
                <Button variant="outline">View Orders</Button>
                <Button variant="outline">Manage Users</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Card>
  );
}

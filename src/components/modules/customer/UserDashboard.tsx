"use client";

import { useMemo } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, Package, Truck, Pill, ArrowRight } from "lucide-react";

/*
  User Dashboard → Medicine Store
  --------------------------------
  ✅ Next.js App Router safe
  ✅ shadcn/ui only
  ✅ No framer-motion
  ✅ No next/image
  ✅ Responsive cards layout
  ✅ Stats + quick actions + recent orders
*/

// -----------------------------
// Mock data (replace with API later)
// -----------------------------
const recentOrders = [
  { id: "ORD-1001", total: 45, status: "delivered" },
  { id: "ORD-1002", total: 20, status: "processing" },
  { id: "ORD-1003", total: 60, status: "shipped" },
];

export default function UserDashboard() {
  const totalSpent = useMemo(
    () => recentOrders.reduce((acc, o) => acc + o.total, 0),
    [],
  );

  const deliveredCount = recentOrders.filter(
    (o) => o.status === "delivered",
  ).length;

  return (
    <Card>
      <div className="min-h-screen p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground">
                Welcome back 👋 Manage your medicines and orders
              </p>
            </div>

            <Button>
              <ShoppingCart className="w-4 h-4 mr-2" />
              Go to Cart
            </Button>
          </div>

          {/* Stats */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="rounded-2xl">
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Orders</p>
                  <p className="text-2xl font-bold">{recentOrders.length}</p>
                </div>
                <Package className="w-6 h-6 text-muted-foreground" />
              </CardContent>
            </Card>

            <Card className="rounded-2xl">
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Delivered</p>
                  <p className="text-2xl font-bold">{deliveredCount}</p>
                </div>
                <Truck className="w-6 h-6 text-muted-foreground" />
              </CardContent>
            </Card>

            <Card className="rounded-2xl">
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Spent</p>
                  <p className="text-2xl font-bold">${totalSpent}</p>
                </div>
                <Pill className="w-6 h-6 text-muted-foreground" />
              </CardContent>
            </Card>

            <Card className="rounded-2xl">
              <CardContent className="p-5">
                <p className="text-sm text-muted-foreground">
                  Loyalty Progress
                </p>
                <Progress value={65} className="mt-3" />
                <p className="text-xs text-muted-foreground mt-2">
                  65% to next reward
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="rounded-2xl hover:bg-muted/50 transition">
              <CardContent className="p-6 space-y-3">
                <ShoppingCart className="w-6 h-6" />
                <CardTitle className="text-base">Shop Medicines</CardTitle>
                <CardDescription>
                  Browse and order medicines quickly
                </CardDescription>
                <Button variant="outline" className="w-full">
                  Shop Now <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            <Card className="rounded-2xl hover:bg-muted/50 transition">
              <CardContent className="p-6 space-y-3">
                <Package className="w-6 h-6" />
                <CardTitle className="text-base">My Orders</CardTitle>
                <CardDescription>Track and manage your orders</CardDescription>
                <Button variant="outline" className="w-full">
                  View Orders <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            <Card className="rounded-2xl hover:bg-muted/50 transition">
              <CardContent className="p-6 space-y-3">
                <Pill className="w-6 h-6" />
                <CardTitle className="text-base">Prescriptions</CardTitle>
                <CardDescription>Upload & manage prescriptions</CardDescription>
                <Button variant="outline" className="w-full">
                  Upload <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Recent Orders */}
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Your latest purchases</CardDescription>
            </CardHeader>

            <CardContent className="space-y-3">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between border rounded-xl p-4"
                >
                  <div>
                    <p className="font-semibold">{order.id}</p>
                    <p className="text-sm text-muted-foreground">
                      ${order.total}
                    </p>
                  </div>

                  <Badge variant="secondary">{order.status}</Badge>
                </div>
              ))}

              <Separator />

              <Button variant="ghost" className="w-full">
                View All Orders
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Card>
  );
}

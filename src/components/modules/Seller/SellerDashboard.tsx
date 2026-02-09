"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

// 👉 Example mock data (replace with API data)
const stats = [
  { title: "Total Orders", value: 1240 },
  { title: "Pending", value: 32 },
  { title: "Completed", value: 1150 },
  { title: "Revenue", value: "$8,540" },
];

const orders = [
  { id: "ORD-001", customer: "Rahim", amount: "$120", status: "Pending" },
  { id: "ORD-002", customer: "Karim", amount: "$250", status: "Completed" },
  { id: "ORD-003", customer: "Sumon", amount: "$90", status: "Cancelled" },
  { id: "ORD-004", customer: "Nusrat", amount: "$310", status: "Completed" },
];

export default function SellerDashboard() {
  return (
    <div className="min-h-screen p-6 bg-muted/40 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of orders and statistics
          </p>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="rounded-2xl shadow-sm">
              <CardHeader>
                <CardTitle className="text-sm text-muted-foreground">
                  {stat.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{stat.value}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Orders Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-muted-foreground text-left">
                    <th className="py-3">Order ID</th>
                    <th>Customer</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th className="text-right">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {orders.map((order, i) => (
                    <motion.tr
                      key={order.id}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 3 }}
                      transition={{ delay: i * 0.2 }}
                      className="border-b hover:bg-muted/40 transition"
                    >
                      <td className="py-3 font-medium">{order.id}</td>
                      <td>{order.customer}</td>
                      <td>{order.amount}</td>
                      <td>
                        <Badge
                          variant={
                            order.status === "Completed"
                              ? "default"
                              : order.status === "Pending"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {order.status}
                        </Badge>
                      </td>
                      <td className="text-right">
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

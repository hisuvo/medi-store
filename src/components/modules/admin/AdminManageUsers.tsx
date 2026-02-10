"use client";

import { useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
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
import { Search, Ban, CheckCircle } from "lucide-react";

/*
  Admin → Users → Manage Users
  -----------------------------
  ✅ Next.js App Router safe
  ✅ shadcn/ui only
  ✅ View all users
  ✅ Search users
  ✅ Filter by role
  ✅ Ban / Unban toggle
  ✅ Clean admin dashboard layout
*/

// -----------------------------
// Types
// -----------------------------
type Role = "customer" | "seller";

type UserStatus = "active" | "banned";

type User = {
  id: number;
  name: string;
  email: string;
  role: Role;
  status: UserStatus;
};

// -----------------------------
// Mock Data (replace with API)
// -----------------------------
const initialUsers: User[] = [
  {
    id: 1,
    name: "Rahim Ahmed",
    email: "rahim@mail.com",
    role: "customer",
    status: "active",
  },
  {
    id: 2,
    name: "Karim Store",
    email: "seller@mail.com",
    role: "seller",
    status: "active",
  },
  {
    id: 3,
    name: "Jamal Khan",
    email: "jamal@mail.com",
    role: "customer",
    status: "banned",
  },
  {
    id: 4,
    name: "Pharma BD",
    email: "pharma@mail.com",
    role: "seller",
    status: "active",
  },
];

// -----------------------------
// Helpers
// -----------------------------
const roleColor = (role: Role) =>
  role === "seller"
    ? "bg-blue-500/10 text-blue-600"
    : "bg-green-500/10 text-green-600";

const statusColor = (status: UserStatus) =>
  status === "banned"
    ? "bg-red-500/10 text-red-600"
    : "bg-emerald-500/10 text-emerald-600";

export default function AdminManageUsers() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  // -----------------------------
  // Actions
  // -----------------------------
  const toggleBan = (id: number) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id
          ? { ...u, status: u.status === "banned" ? "active" : "banned" }
          : u,
      ),
    );

    // 👉 replace with API
    console.log("toggle ban", id);
  };

  // -----------------------------
  // Filters
  // -----------------------------
  const filtered = useMemo(() => {
    return users.filter((u) => {
      const matchesSearch =
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase());

      const matchesRole = roleFilter === "all" || u.role === roleFilter;

      return matchesSearch && matchesRole;
    });
  }, [users, search, roleFilter]);

  const totalUsers = users.length;
  const bannedUsers = users.filter((u) => u.status === "banned").length;
  const sellers = users.filter((u) => u.role === "seller").length;

  // -----------------------------
  // UI
  // -----------------------------
  return (
    <Card>
      <div className="min-h-screen  p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold">Users</h1>
            <p className="text-muted-foreground">
              View and manage customers and sellers
            </p>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="rounded-2xl">
              <CardContent className="p-5">
                <p className="text-sm text-muted-foreground">Total Users</p>
                <p className="text-2xl font-bold">{totalUsers}</p>
              </CardContent>
            </Card>

            <Card className="rounded-2xl">
              <CardContent className="p-5">
                <p className="text-sm text-muted-foreground">Sellers</p>
                <p className="text-2xl font-bold">{sellers}</p>
              </CardContent>
            </Card>

            <Card className="rounded-2xl">
              <CardContent className="p-5">
                <p className="text-sm text-muted-foreground">Banned</p>
                <p className="text-2xl font-bold">{bannedUsers}</p>
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
                  placeholder="Search name or email..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="customer">Customer</SelectItem>
                  <SelectItem value="seller">Seller</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Users List */}
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>User List</CardTitle>
              <CardDescription>Manage account access</CardDescription>
            </CardHeader>

            <CardContent className="space-y-3">
              {filtered.map((user) => (
                <div
                  key={user.id}
                  className="flex flex-col md:flex-row md:items-center justify-between gap-3 border rounded-xl p-4 hover:bg-muted/50 transition"
                >
                  <div>
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {user.email}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge className={roleColor(user.role)}>{user.role}</Badge>
                    <Badge className={statusColor(user.status)}>
                      {user.status}
                    </Badge>
                  </div>

                  <Button
                    size="sm"
                    variant={
                      user.status === "banned" ? "default" : "destructive"
                    }
                    onClick={() => toggleBan(user.id)}
                  >
                    {user.status === "banned" ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" /> Unban
                      </>
                    ) : (
                      <>
                        <Ban className="w-4 h-4 mr-2" /> Ban
                      </>
                    )}
                  </Button>
                </div>
              ))}

              {filtered.length === 0 && (
                <div className="text-center text-muted-foreground py-10">
                  No users found
                </div>
              )}

              <Separator />
            </CardContent>
          </Card>
        </div>
      </div>
    </Card>
  );
}

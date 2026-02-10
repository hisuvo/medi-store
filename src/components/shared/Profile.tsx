"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";

export default function Profile() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // 👉 call your API here
    // await fetch('/api/profile', { method: 'PATCH', body: JSON.stringify(data) })

    setTimeout(() => setLoading(false), 800);
  };

  return (
    <Card>
      <div className="min-h-screen p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold">Profile</h1>
            <p className="text-muted-foreground">
              View and edit your personal information
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="rounded-2xl shadow-sm">
              <CardHeader>
                <CardTitle>Edit Profile</CardTitle>
                <CardDescription>Update your account details</CardDescription>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Avatar */}
                  <div className="flex items-center gap-6">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src="/avatar.png" />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>

                    <div className="space-y-2">
                      <Label>Profile Photo</Label>
                      <Input type="file" />
                    </div>
                  </div>

                  {/* Info grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Full Name</Label>
                      <Input
                        placeholder="Enter your name"
                        defaultValue="John Doe"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input
                        type="email"
                        placeholder="Enter email"
                        defaultValue="john@email.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Phone</Label>
                      <Input
                        placeholder="Phone number"
                        defaultValue="0123456789"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Address</Label>
                      <Input
                        placeholder="Address"
                        defaultValue="Dhaka, Bangladesh"
                      />
                    </div>
                  </div>

                  {/* Bio */}
                  <div className="space-y-2">
                    <Label>Bio</Label>
                    <Textarea placeholder="Write about yourself..." rows={4} />
                  </div>

                  {/* Actions */}
                  <div className="flex justify-end gap-3">
                    <Button type="button" variant="outline">
                      Cancel
                    </Button>

                    <Button type="submit" disabled={loading}>
                      {loading ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </Card>
  );
}

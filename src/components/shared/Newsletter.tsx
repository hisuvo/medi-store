"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Mail, Gift, Bell } from "lucide-react";

/*
=====================================================
Newsletter / Subscribe Page (Medicine Store)
Next.js + shadcn/ui + Tailwind
=====================================================

Features:

✅ Email subscribe form
✅ Benefits section
✅ Success message
✅ Responsive hero banner
✅ Clean pharmacy style
✅ API ready

Connect backend later:
POST /api/newsletter
*/

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) return;

    // Later connect API
    // await fetch("/api/newsletter", { method: "POST", body: JSON.stringify({ email }) })

    setSubscribed(true);
    setEmail("");
  };

  return (
    <Card>
      <div className="min-h-screen p-6">
        <div className="max-w-6xl mx-auto p-6 space-y-10">
          {/* ================= Hero ================= */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-10 text-center">
            <Badge className="mb-4">Stay Updated</Badge>

            <h1 className="text-3xl md:text-5xl font-bold mb-3">
              Get Health Tips & Medicine Offers
            </h1>

            <p className="text-muted-foreground max-w-2xl mx-auto">
              Subscribe to our newsletter and receive special discounts, new
              medicine alerts, and health advice directly in your inbox.
            </p>
          </div>

          {/* ================= Main Grid ================= */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* -------- Benefits -------- */}
            <Card className="rounded-2xl shadow-sm">
              <CardHeader>
                <CardTitle>Why Subscribe?</CardTitle>
                <CardDescription>Benefits you will get</CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="flex items-start gap-4">
                  <Gift className="w-5 h-5 mt-1 text-primary" />
                  <div>
                    <p className="font-medium">Exclusive Discounts</p>
                    <p className="text-sm text-muted-foreground">
                      Get special offers and coupons only for subscribers
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Bell className="w-5 h-5 mt-1 text-primary" />
                  <div>
                    <p className="font-medium">New Medicine Alerts</p>
                    <p className="text-sm text-muted-foreground">
                      Be first to know about new arrivals
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="w-5 h-5 mt-1 text-primary" />
                  <div>
                    <p className="font-medium">Health Tips</p>
                    <p className="text-sm text-muted-foreground">
                      Weekly health advice from experts
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* -------- Subscribe Form -------- */}
            <Card className="rounded-2xl shadow-sm">
              <CardHeader>
                <CardTitle>Subscribe Now</CardTitle>
                <CardDescription>Enter your email address</CardDescription>
              </CardHeader>

              <CardContent>
                {!subscribed ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />

                    <Button className="w-full" size="lg">
                      Subscribe
                    </Button>
                  </form>
                ) : (
                  <div className="flex flex-col items-center justify-center text-center gap-3 py-6">
                    <CheckCircle2 className="w-10 h-10 text-green-600" />
                    <p className="font-medium text-lg">
                      Subscribed Successfully!
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Thank you for joining our newsletter
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Card>
  );
}

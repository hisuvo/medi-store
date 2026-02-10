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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";

/*
  Checkout Page → Shipping Address
  --------------------------------
  ✅ Next.js App Router safe
  ✅ shadcn/ui only
  ✅ No framer-motion
  ✅ No next/image
  ✅ Fully client-side form
  ✅ Responsive 2 column layout
*/

// -----------------------------
// Types
// -----------------------------
type AddressForm = {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  notes: string;
  saveInfo: boolean;
};

export default function Checkout() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<AddressForm>({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    notes: "",
    saveInfo: true,
  });

  // -----------------------------
  // Handlers
  // -----------------------------
  const update = (key: keyof AddressForm, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      // 👉 replace with real API call
      await new Promise((r) => setTimeout(r, 800));

      console.log("Shipping Info:", form);
      alert("Address saved successfully ✅");
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------
  // UI
  // -----------------------------
  return (
    <Card>
      <div className="min-h-screen p-6">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold">Checkout</h1>
            <p className="text-muted-foreground">
              Enter your shipping address to continue
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Shipping Form */}
            <Card className="lg:col-span-2 rounded-2xl shadow-sm">
              <CardHeader>
                <CardTitle>Shipping Address</CardTitle>
                <CardDescription>
                  Where should we deliver your order?
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-5">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <Input
                      value={form.fullName}
                      onChange={(e) => update("fullName", e.target.value)}
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <Input
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      placeholder="01XXXXXXXXX"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input
                      type="email"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      placeholder="example@mail.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Postal Code</Label>
                    <Input
                      value={form.postalCode}
                      onChange={(e) => update("postalCode", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Street Address</Label>
                  <Textarea
                    value={form.address}
                    onChange={(e) => update("address", e.target.value)}
                    placeholder="House, road, area..."
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>City</Label>
                    <Input
                      value={form.city}
                      onChange={(e) => update("city", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>State / Division</Label>
                    <Input
                      value={form.state}
                      onChange={(e) => update("state", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Order Notes (optional)</Label>
                  <Textarea
                    value={form.notes}
                    onChange={(e) => update("notes", e.target.value)}
                    placeholder="Delivery instructions..."
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={form.saveInfo}
                    onCheckedChange={(v) => update("saveInfo", Boolean(v))}
                  />
                  <span className="text-sm">
                    Save this address for next time
                  </span>
                </div>

                <Button
                  onClick={handleSubmit}
                  className="w-full"
                  size="lg"
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Continue to Payment"}
                </Button>
              </CardContent>
            </Card>

            {/* Summary */}
            <Card className="rounded-2xl shadow-sm h-fit">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span>Items</span>
                  <span>$50</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>$5</span>
                </div>

                <Separator />

                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>$55</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Card>
  );
}

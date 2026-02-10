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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Star } from "lucide-react";

/*
  Reviews Page → My Medicine Reviews
  ----------------------------------
  ✅ Next.js App Router safe
  ✅ shadcn/ui only
  ✅ No next/image
  ✅ No framer-motion
  ✅ Rate + Write review
  ✅ Edit review
  ✅ SSR safe
*/

// -----------------------------
// Types
// -----------------------------
type ReviewItem = {
  id: number;
  orderId: string;
  medicine: string;
  reviewed: boolean;
  rating: number;
  comment: string;
};

// -----------------------------
// Mock Data (replace with API)
// -----------------------------
const initialReviews: ReviewItem[] = [
  {
    id: 1,
    orderId: "ORD-1001",
    medicine: "Paracetamol 500mg",
    reviewed: false,
    rating: 0,
    comment: "",
  },
  {
    id: 2,
    orderId: "ORD-1002",
    medicine: "Vitamin C Tablets",
    reviewed: true,
    rating: 4,
    comment: "Good quality and fast delivery.",
  },
];

export default function Reviews() {
  const [items, setItems] = useState<ReviewItem[]>(initialReviews);

  // -----------------------------
  // Handlers
  // -----------------------------
  const setRating = (id: number, rating: number) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, rating } : item)),
    );
  };

  const setComment = (id: number, comment: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, comment } : item)),
    );
  };

  const saveReview = (id: number) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, reviewed: true } : item)),
    );

    // 👉 replace with API
    console.log("Saved review", id);
  };

  const reviewedCount = useMemo(
    () => items.filter((i) => i.reviewed).length,
    [items],
  );

  // -----------------------------
  // UI
  // -----------------------------
  return (
    <div className="min-h-screen bg-muted/40 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">My Reviews</h1>
          <p className="text-muted-foreground">
            Rate and review your purchased medicines
          </p>
        </div>

        {/* Stats */}
        <Card className="rounded-2xl">
          <CardContent className="p-4 flex items-center justify-between text-sm">
            <span>Total Medicines: {items.length}</span>
            <span>Reviewed: {reviewedCount}</span>
          </CardContent>
        </Card>

        {/* List */}
        <div className="space-y-4">
          {items.map((item) => (
            <Card key={item.id} className="rounded-2xl shadow-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{item.medicine}</CardTitle>
                    <CardDescription>Order: {item.orderId}</CardDescription>
                  </div>

                  {item.reviewed ? (
                    <Badge variant="secondary">Reviewed</Badge>
                  ) : (
                    <Badge variant="outline">Pending</Badge>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Stars */}
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-5 h-5 cursor-pointer ${
                        star <= item.rating
                          ? "fill-current"
                          : "text-muted-foreground"
                      }`}
                      onClick={() => setRating(item.id, star)}
                    />
                  ))}
                </div>

                <Separator />

                {/* Comment */}
                <div className="space-y-2">
                  <Label>Your Review</Label>
                  <Textarea
                    value={item.comment}
                    onChange={(e) => setComment(item.id, e.target.value)}
                    placeholder="Write your experience..."
                  />
                </div>

                <Button
                  onClick={() => saveReview(item.id)}
                  disabled={!item.rating}
                >
                  {item.reviewed ? "Update Review" : "Submit Review"}
                </Button>
              </CardContent>
            </Card>
          ))}

          {items.length === 0 && (
            <Card className="p-10 text-center text-muted-foreground">
              No medicines to review yet
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import { Medicine } from "@/types/medicine.type";

type MedicineCardProps = {
  medicine: Medicine;
  onAddToCart?: (medicine: Medicine) => void;
};

export default function MedicineCard({
  medicine,
  onAddToCart,
}: MedicineCardProps) {
  const outOfStock = (medicine.stock ?? 0) <= 0 || !medicine.isActive;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="w-full"
    >
      <Card className="rounded-2xl shadow-sm hover:shadow-md transition-all overflow-hidden">
        {/* Image */}
        <div className="relative w-full h-44 bg-muted">
          <Image
            src={medicine.image || "/placeholder.png"}
            alt={medicine.name}
            fill
            className="object-cover"
          />

          {outOfStock && (
            <Badge className="absolute top-2 left-2">Out of Stock</Badge>
          )}
        </div>

        {/* Content */}
        <CardContent className="p-4 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-lg font-semibold leading-tight">
              {medicine.name}
            </h3>

            <span className="text-base font-bold">
              ${medicine.price.toFixed(2)}
            </span>
          </div>

          {medicine.description && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {medicine.description}
            </p>
          )}

          {medicine.manufacturer && (
            <p className="text-xs text-muted-foreground">
              Manufacturer: {medicine.manufacturer}
            </p>
          )}

          <p className="text-xs">Stock: {medicine.stock ?? 0}</p>
        </CardContent>

        {/* Footer */}
        <CardFooter className="p-4 pt-0 flex gap-2">
          <Button className="rounded-xl">Show Details</Button>
          <Button
            className="rounded-xl"
            disabled={outOfStock}
            onClick={() => onAddToCart?.(medicine)}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

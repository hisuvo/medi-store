"use client";

import { useState } from "react";
import MedicineCard from "@/components/modules/Home/MedicineCard";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Medicine } from "@/types/medicine.type";

type Props = {
  medicines: Medicine[];
};

export default function ShopClient({ medicines }: Props) {
  const [search, setSearch] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");

  const filteredMedicines = medicines.filter((medicine) => {
    const matchSearch =
      medicine.name.toLowerCase().includes(search.toLowerCase()) ||
      medicine.manufacturer?.toLowerCase().includes(search.toLowerCase());

    const matchPrice =
      priceFilter === "all"
        ? true
        : priceFilter === "low"
          ? medicine.price < 5
          : priceFilter === "mid"
            ? medicine.price >= 5 && medicine.price <= 10
            : medicine.price > 10;

    return matchSearch && matchPrice;
  });

  return (
    <div className="space-y-6">
      {/* 🔍 Search + Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <Input
          placeholder="Search medicine..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="md:max-w-sm"
        />

        <Select value={priceFilter} onValueChange={setPriceFilter}>
          <SelectTrigger className="md:w-48">
            <SelectValue placeholder="Filter by price" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Prices</SelectItem>
            <SelectItem value="low">Below $5</SelectItem>
            <SelectItem value="mid">$5 - $10</SelectItem>
            <SelectItem value="high">Above $10</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 🧾 Medicine Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMedicines.length > 0 ? (
          filteredMedicines.map((medicine) => (
            <MedicineCard key={medicine.id} medicine={medicine} />
          ))
        ) : (
          <p className="text-muted-foreground">No medicines found.</p>
        )}
      </div>
    </div>
  );
}

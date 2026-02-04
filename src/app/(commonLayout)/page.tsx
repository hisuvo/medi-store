import { CategoryCarousel } from "@/components/modules/Home/CategoryCarousel";
import MedicineCard from "@/components/modules/Home/MedicineCard";

import { Slider } from "@/components/modules/Home/Slider";
import { TestimonialCarousel } from "@/components/modules/Home/TestimonialCarousel";
import { medicineServices } from "@/services/medicine.service";
import { Medicine } from "@/types/medicine.type";

export default async function Home() {
  const medicines = await medicineServices.getMedicine();

  console.log("medicine data ->", medicines);

  return (
    <div className="space-y-8">
      <Slider />
      <CategoryCarousel />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {medicines?.data.map((medicine: Medicine) => (
          <MedicineCard key={medicine.id} medicine={medicine} />
        ))}
      </div>
      <TestimonialCarousel />
    </div>
  );
}

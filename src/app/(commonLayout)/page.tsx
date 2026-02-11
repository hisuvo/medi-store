import { CategoryCarousel } from "@/components/modules/Home/CategoryCarousel";
import NewMedicineList from "@/components/modules/Home/NewMedicineList";
import { Slider } from "@/components/modules/Home/Slider";
import { TestimonialCarousel } from "@/components/modules/Home/TestimonialCarousel";

export default async function HomePage() {
  return (
    <div className="space-y-8">
      <Slider />
      <CategoryCarousel />
      <NewMedicineList />
      <TestimonialCarousel />
    </div>
  );
}

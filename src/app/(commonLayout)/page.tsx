import { CategoryCarousel } from "@/components/modules/Home/CategoryCarousel";
import { Slider } from "@/components/modules/Home/Slider";
import { TestimonialCarousel } from "@/components/modules/Home/TestimonialCarousel";

export default async function Home() {
  return (
    <div className="space-y-8">
      <Slider />
      <CategoryCarousel />
      <TestimonialCarousel />
    </div>
  );
}

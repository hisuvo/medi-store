// "use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";

type Category = {
  id: string;
  name: string;
  description: string;
  _count: {
    medicines: number;
  };
};

const apiBase = process.env.API_URL;

export async function CategoryCarousel() {
  const categoriesFetch = async () => {
    try {
      const res = await fetch(`${apiBase}/categories`);
      if (!res.ok) throw new Error("Failed to fetch medicines");
      const data = await res.json();

      return data;
    } catch (error) {}
  };

  const data = await categoriesFetch();

  const categories = data.result;

  return (
    <div className="relative container mx-auto px-6">
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent>
          {categories.map((category: Category) => (
            <CarouselItem
              key={category.id}
              className="basis-1/2 sm:basis-1/3 md:basis-1/5"
            >
              <Card className="border shadow-none">
                <div className="flex flex-col items-center text-center gap-4 p-4 cursor-pointer">
                  {/* Text */}
                  <div>
                    <h3 className="font-semibold">
                      {category.name.slice(0, 15)}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {category._count.medicines} products
                    </p>
                  </div>
                </div>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Arrows */}
        <CarouselPrevious className="left-0" />
        <CarouselNext className="right-0" />
      </Carousel>
    </div>
  );
}

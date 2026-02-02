"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";
import { Syringe, Pill, Stethoscope, Monitor, Heart } from "lucide-react";

type Category = {
  id: string;
  name: string;
  count: number;
  icon: React.ReactNode;
};

const categories: Category[] = [
  {
    id: "1",
    name: "Pulse Oximeters",
    count: 6,
    icon: <Syringe size={32} />,
  },
  {
    id: "2",
    name: "Examination Gloves",
    count: 5,
    icon: <Pill size={32} />,
  },
  {
    id: "3",
    name: "Medicine",
    count: 2,
    icon: <Stethoscope size={32} />,
  },
  {
    id: "10",
    name: "Pulse Oximeters",
    count: 6,
    icon: <Syringe size={32} />,
  },
  {
    id: "20",
    name: "Examination Gloves",
    count: 5,
    icon: <Pill size={32} />,
  },
  {
    id: "30",
    name: "Medicine",
    count: 2,
    icon: <Stethoscope size={32} />,
  },
  {
    id: "4",
    name: "PPE Protection",
    count: 3,
    icon: <Monitor size={32} />,
  },
  {
    id: "5",
    name: "Wound Care",
    count: 6,
    icon: <Heart size={32} />,
  },
];

export function CategoryCarousel() {
  return (
    <div className="relative container mx-auto px-6">
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent>
          {categories.map((category) => (
            <CarouselItem
              key={category.id}
              className="basis-1/2 sm:basis-1/3 md:basis-1/5"
            >
              <Card className="border shadow-none">
                <div className="flex flex-col items-center text-center gap-4 p-4 cursor-pointer">
                  {/* Icon circle */}
                  <div className="h-24 w-24 rounded-full flex items-center justify-center">
                    {category.icon}
                  </div>

                  {/* Text */}
                  <div>
                    <h3 className="font-semibold">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {category.count} products
                    </p>
                  </div>
                </div>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Arrows */}
        <CarouselPrevious className="-left-10" />
        <CarouselNext className="-right-10" />
      </Carousel>
    </div>
  );
}

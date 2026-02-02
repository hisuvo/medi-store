"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";

type Testimonial = {
  name: string;
  date: string;
  rating: number;
  review: string;
  product: string;
  image: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Patrick M. Newman",
    date: "May 27, 2024",
    rating: 2.5,
    review:
      "Authentic medicine, fast delivery, and excellent packaging. Highly recommended.",
    product: "Vitamin C Capsules",
    image: "/products/vitamin.png",
  },
  {
    name: "Patrick M. Newman",
    date: "May 27, 2024",
    rating: 3.5,
    review:
      "Authentic medicine, fast delivery, and excellent packaging. Highly recommended.",
    product: "Vitamin C Capsules",
    image: "/products/vitamin.png",
  },
  {
    name: "Patrick M. Newman",
    date: "May 27, 2024",
    rating: 1.5,
    review:
      "Authentic medicine, fast delivery, and excellent packaging. Highly recommended.",
    product: "Vitamin C Capsules",
    image: "/products/vitamin.png",
  },
  {
    name: "Philip King",
    date: "May 27, 2024",
    rating: 3,
    review:
      "Quality is good, but delivery was a bit late. Customer support responded well.",
    product: "Pain Relief Syrup",
    image: "/products/syrup.png",
  },
];

export function TestimonialCarousel() {
  return (
    <section className=" py-12 px-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Happy Clients Say</h2>
        </div>

        <Carousel className="w-full">
          <CarouselContent>
            {testimonials.map((item, index) => (
              <CarouselItem key={index} className="md:basis-1/2">
                <Card className="flex flex-row justify-between h-full rounded-2xl overflow-hidden">
                  {/* Left */}
                  <div className="flex-1 p-6">
                    <div className="flex mb-3">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < item.rating
                              ? "fill-orange-400 text-orange-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>

                    <p className="text-gray-700 dark:text-gray-300 mb-6">
                      {item.review}
                    </p>

                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.date}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right */}
                  {/* <div className="w-56 bg-gray-50 flex flex-col items-center justify-center p-4">
                    <Image
                      src={item.image}
                      alt={item.product}
                      width={120}
                      height={120}
                      className="object-contain"
                    />
                    <p className="text-sm text-center mt-3 text-muted-foreground">
                      {item.product}
                    </p>
                  </div> */}
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}

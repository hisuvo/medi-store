"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

type HeroSlide = {
  id: string;
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
};

const slides: HeroSlide[] = [
  {
    id: "1",
    title: "Flat 20% Off on Medicines",
    description: "Order genuine medicines with fast home delivery",
    ctaText: "Shop Now",
    ctaLink: "#",
  },
  {
    id: "2",
    title: "Upload Prescription",
    description: "Get medicines verified by licensed pharmacists",
    ctaText: "Shop Now",
    ctaLink: "#",
  },
  {
    id: "3",
    title: "Free Doctor Consultation",
    description: "Talk to certified doctors anytime, anywhere",
    ctaText: "Shop Now",
    ctaLink: "#",
  },
];

export function Slider() {
  const autoplay = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false }),
  );

  return (
    <Carousel
      plugins={[autoplay.current]}
      className="w-full"
      onMouseEnter={autoplay.current.stop}
      onMouseLeave={autoplay.current.reset}
    >
      <CarouselContent>
        {slides.map((slide) => (
          <CarouselItem key={slide.id}>
            {/* <div className="flex h-[50vh] w-full items-center justify-center bg-gradient-to-r from-primary/10 to-primary/5">
              <div className="text-center space-y-4 max-w-2xl px-4">
                <h1 className="text-3xl md:text-5xl font-bold">
                  {slide.title}
                </h1>

                <p className="text-muted-foreground text-lg">
                  {slide.description}
                </p>

                <Button size="lg">{slide.ctaText}</Button>
              </div>
            </div> */}

            <div className="relative h-[50vh] w-full overflow-hidden flex items-center justify-center bg-gradient-to-r from-primary/10 to-primary/5">
              {/* Fog layers */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="fog fog-1" />
                <div className="fog fog-2" />
                <div className="fog fog-3" />
              </div>

              {/* Content */}
              <div className="relative text-center space-y-4 max-w-2xl px-4 z-10">
                <h1 className="text-3xl md:text-5xl font-bold">
                  {slide.title}
                </h1>

                <p className="text-muted-foreground text-lg">
                  {slide.description}
                </p>

                <Button size="lg">{slide.ctaText}</Button>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

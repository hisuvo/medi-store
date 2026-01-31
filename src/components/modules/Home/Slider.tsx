"use client";

import * as React from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
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
  image: string;
  ctaText: string;
  ctaLink: string;
};

const slides: HeroSlide[] = [
  {
    id: "1",
    title: "Flat 20% Off on Medicines",
    description: "Order genuine medicines with fast home delivery",
    image: "/hero/hero-1.gif",
    ctaText: "Shop Now",
    ctaLink: "/store",
  },
  {
    id: "2",
    title: "Upload Prescription",
    description: "Get medicines verified by licensed pharmacists",
    image: "/hero/hero-2.gif",
    ctaText: "Upload Now",
    ctaLink: "/prescription",
  },
  {
    id: "3",
    title: "Free Doctor Consultation",
    description: "Talk to certified doctors anytime, anywhere",
    image: "/hero/hero-3.gif",
    ctaText: "Consult Now",
    ctaLink: "/consult",
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
            <div className="relative h-[70vh] w-full">
              {/* Background Image */}
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority
                className="object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-green-900/30" />

              {/* Content */}
              <div className="absolute inset-0 flex items-center">
                <div className="container max-w-6xl px-6">
                  <div className="max-w-2xl text-center text-white space-y-4">
                    <h1 className="text-3xl md:text-5xl font-bold">
                      {slide.title}
                    </h1>
                    <p className="text-lg text-white/90">{slide.description}</p>
                    <Button size="lg" asChild>
                      <a href={slide.ctaLink}>{slide.ctaText}</a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

// components/CollectionSlider.tsx
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export interface Collection {
  title: string;
  slug: string;
  subtitle?: string;
  image: string;
}

const collections: Collection[] = [
  {
    title: "Rings",
    slug: "rings",
    subtitle: "Gold & Diamond",
    image: "/images/ring1.jpg",
  },
  {
    title: "Necklaces",
    slug: "necklaces",
    subtitle: "Statement & Minimal",
    image: "/images/ring2.jpg",
  },
  {
    title: "Earrings",
    slug: "earrings",
    subtitle: "Hoops & Studs",
    image: "/images/ring3.jpg",
  },
  {
    title: "Bracelets",
    slug: "bracelets",
    subtitle: "Cuffs & Chains",
    image: "/images/ring4.jpg",
  },
];

export default function CollectionSlider({
  items = collections,
}: {
  items?: Collection[];
}) {
  return (
    <div className="w-full max-w-[1280px]  mx-auto mt-10 px-4">
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={24}
        slidesPerView={3}
        pagination={{
          clickable: true,
          renderBullet: (index, className) =>
            `<button class="${className} custom-bullet" aria-label="Go to slide ${
              index + 1
            }"><span class="bullet-inner"></span></button>`,
        }}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        loop
        breakpoints={{
          0: { slidesPerView: 1 },
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {items.map((c, i) => (
          <SwiperSlide key={i}>
            <Link
              href={`/collections/${c.slug}`}
              className="block group"
              aria-label={`Open ${c.title} collection`}
            >
              <div className="relative w-full h-72 rounded-2xl overflow-hidden shadow-lg transform transition-transform duration-300 group-hover:scale-101">
                <Image
                  src={c.image}
                  alt={c.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  style={{ objectFit: "cover", objectPosition: "center" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent"></div>
                <div className="absolute left-4 bottom-4 right-4 text-white">
                  <h3 className="text-xl font-semibold">{c.title}</h3>
                  {c.subtitle && (
                    <p className="text-sm opacity-90">{c.subtitle}</p>
                  )}
                  <div className="mt-3 inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-xs">
                    <span>Explore</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

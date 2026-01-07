"use client";

import { Brand } from "@/types/main";
import { m } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Settings2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function BrandMarquee({ brands }: { brands: Brand[] }) {
    if (!brands || brands.length === 0) return null;

    return (
        <section className="w-full py-20 bg-white overflow-hidden relative z-10">

            {/* INJECTED CSS ANIMATION */}
            <style jsx>{`
                @keyframes scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-scroll {
                    animation: scroll 40s linear infinite;
                }
                .group:hover .animate-scroll {
                    animation-play-state: paused;
                }
            `}</style>

            {/* Header Section (Preserved) */}
            <div className="container mx-auto px-4 mb-16 text-center relative z-10">
                <m.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex flex-col items-center space-y-6"
                >
                    {/* Eyebrow */}
                    <div className="flex items-center space-x-4">
                        <span className="text-xs font-medium uppercase tracking-[0.3em] text-neutral-500 font-sans">
                            Nuestras Marcas
                        </span>
                    </div>

                    {/* Main Title */}
                    <div className="overflow-hidden relative pb-2">
                        <m.h2
                            initial={{ y: "100%" }}
                            whileInView={{ y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                            className="text-4xl md:text-6xl font-light tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-neutral-700 to-black font-display"
                        >
                            DISPONIBLES
                        </m.h2>
                    </div>

                    {/* Ornamental Icon */}
                    <m.div
                        initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
                        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                    >
                        <Settings2 className="w-5 h-5 text-neutral-400 stroke-[1.5]" />
                    </m.div>
                </m.div>
            </div>

            {/* Marquee Area */}
            <div className="relative w-full group">

                {/* Vignette / Fade Masks */}
                <div className="absolute left-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

                {/* Scrolling Container */}
                <div className="flex w-fit animate-scroll">

                    {/* First Copy */}
                    <div className="flex items-center shrink-0 gap-16 md:gap-32 px-8 md:px-16">
                        {brands.map((brand, i) => (
                            <BrandItem key={`a-${i}`} brand={brand} />
                        ))}
                    </div>

                    {/* Second Copy (Duplicate for Loop) */}
                    <div className="flex items-center shrink-0 gap-16 md:gap-32 px-8 md:px-16">
                        {brands.map((brand, i) => (
                            <BrandItem key={`b-${i}`} brand={brand} />
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}

// Subcomponent for clean code
function BrandItem({ brand }: { brand: Brand }) {
    return (
        <Link
            href={`/catalogo?brand=${encodeURIComponent(brand.slug)}`}
            className="group/item relative flex items-center justify-center transition-transform duration-500 hover:scale-110"
            aria-label={`Ver catálogo de ${brand.name}`}
        >
            <div className="relative w-32 h-16 md:w-48 md:h-24">
                {brand.logo ? (
                    <Image
                        src={brand.logo}
                        alt={brand.name}
                        fill
                        className="object-contain opacity-40 grayscale transition-all duration-500 group-hover/item:opacity-100 group-hover/item:grayscale-0"
                        sizes="(max-width: 768px) 128px, 192px"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <span className="text-xl font-bold uppercase font-display tracking-widest text-neutral-400 group-hover/item:text-neutral-900 transition-colors duration-500">
                            {brand.name}
                        </span>
                    </div>
                )}
            </div>
        </Link>
    );
}

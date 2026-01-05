"use client";

import { CarCard } from "@/components/cars/CarCard";
import { Car } from "@/types/main";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { m } from "framer-motion";
import Link from "next/link";
import { ArrowRight, LayoutGrid } from "lucide-react";

interface FeaturedCarsProps {
    cars: Car[];
}

export function FeaturedCars({ cars }: FeaturedCarsProps) {
    if (!cars || cars.length === 0) return null;

    // Animation Variants
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }
    };

    return (
        <section className="py-32 bg-zinc-950 relative overflow-hidden">
            {/* Divider Superior (Optional/Subtle) */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            {/* Ambient Lighting */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-white/5 blur-[120px] rounded-full pointer-events-none z-0" />

            <div className="container mx-auto px-6 relative z-20">
                {/* Header - Editorial Style */}
                <div className="flex flex-col items-center mb-20 text-center space-y-6">
                    <m.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex items-center gap-4"
                    >
                        <div className="h-px w-8 bg-neutral-700" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-500">
                            Nuestra Colección
                        </span>
                        <div className="h-px w-8 bg-neutral-700" />
                    </m.div>

                    <m.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-5xl md:text-7xl font-serif font-medium text-white tracking-tight leading-[0.9]"
                    >
                        OBRAS <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-600">
                            MAESTRAS
                        </span>
                    </m.h2>

                    <m.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <LayoutGrid className="w-5 h-5 text-neutral-600 mt-4" strokeWidth={1.5} />
                    </m.div>
                </div>

                {/* Asymmetric Grid */}
                <m.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[400px]" // Fixed row height for alignment
                >
                    {cars.map((car, index) => {
                        // Logic for "Hero" items: 
                        // Index 0 spans 2 columns
                        const isHero = index === 0;

                        return (
                            <m.div
                                key={car.id}
                                variants={item}
                                className={`
                                    relative group
                                    ${isHero ? "md:col-span-2 md:row-span-1 lg:row-span-1" : "md:col-span-1"}
                                `}
                            >
                                <CarCard
                                    car={car}
                                    className="h-full border-neutral-800 hover:border-neutral-600 transition-colors bg-black"
                                    priority={isHero}
                                />
                            </m.div>
                        );
                    })}
                </m.div>
            </div>

            <div className="mt-24 text-center relative z-20">
                <Link
                    href="/catalogo"
                    className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-neutral-500 hover:text-white transition-colors group"
                >
                    Explorar Inventario
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
            </div>
        </section>
    );
}

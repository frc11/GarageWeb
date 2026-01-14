"use client";

import { CarCard } from "@/components/cars/CarCard";
import { Car } from "@/types/main";
import { m } from "framer-motion";
import { CarIcon } from "lucide-react";
import { PremiumButton } from "../ui/PremiumButton";
import { cn } from "@/lib/utils";

interface FeaturedCarsProps {
    cars: Car[];
}

function getClassForIndex(index: number, total: number): string {
    // 1 Item: Full width
    if (total === 1) return "md:col-span-12";

    // 2 Items: Split 50/50
    if (total === 2) return "md:col-span-6";

    // 3 Items: Two split top, one hero bottom (User Request: Last uses all space)
    if (total === 3) return index === 2 ? "md:col-span-12" : "md:col-span-6";

    // 4 Items: Zig Zag (Hero + Small, Small + Hero)
    if (total === 4) return (index === 0 || index === 3) ? "md:col-span-8" : "md:col-span-4";

    // 5+ Items: Mosaic Pattern
    // If total (5, 7, 9) is odd, last item MUST be full width
    if (total % 2 !== 0 && index === total - 1) {
        return "md:col-span-12";
    }

    // Pattern for the rest: [8, 4] -> [4, 8] -> [6, 6] -> Repeat
    const pattern = [8, 4, 4, 8, 6, 6];
    const span = pattern[index % pattern.length];
    return `md:col-span-${span}`;
}

export function FeaturedCars({ cars }: FeaturedCarsProps) {
    if (!cars || cars.length === 0) return null;

    // Remove limits (up to 10 as requested)
    const displayCars = cars
        .sort((a, b) => Number(b.id) - Number(a.id))
        .slice(0, 10);

    const totalItems = displayCars.length;

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
        show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } }
    };

    return (
        <section className="py-25 bg-neutral-950 relative overflow-hidden z-20">

            {/* INTEGRACIÓN SUPERIOR */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-neutral-950 via-neutral-950/80 to-transparent z-10 pointer-events-none" />

            {/* TEXTURA DE PUNTOS */}
            <div className="absolute inset-0 z-0 opacity-[0.15]"
                style={{
                    backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
                    backgroundSize: '32px 32px',
                    maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)'
                }}
            />

            {/* Ambient Background Light */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-950/90 via-neutral-950/80 to-neutral-950 pointer-events-none z-0" />

            <div className="container mx-auto px-6 relative z-20">
                {/* Header */}
                <div className="flex flex-col items-center mb-20 text-center space-y-8">

                    {/* 1. The Dots Wave */}
                    <m.div
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        variants={{
                            hidden: { opacity: 0 },
                            show: {
                                opacity: 1,
                                transition: {
                                    staggerChildren: 0.1,
                                    delayChildren: 0.2
                                }
                            }
                        }}
                        className="flex gap-3"
                    >
                        {[...Array(5)].map((_, i) => (
                            <m.span
                                key={i}
                                variants={{
                                    hidden: { opacity: 0.3, scale: 1 },
                                    show: {
                                        opacity: [0.3, 1, 0.3],
                                        scale: [1, 1.2, 1],
                                        transition: {
                                            duration: 1.5,
                                            ease: "easeInOut",
                                            repeat: Infinity,
                                            repeatType: "mirror"
                                        }
                                    }
                                }}
                                className="w-2 h-2 rounded-full bg-amber-500"
                            />
                        ))}
                    </m.div>

                    {/* 2. The Reveal Subtitle */}
                    <div className="overflow-hidden">
                        <m.h3
                            initial={{ y: "100%", opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                            className="text-sm font-serif font-medium tracking-[0.2em] text-amber-500/80 uppercase"
                        >
                            Nuevos Ingresos
                        </m.h3>
                    </div>

                    {/* 3. Main Title */}
                    <m.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-5xl md:text-7xl font-serif font-medium text-white tracking-tight leading-[0.9]"
                    >
                        ÚLTIMOS <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-600">
                            INGRESOS
                        </span>
                    </m.h2>

                </div>

                {/* Dynamic Bento Grid */}
                <m.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[400px]"
                >
                    {displayCars.map((car, index) => {
                        const colSpanClass = getClassForIndex(index, totalItems);

                        return (
                            <m.div
                                key={car.id}
                                variants={item}
                                className={cn(
                                    "relative group md:col-span-12", // Default to full width on mobile/base
                                    colSpanClass
                                )}
                            >
                                <CarCard
                                    car={car}
                                    className="h-full border-neutral-800 hover:border-neutral-600 transition-colors bg-black flex flex-col"
                                    imageAspectClassName="flex-1 w-full"
                                    priority={index <= 2}
                                />
                            </m.div>
                        );
                    })}
                </m.div>
            </div>

            <div className="mt-24 text-center relative z-20">
                <a href="/catalogo">
                    <PremiumButton variant="primary">
                        Ver Inventario
                        <CarIcon className="w-4 h-4" />
                    </PremiumButton>
                </a>
            </div>
        </section>
    );
}
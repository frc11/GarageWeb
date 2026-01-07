"use client";

import { CarCard } from "@/components/cars/CarCard";
import { Car } from "@/types/main";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { m } from "framer-motion";
import Link from "next/link";
import { ArrowRight, LayoutGrid } from "lucide-react";
import { PremiumButton } from "../ui/PremiumButton";

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
        <section className="py-24 bg-neutral-950 relative overflow-hidden">
            {/* Ambient Background Light - Suave y difuminado */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-900/50 via-neutral-950/80 to-neutral-950 pointer-events-none" />

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
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 auto-rows-[450px]"
                >
                    {cars.map((car, index) => {
                        const total = cars.length;

                        // --- SMART GRID LOGIC ---

                        // Default Base (Mobile): 1 col (automatic in grid-cols-1)
                        // Default MD: 1 col (of 2) -> md:col-span-1
                        // Default LG: 4 cols (of 12) -> lg:col-span-4
                        let mdClass = "md:col-span-1";
                        let lgClass = "lg:col-span-4";

                        // MD: Handle Orphan (if total is odd, last one spans 2)
                        if (total % 2 !== 0 && index === total - 1) {
                            mdClass = "md:col-span-2";
                        }

                        // LG: Handle Last Row (Remainder 1 or 2)
                        const remainder = total % 3;

                        // Case: 1 Orphan at the end
                        if (remainder === 1 && index === total - 1) {
                            // "Imponente y centrado" -> Full width (12) or Centered Half (6)?
                            // User liked "Imponente" -> Let's go big but constrained? 
                            // Actually, let's use col-span-12 for pure impact, usually looks best for "featured".
                            lgClass = "lg:col-span-12";
                        }
                        // Case: 2 Items at the end (e.g. 5 items)
                        else if (remainder === 2 && index >= total - 2) {
                            // "Centered or Stretched" -> Spanning 6 cols each (half width) fills the row perfectly.
                            lgClass = "lg:col-span-6";
                        }

                        return (
                            <m.div
                                key={car.id}
                                variants={item}
                                className={`
                                    relative group
                                    ${mdClass}
                                    ${lgClass}
                                `}
                            >
                                <CarCard
                                    car={car}
                                    className="h-full border-neutral-800 hover:border-neutral-600 transition-colors bg-black"
                                    priority={index <= 2} // First row gets priority
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
                        <ArrowRight className="w-4 h-4" />
                    </PremiumButton>
                </a>
            </div>
        </section>
    );
}

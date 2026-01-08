"use client";

import { CarCard } from "@/components/cars/CarCard";
import { Car } from "@/types/main";
import { m } from "framer-motion";
import { CarIcon, LayoutGrid } from "lucide-react";
import { PremiumButton } from "../ui/PremiumButton";

interface FeaturedCarsProps {
    cars: Car[];
}

export function FeaturedCars({ cars }: FeaturedCarsProps) {
    if (!cars || cars.length === 0) return null;

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
        // Mantenemos overflow-hidden y el bg oscuro
        <section className="py-25 bg-neutral-950 relative overflow-hidden z-20">

            {/* INTEGRACIÓN SUPERIOR (FlashPromo -> Featured) - SE MANTIENE */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-neutral-950 via-neutral-950/80 to-transparent z-10 pointer-events-none" />

            {/* TEXTURA DE PUNTOS (Modificada) */}
            <div className="absolute inset-0 z-0 opacity-[0.15]"
                style={{
                    backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
                    backgroundSize: '32px 32px',
                    // CAMBIO CLAVE: Fade IN arriba (para FlashPromo) y Fade OUT abajo (para AboutSection)
                    // Esto evita que los puntos se corten feo contra el blanco de abajo.
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

                {/* Grid */}
                <m.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 auto-rows-[450px]"
                >
                    {/* Sort by ID desc (assuming higher ID is newer) or by Year desc, then take top 4 */}
                    {cars
                        .sort((a, b) => Number(b.id) - Number(a.id)) // Mock 'latest' logic
                        .slice(0, 4)
                        .map((car, index) => {
                            const total = 4; // We force 4
                            let mdClass = "md:col-span-1";
                            let lgClass = "lg:col-span-4"; // Default 3 cols? No 12/4 = 3 columns.
                            // Actually the design system here (lg:col-span-X) depends on the layout intended.
                            // If we want 4 items, we can do 2x2 grid in desktop? Or 4 items in one row?
                            // 12 columns. 4 items -> span 3 each? Or span 6 (2 rows)?
                            // User manual said "top 4".
                            // Previous logic had masonry-like spans.

                            // Let's do a uniform 2x2 grid for "Latest Arrivals" or a nice asymmetric one if indices match.
                            // Let's stick to the previous dynamic span logic but applied to only 4 items.

                            if (index === 0 || index === 3) lgClass = "lg:col-span-8"; // Big
                            else lgClass = "lg:col-span-4"; // Small
                            // Wait, 8+4 = 12 (Row 1). 4+8 = 12 (Row 2).
                            // If index 0 is 8, index 1 is 4. -> Row 1 full.
                            // If index 2 is 4, index 3 is 8. -> Row 2 full.
                            // Looks good for 4 items.

                            // Override previous logic for clear 2-row layout
                            if (index === 0) lgClass = "lg:col-span-8";
                            if (index === 1) lgClass = "lg:col-span-4";
                            if (index === 2) lgClass = "lg:col-span-4";
                            if (index === 3) lgClass = "lg:col-span-8";

                            return (
                                <m.div
                                    key={car.id}
                                    variants={item}
                                    className={`relative group md:col-span-1 ${lgClass}`}
                                >
                                    <CarCard
                                        car={car}
                                        className="h-full border-neutral-800 hover:border-neutral-600 transition-colors bg-black"
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
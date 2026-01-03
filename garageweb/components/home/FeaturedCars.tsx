"use client";

import { CarCard } from "@/components/cars/CarCard";
import { Car } from "@/types/main";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface FeaturedCarsProps {
    cars: Car[];
}

export function FeaturedCars({ cars }: FeaturedCarsProps) {
    return (
        <section className="py-32 bg-zinc-950 relative overflow-hidden">
            {/* Divider Superior */}
            <div className="absolute top-0 left-0 right-0 -translate-y-1 z-10 pointer-events-none">
                <SectionDivider variant="curve-soft" position="top" className="text-zinc-950" />
            </div>

            {/* Ambient Lighting */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-white/5 blur-[120px] rounded-full pointer-events-none z-0" />

            <div className="container mx-auto px-6 relative z-20 pt-10">
                {/* Header */}
                <div className="flex flex-col items-center mb-24 space-y-8 text-center">
                    <span className="px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-[10px] font-bold uppercase tracking-[0.25em] text-white/80 shadow-lg">
                        Nuestra Colección
                    </span>

                    <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif font-black text-white tracking-tighter drop-shadow-2xl">
                        VEHÍCULOS <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-500">
                            DESTACADOS
                        </span>
                    </h2>

                    <div className="h-1 w-32 rounded-full bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-80" />
                </div>

                {/* Grid */}
                {cars && cars.length > 0 ? (
                    <ScrollReveal animation="fade-up-stagger" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-12">
                        {cars.map((car) => (
                            <motion.div
                                key={car.id}
                                whileHover={{ y: -10 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                            >
                                <CarCard car={car} />
                            </motion.div>
                        ))}
                    </ScrollReveal>
                ) : (
                    <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/5 backdrop-blur-sm">
                        <p className="text-neutral-400 text-lg">No hay vehículos destacados por el momento.</p>
                    </div>
                )}
            </div>

            <div className="mt-24 text-center relative z-20">
                <Link
                    href="/catalogo"
                    className="group relative inline-flex items-center gap-4 px-10 py-5 bg-zinc-900 border border-zinc-800 rounded-full overflow-hidden transition-all duration-500 hover:border-zinc-500 hover:shadow-2xl hover:shadow-white/5"
                >
                    {/* Shine Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />

                    <span className="relative z-10 text-white font-bold tracking-[0.2em] uppercase text-xs">
                        Ver Inventario Completo
                    </span>
                    <ArrowRight size={16} className="relative z-10 text-white group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
            </div>

            {/* Bottom Divider (Optional, to smooth transition to next section if added later) */}
            {/* <div className="absolute bottom-0 left-0 right-0 z-10 text-black">
                <SectionDivider variant="gradient-fade" position="bottom" />
             </div> */}
        </section>
    );
}

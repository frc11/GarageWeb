"use client";

import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { Car } from "@/types/main";
import { CarCard } from "@/components/cars/CarCard";
import { BadgePercent, Tag, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { PremiumButton } from "../ui/PremiumButton";

interface OffersClientProps {
    cars: Car[];
}

const ITEMS_PER_PAGE = 9;

export function OffersClient({ cars }: OffersClientProps) {
    if (!cars || cars.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="flex flex-col items-center justify-center py-32 text-center space-y-8"
            >
                <div className="w-24 h-24 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                    <Tag className="w-10 h-10 text-zinc-600" />
                </div>
                <div className="space-y-4 max-w-md mx-auto">
                    <h3 className="text-3xl font-serif text-white">Colección Agotada</h3>
                    <p className="text-zinc-500 font-light leading-relaxed">
                        Nuestras ofertas exclusivas han volado. Suscríbete a nuestro newsletter o explora el catálogo completo para encontrar tu próxima unidad.
                    </p>
                </div>
                <Link href="/catalogo">
                    <PremiumButton variant="primary">
                        Explorar Catálogo
                    </PremiumButton>
                </Link>
            </motion.div>
        );
    }

    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(cars.length / ITEMS_PER_PAGE);

    const currentCars = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return cars.slice(start, start + ITEMS_PER_PAGE);
    }, [cars, currentPage]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);

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
        show: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }
        }
    };

    return (
        <div className="space-y-12">
            <motion.div
                key={currentPage}
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12"
            >
                {currentCars.map((car) => {
                    const discount = car.originalPrice && car.originalPrice > car.price
                        ? Math.round(((car.originalPrice - car.price) / car.originalPrice) * 100)
                        : 0;

                    return (
                        <motion.div
                            key={car.id}
                            variants={item}
                            className="group relative"
                        >
                            {/* Offers Badge Overlay */}
                            <div className="absolute top-6 right-6 z-20 overflow-hidden">
                                <div className="bg-amber-500 text-black text-xs font-bold px-3 py-1.5 uppercase tracking-widest shadow-lg flex items-center gap-1.5">
                                    <BadgePercent size={14} strokeWidth={2.5} />
                                    <span>{discount}% OFF</span>
                                </div>
                            </div>

                            {/* Card Container with Glow */}
                            <div className="h-full rounded-[2rem] p-1 bg-transparent transition-all duration-500 hover:bg-gradient-to-br hover:from-amber-500/20 hover:to-transparent hover:shadow-[0_0_40px_rgba(245,158,11,0.1)]">
                                <div className="h-full rounded-[1.8rem] overflow-hidden bg-zinc-950 border border-white/5 group-hover:border-amber-500/30 transition-colors duration-500">
                                    <CarCard car={car} hideStatusBadge={true} />
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </motion.div>

            {/* --- PAGINATION --- */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 py-8 relative z-10">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="p-3 rounded-full bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-white/5 transition-colors"
                    >
                        <ChevronLeft size={20} className="text-white" />
                    </button>

                    <span className="text-sm font-medium text-zinc-400">
                        Página <span className="text-white">{currentPage}</span> de <span className="text-white">{totalPages}</span>
                    </span>

                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="p-3 rounded-full bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-white/5 transition-colors"
                    >
                        <ChevronRight size={20} className="text-white" />
                    </button>
                </div>
            )}
        </div>
    );
}

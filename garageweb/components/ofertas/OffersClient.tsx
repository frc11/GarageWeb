"use client";

import { motion } from "framer-motion";
import { Car } from "@/types/main";
import { CarCard } from "@/components/cars/CarCard";
import { BadgePercent, Tag } from "lucide-react";
import Link from "next/link";
import { PremiumButton } from "../ui/PremiumButton";

interface OffersClientProps {
    cars: Car[];
}

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
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12"
        >
            {cars.map((car) => (
                <motion.div
                    key={car.id}
                    variants={item}
                    className="group relative"
                >
                    {/* Offers Badge Overlay */}
                    <div className="absolute top-4 right-4 z-20 overflow-hidden">
                        <div className="bg-amber-500 text-black text-xs font-bold px-3 py-1.5 uppercase tracking-widest shadow-lg flex items-center gap-1.5">
                            <BadgePercent size={14} strokeWidth={2.5} />
                            <span>Oferta</span>
                        </div>
                    </div>

                    {/* Card Container with Glow */}
                    <div className="h-full rounded-[2rem] p-1 bg-transparent transition-all duration-500 hover:bg-gradient-to-br hover:from-amber-500/20 hover:to-transparent hover:shadow-[0_0_40px_rgba(245,158,11,0.1)]">
                        <div className="h-full rounded-[1.8rem] overflow-hidden bg-zinc-950 border border-white/5 group-hover:border-amber-500/30 transition-colors duration-500">
                            <CarCard car={car} />
                        </div>
                    </div>
                </motion.div>
            ))}
        </motion.div>
    );
}

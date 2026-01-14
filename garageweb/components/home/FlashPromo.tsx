"use client";

import Image from "next/image";
import Link from "next/link";
import { m } from "framer-motion";
import { ArrowRight, Zap, TrendingDown, Percent } from "lucide-react";
import { Car } from "@/types/main";
import { formatCurrency, cn } from "@/lib/utils";
import { PremiumButton } from "../ui/PremiumButton";

interface FlashPromoProps {
    offers: Car[];
}

export function FlashPromo({ offers }: FlashPromoProps) {
    if (!offers || offers.length === 0) return null;

    // Lógica Condicional: Solo activar carrusel si hay 5 o más autos
    const enableCarousel = offers.length >= 5;

    // Si es carrusel, triplicamos para el loop. Si no, usamos el array original.
    const displayOffers = enableCarousel ? [...offers, ...offers, ...offers] : offers;

    return (
        <section className="bg-neutral-950 relative overflow-hidden flex flex-col items-center z-10 pt-50 pb-25 -mt-25">

            {/* === PUENTE DE NIEBLA BLANCA === */}
            <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-white via-white/10 to-transparent z-20 pointer-events-none" />

            <style jsx>{`
                @keyframes scroll-right {
                    0% { transform: translateX(-33.33%); }
                    100% { transform: translateX(0); }
                }
                .animate-runway {
                    animation: scroll-right 30s linear infinite;
                }
                @media (min-width: 768px) {
                    .animate-runway {
                        animation-duration: 60s;
                    }
                }
                .group:hover .animate-runway {
                    animation-play-state: paused;
                }
            `}</style>

            {/* Header Section */}
            <div className="relative z-20 container mx-auto px-6 mb-12 md:mb-16 text-center pt-10">
                <m.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border-none text-orange-400 text-[10px] font-bold uppercase tracking-widest mb-6"
                >
                    <Zap className="w-3 h-3 text-orange-500 fill-orange-500" />
                    <span>Ofertas de tiempo limitado</span>
                </m.div>

                <m.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-4xl md:text-5xl font-serif text-white tracking-tight"
                >
                    OPORTUNIDADES <span className="text-orange-500">FLASH</span>
                </m.h2>

                <m.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mt-4 text-neutral-400 max-w-lg mx-auto text-sm md:text-base"
                >
                    Vehículos seleccionados con condiciones excepcionales. <br className="hidden md:block" />
                    Disponibilidad inmediata y beneficios exclusivos.
                </m.p>
            </div>

            {/* 
                Layout Switcher: 
                - Si enableCarousel (>=5): Usa el layout de "Runway" con animación.
                - Si NO (!enableCarousel): Usa un layout Flex centrado que se adapta (4, 3, 2, 1 columnas implícitas).
            */}
            <div className={cn("w-full relative group z-20 mb-16", !enableCarousel && "container mx-auto px-4")}>
                <div className={cn(
                    enableCarousel
                        ? "flex animate-runway w-fit hover:cursor-grab active:cursor-grabbing pl-4 md:pl-0"
                        : "flex flex-wrap justify-center gap-6" // Layout estático centrado
                )}>
                    {displayOffers.map((car, index) => (
                        <DealCard
                            key={`${car.id}-${index}`}
                            car={car}
                            isCarousel={enableCarousel}
                        />
                    ))}
                </div>
            </div>

            {/* Start CTA */}
            <m.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative z-20"
            >
                <a href="/ofertas">
                    <PremiumButton
                        variant="primary"
                        className="bg-gradient-to-r from-amber-500 to-orange-600 text-black border-none hover:from-amber-400 hover:to-orange-500 shadow-[0_0_30px_rgba(245,158,11,0.3)]"
                    >
                        Ver Todas las Ofertas
                        <Percent className="w-4 h-4 ml-1" />
                    </PremiumButton>
                </a>
            </m.div>

        </section>
    );
}

// Componente auxiliar actualizado para manejar estilos dinámicos
function DealCard({ car, isCarousel = true }: { car: Car, isCarousel?: boolean }) {
    const discountPercent = (car.isOffer && car.originalPrice && car.price < car.originalPrice)
        ? Math.round(((car.originalPrice - car.price) / car.originalPrice) * 100)
        : null;

    return (
        <Link
            href={`/autos/${car.slug}`}
            className={cn(
                "relative group/card h-full block transition-transform hover:-translate-y-1 duration-300",
                // Si es carrusel, usamos los anchos fijos y márgenes originales
                isCarousel
                    ? "flex-shrink-0 w-[85vw] sm:w-[320px] md:w-[420px] mx-3 md:mx-4"
                    // Si es estático, usamos un ancho máximo pero permitimos que flex lo acomode
                    : "w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(25%-1.5rem)] max-w-[420px]"
            )}
        >
            <div className="relative bg-neutral-900 rounded-xl overflow-hidden border border-transparent transition-all duration-300 group-hover/card:border-orange-500/40 group-hover/card:shadow-[0_0_40px_rgba(249,115,22,0.15)] flex flex-col h-full">

                {/* Image Area */}
                <div className="relative h-[200px] md:h-[240px] overflow-hidden bg-neutral-800 shrink-0">
                    <Image
                        src={car.images[0]}
                        alt={car.model}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover/card:scale-110"
                        sizes="(max-width: 768px) 85vw, 420px"
                    />
                    {discountPercent && (
                        <div className="absolute top-3 left-3 md:top-4 md:left-4 bg-orange-600 text-white px-2.5 py-1 md:px-3 md:py-1.5 rounded-md font-bold text-[10px] md:text-xs shadow-lg flex items-center gap-1.5 tracking-wider uppercase">
                            <TrendingDown className="w-3 h-3 text-white" />
                            <span>Ahorras {discountPercent}%</span>
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent opacity-60 group-hover/card:opacity-40 transition-opacity" />
                </div>

                {/* Info Area */}
                <div className="p-5 md:p-6 flex flex-col flex-1 relative bg-neutral-900/50 backdrop-blur-sm">
                    <div className="mb-4 md:mb-6">
                        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-neutral-500 block mb-2">
                            {car.brand}
                        </span>
                        <h3 className="text-xl md:text-2xl font-serif text-white leading-tight group-hover/card:text-orange-400 transition-colors duration-300">
                            {car.model}
                        </h3>
                    </div>

                    <div className="mt-auto pt-4 flex items-center justify-between">
                        <div className="flex flex-col items-start gap-1">
                            {car.isOffer && car.originalPrice && (
                                <span className="text-xs md:text-sm text-neutral-500 line-through font-mono decoration-neutral-600">
                                    {formatCurrency(car.originalPrice)}
                                </span>
                            )}
                            <span className="text-2xl md:text-3xl font-bold text-orange-500 font-serif tracking-tight drop-shadow-sm">
                                {formatCurrency(car.price)}
                            </span>
                        </div>
                        <div className="bg-white/5 h-8 w-8 md:h-10 md:w-10 flex items-center justify-center rounded-full group-hover/card:bg-orange-500 group-hover/card:text-black transition-all duration-300 text-neutral-400">
                            <ArrowRight className="w-4 h-4 md:w-5 md:h-5 -rotate-45 group-hover/card:rotate-0 transition-transform duration-300" />
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
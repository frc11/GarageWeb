"use client";

import Image from "next/image";
import Link from "next/link";
import { m } from "framer-motion";
import { ArrowRight, Zap, TrendingDown, Percent } from "lucide-react";
import { Car } from "@/types/main";
import { formatCurrency } from "@/lib/utils";
import { PremiumButton } from "../ui/PremiumButton";

interface FlashPromoProps {
    offers: Car[];
}

export function FlashPromo({ offers }: FlashPromoProps) {
    if (!offers || offers.length === 0) return null;

    const runwayOffers = [...offers, ...offers, ...offers];

    return (
        // Mantenemos el -mt-24 para que suba un poco, pero el z-10 lo pone 'detras' o en capa controlada
        <section className="bg-neutral-950 relative overflow-hidden flex flex-col items-center z-10 pt-50 pb-25 -mt-25">

            {/* === CAMBIO CLAVE: PUENTE DE NIEBLA BLANCA === */}
            {/* Este div conecta el fondo blanco de BrandMarquee con el negro de esta sección.
                Va de BLANCO a TRANSPARENTE. Crea una transición suave de luz a oscuridad. */}
            <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-white via-white/10 to-transparent z-20 pointer-events-none" />

            <style jsx>{`
                @keyframes scroll-right {
                    0% { transform: translateX(-33.33%); }
                    100% { transform: translateX(0); }
                }
                .animate-runway {
                    animation: scroll-right 60s linear infinite;
                }
                .group:hover .animate-runway {
                    animation-play-state: paused;
                }
            `}</style>

            {/* Header Section */}
            <div className="relative z-20 container mx-auto px-6 mb-16 text-center pt-10">
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
                    className="mt-4 text-neutral-400 max-w-lg mx-auto"
                >
                    Vehículos seleccionados con condiciones excepcionales. <br className="hidden md:block" />
                    Disponibilidad inmediata y beneficios exclusivos.
                </m.p>
            </div>

            {/* The Runway (Carousel) */}
            <div className="w-full relative group z-20 mb-16">
                <div className="flex animate-runway w-fit hover:cursor-grab active:cursor-grabbing">
                    {runwayOffers.map((car, index) => (
                        <DealCard key={`${car.id}-${index}`} car={car} />
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
                    <PremiumButton variant="primary">
                        Ver Todas las Ofertas
                        <Percent className="w-4 h-4" />
                    </PremiumButton>
                </a>
            </m.div>

        </section>
    );
}

function DealCard({ car }: { car: Car }) {
    const discountPercent = (car.isOffer && car.originalPrice && car.price < car.originalPrice)
        ? Math.round(((car.originalPrice - car.price) / car.originalPrice) * 100)
        : null;

    return (
        <Link
            href={`/autos/${car.slug}`}
            className="flex-shrink-0 w-[360px] md:w-[420px] mx-4 relative group/card h-full"
        >
            <div className="relative bg-neutral-900 rounded-xl overflow-hidden border border-transparent transition-all duration-300 group-hover/card:border-orange-500/40 group-hover/card:shadow-[0_0_40px_rgba(249,115,22,0.15)] flex flex-col h-full">
                <div className="relative h-[240px] overflow-hidden bg-neutral-800 shrink-0">
                    <Image
                        src={car.images[0]}
                        alt={car.model}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover/card:scale-110"
                        sizes="(max-width: 768px) 360px, 420px"
                    />
                    {discountPercent && (
                        <div className="absolute top-4 left-4 bg-orange-600 text-white px-3 py-1.5 rounded-md font-bold text-xs shadow-lg flex items-center gap-1.5 tracking-wider uppercase">
                            <TrendingDown className="w-3 h-3 text-white" />
                            <span>Ahorras {discountPercent}%</span>
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent opacity-60 group-hover/card:opacity-40 transition-opacity" />
                </div>
                <div className="p-6 flex flex-col flex-1 relative bg-neutral-900/50 backdrop-blur-sm">
                    <div className="mb-6">
                        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-neutral-500 block mb-2">
                            {car.brand}
                        </span>
                        <h3 className="text-2xl font-serif text-white leading-tight group-hover/card:text-orange-400 transition-colors duration-300">
                            {car.model}
                        </h3>
                    </div>
                    <div className="mt-auto pt-4 flex items-center justify-between">
                        <div className="flex flex-col items-start gap-1">
                            {car.isOffer && car.originalPrice && (
                                <span className="text-sm text-neutral-500 line-through font-mono decoration-neutral-600">
                                    {formatCurrency(car.originalPrice, car.currency)}
                                </span>
                            )}
                            <span className="text-3xl font-bold text-orange-500 font-serif tracking-tight drop-shadow-sm">
                                {formatCurrency(car.price, car.currency)}
                            </span>
                        </div>
                        <div className="bg-white/5 h-10 w-10 flex items-center justify-center rounded-full group-hover/card:bg-orange-500 group-hover/card:text-black transition-all duration-300 text-neutral-400">
                            <ArrowRight className="w-5 h-5 -rotate-45 group-hover/card:rotate-0 transition-transform duration-300" />
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
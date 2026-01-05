"use client";

import Image from "next/image";
import Link from "next/link";
import { m } from "framer-motion";
import { ArrowRight, Zap, TrendingDown } from "lucide-react";
import { Car } from "@/types/main";
import { cn, formatCurrency } from "@/lib/utils";

interface FlashPromoProps {
    offers: Car[];
}

export function FlashPromo({ offers }: FlashPromoProps) {
    if (!offers || offers.length === 0) return null;

    // Triple duplication for smooth infinite scroll on wide screens
    const runwayOffers = [...offers, ...offers, ...offers];

    return (
        <section className="py-24 bg-neutral-950 relative overflow-hidden flex flex-col items-center">

            {/* CSS Animation Injection */}
            <style jsx>{`
                @keyframes scroll-left {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-33.33%); }
                }
                .animate-runway {
                    animation: scroll-left 60s linear infinite;
                }
                .group:hover .animate-runway {
                    animation-play-state: paused;
                }
            `}</style>

            {/* Background Ambience */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-900 via-neutral-950 to-neutral-950 z-0 pointer-events-none" />

            {/* Header Section */}
            <div className="relative z-10 container mx-auto px-6 mb-16 text-center">
                <m.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[10px] font-bold uppercase tracking-widest mb-6"
                >
                    <Zap className="w-3 h-3 text-orange-500 fill-orange-500" />
                    <span>Limited Time Offers</span>
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
            <div className="w-full relative group z-10 mb-16">

                {/* Fade Masks */}
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-neutral-950 to-transparent z-20 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-neutral-950 to-transparent z-20 pointer-events-none" />

                {/* Scrolling Track */}
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
                className="relative z-10"
            >
                <Link
                    href="/ofertas"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-white text-neutral-950 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-neutral-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                >
                    Ver Todas las Ofertas
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </m.div>

        </section>
    );
}

function DealCard({ car }: { car: Car }) {
    // Calculate pseudo-discount percentage or amount
    const discountPercent = (car.isOffer && car.originalPrice && car.price < car.originalPrice)
        ? Math.round(((car.originalPrice - car.price) / car.originalPrice) * 100)
        : null;

    const discountAmount = (car.isOffer && car.originalPrice && car.price < car.originalPrice)
        ? car.originalPrice - car.price
        : null;

    return (
        <Link
            href={`/autos/${car.slug}`}
            className="flex-shrink-0 w-[360px] md:w-[420px] mx-4 relative group/card h-full"
        >
            <div className="relative bg-neutral-900 rounded-xl overflow-hidden border border-white/5 transition-all duration-300 group-hover/card:border-orange-500/40 group-hover/card:shadow-[0_0_40px_rgba(249,115,22,0.15)] flex flex-col h-full">

                {/* Image Area (Top Half) */}
                <div className="relative h-[240px] overflow-hidden bg-neutral-800 shrink-0">
                    <Image
                        src={car.images[0]}
                        alt={car.model}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover/card:scale-110"
                        sizes="(max-width: 768px) 360px, 420px"
                    />

                    {/* Badge: Savings Pill */}
                    {discountPercent && (
                        <div className="absolute top-4 left-4 bg-orange-600 text-white px-3 py-1.5 rounded-md font-bold text-xs shadow-lg flex items-center gap-1.5 tracking-wider uppercase">
                            <TrendingDown className="w-3 h-3 text-white" />
                            <span>Ahorras {discountPercent}%</span>
                        </div>
                    )}

                    {/* Gradient Overlay for Text Contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent opacity-60 group-hover/card:opacity-40 transition-opacity" />
                </div>

                {/* Info Area (Bottom Half) */}
                <div className="p-6 flex flex-col flex-1 relative bg-neutral-900/50 backdrop-blur-sm">

                    {/* Header: Brand & Model */}
                    <div className="mb-6">
                        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-neutral-500 block mb-2">
                            {car.brand}
                        </span>
                        <h3 className="text-2xl font-serif text-white leading-tight group-hover/card:text-orange-400 transition-colors duration-300">
                            {car.model}
                        </h3>
                    </div>

                    {/* Price Hierarchy - PRICING EMPHASIS */}
                    <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                        <div className="flex flex-col items-start gap-1">
                            {/* Original Price (Strikethrough) */}
                            {car.isOffer && car.originalPrice && (
                                <span className="text-sm text-neutral-500 line-through font-mono decoration-neutral-600">
                                    {formatCurrency(car.originalPrice, car.currency)}
                                </span>
                            )}

                            {/* Flash Price (HERO) */}
                            <span className="text-3xl font-bold text-orange-500 font-serif tracking-tight drop-shadow-sm">
                                {formatCurrency(car.price, car.currency)}
                            </span>
                        </div>

                        {/* Arrow Button */}
                        <div className="bg-white/5 h-10 w-10 flex items-center justify-center rounded-full group-hover/card:bg-orange-500 group-hover/card:text-black transition-all duration-300 text-neutral-400">
                            <ArrowRight className="w-5 h-5 -rotate-45 group-hover/card:rotate-0 transition-transform duration-300" />
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

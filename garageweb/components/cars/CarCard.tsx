"use client";

import Link from "next/link";
import Image from "next/image";
import { Gauge, Calendar, ArrowUpRight } from "lucide-react";
import { Car } from "@/types/main";
import { formatCurrency, cn } from "@/lib/utils";
import { m } from "framer-motion";

interface CarCardProps {
    car: Car;
    className?: string;
    priority?: boolean;
}

export function CarCard({ car, className, priority = false }: CarCardProps) {
    return (
        <Link
            href={`/autos/${car.slug}`}
            className={cn(
                "block group relative h-full w-full overflow-hidden bg-neutral-900 border border-white/5",
                className
            )}
        >
            {/* Image Container - Absolute Fullness */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={car.images[0]}
                    alt={`${car.brand} ${car.model}`}
                    fill
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={priority}
                />

                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Offer Badge - Minimalist */}
            {car.isOffer && (
                <div className="absolute top-4 right-4 z-20">
                    <span className="bg-amber-500 text-black text-[10px] font-bold uppercase tracking-widest px-2 py-1">
                        OFERTA
                    </span>
                </div>
            )}

            {/* Content Layer */}
            <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-8">

                <div className="transform transition-transform duration-500 ease-out translate-y-4 group-hover:translate-y-0">
                    {/* Brand & Arrow */}
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">
                            {car.brand}
                        </span>
                        <div className="bg-white/10 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0">
                            <ArrowUpRight className="w-3 h-3 text-white" />
                        </div>
                    </div>

                    {/* Model Name - Serif & Large */}
                    <h2 className="text-2xl md:text-3xl font-serif text-white mb-2 leading-none tracking-tight">
                        {car.model}
                    </h2>

                    {/* Price - Elegant Display */}
                    <div className="mb-4">
                        {car.originalPrice && car.originalPrice > car.price ? (
                            <div className="flex items-center gap-3">
                                <span className="text-white text-xl font-bold">
                                    {formatCurrency(car.price, car.currency)}
                                </span>
                                <span className="text-gray-500 text-sm line-through">
                                    {formatCurrency(car.originalPrice, car.currency)}
                                </span>
                            </div>
                        ) : (
                            <span className="text-white/90 text-lg font-light">
                                {formatCurrency(car.price, car.currency)}
                            </span>
                        )}
                    </div>

                    {/* Tech Specs - Reveal on Hover */}
                    <div className="flex items-center gap-6 border-t border-white/10 pt-4 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-75">
                        <div className="flex items-center gap-2 text-neutral-400" title="Año">
                            <Calendar strokeWidth={1.5} size={12} />
                            <span className="text-[10px] font-bold tracking-wider uppercase">{car.year}</span>
                        </div>
                        <div className="flex items-center gap-2 text-neutral-400" title="Kilometraje">
                            <Gauge strokeWidth={1.5} size={12} />
                            <span className="text-[10px] font-bold tracking-wider uppercase">
                                {car.mileage > 0 ? `${(car.mileage / 1000).toFixed(0)}k KM` : 'Nuevo'}
                            </span>
                        </div>
                    </div>
                </div>

            </div>
        </Link>
    );
}

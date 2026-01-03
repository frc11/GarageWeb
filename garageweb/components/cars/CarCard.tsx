"use client";

import Link from "next/link";
import Image from "next/image";
import { Gauge, Zap, Calendar } from "lucide-react";
import { Car } from "@/types/main";
import { formatCurrency } from "@/lib/utils";
import { motion } from "framer-motion";

interface CarCardProps {
    car: Car;
}

export function CarCard({ car }: CarCardProps) {
    return (
        <Link href={`/autos/${car.slug}`} className="block group h-full">
            <div className={`
                relative h-full flex flex-col
                bg-zinc-900 rounded-2xl overflow-hidden
                transition-all duration-500
                ${car.isOffer
                    ? 'border border-amber-500/50 shadow-lg shadow-amber-900/10'
                    : 'border border-white/5 hover:border-white/20'
                }
            `}>
                {/* Image Container */}
                <div className="aspect-[4/3] relative overflow-hidden bg-zinc-800 shrink-0">
                    {/* Offer Badge */}
                    {car.isOffer && (
                        <div className="absolute top-3 right-3 z-20 bg-amber-500 text-black text-[10px] font-black px-3 py-1 rounded shadow-md tracking-wider">
                            SALE
                        </div>
                    )}

                    {/* Image Reveal Curtain */}
                    <motion.div
                        initial={{ height: "100%" }}
                        whileInView={{ height: "0%" }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }} // Bezier for smooth reveal
                        className="absolute inset-0 bg-zinc-800 z-10"
                    />

                    <div className="relative w-full h-full overflow-hidden">
                        <Image
                            src={car.images[0]}
                            alt={`${car.brand} ${car.model}`}
                            fill
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4 flex flex-col flex-1 relative">
                    <div className="flex-1">
                        <h3 className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold mb-2">
                            {car.brand}
                        </h3>
                        <h2 className="text-xl font-serif font-bold text-white leading-tight group-hover:translate-x-1 transition-transform duration-300">
                            {car.model}
                        </h2>
                    </div>

                    <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-auto">
                        <div className="flex gap-3 text-zinc-500">
                            {/* Icons simplified or just text for cleaner look? Keeping icons but smaller */}
                            <div className="flex items-center gap-1.5" title="Year">
                                <Calendar size={12} />
                                <span className="text-[10px] font-medium">{car.year}</span>
                            </div>
                            <div className="flex items-center gap-1.5" title="Mileage">
                                <Gauge size={12} />
                                <span className="text-[10px] font-medium">{car.mileage.toLocaleString()} km</span>
                            </div>
                            <div className="flex items-center gap-1.5" title="Transmission">
                                <Zap size={12} />
                                <span className="text-[10px] font-medium">
                                    {car.transmission === "Automatic" ? "Auto" : "Man"}
                                </span>
                            </div>
                        </div>

                        <div className="text-right">
                            {car.isOffer && car.originalPrice ? (
                                <div className="flex flex-col items-end leading-none">
                                    <span className="text-xs text-zinc-500 line-through font-medium mb-1">
                                        {formatCurrency(car.originalPrice, car.currency)}
                                    </span>
                                    <span className="text-base font-bold text-amber-500">
                                        {formatCurrency(car.price, car.currency)}
                                    </span>
                                </div>
                            ) : (
                                <p className="text-base font-bold text-white">
                                    {formatCurrency(car.price, car.currency)}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

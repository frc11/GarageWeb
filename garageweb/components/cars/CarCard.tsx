"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Fuel, Calendar, Settings2, BadgePercent } from "lucide-react";
import { Car } from "@/types/main";
import { formatCurrency, cn } from "@/lib/utils";

interface CarCardProps {
    car: Car;
    className?: string;
    priority?: boolean;
    isOffer?: boolean;
    discountPercentage?: number;
    hideStatusBadge?: boolean;
    imageAspectClassName?: string;
}

export function CarCard({ car, className, priority = false, isOffer = false, discountPercentage, hideStatusBadge, imageAspectClassName }: CarCardProps) {
    // Logic to determine if it's an offer 
    const isOfferActive = isOffer || car.isOffer;

    // Price Logic (Simplified for consistency)
    const currentPrice = car.price;
    const originalPrice = car.originalPrice;

    // Discount Calculation for Badge
    const discount = discountPercentage || car.discount || (originalPrice && currentPrice && originalPrice > currentPrice
        ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
        : 0);

    return (
        <Link
            href={`/autos/${car.slug}`}
            className={cn(
                "block relative group overflow-hidden rounded-2xl bg-neutral-900/40 backdrop-blur-md transition-all duration-500",
                "border border-white/5 hover:border-amber-500/50",
                // Desktop glow is pre-rendered and only fades opacity, avoiding heavy hover repaints.
                "before:absolute before:inset-0 before:rounded-[inherit] before:pointer-events-none before:bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.16),transparent_70%)] before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100",
                isOfferActive && "border-amber-500/30",
                className
            )}
        >
            {/* --- Image/Video Area --- */}
            <div className={cn("relative overflow-hidden bg-neutral-950", imageAspectClassName || "aspect-[4/3]")}>
                {car.thumbnailImage ? (
                    <Image
                        src={car.thumbnailImage}
                        alt={`${car.brand} ${car.model} disponible en El Garage`}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={priority}
                    />
                ) : (
                    <div className="absolute inset-0 bg-neutral-800 flex items-center justify-center">
                        <span className="text-zinc-600 text-xs uppercase tracking-widest">Sin Imagen</span>
                    </div>
                )}

                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                {/* Top Badges */}
                <div className="absolute top-0 left-0 p-4 w-full flex justify-end items-start z-10">
                    {/* Brand Badge moved or removed if not needed, focusing on Offer */}
                    {isOfferActive && discount > 0 && !hideStatusBadge ? (
                        <div className="px-2 py-1 bg-amber-500 text-black rounded-md shadow-lg flex items-center gap-1.5">
                            <BadgePercent size={12} strokeWidth={3} />
                            <span className="text-[10px] font-extrabold uppercase tracking-wider">
                                OFERTA
                            </span>
                        </div>
                    ) : null}
                </div>
            </div>

            {/* --- Content Area --- */}
            <div className="p-5 flex flex-col gap-4">

                {/* Titles */}
                <div>
                    <h3 className="font-serif text-xl text-white leading-tight group-hover:text-amber-500 transition-colors duration-300">
                        {car.model}
                    </h3>
                    {/* Specs Row */}
                    <div className="flex items-center gap-2 mt-2 text-[10px] sm:text-xs text-zinc-500 uppercase tracking-wider font-medium">
                        {car.year && (
                            <>
                                <span>{car.year}</span>
                                <span className="w-1 h-1 rounded-full bg-zinc-700" />
                            </>
                        )}
                        <span>{car.transmission}</span>
                        {car.mileage !== undefined && car.mileage !== null && (
                            <>
                                <span className="w-1 h-1 rounded-full bg-zinc-700" />
                                <span>{car.mileage.toLocaleString()} KM</span>
                            </>
                        )}
                    </div>
                </div>

                {/* Price & Action */}
                <div className="flex items-end justify-between pt-2 border-t border-white/5 mt-auto">
                    <div className="flex flex-col min-h-[44px] justify-end">
                        {car.price ? (
                            <>
                                {originalPrice && currentPrice && originalPrice > currentPrice && (
                                    <span className="text-zinc-600 text-[10px] line-through font-medium leading-none mb-1">
                                        {formatCurrency(originalPrice, car.currency)}
                                    </span>
                                )}
                                <span className="text-white text-lg sm:text-xl font-bold tracking-tight leading-none">
                                    {formatCurrency(car.price, car.currency)}
                                </span>
                            </>
                        ) : (
                            <span className="text-zinc-500 text-xs font-medium uppercase tracking-widest">Consultar</span>
                        )}
                    </div>

                    {/* Minimal Arrow Button */}
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white group-hover:bg-amber-500 group-hover:text-black transition-colors duration-300">
                        <ArrowUpRight size={16} strokeWidth={2} />
                    </div>
                </div>
            </div>
        </Link>
    );
}

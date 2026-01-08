"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Fuel, Calendar, Settings2 } from "lucide-react"; // Generic 'Settings2' as Transmission icon alternate
import { Car } from "@/types/main";
import { formatCurrency, cn } from "@/lib/utils";

interface OfferCardProps {
    car: Car;
    className?: string;
}

export function OfferCard({ car, className }: OfferCardProps) {
    // 1. Discount Logic
    // Use explicit discount field first, or calculate from prices
    let discount = car.discount || 0;

    // If no explicit discount but has originalPrice > price, calculate it
    if (discount === 0 && car.originalPrice && car.originalPrice > car.price) {
        discount = Math.round(((car.originalPrice - car.price) / car.originalPrice) * 100);
    }

    // Fallback: If still 0 but it IS an offer, show a default generic percentage? 
    // Or just suppress the badge percentage. Let's stick to what we have.

    // 2. Pricing Display Logic
    // We treat `car.price` as the CURRENT Sales Price.
    // We decide what to show as the "Old" price.
    let oldPrice = car.originalPrice;

    // If no originalPrice but we have a discount, reverse-calculate the "Old" price for anchor effect
    if (!oldPrice && discount > 0) {
        oldPrice = car.price / (1 - (discount / 100));
    }

    return (
        <Link
            href={`/autos/${car.slug}`}
            className={cn(
                "block relative group overflow-hidden rounded-2xl bg-neutral-900 transition-all duration-500",
                "border border-white/5 hover:border-amber-500/50",
                "hover:shadow-[0_0_30px_rgba(245,158,11,0.2)]",
                className
            )}
        >
            {/* --- Image Area --- */}
            <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                    src={car.images[0]}
                    alt={`${car.brand} ${car.model}`}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent opacity-80" />

                {/* Badge: Top-Left */}
                {discount > 0 && (
                    <div className="absolute top-0 left-0">
                        <div className="bg-amber-500 text-black font-bold px-3 py-1 text-xs uppercase tracking-wider rounded-br-xl shadow-lg">
                            -{discount}% OFF
                        </div>
                    </div>
                )}
            </div>

            {/* --- Content Area --- */}
            <div className="p-5 space-y-4">

                {/* Titles */}
                <div className="space-y-1">
                    <h3 className="font-serif text-2xl text-white leading-tight group-hover:text-amber-500 transition-colors">
                        {car.brand}
                    </h3>
                    <p className="text-zinc-400 font-medium text-sm tracking-wide">
                        {car.model}
                    </p>
                </div>

                {/* Minimal Specs */}
                <div className="flex items-center gap-3 text-xs text-zinc-500 border-t border-white/5 pt-3">
                    <span className="flex items-center gap-1">
                        <Calendar size={12} /> {car.year}
                    </span>
                    <span className="w-px h-3 bg-zinc-800" />
                    <span className="flex items-center gap-1">
                        <Settings2 size={12} /> {car.transmission}
                    </span>
                    <span className="w-px h-3 bg-zinc-800" />
                    <span className="flex items-center gap-1">
                        <Fuel size={12} /> {car.fuelType}
                    </span>
                </div>

                {/* Pricing Hook */}
                <div className="flex items-end justify-between pt-1">
                    <div className="flex flex-col">
                        {oldPrice && (
                            <span className="text-zinc-600 text-xs line-through font-medium translate-y-1">
                                {formatCurrency(oldPrice, car.currency)}
                            </span>
                        )}
                        <span className="text-white text-2xl font-bold tracking-tight">
                            {formatCurrency(car.price, car.currency)}
                        </span>
                    </div>
                </div>

                {/* CTA Button */}
                <div className="pt-2">
                    <div className="w-full bg-white/5 hover:bg-amber-500 text-zinc-400 hover:text-black font-bold text-xs uppercase tracking-widest py-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 group/btn">
                        <span>Ver Oferta</span>
                        <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                    </div>
                </div>
            </div>
        </Link>
    );
}

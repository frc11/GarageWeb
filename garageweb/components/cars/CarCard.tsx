import Link from "next/link";
import Image from "next/image";
import { Gauge, Zap, Calendar } from "lucide-react";
import { Car } from "@/types/main";
import { formatCurrency } from "@/lib/utils";

interface CarCardProps {
    car: Car;
}

export function CarCard({ car }: CarCardProps) {
    return (
        <Link href={`/autos/${car.slug}`} className="block group">
            <div className="relative bg-zinc-900 border border-white/10 rounded-lg overflow-hidden hover:border-white/20 transition-colors duration-300">
                {/* Image Container */}
                <div className="aspect-[4/3] relative overflow-hidden">
                    <Image
                        src={car.images[0]}
                        alt={`${car.brand} ${car.model}`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="p-5 space-y-4">
                    <div>
                        <h3 className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-1">
                            {car.brand}
                        </h3>
                        <h2 className="text-xl font-display font-bold text-white leading-tight">
                            {car.model}
                        </h2>
                    </div>

                    <div className="flex items-center justify-between border-t border-white/10 pt-4">
                        <div className="flex gap-4">
                            <div className="flex items-center gap-1.5 text-gray-400" title="Year">
                                <Calendar size={14} />
                                <span className="text-xs">{car.year}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-gray-400" title="Mileage">
                                <Gauge size={14} />
                                <span className="text-xs">{car.mileage.toLocaleString()} km</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-gray-400" title="Transmission">
                                <Zap size={14} />
                                <span className="text-xs">
                                    {car.transmission === "Automatic" ? "Auto" : car.transmission}
                                </span>
                            </div>
                        </div>

                        <div className="text-right">
                            <p className="text-lg font-bold text-white">
                                {formatCurrency(car.price, car.currency)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

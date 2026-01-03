"use client";

import { Car } from "@/types/main";
import { motion } from "framer-motion";
import Image from "next/image";

// Configuración Manual de Logos (El usuario editará esto)
const BRAND_LOGOS: Record<string, string> = {
    "Ferrari": "https://cdn.simpleicons.org/ferrari/white",
    "Porsche": "https://cdn.simpleicons.org/porsche/white",
    "Lamborghini": "https://cdn.simpleicons.org/lamborghini/white",
    "BMW": "https://cdn.simpleicons.org/bmw/white",
    "Mercedes-Benz": "https://cdn.simpleicons.org/mercedes/white",
    "Audi": "https://cdn.simpleicons.org/audi/white",
    "Tesla": "https://cdn.simpleicons.org/tesla/white",
    "Ford": "https://cdn.simpleicons.org/ford/white",
    "Chevrolet": "https://cdn.simpleicons.org/chevrolet/white",
    "Toyota": "https://cdn.simpleicons.org/toyota/white",
    "Volkswagen": "https://cdn.simpleicons.org/volkswagen/white",
    "Honda": "https://cdn.simpleicons.org/honda/white",
    "Maserati": "https://cdn.simpleicons.org/maserati/white",
    "Jeep": "https://cdn.simpleicons.org/jeep/white",
    "Lexus": "https://cdn.simpleicons.org/lexus/white",
    "Land Rover": "https://cdn.simpleicons.org/landrover/white",
    "Jaguar": "https://cdn.simpleicons.org/jaguar/white",
    "Volvo": "https://cdn.simpleicons.org/volvo/white",
    "Nissan": "https://cdn.simpleicons.org/nissan/white",
    "Hyundai": "https://cdn.simpleicons.org/hyundai/white",
    "Subaru": "https://cdn.simpleicons.org/subaru/white",
    "Kia": "https://cdn.simpleicons.org/kia/white",
    // Agrega un fallback genérico si la marca no tiene logo
};

export function BrandMarquee({ cars }: { cars: Car[] }) {
    // 1. Obtener marcas únicas disponibles en los autos
    const uniqueBrands = Array.from(new Set(cars.map(c => c.brand)));

    // 2. Filtrar solo las que tienen logo configurado
    const validBrands = uniqueBrands.filter(brand => BRAND_LOGOS[brand]);

    // Debug: Check which brands are valid
    // console.log("Valid Brands:", validBrands);

    if (validBrands.length === 0) return null;

    return (
        <section className="relative w-full py-10 bg-neutral-950 overflow-hidden border-b border-white/5">
            {/* Gradient Overlays */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-neutral-950 to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-neutral-950 to-transparent z-10 pointer-events-none" />

            <div className="flex items-center">
                {/* We create 2 copies for infinite loop effect */}
                {[...Array(2)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="flex items-center gap-24 px-12 shrink-0"
                        animate={{ x: "-100%" }}
                        transition={{
                            duration: 30,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    >
                        {validBrands.map((brand) => (
                            <div
                                key={`${i}-${brand}`}
                                className="group flex flex-col items-center justify-center cursor-pointer"
                            >
                                <div className="relative w-20 h-20 opacity-40 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-110">
                                    <Image
                                        src={BRAND_LOGOS[brand]}
                                        alt={brand}
                                        fill
                                        className="object-contain"
                                    // Removing complex filters as we are loading white icons directly.
                                    // Adjust opacity for 'dimmed' state.
                                    />
                                </div>
                            </div>
                        ))}
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Car } from "@/types/main";
import { CarCard } from "@/components/cars/CarCard";
import { cn } from "@/lib/utils";

interface CatalogGridProps {
    cars: Car[];
}

export function CatalogGrid({ cars }: CatalogGridProps) {
    const [filter, setFilter] = useState("Todos");

    // Get unique brands from cars
    const brands = ["Todos", ...Array.from(new Set(cars.map((car) => car.brand)))];

    const filteredCars = filter === "Todos"
        ? cars
        : cars.filter((car) => car.brand === filter);

    return (
        <div className="space-y-12">
            {/* Filter Bar */}
            <div className="flex flex-wrap gap-4 justify-center">
                {brands.map((brand) => (
                    <button
                        key={brand}
                        onClick={() => setFilter(brand)}
                        className={cn(
                            "px-6 py-2 rounded-full border transition-all duration-300 text-sm font-medium",
                            filter === brand
                                ? "bg-white text-black border-white"
                                : "bg-transparent text-white border-white/20 hover:border-white/50"
                        )}
                    >
                        {brand}
                    </button>
                ))}
            </div>

            {/* Grid */}
            <div className="min-h-[400px]">
                {filteredCars.length > 0 ? (
                    <motion.div
                        layout
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        <AnimatePresence mode="popLayout">
                            {filteredCars.map((car) => (
                                <motion.div
                                    key={car.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <CarCard car={car} />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center justify-center py-20 text-center space-y-4"
                    >
                        <p className="text-xl text-gray-400">
                            No hay vehículos de esta marca actualmente.
                        </p>
                        <button
                            onClick={() => setFilter("Todos")}
                            className="text-white hover:underline"
                        >
                            Ver todos los vehículos
                        </button>
                    </motion.div>
                )}
            </div>
        </div>
    );
}

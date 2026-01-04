"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Car, Brand } from "@/types/main";
import { CarCard } from "@/components/cars/CarCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { cn } from "@/lib/utils";
import { ChevronDown, Filter, X } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

interface CatalogGridProps {
    cars: Car[];
    allBrands: Brand[];
}

interface FilterState {
    priceRange: [number, number]; // [min, max]
    transmission: 'all' | 'Automatic' | 'Manual';
}

export function CatalogGrid({ cars, allBrands }: CatalogGridProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentBrandSlug = searchParams.get('brand');

    const maxPrice = useMemo(() => Math.max(...cars.map(c => c.price), 1000000), [cars]);
    const minPrice = useMemo(() => Math.min(...cars.map(c => c.price), 0), [cars]);

    // 2. Filter State (Client side only for non-brand filters)
    const [filters, setFilters] = useState<FilterState>({
        priceRange: [minPrice, maxPrice],
        transmission: 'all'
    });
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    // 3. Filter Logic (Schema Logic)
    const filteredCars = useMemo(() => {
        return cars.filter(car => {
            // Brand is handled by Server/URL. We don't filter it here.

            // Price Logic
            if (car.price < filters.priceRange[0] || car.price > filters.priceRange[1]) return false;

            // Transmission Logic
            if (filters.transmission !== 'all') {
                if (car.transmission !== filters.transmission) return false;
            }

            return true;
        });
    }, [cars, filters]);

    // Handlers
    const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    return (
        <div className="flex flex-col lg:flex-row gap-12">
            {/* Mobile Filter Toggle */}
            <button
                onClick={() => setIsMobileFilterOpen(true)}
                className="lg:hidden w-full flex items-center justify-between px-6 py-4 bg-zinc-900 border border-white/10 rounded-full text-white font-bold uppercase tracking-wider"
            >
                <span>Filtros</span>
                <Filter size={18} />
            </button>

            {/* Sidebar Filters (Glassmorphic Sticky) */}
            <aside className={cn(
                "fixed inset-0 z-50 bg-black/90 backdrop-blur-xl lg:static lg:bg-transparent lg:backdrop-blur-none lg:z-0 lg:w-1/4 lg:block transition-transform duration-300",
                isMobileFilterOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
            )}>
                <div className="h-full overflow-y-auto lg:h-auto lg:overflow-visible p-8 lg:p-6 lg:bg-white/5 lg:backdrop-blur-xl lg:border lg:border-white/10 lg:rounded-3xl lg:sticky lg:top-32 space-y-8">

                    <div className="flex items-center justify-between lg:hidden mb-8">
                        <h2 className="text-2xl font-bold text-white">Filtros</h2>
                        <button onClick={() => setIsMobileFilterOpen(false)} className="p-2 text-white"><X /></button>
                    </div>

                    {/* Brand Filter */}
                    <div className="space-y-4">
                        <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Marca</label>
                        <div className="space-y-2">
                            {/* 'Todos' Option */}
                            <Link
                                href="/catalogo"
                                className={cn(
                                    "block w-full text-left px-4 py-3 rounded-xl text-sm transition-all",
                                    !currentBrandSlug
                                        ? "bg-white text-black font-bold shadow-lg shadow-white/10"
                                        : "text-zinc-400 hover:bg-white/5 hover:text-white"
                                )}
                            >
                                Todos
                            </Link>

                            {allBrands.map(brand => (
                                <Link
                                    key={brand.id}
                                    href={`/catalogo?brand=${brand.slug}`}
                                    className={cn(
                                        "block w-full text-left px-4 py-3 rounded-xl text-sm transition-all",
                                        currentBrandSlug === brand.slug
                                            ? "bg-white text-black font-bold shadow-lg shadow-white/10"
                                            : "text-zinc-400 hover:bg-white/5 hover:text-white"
                                    )}
                                >
                                    {brand.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Transmission Filter */}
                    <div className="space-y-4">
                        <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Transmisión</label>
                        <div className="flex bg-black/40 rounded-lg p-1 border border-white/5">
                            {(['all', 'Automatic', 'Manual'] as const).map(type => (
                                <button
                                    key={type}
                                    onClick={() => updateFilter('transmission', type)}
                                    className={cn(
                                        "flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-md transition-all",
                                        filters.transmission === type
                                            ? "bg-zinc-800 text-white shadow-sm"
                                            : "text-zinc-500 hover:text-zinc-300"
                                    )}
                                >
                                    {type === 'all' ? 'Todas' : type === 'Automatic' ? 'Auto' : 'Man'}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Price Range (Simplified as min/max inputs for robustness) */}
                    <div className="space-y-4">
                        <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Precio (USD)</label>
                        <div className="flex items-center gap-2">
                            <input
                                type="number"
                                min={0}
                                placeholder="Min"
                                value={filters.priceRange[0] === minPrice ? '' : filters.priceRange[0]}
                                onChange={(e) => updateFilter('priceRange', [Number(e.target.value) || 0, filters.priceRange[1]])}
                                className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-700 focus:outline-none focus:border-white/30"
                            />
                            <span className="text-zinc-600">-</span>
                            <input
                                type="number"
                                min={0}
                                placeholder="Max"
                                value={filters.priceRange[1] === maxPrice ? '' : filters.priceRange[1]}
                                onChange={(e) => updateFilter('priceRange', [filters.priceRange[0], Number(e.target.value) || maxPrice])}
                                className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-700 focus:outline-none focus:border-white/30"
                            />
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Grid */}
            <div className="flex-1 min-h-[600px]">
                <div className="mb-6 flex items-center justify-between">
                    <p className="text-zinc-400 text-sm">
                        Mostrando <span className="text-white font-bold">{filteredCars.length}</span> vehículos
                    </p>
                    {/* Could add Sort here */}
                </div>

                {filteredCars.length > 0 ? (
                    <ScrollReveal animation="fade-up-stagger" className="grid grid-cols-1 md:grid-cols-2 gap-8 xl:gap-8">
                        <AnimatePresence mode="popLayout">
                            {filteredCars.map((car) => (
                                <motion.div
                                    key={car.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <CarCard car={car} />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </ScrollReveal>
                ) : (
                    <div className="flex flex-col items-center justify-center py-32 text-center space-y-6 border border-white/5 rounded-3xl bg-white/5 backdrop-blur-sm">
                        <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-white/50">
                            <Filter size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-white">No se encontraron resultados</h3>
                        <p className="text-zinc-400 max-w-xs mx-auto">Prueba ajustando los filtros de búsqueda.</p>
                        <button
                            onClick={() => {
                                setFilters({ priceRange: [minPrice, maxPrice], transmission: 'all' });
                                router.push('/catalogo');
                            }}
                            className="text-amber-500 hover:text-amber-400 font-bold uppercase tracking-wider text-xs border-b border-amber-500/30 pb-0.5"
                        >
                            Limpiar Filtros
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

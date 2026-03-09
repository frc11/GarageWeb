"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Car } from "@/types/main";
import { CarCard } from "@/components/cars/CarCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { cn } from "@/lib/utils";
import { Search, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { BrandSelector } from "./BrandSelector";
import { ViewAllButton } from "./ViewAllButton";
import { PremiumDropdown } from "../ui/PremiumDropdown";
import { YearRangeFilter } from "./YearRangeFilter";
import { PriceRangeFilter } from "./PriceRangeFilter";

import { client } from "@/sanity/lib/client";
import { CARS_QUERY, CATALOG_BRANDS_QUERY } from "@/sanity/lib/queries";

interface CatalogGridProps {
    initialBrandSlug?: string;
}

const ITEMS_PER_PAGE = 9;

export function CatalogGrid({ initialBrandSlug }: CatalogGridProps) {
    const searchParams = useSearchParams();
    const router = useRouter(); // Initialize router

    // 1. State Management
    const [cars, setCars] = useState<Car[]>([]);
    const [allBrands, setAllBrands] = useState<{ id: string; name: string; slug: string }[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [selectedCategory, setSelectedCategory] = useState("Todos");
    const [selectedBrand, setSelectedBrand] = useState("Todas");

    // Range State
    const [yearRange, setYearRange] = useState<[number, number]>([1990, 2025]);
    const [globalMinMax, setGlobalMinMax] = useState<[number, number]>([1990, 2025]);

    // Price State
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);
    const [globalPriceMinMax, setGlobalPriceMinMax] = useState<[number, number]>([0, 1000000]);

    const [selectedTransmission, setSelectedTransmission] = useState<string>("Todos");
    // CAMBIO: Inicializar en 'Todos' en lugar de null para evitar placeholder cursiva
    const [selectedFuel, setSelectedFuel] = useState<string>("Todos");
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    // Initial Fetching on Mount
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const [rawCars, brandNames] = await Promise.all([
                    client.fetch(CARS_QUERY, { brandSlug: null }), // Load ALL cars first for client-side filtering
                    client.fetch(CATALOG_BRANDS_QUERY)
                ]);

                const mappedCars: Car[] = rawCars.map((raw: any) => ({
                    id: raw.id || raw._id,
                    slug: raw.slug,
                    brand: raw.brand,
                    model: raw.model,
                    year: raw.year,
                    price: raw.price,
                    currency: raw.currency,
                    mileage: raw.mileage,
                    transmission: raw.transmission,
                    fuelType: raw.fuelType === 'Gasoline' ? 'Nafta' : raw.fuelType === 'Diesel' ? 'Diesel' : raw.fuelType === 'Hybrid' ? 'Híbrido' : raw.fuelType === 'Electric' ? 'Eléctrico' : raw.fuelType,
                    category: raw.category,
                    thumbnailImage: raw.thumbnailImage,
                    coverImage: raw.coverImage,
                    gallery: Array.isArray(raw.gallery) ? raw.gallery : [],
                    description: raw.description,
                    features: raw.features || [],
                    isFeatured: raw.isFeatured,
                    isOffer: raw.isOffer,
                    originalPrice: raw.originalPrice,
                    discount: raw.discount
                }));

                setCars(mappedCars);

                // Calculate Dynamic Min/Max Years and Prices
                if (mappedCars.length > 0) {
                    const years = mappedCars.map(c => c.year).filter(y => !isNaN(y));
                    if (years.length > 0) {
                        const minYear = Math.min(...years);
                        const maxYear = Math.max(...years);
                        setGlobalMinMax([minYear, maxYear]);
                        setYearRange([minYear, maxYear]);
                    }

                    const prices = mappedCars.map(c => c.price).filter(p => !isNaN(p));
                    if (prices.length > 0) {
                        const minPrice = Math.min(...prices);
                        const maxPrice = Math.max(...prices);
                        setGlobalPriceMinMax([minPrice, maxPrice]);
                        setPriceRange([minPrice, maxPrice]);
                    }
                }

                const mappedBrands = brandNames.map((name: string) => ({
                    id: name.toLowerCase(),
                    name: name,
                    slug: name.toLowerCase().trim().replace(/\s+/g, '-')
                }));
                setAllBrands(mappedBrands);

                if (initialBrandSlug && mappedBrands.length > 0) {
                    const found = mappedBrands.find((b: any) => b.slug === initialBrandSlug);
                    if (found) setSelectedBrand(found.name);
                }

            } catch (err: any) {
                console.error("Error fetching catalog data:", err);
                setError("No se pudo cargar el catálogo. Por favor, intenta de nuevo.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [initialBrandSlug]);

    const availableFuels = useMemo(() => {
        const fuels = Array.from(new Set(cars.map(c => c.fuelType))).sort();
        // CAMBIO: Agregar 'Todos' explícitamente a las opciones
        return ["Todos", ...fuels];
    }, [cars]);

    const availableTransmissions = useMemo(() => {
        const transmissions = Array.from(new Set(cars.map(c => c.transmission))).sort();
        return ["Todos", ...transmissions];
    }, [cars]);

    const categories = ["Todos", "Deportivos", "SUV", "Sedán", "Pick-up", "Clásicos"];

    const brandPills = useMemo(() => {
        const uniqueBrands = allBrands.length > 0
            ? allBrands.map(b => b.name)
            : Array.from(new Set(cars.map(c => c.brand))).sort();
        return ["Todas", ...uniqueBrands];
    }, [allBrands, cars]);

    useEffect(() => {
        const brandParam = searchParams.get('brand');
        if (brandParam) {
            setSelectedBrand(brandParam);
        }
    }, [searchParams]);

    useMemo(() => {
        setCurrentPage(1);
    }, [searchTerm, selectedCategory, selectedBrand, yearRange, selectedFuel, priceRange, selectedTransmission]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);

    // 2. Combined Filter Logic
    const filteredCars = useMemo(() => {
        return cars.filter(car => {
            const term = searchTerm.toLowerCase();
            const transES = car.transmission === 'Automatic' ? 'automatica' :
                car.transmission === 'Manual' ? 'manual' : 'pdk';

            const matchesSearch =
                car.model.toLowerCase().includes(term) ||
                car.brand.toLowerCase().includes(term) ||
                car.transmission.toLowerCase().includes(term) ||
                transES.includes(term.normalize("NFD").replace(/[\u0300-\u036f]/g, ""));

            const matchesCategory = selectedCategory === "Todos" || car.category === selectedCategory;
            const matchesBrand = selectedBrand === "Todas" || car.brand === selectedBrand;

            const matchesYear = car.year >= yearRange[0] && car.year <= yearRange[1];
            const matchesPrice = car.price >= priceRange[0] && car.price <= priceRange[1];

            // CAMBIO: Lógica ajustada para 'Todos'
            const matchesFuel = selectedFuel === "Todos" || car.fuelType === selectedFuel;
            const matchesTransmission = selectedTransmission === "Todos" || car.transmission === selectedTransmission;

            return matchesSearch && matchesCategory && matchesBrand && matchesYear && matchesFuel && matchesPrice && matchesTransmission;
        });
    }, [cars, searchTerm, selectedCategory, selectedBrand, yearRange, selectedFuel, priceRange, selectedTransmission]);

    const totalPages = Math.ceil(filteredCars.length / ITEMS_PER_PAGE);

    const currentCars = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredCars.slice(start, start + ITEMS_PER_PAGE);
    }, [filteredCars, currentPage]);

    const clearFilters = () => {
        setSelectedCategory("Todos");
        setSelectedBrand("Todas");
        setSelectedBrand("Todas");
        setYearRange(globalMinMax);
        setPriceRange(globalPriceMinMax);
        setSelectedFuel("Todos"); // Reset to "Todos"
        setSelectedTransmission("Todos");
        setSearchTerm("");
    };

    const hasActiveFilters =
        selectedCategory !== "Todos" ||
        selectedBrand !== "Todas" ||
        (yearRange[0] !== globalMinMax[0] || yearRange[1] !== globalMinMax[1]) ||
        (priceRange[0] !== globalPriceMinMax[0] || priceRange[1] !== globalPriceMinMax[1]) ||
        selectedFuel !== "Todos" ||
        selectedTransmission !== "Todos" ||
        searchTerm !== "";

    if (loading) {
        return (
            <div className="space-y-8 animate-pulse">
                <div className="flex flex-col md:flex-row gap-4 max-w-3xl mx-auto">
                    <div className="h-14 bg-white/5 rounded-2xl flex-1" />
                    <div className="h-14 bg-white/5 rounded-2xl w-40" />
                </div>
                <div className="flex flex-wrap justify-center gap-3">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="h-10 w-24 bg-white/5 rounded-full" />
                    ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="aspect-[4/5] bg-white/5 rounded-3xl border border-white/10" />
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center py-32 text-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
                    <X size={32} />
                </div>
                <h3 className="text-xl font-bold text-white">Error de conexión</h3>
                <p className="text-zinc-500 max-w-xs mx-auto">{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="text-amber-500 hover:text-amber-400 font-bold uppercase tracking-wider text-xs border-b border-amber-500/30 pb-0.5"
                >
                    Reintentar
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* --- 1. BRAND SELECTOR & CTA --- */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 max-w-3xl mx-auto">
                <BrandSelector
                    brands={brandPills}
                    selectedBrand={selectedBrand}
                    onBrandChange={setSelectedBrand}
                    className="flex-1 md:min-w-[280px]"
                />
                <ViewAllButton
                    onClick={() => router.push("/ofertas")}
                    className="md:flex-shrink-0"
                />
            </div>

            {/* --- 2. CATEGORY TABS --- */}
            <div className="flex flex-wrap items-center justify-center gap-3">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={cn(
                            "px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wide transition-all duration-300",
                            selectedCategory === cat
                                ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)] scale-105"
                                : "bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white"
                        )}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* --- 3. CONTROL CENTER (Filters Bar) --- */}
            {/* --- 3. CONTROL CENTER (Filters Bar) --- */}
            {/* CAMBIO: Layout estructurado en Grid para mejor alineación visual */}
            <div className="relative z-40 w-full max-w-5xl mx-auto bg-zinc-900/40 p-6 md:p-8 rounded-3xl border border-white/5 backdrop-blur-sm flex flex-col gap-8">

                {/* ROW 1: SEARCH + DROPDOWNS */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

                    {/* Search Bar (Span 6 - 50% width) */}
                    <div className="md:col-span-6 flex flex-col gap-2">
                        <span className="text-xs font-bold uppercase tracking-widest text-zinc-500 text-left pl-2">
                            Búsqueda
                        </span>
                        <div className="relative">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-amber-500 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Buscar vehículo..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-zinc-950/50 backdrop-blur-md border border-white/10 rounded-full pl-12 pr-10 py-3.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 transition-all"
                            />
                            {searchTerm && (
                                <button
                                    onClick={() => setSearchTerm("")}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
                                >
                                    <X size={14} />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Transmission (Span 3 - 25% width) */}
                    <div className="md:col-span-3 flex flex-col gap-2">
                        <span className="text-xs font-bold uppercase tracking-widest text-zinc-500 text-left pl-2">
                            Transmisión
                        </span>
                        <PremiumDropdown
                            options={availableTransmissions}
                            value={selectedTransmission}
                            onChange={(val) => setSelectedTransmission(val || "Todos")}
                            allowClear={false}
                            className="w-full"
                        />
                    </div>

                    {/* Fuel (Span 3 - 25% width) */}
                    <div className="md:col-span-3 flex flex-col gap-2">
                        <span className="text-xs font-bold uppercase tracking-widest text-zinc-500 text-left pl-2">
                            Combustible
                        </span>
                        <PremiumDropdown
                            options={availableFuels}
                            value={selectedFuel}
                            onChange={(val) => setSelectedFuel(val || "Todos")}
                            allowClear={false}
                            className="w-full"
                        />
                    </div>
                </div>

                {/* DIVIDER */}
                <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                {/* ROW 2: SLIDERS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 px-2">
                    {/* Year Range Slider */}
                    <div className="w-full">
                        <YearRangeFilter
                            min={globalMinMax[0]}
                            max={globalMinMax[1]}
                            onChange={setYearRange}
                        />
                    </div>

                    {/* Price Range Slider */}
                    <div className="w-full">
                        <PriceRangeFilter
                            min={globalPriceMinMax[0]}
                            max={globalPriceMinMax[1]}
                            onChange={setPriceRange}
                        />
                    </div>
                </div>
            </div>

            {/* --- 4. RESULTS COUNT & CLEAR --- */}
            <div className="flex justify-between items-center px-2 container mx-auto max-w-5xl">
                <p className="text-zinc-400 text-xs uppercase tracking-widest font-semibold">
                    {filteredCars.length} Vehículo{filteredCars.length !== 1 ? 's' : ''}
                </p>
                {hasActiveFilters && (
                    <button
                        onClick={clearFilters}
                        className="text-amber-500 hover:text-amber-400 font-bold uppercase tracking-wider text-xs flex items-center gap-2 group"
                    >
                        <X size={12} className="group-hover:rotate-90 transition-transform" />
                        Limpiar
                    </button>
                )}
            </div>

            {/* --- GRID --- */}
            <div className="min-h-[600px] relative z-10"> {/* z-10 para quedar debajo de los filtros */}
                {currentCars.length > 0 ? (
                    <ScrollReveal animation="fade-up-stagger" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <AnimatePresence mode="popLayout">
                            {currentCars.map((car) => (
                                <motion.div
                                    key={car.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <CarCard car={car} />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </ScrollReveal>
                ) : (
                    <div className="flex flex-col items-center justify-center py-32 text-center space-y-6 border border-dashed border-white/10 rounded-3xl bg-white/5">
                        <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-white/50">
                            <Search size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-white">Sin resultados</h3>
                        <p className="text-zinc-500 max-w-xs mx-auto">No encontramos vehículos que coincidan con tu búsqueda.</p>
                        <button
                            onClick={clearFilters}
                            className="text-amber-500 hover:text-amber-400 font-bold uppercase tracking-wider text-xs border-b border-amber-500/30 pb-0.5"
                        >
                            Limpiar Filtros
                        </button>
                    </div>
                )}
            </div>

            {/* --- PAGINATION --- */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 py-8 relative z-10">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="p-3 rounded-full bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-white/5 transition-colors"
                    >
                        <ChevronLeft size={20} />
                    </button>

                    <span className="text-sm font-medium text-zinc-400">
                        Página <span className="text-white">{currentPage}</span> de <span className="text-white">{totalPages}</span>
                    </span>

                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="p-3 rounded-full bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-white/5 transition-colors"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            )}
        </div>
    );
}

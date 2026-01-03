import { getAllOffers } from "@/sanity/lib/fetch";
import { CarCard } from "@/components/cars/CarCard";
import { Timer, Zap } from "lucide-react";
import Link from "next/link";

export const metadata = {
    title: "Liquidación y Ofertas | Garage",
    description: "Oportunidades únicas por tiempo limitado. Descuentos exclusivos en vehículos seleccionados.",
};

// Revalidate every minute
export const revalidate = 60;

export default async function OffersPage() {
    const cars = await getAllOffers();

    return (
        <main className="pt-24 min-h-screen bg-neutral-50 text-black">
            {/* Header High Contrast */}
            <div className="bg-black text-white py-16 border-b-8 border-amber-500">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-2 bg-amber-500 text-black font-bold px-4 py-1 rounded-full text-sm uppercase tracking-wider animate-pulse">
                                <Timer size={16} />
                                <span>Tiempo Limitado</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-sans font-black tracking-tighter leading-none">
                                LIQUIDACIÓN <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-300">
                                    & OPORTUNIDADES
                                </span>
                            </h1>
                        </div>
                        <div className="text-right hidden md:block">
                            <p className="text-gray-400 text-lg max-w-xs ml-auto">
                                Vehículos seleccionados con precios especiales y entrega inmediata.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Grid */}
            <div className="container mx-auto px-6 py-16">

                {cars.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {cars.map((car) => (
                            <div key={car.id} className="relative group">
                                {/* Aggressive Sale Badge */}
                                <div className="absolute -top-4 -right-4 z-20 bg-amber-500 text-black font-black text-xl w-16 h-16 rounded-full flex items-center justify-center shadow-lg rotate-12 group-hover:rotate-0 transition-transform">
                                    SALE
                                </div>
                                <div className="border-4 border-black hover:border-amber-500 transition-colors bg-white shadow-xl">
                                    <CarCard car={car} />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-24 space-y-4">
                        <Zap size={64} className="mx-auto text-gray-300" />
                        <h2 className="text-3xl font-bold text-gray-400">No hay ofertas activas en este momento.</h2>
                        <Link href="/catalogo" className="inline-block bg-black text-white px-8 py-3 font-bold hover:bg-amber-500 hover:text-black transition-colors">
                            VER CATÁLOGO GENERAL
                        </Link>
                    </div>
                )}
            </div>
        </main>
    );
}

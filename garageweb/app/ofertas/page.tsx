import { client } from "@/sanity/lib/client";
import { OFFERS_QUERY } from "@/sanity/lib/queries";
import { OfferCard } from "@/components/offers/OfferCard";
import { Car } from "@/types/main";
import { Tag } from "lucide-react";
import Link from "next/link";
import { PremiumButton } from "@/components/ui/PremiumButton";

export const metadata = {
    title: "Oportunidades Exclusivas | El Garage",
    description: "Selección de vehículos premium con condiciones extraordinarias y entrega inmediata.",
};

// Revalidate 0 for real-time (User Request)
export const revalidate = 0;

export default async function OffersPage() {
    // 1. Fetch Data
    const rawOffers = await client.fetch(OFFERS_QUERY, {}, { next: { revalidate: 0 } });

    // Manual mapping for strict Typing (duplicating `mapSanityCarToCar` logic for safety here)
    const offers: Car[] = rawOffers.map((raw: any) => ({
        id: raw.id || raw._id,
        slug: raw.slug,
        brand: raw.brand,
        model: raw.model,
        year: raw.year,
        price: raw.price,
        currency: raw.currency,
        mileage: raw.mileage,
        transmission: raw.transmission,
        fuelType: raw.fuelType === 'Gasoline' ? 'Nafta' : raw.fuelType === 'Diesel' ? 'Diesel' : raw.fuelType === 'Hybrid' ? 'Híbrido' : raw.fuelType, // Simple mapping
        category: raw.category,
        status: raw.status,
        images: Array.isArray(raw.images) ? raw.images : [],
        description: raw.description,
        features: raw.features || [],
        isOffer: raw.isOffer,
        originalPrice: raw.originalPrice,
        discount: raw.discount
    }));

    return (
        <main className="min-h-screen bg-black text-white selection:bg-amber-500/30">

            {/* 1. Cinematic Hero Section */}
            <section className="relative pt-48 pb-24 md:pt-64 md:pb-32 overflow-hidden">
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900 to-black z-0 pointer-events-none" />

                {/* Ambient Glow Spot */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-600/10 blur-[150px] rounded-full pointer-events-none z-0 mix-blend-screen" />

                {/* Content */}
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <div className="flex flex-col items-center space-y-6">
                        <span className="text-amber-500 font-bold tracking-[0.3em] text-xs uppercase opacity-80">
                            The Collection
                        </span>

                        <h1 className="text-5xl md:text-8xl font-serif font-medium tracking-tight text-white drop-shadow-2xl">
                            Oportunidades <br />
                            <span className="italic text-zinc-500">Exclusivas</span>
                        </h1>

                        <div className="h-px w-24 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent my-8" />

                        <p className="text-zinc-400 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
                            Selección de vehículos premium con condiciones extraordinarias.
                            <br className="hidden md:block" />
                            Calidad certificada y beneficios únicos por tiempo limitado.
                        </p>
                    </div>
                </div>
            </section>

            {/* 2. Offers Grid */}
            <section className="container mx-auto px-6 pb-32">
                {!offers || offers.length === 0 ? (
                    // Empty State
                    <div className="flex flex-col items-center justify-center py-24 text-center space-y-8 animate-in fade-in zoom-in duration-700">
                        <div className="w-24 h-24 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                            <Tag className="w-10 h-10 text-zinc-600" />
                        </div>
                        <div className="space-y-4 max-w-md mx-auto">
                            <h3 className="text-3xl font-serif text-white">Sin ofertas activas</h3>
                            <p className="text-zinc-500 font-light leading-relaxed">
                                En este momento no contamos con vehículos en liquidación. Visita nuestro catálogo completo para ver todas las unidades disponibles.
                            </p>
                        </div>
                        <Link href="/catalogo">
                            <PremiumButton variant="primary">
                                Explorar Catálogo
                            </PremiumButton>
                        </Link>
                    </div>
                ) : (
                    // Grid
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {offers.map((car) => (
                            <OfferCard key={car.id} car={car} />
                        ))}
                    </div>
                )}
            </section>

        </main>
    );
}

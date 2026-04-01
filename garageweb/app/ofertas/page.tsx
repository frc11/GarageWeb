import { client } from "@/sanity/lib/client";
import { OFFERS_QUERY } from "@/sanity/lib/queries";
import { OffersClient } from "@/components/ofertas/OffersClient";
import { Car } from "@/types/main";

export const metadata = {
    title: "Ofertas",
    description: "Encontrá tu próximo auto entre nuestra selección de unidades premium. Oportunidades únicas con la confianza de El Garage.",
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
        category: raw.category,
        thumbnailImage: raw.thumbnailImage,
        coverImage: raw.coverImage,
        gallery: Array.isArray(raw.gallery) ? raw.gallery : [],
        description: raw.description,
        features: raw.features || [],
        isOffer: raw.isOffer,
        originalPrice: raw.originalPrice,
        discount: raw.discount
    }));

    return (
        <main className="min-h-[100dvh] bg-black text-white selection:bg-amber-500/30">

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
                            Rebajas
                        </span>

                        <h1 className="text-5xl md:text-8xl font-serif font-medium tracking-tight text-white drop-shadow-2xl">
                            Oportunidades <br />
                            <span className="italic text-zinc-500">Exclusivas</span>
                        </h1>

                        <div className="h-px w-24 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent my-8" />

                        <p className="text-zinc-400 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
                            Encontrá tu próximo auto entre nuestra selección de unidades premium.
                            <br className="hidden md:block" />
                            Oportunidades únicas con la confianza y el respaldo de El Garage.
                        </p>
                    </div>
                </div>
            </section>

            {/* 2. Offers Grid */}
            <section className="container mx-auto px-6 pb-32">
                <OffersClient cars={offers} />
            </section>

        </main>
    );
}

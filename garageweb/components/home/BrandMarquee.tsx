import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { AVAILABLE_BRANDS_QUERY } from "@/sanity/lib/queries";
import { Settings2 } from "lucide-react";

// --- Configuration ---
const BRAND_ASSETS: Record<string, string> = {
    "audi": "/brands/audi.svg",
    "bmw": "/brands/bmw.svg",
    "citroen": "/brands/citroen.svg",
    "ferrari": "/brands/ferrari.svg",
    "fiat": "/brands/fiat.svg",
    "ford": "/brands/ford.svg",
    "honda": "/brands/honda.svg",
    "jeep": "/brands/jeep.svg",
    "kia": "/brands/kia.svg",
    "mercedes": "/brands/mercedes.svg",
    "mercedes-benz": "/brands/mercedes.svg", // Handle both
    "mercedes-amg": "/brands/mercedes-amg.svg",
    "mini": "/brands/mini.svg",
    "mitsubishi": "/brands/mitsubishi.svg",
    "nissan": "/brands/nissan.svg",
    "porsche": "/brands/porsche.svg",
    "toyota": "/brands/toyota.svg",
    "peugeot": "/brands/peugeot.svg",
    "volkswagen": "/brands/volkswagen.svg",
    "haval": "/brands/haval.svg",
    "dodge": "/brands/dodge.svg",
    "chevrolet": "/brands/chevrolet.svg"
};

// --- Helper ---
function normalizeBrand(brand: string): string {
    return brand.toLowerCase().trim().replace(/\s+/g, '-');
}

export async function BrandMarquee() {
    // 1. Fetch available brands from Sanity
    const fetchedBrands: string[] = await client.fetch(AVAILABLE_BRANDS_QUERY);

    // 2. Filter & Map
    // Only show brands that exist in our local asset map
    const uniqueFetched = Array.from<string>(new Set(fetchedBrands.map(b => b.trim())));
    const activeBrands = uniqueFetched
        .filter(brandName => {
            const key = normalizeBrand(brandName);
            // Check specific key or direct lowercase match
            return BRAND_ASSETS[key] || BRAND_ASSETS[brandName.toLowerCase()];
        })
        .map(brandName => {
            const dimKey = normalizeBrand(brandName);
            return {
                name: brandName,
                slug: dimKey,
                logo: BRAND_ASSETS[dimKey] || BRAND_ASSETS[brandName.toLowerCase()]
            };
        })
        .sort((a, b) => a.name.localeCompare(b.name));

    if (activeBrands.length === 0) return null;

    return (
        <section className="w-full pt-50 pb-25 bg-white overflow-hidden relative z-20 -mt-32">
            {/* === Top Gradient Integration === */}
            <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#050505] via-[#050505]/20 to-transparent z-30 pointer-events-none" />

            {/* Inline Styles for Animation (Server/Client Compatible) */}
            <style>{`
                @keyframes scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-scroll {
                    animation: scroll 40s linear infinite;
                }
                .group:hover .animate-scroll {
                    animation-play-state: paused;
                }
            `}</style>

            {/* Header Content */}
            <div className="container mx-auto px-4 mb-16 text-center relative z-10 space-y-6">
                <div className="flex flex-col items-center space-y-6">
                    <div className="flex items-center space-x-4">
                        <span className="text-xs font-medium uppercase tracking-[0.3em] text-neutral-500 font-sans">
                            Nuestras Marcas
                        </span>
                    </div>

                    <div className="overflow-hidden relative pb-2">
                        <h2 className="text-4xl md:text-6xl font-light tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-neutral-700 to-black font-display">
                            DISPONIBLES
                        </h2>
                    </div>

                    <div>
                        <Settings2 className="w-5 h-5 text-neutral-400 stroke-[1.5]" />
                    </div>
                </div>
            </div>

            {/* Marquee Scroller */}
            <div className="relative w-full group cursor-pointer">
                {/* Fade Edges */}
                <div className="absolute left-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

                <div className="flex w-fit animate-scroll will-change-transform">
                    {/* Render 1 */}
                    <div className="flex items-center shrink-0 gap-16 md:gap-32 px-8 md:px-16">
                        {activeBrands.map((brand, i) => (
                            <Link
                                key={`a-${i}`}
                                href={`/catalogo?brand=${encodeURIComponent(brand.slug)}`}
                                className="group/item relative block w-32 h-16 md:w-48 md:h-24 transition-transform duration-500 hover:scale-110"
                            >
                                <Image
                                    src={brand.logo}
                                    alt={`Logo de ${brand.name}`}
                                    fill
                                    className="object-contain transition-all duration-500 
                                               opacity-100 grayscale-0 
                                               lg:opacity-40 lg:grayscale 
                                               lg:group-hover/item:opacity-100 lg:group-hover/item:grayscale-0"
                                    sizes="(max-width: 768px) 128px, 192px"
                                />
                            </Link>
                        ))}
                    </div>

                    {/* Render 2 (Infinite Loop) */}
                    <div className="flex items-center shrink-0 gap-16 md:gap-32 px-8 md:px-16">
                        {activeBrands.map((brand, i) => (
                            <Link
                                key={`b-${i}`}
                                href={`/catalogo?brand=${encodeURIComponent(brand.slug)}`}
                                className="group/item relative block w-32 h-16 md:w-48 md:h-24 transition-transform duration-500 hover:scale-110"
                            >
                                <Image
                                    src={brand.logo}
                                    alt={`Logo de ${brand.name}`}
                                    fill
                                    className="object-contain transition-all duration-500 
                                               opacity-100 grayscale-0 
                                               lg:opacity-40 lg:grayscale 
                                               lg:group-hover/item:opacity-100 lg:group-hover/item:grayscale-0"
                                    sizes="(max-width: 768px) 128px, 192px"
                                />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

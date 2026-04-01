import { Suspense } from "react";
import { client } from "@/sanity/lib/client";
import { CARS_QUERY, CATALOG_BRANDS_QUERY, CATALOG_CATEGORIES_QUERY } from "@/sanity/lib/queries";
import { CatalogGrid } from "@/components/catalogo/CatalogGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Car } from "@/types/main";

export const metadata = {
    title: "Catálogo",
    description: "Explora nuestro inventario exclusivo de vehículos de alta gama.",
};

// Revalidate every minute
export const revalidate = 60;

export default async function CatalogPage(props: {
    searchParams: Promise<{ brand?: string }>;
}) {
    // Await searchParams to avoid "sync access" warning in Next.js 15+
    const searchParams = await props.searchParams;
    const brandSlug = searchParams.brand;

    return (
        <main className="pt-32 pb-24 bg-zinc-950 min-h-[100dvh] relative overflow-hidden">
            {/* Background noise/gradient */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 blur-[150px] rounded-full pointer-events-none z-0" />

            <div className="container mx-auto px-6 space-y-16 relative z-10">
                <div className="flex flex-col items-center space-y-8">
                    <SectionHeading
                        title="NUESTRO INVENTARIO"
                        subtitle="Nuestra Colección"
                        align="center"
                    />
                </div>

                <div className="min-h-[400px]">
                    <Suspense fallback={<div className="w-full h-96 flex items-center justify-center text-white/50 animate-pulse">Cargando catálogo...</div>}>
                        <CatalogGrid initialBrandSlug={brandSlug} />
                    </Suspense>
                </div>
            </div>
        </main>
    );
}


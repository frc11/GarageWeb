import { getCars, getStockBrands } from "@/sanity/lib/fetch";
import { CatalogGrid } from "@/components/catalogo/CatalogGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata = {
    title: "Catálogo Completo | El Garage",
    description: "Explora nuestro inventario exclusivo de vehículos de alta gama.",
};

// Revalidate every minute
export const revalidate = 60;

export default async function CatalogPage(props: {
    searchParams: Promise<{ brand?: string }>;
}) {
    const searchParams = await props.searchParams;
    const brandSlug = searchParams.brand;
    const cars = await getCars(brandSlug);
    const allBrands = await getStockBrands();

    // Format brand name for display (capitalize slug chunks)
    const brandName = brandSlug
        ? brandSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
        : null;

    return (
        <main className="pt-32 pb-24 bg-zinc-950 min-h-screen relative overflow-hidden">
            {/* Background noise/gradient already in layout, but we can add specific atmospheric element */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 blur-[150px] rounded-full pointer-events-none z-0" />

            <div className="container mx-auto px-6 space-y-16 relative z-10">
                <div className="flex flex-col items-center space-y-8">
                    <SectionHeading
                        title="NUESTRO INVENTARIO"
                        subtitle="Colección Curada"
                        align="center"
                    />

                    {/* Filter Reset */}
                    {brandSlug && (
                        <div className="flex items-center gap-4 animate-in fade-in slide-in-from-top-4">
                            <span className="text-zinc-400 text-sm">Filtrado por: <span className="text-white font-medium">{brandName}</span></span>
                            <a
                                href="/catalogo"
                                className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white text-[10px] uppercase font-bold rounded-full transition-colors flex items-center gap-2"
                            >
                                ✕ Limpiar
                            </a>
                        </div>
                    )}
                </div>

                <div className="min-h-[400px]">
                    <CatalogGrid cars={cars} allBrands={allBrands} />
                </div>
            </div>
        </main>
    );
}

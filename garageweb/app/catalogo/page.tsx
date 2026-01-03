import { getCars } from "@/sanity/lib/fetch";
import { CatalogGrid } from "@/components/catalogo/CatalogGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata = {
    title: "Catálogo Completo | Garage",
    description: "Explora nuestro inventario exclusivo de vehículos de alta gama.",
};

// Revalidate every minute
export const revalidate = 60;

export default async function CatalogPage() {
    const cars = await getCars();

    return (
        <main className="pt-32 pb-24 bg-zinc-950 min-h-screen relative overflow-hidden">
            {/* Background noise/gradient already in layout, but we can add specific atmospheric element */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 blur-[150px] rounded-full pointer-events-none z-0" />

            <div className="container mx-auto px-6 space-y-16 relative z-10">
                <div className="flex flex-col items-center">
                    <SectionHeading
                        title="NUESTRO INVENTARIO"
                        subtitle="Colección Curada"
                        align="center"
                    />

                    {/* Hook CTA */}
                    <div className="mt-[-2rem] mb-12">
                        <a href="/ofertas" className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black text-xs font-black uppercase tracking-[0.2em] px-6 py-3 rounded-full transition-all hover:scale-105 shadow-xl shadow-amber-500/20">
                            <span>🔥 Ver Ofertas Relámpago</span>
                        </a>
                    </div>
                </div>

                <CatalogGrid cars={cars} />
            </div>
        </main>
    );
}

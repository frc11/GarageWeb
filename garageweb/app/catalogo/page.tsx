import { getCars } from "@/sanity/lib/fetch";
import { CatalogGrid } from "@/components/catalogo/CatalogGrid";

export const metadata = {
    title: "Catálogo Completo | Garage",
    description: "Explora nuestro inventario exclusivo de vehículos de alta gama.",
};

// Revalidate every minute
export const revalidate = 60;

export default async function CatalogPage() {
    const cars = await getCars();

    return (
        <main className="pt-32 pb-24 bg-black min-h-screen">
            <div className="container mx-auto px-6 space-y-16">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl md:text-6xl font-display font-bold text-white tracking-tight">
                        INVENTARIO COMPLETO
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Nuestra colección curada de vehículos.
                    </p>
                </div>

                <CatalogGrid cars={cars} />
            </div>
        </main>
    );
}

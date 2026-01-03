import { CarCard } from "@/components/cars/CarCard";
import { Car } from "@/types/main";

interface FeaturedCarsProps {
    cars: Car[];
}

export function FeaturedCars({ cars }: FeaturedCarsProps) {
    return (
        <section className="py-32 bg-black">
            <div className="container mx-auto px-6">
                <div className="flex flex-col items-center mb-16 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight text-center">
                        NUESTRO INVENTARIO
                    </h2>
                    <div className="h-1 w-24 bg-white rounded-full opacity-20" />
                </div>

                {cars && cars.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {cars.map((car) => (
                            <CarCard key={car.id} car={car} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-500">No hay vehículos destacados por el momento.</p>
                    </div>
                )}
            </div>
        </section>
    );
}

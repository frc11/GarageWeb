import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MessageCircle, Calendar, Gauge, Zap, Fuel, Activity } from "lucide-react";
import { getCarBySlug } from "@/sanity/lib/fetch";
import { CarGallery } from "@/components/cars/CarGallery";
import { formatCurrency, cn } from "@/lib/utils";

interface CarPageProps {
    params: Promise<{
        slug: string;
    }>;
}

// Revalidate every minute
export const revalidate = 60;

export default async function CarPage(props: CarPageProps) {
    const params = await props.params;
    const car = await getCarBySlug(params.slug);

    if (!car) {
        notFound();
    }

    const whatsappMessage = `Hola, me interesa el ${car.brand} ${car.model} que vi en la web.`;
    const whatsappUrl = `https://wa.me/5491112345678?text=${encodeURIComponent(whatsappMessage)}`;

    return (
        <main className="pt-24 pb-20 bg-black min-h-screen">
            <div className="container mx-auto px-6">
                {/* Back Button */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
                >
                    <ArrowLeft size={20} />
                    Volver al inventario
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left Column: Gallery & Details */}
                    <div className="lg:col-span-2 space-y-12">
                        <CarGallery images={car.images || []} alt={`${car.brand} ${car.model}`} />

                        {/* Description */}
                        <div className="space-y-6">
                            <h2 className="text-2xl font-display font-bold text-white">Sobre este vehículo</h2>
                            <p className="text-gray-300 leading-relaxed text-lg">
                                {car.description}
                            </p>
                        </div>

                        {/* Features */}
                        {car.features && car.features.length > 0 && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-display font-bold text-white">Equipamiento Destacado</h2>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {car.features.map((feature, index) => (
                                        <li key={index} className="flex items-center gap-3 text-gray-300">
                                            <Activity size={18} className="text-white shrink-0" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Right Column: Sticky Sidebar */}
                    <div className="relative">
                        <div className="sticky top-28 bg-zinc-900 border border-white/10 rounded-xl p-8 space-y-8">
                            <div>
                                <h3 className="text-sm uppercase tracking-wider text-gray-400 font-semibold mb-2">
                                    {car.brand}
                                </h3>
                                <h1 className="text-3xl font-display font-bold text-white leading-tight mb-4">
                                    {car.model}
                                </h1>
                                <p className="text-4xl font-bold text-white">
                                    {formatCurrency(car.price, car.currency)}
                                </p>
                            </div>

                            {/* Specs Grid */}
                            <div className="grid grid-cols-2 gap-4 py-6 border-t border-white/10 border-b">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                                        <Calendar size={16} />
                                        <span>Año</span>
                                    </div>
                                    <p className="text-white font-medium">{car.year}</p>
                                </div>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                                        <Gauge size={16} />
                                        <span>Kilometraje</span>
                                    </div>
                                    <p className="text-white font-medium">{car.mileage.toLocaleString()} km</p>
                                </div>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                                        <Zap size={16} />
                                        <span>Transmisión</span>
                                    </div>
                                    <p className="text-white font-medium">{car.transmission}</p>
                                </div>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                                        <Fuel size={16} />
                                        <span>Combustible</span>
                                    </div>
                                    <p className="text-white font-medium">{car.fuelType}</p>
                                </div>
                            </div>

                            {/* Status */}
                            <div className="flex items-center gap-2">
                                <div className={cn(
                                    "w-2.5 h-2.5 rounded-full",
                                    car.status === 'available' ? "bg-green-500" :
                                        car.status === 'reserved' ? "bg-yellow-500" : "bg-red-500"
                                )} />
                                <span className="text-sm font-medium uppercase text-gray-300">
                                    {car.status === 'available' ? 'Disponible' :
                                        car.status === 'reserved' ? 'Reservado' : 'Vendido'}
                                </span>
                            </div>

                            {/* CTA Button */}
                            <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-3 w-full bg-white text-black font-bold py-4 rounded hover:bg-gray-100 transition-colors"
                            >
                                <MessageCircle size={20} />
                                CONSULTAR COMPRA
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

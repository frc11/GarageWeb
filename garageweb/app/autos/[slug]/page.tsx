import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MessageCircle, Calendar, Gauge, Zap, Fuel, Activity, Share2 } from "lucide-react";
import { getCarBySlug } from "@/sanity/lib/fetch";
import { CarGallery } from "@/components/cars/CarGallery";
import { formatCurrency, cn } from "@/lib/utils";
import { PremiumButton } from "@/components/ui/PremiumButton";
import Image from "next/image";

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
    const whatsappUrl = `https://wa.me/5493814154708?text=${encodeURIComponent(whatsappMessage)}`;

    return (
        <main className="bg-zinc-950 min-h-screen pt-22">

            {/* 1. HERO SECTION (Full Screen) */}
            <div className="relative h-screen w-full overflow-hidden">
                <Image
                    src={car.images[0]}
                    alt={car.model}
                    fill
                    className="object-cover"
                    priority
                />

                {/* Gradient Filters */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                <div className="absolute inset-0 bg-black/20" /> {/* Dimmer */}

                <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 lg:p-24 z-20">
                    <div className="container mx-auto">
                        <Link href="/catalogo" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 backdrop-blur-md bg-black/30 px-4 py-2 rounded-full border border-white/10 transition-colors text-sm font-medium uppercase tracking-wider">
                            <ArrowLeft size={16} />
                            Volver
                        </Link>

                        <h1 className="text-5xl md:text-7xl lg:text-9xl font-black text-white tracking-tighter uppercase mb-4 leading-none">
                            {car.brand} <br />
                            <span className="text-white/50">{car.model}</span>
                        </h1>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 py-24 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">

                    {/* 2. LEFT: Gallery & Story (Scrollable) */}
                    <div className="lg:col-span-7 space-y-24">

                        {/* Gallery Grid (skipping first image as it was hero) */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-8">Galería Visual</h3>
                            <div className="grid grid-cols-1 gap-4">
                                {car.images.slice(1).map((img, idx) => (
                                    <div key={idx} className="relative aspect-video rounded-3xl overflow-hidden border border-white/5">
                                        <Image src={img} alt={`${car.model} view ${idx}`} fill className="object-cover" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Narrative Description */}
                        <div className="space-y-8">
                            <h2 className="text-3xl md:text-4xl font-serif text-white">Ingeniería y Diseño</h2>
                            <div className="prose prose-invert prose-lg text-gray-400 font-light leading-relaxed">
                                <p>{car.description}</p>
                            </div>
                        </div>

                        {/* Features Grid */}
                        {car.features && car.features.length > 0 && (
                            <div className="space-y-8">
                                <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500">Equipamiento</h3>
                                <div className="grid grid-cols-2 bg-zinc-900/50 border border-white/10 rounded-3xl overflow-hidden">
                                    {car.features.map((feature, index) => (
                                        <div key={index} className="border-b border-r border-white/5 p-6 flex items-start gap-4 hover:bg-white/5 transition-colors">
                                            <Activity size={20} className="text-zinc-500 mt-1" />
                                            <span className="text-zinc-300 font-medium">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* 3. RIGHT: Sticky Tech Panel */}
                    <div className="lg:col-span-5 relative">
                        <div className="sticky top-32 space-y-12">

                            {/* Price Block */}
                            <div className="p-8 rounded-3xl bg-zinc-900/80 backdrop-blur-xl border border-white/10 space-y-8">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-xs uppercase tracking-widest text-zinc-500 mb-2">Precio de Lista</p>
                                        <div className="flex items-baseline gap-4">
                                            {car.isOffer && car.originalPrice && (
                                                <span className="text-xl line-through text-zinc-600 font-medium">
                                                    {formatCurrency(car.originalPrice, car.currency)}
                                                </span>
                                            )}
                                            <span className={cn(
                                                "text-5xl font-bold tracking-tight",
                                                car.isOffer ? "text-amber-500" : "text-white"
                                            )}>
                                                {formatCurrency(car.price, car.currency)}
                                            </span>
                                        </div>
                                    </div>
                                    <button className="p-3 rounded-full bg-white/5 text-white hover:bg-white hover:text-black transition-colors">
                                        <Share2 size={20} />
                                    </button>
                                </div>

                                {/* Tech Specs 2x2 */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="bg-black/40 p-4 rounded-xl border border-white/5">
                                        <p className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1">Año</p>
                                        <p className="text-lg font-bold text-white flex items-center gap-2">
                                            <Calendar size={14} /> {car.year}
                                        </p>
                                    </div>
                                    <div className="bg-black/40 p-4 rounded-xl border border-white/5">
                                        <p className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1">Kilometraje</p>
                                        <p className="text-lg font-bold text-white flex items-center gap-2">
                                            <Gauge size={14} /> {car.mileage.toLocaleString()}
                                        </p>
                                    </div>
                                    <div className="bg-black/40 p-4 rounded-xl border border-white/5">
                                        <p className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1">Transmisión</p>
                                        <p className="text-lg font-bold text-white flex items-center gap-2">
                                            <Zap size={14} /> {car.transmission}
                                        </p>
                                    </div>
                                    <div className="bg-black/40 p-4 rounded-xl border border-white/5">
                                        <p className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1">Combustible</p>
                                        <p className="text-lg font-bold text-white flex items-center gap-2">
                                            <Fuel size={14} /> {car.fuelType}
                                        </p>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="space-y-4 pt-4 border-t border-white/5">
                                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="block w-full">
                                        <PremiumButton variant="primary" className="w-full h-14 text-base">
                                            {car.isOffer ? "SOLICITAR OFERTA" : "CONSULTAR COMPRA"}
                                        </PremiumButton>
                                    </a>

                                    <button className="w-full py-4 rounded-full border border-white/10 text-white font-bold uppercase tracking-wider text-xs hover:bg-white hover:text-black transition-all">
                                        Agendar Test Drive
                                    </button>
                                </div>
                            </div>

                            {/* Consultant Card */}
                            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                                <div className="w-12 h-12 bg-zinc-700 rounded-full flex items-center justify-center text-xs font-bold text-white">
                                    EG
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-white">Asesor de Ventas</p>
                                    <p className="text-xs text-zinc-400">Disponible ahora para consultas.</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

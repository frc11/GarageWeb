import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Gauge, Zap, Fuel, Activity } from "lucide-react";
import { getCarBySlug } from "@/sanity/lib/fetch";
import { formatCurrency, cn } from "@/lib/utils";
import { PremiumButton } from "@/components/ui/PremiumButton";
import { ShareButton } from "@/components/ui/ShareButton";
import { BackButton } from "@/components/ui/BackButton";
import { TeamSelector } from "@/components/cars/TeamSelector"; // Correct Import
import Image from "next/image";
import { Metadata } from "next";

interface CarPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateMetadata(props: CarPageProps): Promise<Metadata> {
    const params = await props.params;
    const car = await getCarBySlug(params.slug);

    if (!car) {
        return {
            title: "Vehículo no encontrado",
            description: "El vehículo que buscas no está disponible."
        };
    }

    return {
        title: `${car.brand} ${car.model}`,
        description: `Conoce el ${car.brand} ${car.model} ${car.year}. ${car.description?.slice(0, 150)}...`,
    };
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

    const testDriveMessage = `Hola, ¡quiero hacer un test drive del ${car.brand} ${car.model} que vi en su pagina!`;
    const testDriveUrl = `https://wa.me/5493814154708?text=${encodeURIComponent(testDriveMessage)}`;

    const shareUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'https://elgarage.com'}/autos/${car.slug}`;
    const shareText = `¡Mira este auto que vi en la página de El Garage!`;

    return (
        <main className="bg-zinc-950 min-h-screen pt-24.5">

            {/* 1. HERO SECTION (Full Screen) */}
            <div className="relative h-screen w-full overflow-hidden">
                {car.coverImage ? (
                    car.coverImage.match(/\.(mp4|webm|mov|m4v)(\?.*)?$/i) ? (
                        <video
                            src={car.coverImage}
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <Image
                            src={car.coverImage}
                            alt={car.model}
                            fill
                            className="object-cover"
                            priority
                        />
                    )
                ) : (
                    <div className="absolute inset-0 bg-neutral-900 flex items-center justify-center">
                        <span className="text-zinc-600 uppercase tracking-widest font-bold">Sin Portada</span>
                    </div>
                )}

                {/* Gradient Filters */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                <div className="absolute inset-0 bg-black/20" /> {/* Dimmer */}

                <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 lg:p-24 z-20">
                    <div className="container mx-auto">
                        <BackButton />

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

                        {/* Gallery Grid */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-8">Galería Visual</h3>
                            <div className="grid grid-cols-1 gap-4">
                                {car.gallery && car.gallery.length > 0 ? (
                                    car.gallery.map((media, idx) => (
                                        <div key={idx} className="relative aspect-video rounded-3xl overflow-hidden border border-white/5">
                                            {media.match(/\.(mp4|webm|mov|m4v)(\?.*)?$/i) ? (
                                                <video
                                                    src={media}
                                                    controls
                                                    playsInline
                                                    className="w-full h-full object-cover"
                                                    preload="metadata"
                                                />
                                            ) : (
                                                <Image src={media} alt={`${car.model} gallery ${idx}`} fill className="object-cover" />
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <div className="flex items-center justify-center aspect-video rounded-3xl bg-zinc-900/30 border border-white/5 p-12">
                                        <p className="text-xl md:text-2xl font-bold uppercase tracking-widest text-zinc-600 text-center">
                                            No hay fotos del vehículo por el momento
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Narrative Description */}
                        {car.description && (
                            <div className="space-y-8">
                                <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500">Descripción</h3>
                                <div className="prose prose-invert prose-lg text-gray-400 font-light leading-relaxed">
                                    <p>{car.description}</p>
                                </div>
                            </div>
                        )}

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
                                        <div className="flex flex-col items-start gap-1">
                                            {car.isOffer && car.originalPrice && (
                                                <span className="text-xl line-through text-zinc-600 font-medium order-1">
                                                    {formatCurrency(car.originalPrice, car.currency)}
                                                </span>
                                            )}
                                            <span className={cn(
                                                "text-4xl md:text-5xl font-bold tracking-tight order-2 whitespace-nowrap",
                                                car.isOffer ? "text-amber-500" : "text-white"
                                            )}>
                                                {formatCurrency(car.price, car.currency)}
                                            </span>
                                        </div>
                                    </div>
                                    <ShareButton
                                        title={`${car.brand} ${car.model}`}
                                        text={shareText}
                                        url={shareUrl}
                                    />
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
                                        <p className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1">Categoría</p>
                                        <p className="text-lg font-bold text-white flex items-center gap-2">
                                            <Activity size={14} /> {car.category}
                                        </p>
                                    </div>
                                </div>

                                {/* Actions */}
                                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="block w-full">
                                    <PremiumButton variant="primary" className="w-full h-14 text-base">
                                        {car.isOffer ? "SOLICITAR OFERTA" : "CONSULTAR COMPRA"}
                                    </PremiumButton>
                                </a>

                                <a href={testDriveUrl} target="_blank" rel="noopener noreferrer" className="block w-full">
                                    <button className="w-full py-4 rounded-full border text-white font-bold uppercase tracking-wider text-xs transition-all border-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.2)] lg:border-white/10 lg:shadow-none lg:hover:bg-white lg:hover:text-black">
                                        Agendar Test Drive
                                    </button>
                                </a>
                            </div>

                            {/* Consultant Card replaced by Team Selector */}
                            <TeamSelector carName={`${car.brand} ${car.model}`} />

                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

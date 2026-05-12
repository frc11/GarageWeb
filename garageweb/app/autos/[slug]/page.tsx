import { notFound } from "next/navigation";
import { Calendar, Gauge, Zap, Activity } from "lucide-react";
import { getCarBySlug } from "@/sanity/lib/fetch";
import { formatCurrency, cn } from "@/lib/utils";
import { PremiumButton } from "@/components/ui/PremiumButton";
import { ShareButton } from "@/components/ui/ShareButton";
import { BackButton } from "@/components/ui/BackButton";
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
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://elgarage.com";

    if (!car) {
        return {
            title: "Vehículo no encontrado",
            description: "El vehículo que buscas no está disponible.",
            robots: {
                index: false,
                follow: false,
            },
        };
    }

    const yearLabel = car.year ? `${car.year}` : "año a consultar";
    const mileageLabel =
        car.mileage !== undefined && car.mileage !== null
            ? `${car.mileage.toLocaleString("es-AR")} km`
            : "kilometraje a consultar";
    const vehicleUrl = `${baseUrl}/autos/${car.slug}`;
    const ogImage = (car.coverImage && !car.coverImage.match(/\.(mp4|webm|mov|m4v)(\?.*)?$/i)
        ? car.coverImage
        : car.thumbnailImage) || undefined;
    const description = `${car.brand} ${car.model} ${yearLabel} en El Garage. ${mileageLabel}, transmisión ${car.transmission}${car.category ? ` y categoría ${car.category}` : ""}. ${car.description ? car.description.slice(0, 120) : "Vehículo premium seleccionado con atención personalizada."}`.trim();
    const title = `${car.brand} ${car.model}${car.year ? ` ${car.year}` : ""} | El Garage`;

    return {
        title,
        description,
        alternates: {
            canonical: vehicleUrl,
        },
        openGraph: {
            title,
            description,
            url: vehicleUrl,
            siteName: "El Garage",
            type: "website",
            locale: "es_AR",
            images: ogImage ? [{ url: ogImage, alt: `${car.brand} ${car.model}` }] : undefined,
        },
        twitter: {
            card: ogImage ? "summary_large_image" : "summary",
            title,
            description,
            images: ogImage ? [ogImage] : undefined,
        },
    };
}

export const revalidate = 60;

export default async function CarPage(props: CarPageProps) {
    const params = await props.params;
    const car = await getCarBySlug(params.slug);

    if (!car) {
        notFound();
    }

    const whatsappMessage = `Hola, me interesa el ${car.brand} ${car.model} que vi en la web.`;
    const whatsappUrl = `https://wa.me/5493814663032?text=${encodeURIComponent(whatsappMessage)}`;

    const shareUrl = `${process.env.NEXT_PUBLIC_APP_URL || "https://elgarage.com"}/autos/${car.slug}`;
    const shareText = `¡Mira este auto que vi en la página de El Garage!`;

    return (
        <main className="bg-zinc-950 min-h-screen pt-24.5">
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
                            alt={`${car.brand} ${car.model} portada principal`}
                            fill
                            className="object-cover"
                            priority
                            sizes="100vw"
                        />
                    )
                ) : (
                    <div className="absolute inset-0 bg-neutral-900 flex items-center justify-center">
                        <span className="text-zinc-600 uppercase tracking-widest font-bold">Sin Portada</span>
                    </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                <div className="absolute inset-0 bg-black/20" />

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
                    <div className="lg:col-span-7 space-y-24">
                        <div className="space-y-4">
                            <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-8">Galería Visual</h2>
                            <div className="grid grid-cols-1 gap-4">
                                {car.gallery && car.gallery.length > 0 ? (
                                    car.gallery.map((media, idx) => {
                                        const isVideo = media.match(/\.(mp4|webm|mov|m4v)(\?.*)?$/i);
                                        return (
                                            <div
                                                key={idx}
                                                className={cn(
                                                    "relative rounded-3xl overflow-hidden border border-white/5 mx-auto",
                                                    isVideo ? "w-fit bg-black flex justify-center items-center" : "aspect-video w-full"
                                                )}
                                            >
                                                {isVideo ? (
                                                    <video
                                                        src={media}
                                                        controls
                                                        playsInline
                                                        className="w-auto max-w-full h-auto max-h-[80vh] md:max-h-[85vh] object-contain"
                                                        preload="metadata"
                                                    />
                                                ) : (
                                                    <Image
                                                        src={media}
                                                        alt={`${car.brand} ${car.model} imagen de galeria ${idx + 1}`}
                                                        fill
                                                        className="object-cover"
                                                        sizes="(max-width: 1024px) 100vw, 58vw"
                                                    />
                                                )}
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className="flex items-center justify-center aspect-video rounded-3xl bg-zinc-900/30 border border-white/5 p-12">
                                        <p className="text-xl md:text-2xl font-bold uppercase tracking-widest text-zinc-600 text-center">
                                            No hay fotos del vehículo por el momento
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {car.description && (
                            <div className="space-y-8">
                                <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-500">Descripción</h2>
                                <div className="prose prose-invert prose-lg text-gray-400 font-light leading-relaxed">
                                    <p>{car.description}</p>
                                </div>
                            </div>
                        )}

                        {car.features && car.features.length > 0 && (
                            <div className="space-y-8">
                                <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-500">Equipamiento</h2>
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

                    <div className="lg:col-span-5 relative">
                        <div className="sticky top-32 space-y-12">
                            <div className="p-8 rounded-3xl bg-zinc-900/80 backdrop-blur-xl border border-white/10 space-y-8">
                                <div className="flex justify-between items-start">
                                    {car.price ? (
                                        <div>
                                            <p className="text-xs uppercase tracking-widest text-zinc-500 mb-2">Precio de Lista</p>
                                            <div className="flex flex-col items-start gap-1">
                                                {car.isOffer && car.originalPrice && (
                                                    <span className="text-xl line-through text-zinc-600 font-medium order-1">
                                                        {formatCurrency(car.originalPrice, car.currency)}
                                                    </span>
                                                )}
                                                <span
                                                    className={cn(
                                                        "text-4xl md:text-5xl font-bold tracking-tight order-2 whitespace-nowrap",
                                                        car.isOffer ? "text-amber-500" : "text-white"
                                                    )}
                                                >
                                                    {formatCurrency(car.price, car.currency)}
                                                </span>
                                            </div>
                                        </div>
                                    ) : (
                                        <div>
                                            <p className="text-xs uppercase tracking-widest text-zinc-500 mb-2">Valor</p>
                                            <span className="text-2xl md:text-3xl font-bold text-white tracking-tight">Consultar</span>
                                        </div>
                                    )}
                                    <ShareButton
                                        title={`${car.brand} ${car.model}`}
                                        text={shareText}
                                        url={shareUrl}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    {car.year && (
                                        <div className="bg-black/40 p-4 rounded-xl border border-white/5">
                                            <p className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1">Año</p>
                                            <p className="text-lg font-bold text-white flex items-center gap-2">
                                                <Calendar size={14} /> {car.year}
                                            </p>
                                        </div>
                                    )}
                                    {car.mileage !== undefined && car.mileage !== null && (
                                        <div className="bg-black/40 p-4 rounded-xl border border-white/5">
                                            <p className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1">Kilometraje</p>
                                            <p className="text-lg font-bold text-white flex items-center gap-2">
                                                <Gauge size={14} /> {car.mileage.toLocaleString()}
                                            </p>
                                        </div>
                                    )}
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

                                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="block w-full">
                                    <PremiumButton variant="primary" className="w-full h-14 text-base">
                                        {car.isOffer ? "SOLICITAR OFERTA" : "CONSULTAR COMPRA"}
                                    </PremiumButton>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

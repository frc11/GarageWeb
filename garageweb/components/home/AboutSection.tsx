import Image from "next/image";
import { Counter } from "@/components/ui/Counter";

export function AboutSection() {
    return (
        <section className="py-32 bg-black overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                    {/* Text Column */}
                    <div className="space-y-8 order-2 lg:order-1">
                        <h2 className="text-5xl md:text-7xl font-serif font-bold text-white leading-none">
                            Tradición &<br />
                            <span className="text-neutral-500 italic">Excelencia</span>
                        </h2>

                        <div className="space-y-6 text-lg text-neutral-400 font-light leading-relaxed">
                            <p>
                                Desde hace más de dos décadas, GarageWeb se ha establecido como el referente indiscutible
                                en la comercialización de vehículos de alta gama. Nuestra pasión no es solo vender autos,
                                sino curar una colección de obras de arte mecánicas.
                            </p>
                            <p>
                                Cada vehículo que ingresa a nuestro showroom ha sido seleccionado meticulosamente,
                                verificando su procedencia, historial y estado mecánico para garantizar que cumpla
                                con los estándares más exigentes de la industria global.
                            </p>
                        </div>

                        <div className="pt-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-white/10 pt-8">
                                <Counter value={200} suffix="+" label="Autos Vendidos" />
                                <Counter value={20} suffix="+" label="Años de Trayectoria" />
                                <Counter value={15} suffix="+" label="Marcas Premium" />
                            </div>
                        </div>
                    </div>

                    {/* Image Column */}
                    <div className="relative order-1 lg:order-2">
                        <div className="aspect-[4/5] relative rounded-lg overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                            {/* Using a high-quality Unsplash image representing a luxury garage/workshop */}
                            <Image
                                src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1760&auto=format&fit=crop"
                                alt="Luxury Garage Workshop"
                                fill
                                className="object-cover"
                            />

                            {/* Overlay for cinematic feel */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                        </div>

                        {/* Decorative Element */}
                        <div className="absolute -bottom-12 -left-12 w-64 h-64 border border-white/5 rounded-full blur-2xl pointer-events-none" />
                    </div>

                </div>
            </div>
        </section>
    );
}

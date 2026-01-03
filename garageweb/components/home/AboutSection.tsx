import Image from "next/image";

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
                            <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-8">
                                <div>
                                    <span className="block text-4xl font-serif text-white mb-2">+200</span>
                                    <span className="text-sm text-neutral-500 uppercase tracking-widest">Vehículos Entregados</span>
                                </div>
                                <div>
                                    <span className="block text-4xl font-serif text-white mb-2">24/7</span>
                                    <span className="text-sm text-neutral-500 uppercase tracking-widest">Soporte Concierge</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Image Column */}
                    <div className="relative order-1 lg:order-2">
                        <div className="aspect-[4/5] relative rounded-lg overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                            {/* Using a high-quality Unsplash image representing a luxury garage/workshop */}
                            <Image
                                src="https://images.unsplash.com/photo-1562519819-016930d66144?q=80&w=1760&auto=format&fit=crop"
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

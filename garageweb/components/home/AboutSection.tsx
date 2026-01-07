"use client";

import Image from "next/image";
import { m } from "framer-motion";
import { PremiumButton } from "@/components/ui/PremiumButton";
import { ArrowUpRight, ShieldCheck, Award, Users } from "lucide-react";
import { cn } from "@/lib/utils";

// Stats Data
const stats = [
    { label: "Años de Trayectoria", value: "20+", icon: Award },
    { label: "Vehículos Vendidos", value: "500+", icon: ArrowUpRight },
    { label: "Clientes Satisfechos", value: "100%", icon: Users },
];

export function AboutSection() {
    return (
        <section className="relative py-24 md:py-32 bg-neutral-50 dark:bg-zinc-950 overflow-hidden">
            {/* Background Texture - Subtle Noise */}
            <div className="absolute inset-0 z-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />

            <div className="container relative z-10 mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-stretch">

                    {/* Left Column: Typographic & Editorial (5 Cols) */}
                    {/* Mantenemos justify-center para que el texto esté centrado verticalmente */}
                    <div className="lg:col-span-5 flex flex-col justify-center h-full space-y-12 pt-12">
                        <m.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6 }}
                            className="space-y-6"
                        >
                            {/* Eyebrow */}
                            <div className="flex items-center gap-3">
                                <span className="h-px w-12 bg-neutral-400" />
                                <span className="text-xs font-bold tracking-[0.2em] uppercase text-neutral-500">
                                    Nuestra Esencia
                                </span>
                                <span className="h-px w-12 bg-neutral-400" />
                            </div>

                            {/* Headline */}
                            <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif font-medium text-neutral-900 dark:text-white leading-[0.95] tracking-tight">
                                Más que <br />
                                <span className="italic text-neutral-400 dark:text-neutral-600">Mecánica.</span><br />
                                Arte Puro.
                            </h2>
                        </m.div>

                        {/* Description */}
                        <m.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="space-y-6 text-lg text-neutral-600 dark:text-neutral-400 font-light leading-relaxed max-w-md"
                        >
                            <p>
                                En <strong>El Garage</strong>, no solo comercializamos vehículos; curamos una colección.
                                Entendemos que un automóvil de lujo no es solo transporte, es una extensión de la personalidad y un legado de ingeniería.
                            </p>
                            <p>
                                Cada pieza de nuestro inventario ha superado un riguroso proceso de certificación de 120 puntos,
                                garantizando que la excelencia no sea solo una promesa, sino un estándar.
                            </p>
                        </m.div>

                        {/* CTA & Trust Badge */}
                        <m.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="flex flex-col sm:flex-row items-center gap-8 pt-4"
                        >
                            <a href="/contacto">
                                <PremiumButton variant="inverted">
                                    Conocé el Showroom
                                </PremiumButton>
                            </a>

                            <div className="flex items-center gap-3 text-sm font-medium text-neutral-500">
                                <ShieldCheck className="w-5 h-5 text-neutral-900 dark:text-white" />
                                <span>Garantía Certificada</span>
                            </div>
                        </m.div>
                    </div>

                    {/* Right Column: Visual Bento Layout (7 Cols) */}
                    {/* MODIFICADO: Agregado 'flex flex-col justify-center' para centrar el bloque entero respecto al texto */}
                    <div className="lg:col-span-7 relative pt-12 lg:pt-0 flex flex-col justify-center h-full">

                        {/* Bento Grid Layer */}
                        <div className="grid grid-cols-2 gap-4 md:gap-6">

                            {/* Main Image (Tall) - Izquierda */}
                            <m.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                // REMOVED: shadow-2xl, overflow-hidden directly on parent
                                className="relative col-span-1 row-span-2 h-full min-h-[500px]"
                            >
                                {/* Option B: Premium Glow (Behind) */}
                                <div className="absolute -inset-4 bg-gradient-to-tr from-white/20 to-neutral-600/20 blur-2xl -z-10 rounded-[2rem] opacity-70" />

                                {/* Inner Content Container with Border */}
                                <div className="relative h-full w-full rounded-[2rem] overflow-hidden border border-white/10">
                                    <Image
                                        src="https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1200&auto=format&fit=crop"
                                        alt="Porsche Detail"
                                        fill
                                        className="object-cover hover:scale-105 transition-transform duration-1000 ease-in-out"
                                        sizes="(max-width: 768px) 50vw, 33vw"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                                </div>
                            </m.div>

                            {/* Secondary Image (Wide top) - Derecha Arriba */}
                            <m.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                // REMOVED: shadow-xl, overflow-hidden directly on parent
                                className="relative col-span-1 h-full min-h-[300px]"
                            >
                                {/* Option B: Premium Glow (Behind) */}
                                <div className="absolute -inset-4 bg-gradient-to-bl from-white/20 to-neutral-600/20 blur-2xl -z-10 rounded-[2rem] opacity-70" />

                                <div className="relative h-full w-full rounded-[2rem] overflow-hidden border border-white/10">
                                    <Image
                                        src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1200&auto=format&fit=crop"
                                        alt="Showroom Interior"
                                        fill
                                        className="object-cover hover:scale-105 transition-transform duration-1000 ease-in-out"
                                        sizes="(max-width: 768px) 50vw, 33vw"
                                    />
                                </div>
                            </m.div>

                            {/* Stats Block (Bottom Right) - Derecha Abajo */}
                            <m.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                                className="relative col-span-1"
                            >
                                {/* Option B: Premium Glow (Behind) */}
                                <div className="absolute -inset-4 bg-gradient-to-tl from-white/10 to-neutral-700/10 blur-2xl -z-10 rounded-[2rem] opacity-60" />

                                <div className="relative h-full w-full rounded-[2rem] overflow-hidden border border-white/10 bg-neutral-900/40 backdrop-blur-md p-6 flex flex-col justify-between">
                                    <div className="flex justify-between items-start">
                                        <div className="p-2 bg-neutral-100/5 rounded-lg">
                                            <Award className="w-6 h-6 text-white" />
                                        </div>
                                        <span className="text-xs font-mono text-neutral-400 uppercase">Est. 2004</span>
                                    </div>

                                    <div>
                                        <div className="text-3xl font-bold font-serif text-white">
                                            +20
                                        </div>
                                        <div className="text-sm text-neutral-400">
                                            Años de excelencia automotriz.
                                        </div>
                                    </div>
                                </div>
                            </m.div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
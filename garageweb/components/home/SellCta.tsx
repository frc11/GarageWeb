"use client";

import Link from "next/link";
import { m } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";

export function SellCta() {
    return (
        <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-black">
            {/* Background Image with Parallax Feel (Static for now, but ready for parallax) */}
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center bg-no-repeat opacity-40 grayscale"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

                {/* Grain Effect */}
                <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto text-center">

                    {/* Badge */}
                    <m.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8"
                    >
                        <ShieldCheck className="w-4 h-4 text-amber-500" />
                        <span className="text-xs font-medium tracking-widest text-amber-500 uppercase">
                            Private Consignment
                        </span>
                    </m.div>

                    {/* Main Title */}
                    <m.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-4xl md:text-7xl font-serif text-white tracking-tight mb-8"
                    >
                        MAXIMIZA EL VALOR <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-200 to-neutral-500 font-sans font-light">
                            DE TU COLECCIÓN
                        </span>
                    </m.h2>

                    {/* Description */}
                    <m.p
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-lg md:text-xl text-neutral-400 font-light leading-relaxed max-w-2xl mx-auto mb-12"
                    >
                        Accede a nuestra red global de compradores calificados.
                        Gestión de activos premium sin fricción y sin exposición innecesaria.
                    </m.p>

                    {/* CTA Button */}
                    <m.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                    >
                        <Link
                            href="/vender"
                            className="group relative inline-flex items-center gap-4 px-10 py-5 bg-white text-black overflow-hidden"
                        >
                            <span className="relative z-10 font-bold tracking-wide uppercase text-sm">
                                Iniciar Valuación Privada
                            </span>
                            <ArrowRight className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />

                            {/* Hover Fill Effect */}
                            <div className="absolute inset-0 bg-amber-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out" />
                        </Link>
                    </m.div>

                </div>
            </div>

            {/* Decorative Borders */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </section>
    );
}

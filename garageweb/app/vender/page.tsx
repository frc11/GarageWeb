"use client";

import { SellForm } from "@/components/vender/SellForm";
import { Camera, FileCheck, DollarSign, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { m } from "framer-motion";

export default function SellPage() {
    return (
        <main className="min-h-screen pt-22 bg-black text-white selection:bg-amber-500/30">
            <div className="flex flex-col lg:flex-row min-h-screen">

                {/* Left Column: Immersive Visual (Sticky) */}
                <div className="lg:w-1/2 relative min-h-[50vh] lg:h-screen lg:sticky lg:top-0 overflow-hidden bg-neutral-900 border-r border-white/10">

                    {/* Dynamic Background Image */}
                    <div className="absolute inset-0">
                        <Image
                            src="https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=2669&auto=format&fit=crop"
                            alt="Luxury Car Detail"
                            fill
                            className="object-cover opacity-60 mix-blend-overlay grayscale"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
                    </div>

                    <div className="absolute inset-0 p-8 lg:p-16 flex flex-col justify-between z-10">
                        <div className="space-y-6 mt-20 lg:mt-0">
                            <m.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                                className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-black/40 backdrop-blur-md w-fit"
                            >
                                <ShieldCheck className="w-4 h-4 text-amber-500" />
                                <span className="text-[10px] font-bold tracking-widest uppercase text-white/80">
                                    The Vault • Consignment
                                </span>
                            </m.div>

                            <m.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="text-5xl lg:text-7xl font-serif text-white tracking-tight"
                            >
                                VENDEMOS <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">
                                    TU LEGADO
                                </span>
                            </m.h1>

                            <m.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className="text-lg text-neutral-400 max-w-md font-light leading-relaxed border-l-2 border-amber-500/50 pl-6"
                            >
                                Accede a una red global de coleccionistas. Gestión integral,
                                privacidad absoluta y la máxima valuación del mercado.
                            </m.p>
                        </div>

                        {/* Stats / Trust Markers hidden on mobile to save space, visible on large screens */}
                        <m.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="hidden lg:grid grid-cols-2 gap-8"
                        >
                            <div>
                                <p className="text-4xl font-display font-bold text-white mb-1">+500</p>
                                <p className="text-xs uppercase tracking-widest text-neutral-500">Vehículos Gestionados</p>
                            </div>
                            <div>
                                <p className="text-4xl font-display font-bold text-white mb-1">$45M+</p>
                                <p className="text-xs uppercase tracking-widest text-neutral-500">Volumen de Ventas</p>
                            </div>
                        </m.div>
                    </div>
                </div>

                {/* Right Column: Interaction (Scrollable) */}
                <div className="lg:w-1/2 relative bg-black">
                    <div className="px-6 py-12 lg:px-24 lg:py-24 max-w-2xl mx-auto">

                        <m.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="space-y-12"
                        >
                            <div className="space-y-2">
                                <h2 className="text-2xl font-light text-white tracking-wide uppercase font-display border-b border-white/10 pb-4">
                                    Iniciar Proceso de Admisión
                                </h2>
                                <p className="text-sm text-neutral-500 pt-2">
                                    Complete el formulario a continuación. Nuestro equipo de especialistas evaluará su unidad y diseñará una estrategia de venta a medida.
                                </p>
                            </div>

                            <SellForm />

                            {/* Process Steps Small */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 border-t border-white/5">
                                <div className="space-y-2">
                                    <FileCheck className="w-5 h-5 text-neutral-400" />
                                    <h4 className="text-xs font-bold uppercase text-white">1. Tasación</h4>
                                    <p className="text-[10px] text-neutral-500 leading-relaxed">
                                        Análisis de mercado y estado de la unidad.
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <Camera className="w-5 h-5 text-neutral-400" />
                                    <h4 className="text-xs font-bold uppercase text-white">2. Media Kit</h4>
                                    <p className="text-[10px] text-neutral-500 leading-relaxed">
                                        Fotografía y video cinematográfico profesional.
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <DollarSign className="w-5 h-5 text-neutral-400" />
                                    <h4 className="text-xs font-bold uppercase text-white">3. Cierre</h4>
                                    <p className="text-[10px] text-neutral-500 leading-relaxed">
                                        Negociación y transferencia segura de fondos.
                                    </p>
                                </div>
                            </div>
                        </m.div>
                    </div>
                </div>

            </div>
        </main>
    );
}

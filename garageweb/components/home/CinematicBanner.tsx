"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const IN_VIEW_VIEWPORT = { once: true, margin: "0px 0px -10% 0px" } as const;

export function CinematicBanner() {
    return (
        // CAMBIO 1: Agregamos '-mt-2' para subir la sección y tapar la micro-línea divisora.
        // Mantenemos z-20 para que el degradado funcione correctamente.
        <section className="w-full bg-black relative overflow-hidden -mt-2 z-20">

            {/* === PUENTE DE INTEGRACIÓN VISUAL === */}
            <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-neutral-950 via-neutral-950/60 to-transparent z-20 pointer-events-none" />

            {/* === MOBILE VIEW (Visible < 1024px) === */}
            <div className="flex lg:hidden flex-col items-center justify-center text-center px-6 py-24 min-h-[70vh] w-full relative z-10 gap-8">
                {/* ... (El código móvil se mantiene igual que antes) ... */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={IN_VIEW_VIEWPORT}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-5xl font-black text-white tracking-tighter leading-[0.9] uppercase italic">
                        ¿Listo para
                        <br />
                        conducir?
                    </h2>
                    <p className="text-zinc-400 mt-4 text-lg font-light opacity-80 mb-[50]">
                        Encontrá tu próximo vehículo hoy.
                    </p>
                </motion.div>

                <div className="relative w-full py-6">
                    <div className="absolute left-1/2 -translate-x-1/2 w-[120vw] flex flex-col gap-8 top-0">
                        <motion.div
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={IN_VIEW_VIEWPORT}
                            transition={{ duration: 0.8, delay: 0.5, ease: "circOut" }}
                            className="w-full h-12 bg-white shadow-[0_0_25px_rgba(255,255,255,0.8)] origin-center"
                        />
                        <motion.div
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={IN_VIEW_VIEWPORT}
                            transition={{ duration: 0.8, delay: 0.6, ease: "circOut" }}
                            className="w-full h-12 bg-white shadow-[0_0_25px_rgba(255,255,255,0.8)] origin-center"
                        />
                    </div>
                    <div className="h-24 w-full opacity-0" />
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={IN_VIEW_VIEWPORT}
                    transition={{ duration: 0.5, delay: 0.6 }}
                >
                    <Link href="/catalogo" className="group flex flex-col items-center gap-4 mt-[50]">
                        <span className="text-xl font-bold text-white tracking-widest border-b border-transparent group-hover:border-white transition-all pb-1">
                            VER CATÁLOGO
                        </span>
                        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm group-hover:bg-white group-hover:text-black transition-all duration-300">
                            <ArrowUpRight className="w-6 h-6" />
                        </div>
                    </Link>
                </motion.div>
            </div>


            {/* === DESKTOP VIEW (Visible >= 1024px) - CORREGIDO === */}
            <div className="hidden lg:flex w-full min-h-screen relative items-center justify-center overflow-hidden">

                {/* 1. LAS LÍNEAS (FONDO ABSOLUTO) */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-8 z-0 pointer-events-none">
                    <motion.div
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={IN_VIEW_VIEWPORT}
                        transition={{ duration: 1.5, delay: 0.2, ease: "circOut" }}
                        className="w-16 h-[150vh] bg-white -skew-x-12 shadow-[0_0_50px_rgba(255,255,255,0.4)] origin-center"
                    />
                    <motion.div
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={IN_VIEW_VIEWPORT}
                        transition={{ duration: 1.5, delay: 0.4, ease: "circOut" }}
                        className="w-16 h-[150vh] bg-white -skew-x-12 shadow-[0_0_50px_rgba(255,255,255,0.4)] origin-center"
                    />
                </div>

                {/* 2. EL CONTENIDO (CAPA SUPERIOR) */}
                {/* CAMBIO: width full y padding horizontal para asegurar márgenes seguros */}
                <div className="relative z-10 w-full px-12 flex items-center justify-center">

                    {/* LADO IZQUIERDO */}
                    <div className="flex-1 flex flex-col items-end text-right">
                        <motion.div
                            initial={{ x: -50, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={IN_VIEW_VIEWPORT}
                            transition={{ duration: 1 }}
                        >
                            {/* CAMBIO: Reduje text-6xl a text-5xl en 'lg' y sube a 8xl en 'xl' */}
                            <h2 className="text-5xl xl:text-8xl font-black text-white tracking-tighter leading-[0.9]">
                                ¿LISTO PARA
                                <br />
                                MANEJAR?
                            </h2>
                            <p className="text-zinc-400 mt-6 text-lg xl:text-2xl font-light">
                                Encontrá tu próximo auto hoy.
                            </p>
                        </motion.div>
                    </div>

                    {/* ESPACIADOR CENTRAL INTELIGENTE */}
                    {/* CAMBIO: Se reduce a 200px en laptops y crece a 400px en monitores grandes */}
                    <div className="w-[200px] xl:w-[400px] shrink-0" />

                    {/* LADO DERECHO */}
                    <div className="flex-1 flex flex-col items-start text-left">
                        <motion.div
                            initial={{ x: 50, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={IN_VIEW_VIEWPORT}
                            transition={{ duration: 1, delay: 0.2 }}
                        >
                            <Link href="/catalogo" className="group flex flex-col items-start gap-4">
                                {/* CAMBIO: Reduje text-6xl a text-5xl en 'lg' y sube a 7xl en 'xl' */}
                                <span className="text-5xl xl:text-7xl font-black text-white tracking-tighter uppercase italic leading-none group-hover:text-zinc-300 transition-colors">
                                    VER
                                    <br />
                                    CATÁLOGO
                                </span>
                                <div>
                                    {/* CAMBIO: Icono más pequeño en laptop */}
                                    <ArrowUpRight className="text-white w-12 h-12 xl:w-20 xl:h-20 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-300" />
                                </div>
                            </Link>
                        </motion.div>
                    </div>

                </div>
            </div>

        </section>
    );
}

"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export function CinematicBanner() {
    return (
        <section className="flex w-full h-100 items-center justify-center overflow-hidden bg-black relative">

            {/* 1. LADO IZQUIERDO: Empuja el contenido hacia la DERECHA (items-end) */}
            <div className="flex-2 flex flex-col items-end text-right pr-6 md:pr-12 lg:pr-16 z-10">
                <motion.div
                    initial={{ x: 50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                >
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tighter leading-[0.9]">
                        ¿Listo para conducir?
                    </h1>
                    <p className="text-zinc-400 mt-4 text-lg md:text-xl font-light text-left">
                        Encontrá tu próximo vehículo hoy.
                    </p>
                </motion.div>
            </div>

            {/* 2. CENTRO: MURO (Twin Pillars) */}
            {/* 'shrink-0' vital para rigidez. 'select-none' para evitar selección. */}
            <div className="shrink-0 left-[7%] flex gap-4 mx-4 md:mx-8 relative select-none">
                <motion.div
                    initial={{ height: 0 }}
                    whileInView={{ height: "150vh" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 1, ease: "circOut" }}
                    className="w-3 md:w-15 bg-white -skew-x-12 shadow-[0_0_40px_rgba(255,255,255,0.5)] origin-top"
                />
                <motion.div
                    initial={{ height: 0 }}
                    whileInView={{ height: "150vh" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 1.1, ease: "circOut" }}
                    className="w-3 md:w-15 bg-white -skew-x-12 shadow-[0_0_40px_rgba(255,255,255,0.5)] origin-top"
                />
            </div>

            {/* 3. LADO DERECHO: Empuja el contenido hacia la IZQUIERDA (items-start) */}
            <div className="flex-1 flex flex-col items-start text-left pl-6 md:pl-12 lg:pl-16 z-10">
                <motion.div
                    initial={{ x: 50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 2 }}
                >
                    <Link href="/catalogo" className="group flex flex-col items-start gap-2">
                        <span className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter uppercase italic leading-none group-hover:text-zinc-300 transition-colors">
                            VER
                            <br />
                            CATÁLOGO
                        </span>

                        <div className="mt-4">
                            <ArrowUpRight className="text-white w-12 h-12 md:w-16 md:h-16 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-300" />
                        </div>
                    </Link>
                </motion.div>
            </div>

        </section>
    );
}
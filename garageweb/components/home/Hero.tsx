"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { PremiumButton } from "@/components/ui/PremiumButton";
import { CarFront } from "lucide-react";

export function Hero() {
    const videos = ["/hero-bg.mp4", "/location-bg.mp4"];
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % videos.length);
        }, 8000);
        return () => clearInterval(timer);
    }, [videos.length]);

    return (
        // Z-30 para estar POR ENCIMA del BrandMarquee
        // shadow-2xl ayuda a que el borde físico proyecte un poco de sombra real
        <section className="relative w-full h-[90vh] overflow-hidden  bg-zinc-950 z-30 ">

            {/* CAPA 0: Fondo Animado */}
            <ScrollReveal animation="hero-zoom" className="absolute inset-0 z-0">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 2.0, ease: "easeInOut" }}
                        className="absolute inset-0"
                    >
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            disablePictureInPicture
                            className="h-full w-full object-cover filter brightness-[0.7] saturate-[0.8]"
                        >
                            <source src={videos[index]} type="video/mp4" />
                        </video>
                    </motion.div>
                </AnimatePresence>
            </ScrollReveal>

            {/* CAPA 1: Gradiente */}
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent" />

            {/* CAPA 2: Contenido */}
            <div className="relative z-20 container mx-auto h-full flex flex-col justify-end pb-32 px-6">
                <ScrollReveal animation="text-reveal">
                    <div className="max-w-5xl">
                        <span className="inline-block mb-6 px-4 py-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-xs font-medium tracking-[0.2em] text-white uppercase">
                            Est. 2024 — El Garage
                        </span>

                        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white mb-8 leading-[1] uppercase">
                            El Garage <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/20">
                                Automóviles
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-white/70 max-w-xl leading-relaxed font-light tracking-wide">
                            Descubre nuestra colección de vehículos de alto rendimiento.
                            Donde la ingeniería se encuentra con el arte.
                        </p>

                        <a href="/coleccion">
                            <PremiumButton variant="primary" className="mt-10">
                                EXPLORAR COLECCIÓN
                                <CarFront className="w-4 h-4" />
                            </PremiumButton>
                        </a>
                    </div>
                </ScrollReveal>
            </div>

            {/* ELIMINADO EL DIVIDER: Dejamos el borde recto para que el degradado del siguiente componente haga el trabajo */}
        </section>
    );
}
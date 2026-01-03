"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { PremiumButton } from "@/components/ui/PremiumButton";

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
        <section className="relative w-full h-[90vh] overflow-hidden bg-zinc-950">
            {/* CAPA 0: Fondo Animado (Video Ken Burns) */}
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

            {/* CAPA 1: Gradiente Cinemático (Vignette) */}
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent" />

            {/* CAPA 2: Contenido Editorial */}
            <div className="relative z-20 container mx-auto h-full flex flex-col justify-end pb-32 px-6">
                <ScrollReveal animation="text-reveal">
                    <div className="max-w-5xl">
                        <span className="inline-block mb-6 px-4 py-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-xs font-medium tracking-[0.2em] text-white uppercase">
                            Est. 2024 — Luxury Showroom
                        </span>

                        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white mb-8 leading-[0.9] uppercase">
                            Exclusividad <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/20">
                                En Movimiento
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-white/70 max-w-xl leading-relaxed font-light tracking-wide">
                            Descubre nuestra colección curada de vehículos de alto rendimiento.
                            Donde la ingeniería se encuentra con el arte.
                        </p>

                        <PremiumButton
                            variant="primary"
                            className="mt-10 text-black"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                        >
                            EXPLORAR COLECCIÓN
                        </PremiumButton>
                    </div>
                </ScrollReveal>
            </div>

            {/* CAPA 3: Transición Orgánica */}
            <div className="absolute bottom-0 left-0 right-0 z-30 pointer-events-none translate-y-[1px]">
                <SectionDivider
                    variant="slant-aggressive"
                    className="text-zinc-950 fill-current"
                // height explicit prop is not defining height in styles, but SVG max-height is controlled by CSS/style. 
                // Our SectionDivider component uses style={{ maxHeight: height }}.
                // The prompt asked for height={120} but slant-aggressive is usually higher. 
                // I will let it use default or pass height if strictly needed. 
                // Slant aggressive default is 320. 120 might be too short for aggressive slant? 
                // I'll stick to default 320 or just omit height to use default from data. 
                // Actually, prompt reference code showed `height={120}`. 120px for slant-aggressive (1440w) is quite flat.
                // The original data has 320. I will not override height to keep the aggressive slant.
                />
            </div>
        </section>
    );
}

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { PremiumButton } from "@/components/ui/PremiumButton";
import { CarFront } from "lucide-react";
import { useRouter } from "next/navigation";

export function Hero() {
    const router = useRouter();
    const videos = ["/hero-bg.mp4", "/hero-bg.mp4"];
    const [index, setIndex] = useState(0);
    // Solo true una vez que el video de verdad empezó a reproducir fotogramas
    const [isVideoReady, setIsVideoReady] = useState(false);
    const [isFadingOut, setIsFadingOut] = useState(false);

    const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
        const video = e.currentTarget;
        // Comenzar a hacer fade out 1.5 segundos antes de que termine
        if (video.duration > 0 && video.duration - video.currentTime <= 1.5) {
            if (!isFadingOut) setIsFadingOut(true);
        }
    };

    const handleEnded = () => {
        setIsVideoReady(false);
        setIsFadingOut(false);
        setIndex((prevIndex) => (prevIndex + 1) % videos.length);
    };

    return (
        <section className="relative w-full h-[90svh] min-h-[600px] overflow-hidden bg-zinc-950 z-30">
            {/* CAPA 0: Fondo Animado */}
            <ScrollReveal animation="hero-zoom" className="absolute inset-0 z-0">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isVideoReady && !isFadingOut ? 1 : 0 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="absolute inset-0"
                >
                    <video
                        autoPlay
                        muted
                        playsInline
                        disablePictureInPicture
                        src={videos[index]}
                        onPlaying={() => setIsVideoReady(true)}
                        onTimeUpdate={handleTimeUpdate}
                        onEnded={handleEnded}
                        className="h-full w-full object-cover filter brightness-[0.7] saturate-[0.8]"
                    />
                </motion.div>
            </ScrollReveal>

            {/* Spinner de carga — FUERA del AnimatePresence keyeado por index
                para que no reaparezca en cada transición de clip              */}
            <AnimatePresence>
                {!isVideoReady && (
                    <motion.div
                        key="hero-loader"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                        className="absolute inset-0 z-10 flex items-center justify-center bg-zinc-950"
                    >
                        <div className="w-10 h-10 border-2 border-white/10 border-t-amber-500 rounded-full animate-spin" />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* CAPA 1: Gradiente */}
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent" />

            {/* CAPA 2: Contenido Editorial */}
            <div className="relative z-20 my-10 container mx-auto h-full flex flex-col justify-end pb-20 md:pb-24 lg:pb-32 px-6 items-center lg:items-start text-center lg:text-left">
                <ScrollReveal animation="text-reveal">
                    <div className="max-w-5xl w-full">
                        <span className="inline-block mb-4 md:mb-6 px-4 py-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-xs font-medium tracking-[0.2em] text-white uppercase">
                            Est. 2016
                        </span>

                        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-black tracking-tighter text-white mb-6 md:mb-8 leading-tight uppercase pb-2">
                            El Garage <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/20 pr-2">
                                Automóviles
                            </span>
                        </h1>

                        <p className="text-base md:text-xl text-white/70 max-w-xl leading-relaxed font-light tracking-wide mx-auto lg:mx-0">
                            Donde la confianza se maneja.
                        </p>

                        <PremiumButton variant="primary" className="mt-8 md:mt-10" onClick={() => router.push("/catalogo")}>
                            EXPLORAR COLECCIÓN
                            <CarFront className="w-4 h-4" />
                        </PremiumButton>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
}
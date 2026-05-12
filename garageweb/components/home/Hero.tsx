"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { PremiumButton } from "@/components/ui/PremiumButton";
import { CarFront } from "lucide-react";
import { useRouter } from "next/navigation";

const IN_VIEW_VIEWPORT = { once: true, margin: "0px 0px -10% 0px" } as const;

export function Hero() {
    const router = useRouter();
    const videos = ["/hero-bg.mp4", "/hero-bg.mp4"];
    const [index, setIndex] = useState(0);
    // Only true once the video is actually playing (not just first frame decoded)
    const [isVideoReady, setIsVideoReady] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % videos.length);
        }, 8000);
        return () => clearInterval(timer);
    }, [videos.length]);

    return (
        <section className="relative w-full h-[90vh] min-h-[600px] overflow-hidden bg-zinc-950 z-30">
            {/* CAPA 0: Fondo Animado */}
            <ScrollReveal animation="hero-zoom" className="absolute inset-0 z-0">
                {/* This poster is eagerly fetched on desktop so the hero never waits on the first video frame for LCP. */}
                <Image
                    src="/hero-poster.svg"
                    alt=""
                    fill
                    priority
                    aria-hidden="true"
                    sizes="100vw"
                    className="object-cover filter brightness-[0.7] saturate-[0.8]"
                />
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
                            preload="metadata"
                            poster="/hero-poster.svg"
                            disablePictureInPicture
                            // onPlaying fires when frames are actually rendering — avoids the
                            // static first-frame flash that onCanPlay causes on slow connections
                            onPlaying={() => setIsVideoReady(true)}
                            className="h-full w-full object-cover filter brightness-[0.7] saturate-[0.8]"
                        >
                            <source src={videos[index]} type="video/mp4" />
                        </video>
                    </motion.div>
                </AnimatePresence>
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
                <ScrollReveal animation="text-reveal" viewport={IN_VIEW_VIEWPORT}>
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

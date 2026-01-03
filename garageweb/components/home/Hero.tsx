"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export function Hero() {
    const videos = ["/hero-bg.mp4", "/location-bg.mp4"];
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % videos.length);
        }, 8000);
        return () => clearInterval(timer);
    }, [videos.length]);
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
                delayChildren: 0.5,
            },
        },
    };

    const childVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 1.2,
                ease: [0.22, 1, 0.36, 1] as const,
            },
        },
    };

    return (
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
            {/* Video Background Slider */}
            <div className="absolute inset-0 z-0">
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
                            className="h-full w-full object-cover filter brightness-75"
                        >
                            <source src={videos[index]} type="video/mp4" />
                        </video>

                        {/* Overlay for readability */}
                        <div className="absolute inset-0 bg-black/60" />
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Optional: Noise Texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-10" />

            {/* Content */}
            <div className="relative z-20 container mx-auto px-6 text-center">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col items-center gap-8"
                >
                    <motion.div variants={childVariants}>
                        <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-bold text-white tracking-tighter leading-[0.9] text-balance">
                            EXCLUSIVIDAD
                            <br />
                            <span className="text-gray-400 italic font-light tracking-normal">En Movimiento</span>
                        </h1>
                    </motion.div>

                    <motion.div variants={childVariants}>
                        <div className="h-px w-32 bg-gradient-to-r from-transparent via-white/50 to-transparent my-4" />
                    </motion.div>

                    <motion.p variants={childVariants} className="text-lg md:text-xl text-neutral-400 max-w-xl font-light tracking-wide leading-relaxed">
                        Una colección curada para quienes entienden que el viaje importa más que el destino.
                    </motion.p>

                    <motion.div variants={childVariants}>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="mt-8 px-8 py-4 border border-white/20 rounded-full text-white font-medium hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-sm"
                        >
                            EXPLORAR COLECCIÓN
                        </motion.button>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}

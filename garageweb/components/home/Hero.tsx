"use client";

import { motion } from "framer-motion";

export function Hero() {
    return (
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-900 via-black to-black opacity-80" />

            {/* Optional: Noise Texture if desired for even more texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

            {/* Content */}
            <div className="relative z-10 container mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} // Custom easing for "luxury" feel
                    className="flex flex-col items-center gap-8"
                >
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-bold text-white tracking-tighter leading-[0.9] text-balance">
                        EXCLUSIVIDAD
                        <br />
                        <span className="text-gray-400 italic font-light tracking-normal">En Movimiento</span>
                    </h1>

                    <div className="h-px w-32 bg-gradient-to-r from-transparent via-white/50 to-transparent my-4" />

                    <p className="text-lg md:text-xl text-neutral-400 max-w-xl font-light tracking-wide leading-relaxed">
                        Una colección curada para quienes entienden que el viaje importa más que el destino.
                    </p>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-8 px-8 py-4 border border-white/20 rounded-full text-white font-medium hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-sm"
                    >
                        EXPLORAR COLECCIÓN
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
}

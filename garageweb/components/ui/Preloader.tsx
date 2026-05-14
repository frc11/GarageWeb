"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export const Preloader = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate loading time or wait for resources
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2500); // 2.5 seconds for a premium feel

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    data-lenis-pause="true"
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            filter: "blur(0px)"
                        }}
                        transition={{
                            duration: 1.2,
                            ease: [0.22, 1, 0.36, 1]
                        }}
                        className="relative w-64 h-64 md:w-80 md:h-80"
                    >
                        {/* Glow effect behind the logo */}
                        <div className="absolute inset-0 bg-white/5 blur-3xl rounded-full scale-150 opacity-20 animate-pulse" />

                        <Image
                            src="/ElGarageLogo-Modificado.png"
                            alt="El Garage Logo"
                            fill
                            className="object-contain brightness-0 invert"
                            priority
                            sizes="(max-width: 768px) 256px, 320px"
                        />
                    </motion.div>

                    {/* Optional: Loading Progress Bar or Text */}
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "200px" }}
                        transition={{ duration: 2.3, ease: "easeInOut" }}
                        className="absolute bottom-20 h-[1px] bg-white/20 overflow-hidden"
                    >
                        <div className="h-full w-full bg-white/50" />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

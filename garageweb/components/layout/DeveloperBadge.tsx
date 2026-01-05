"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export function DeveloperBadge() {
    return (
        <Link
            href="https://develop-webdesign.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center"
        >
            <motion.div
                className="relative flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full overflow-hidden transition-colors duration-500 group-hover:border-white/20 group-hover:bg-white/10 backdrop-blur-sm"
                initial={false}
                whileHover="hover"
            >
                {/* 1. THE LOGO MARK (Abstract 'D' Cube) */}
                <motion.div
                    className="relative w-5 h-5 flex items-center justify-center text-white/50 group-hover:text-cyan-400 transition-colors duration-500"
                    variants={{
                        hover: { rotate: 180, scale: 1.1 }
                    }}
                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                >
                    {/* Placeholder Tech Logo - A simple geometric shape */}
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                        <path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z" />
                    </svg>

                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 bg-cyan-500/50 blur-[10px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </motion.div>

                {/* 2. THE TEXT INTERACTION */}
                <div className="flex flex-col items-start justify-center overflow-hidden h-4">
                    <AnimatePresence mode="wait">
                        <motion.span
                            key="initial"
                            className="font-mono text-[10px] font-bold text-white/50 tracking-[0.2em] leading-none"
                            initial={{ y: 0, opacity: 0.5 }}
                            variants={{
                                hover: { y: -20, opacity: 0, position: "absolute" }
                            }}
                            transition={{ duration: 0.2 }}
                        >
                            DEVELOP
                        </motion.span>

                        <motion.span
                            key="hover"
                            className="font-mono text-[9px] font-bold text-white tracking-widest whitespace-nowrap leading-none absolute"
                            initial={{ y: 20, opacity: 0 }}
                            variants={{
                                hover: { y: 0, opacity: 1, position: "relative" }
                            }}
                            transition={{ duration: 0.2, delay: 0.05 }}
                        >
                            CODE & DESIGN
                        </motion.span>
                    </AnimatePresence>
                </div>

                {/* 3. BORDER GLOW ANIMATION */}
                <motion.div
                    className="absolute inset-0 rounded-full border border-cyan-500/0"
                    variants={{
                        hover: { borderColor: "rgba(6, 182, 212, 0.5)" }
                    }}
                    transition={{ duration: 0.3 }}
                />
            </motion.div>
        </Link>
    );
}

"use client";

import Link from "next/link";
import Image from "next/image";
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
                initial="initial"
                whileHover="whileHover"
            >
                {/* 1. THE LOGO MARK */}
                <motion.div
                    className="relative w-6 h-6 flex items-center justify-center"
                    variants={{
                        initial: {
                            filter: "grayscale(100%) opacity(0.7)",
                            scale: 1
                        },
                        whileHover: {
                            scale: 1.1,
                            filter: "grayscale(0%) drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))",
                            opacity: 1
                        }
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                >
                    <Image
                        src="/logo-develop.png"
                        alt="develOP Logo"
                        width={24}
                        height={24}
                        className="object-contain"
                    />
                </motion.div>

                {/* 2. THE TEXT INTERACTION */}
                <div className="flex flex-col items-start justify-center overflow-hidden h-4 relative w-[100px]">
                    <motion.span
                        className="font-mono text-[13px] font-bold text-white/50 tracking-[0.2em] leading-none absolute left-3"
                        variants={{
                            initial: { y: 0, opacity: 1 },
                            whileHover: { y: -20, opacity: 0 }
                        }}
                        transition={{ duration: 0.2 }}
                    >
                        develOP
                    </motion.span>

                    <motion.span
                        className="font-mono text-[10px] font-bold text-white tracking-widest whitespace-nowrap leading-none absolute left-0"
                        variants={{
                            initial: { y: 20, opacity: 0 },
                            whileHover: { y: 0, opacity: 1 }
                        }}
                        transition={{ duration: 0.3 }}
                    >
                        code and design
                    </motion.span>
                </div>

                {/* 3. BORDER GLOW ANIMATION */}
                <motion.div
                    className="absolute inset-0 rounded-full border border-cyan-500/0"
                    variants={{
                        initial: { borderColor: "rgba(6, 182, 212, 0)" },
                        whileHover: { borderColor: "rgba(6, 182, 212, 0.5)" }
                    }}
                    transition={{ duration: 0.3 }}
                />
            </motion.div>
        </Link>
    );
}

"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

export const DeveloperID = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);

    const handleCopyLink = () => {
        navigator.clipboard.writeText("https://github.com/develop");
        setShowTooltip(true);
        setTimeout(() => setShowTooltip(false), 2000);
    };

    return (
        <motion.div
            layout
            initial={false}
            onHoverStart={() => setIsExpanded(true)}
            onHoverEnd={() => setIsExpanded(false)}
            className={cn(
                "relative flex items-center gap-4 overflow-hidden cursor-pointer",
                "bg-black/80 backdrop-blur-md border border-white/20 rounded-full",
                "shadow-[0_0_30px_rgba(0,240,255,0.15)]"
            )}
            transition={{
                layout: {
                    type: "spring",
                    stiffness: 300,
                    damping: 25
                }
            }}
            style={{
                width: isExpanded ? "320px" : "56px",
                height: "56px"
            }}
        >
            {/* Scanline Effect */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: "200%" }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent pointer-events-none z-20"
                    />
                )}
            </AnimatePresence>

            {/* The Token - Logo Section */}
            <motion.div
                className="relative flex items-center justify-center shrink-0"
                style={{
                    width: "56px",
                    height: "56px"
                }}
            >
                {/* Heartbeat Glow */}
                <motion.div
                    className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500/30 to-purple-500/30 blur-xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />

                {/* Rotating Logo */}
                <motion.div
                    className="relative z-10"
                    animate={{
                        rotateY: [0, 360]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    style={{
                        transformStyle: "preserve-3d"
                    }}
                >
                    <svg viewBox="0 0 40 20" className="w-8 h-4">
                        <defs>
                            <linearGradient id="neonGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#00f0ff" />
                                <stop offset="50%" stopColor="#a855f7" />
                                <stop offset="100%" stopColor="#00f0ff" />
                            </linearGradient>
                        </defs>

                        {/* Infinity Loop 'dp' */}
                        <motion.path
                            d="M20 10 C 20 10, 35 0, 35 10 C 35 20, 20 20, 20 10 C 20 0, 5 0, 5 10 C 5 20, 20 20, 20 10"
                            fill="none"
                            stroke="url(#neonGrad)"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{
                                duration: 2,
                                ease: "easeInOut"
                            }}
                        />
                    </svg>
                </motion.div>
            </motion.div>

            {/* The Info Deck - Expands on Hover */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 30,
                            delay: 0.1
                        }}
                        className="flex items-center gap-3 pr-4 flex-1"
                    >
                        {/* Avatar */}
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900 border border-white/10 flex items-center justify-center shrink-0 overflow-hidden">
                            <span className="text-xs font-bold text-zinc-400 font-mono">FN</span>
                        </div>

                        {/* Info Text */}
                        <div className="flex-1 min-w-0">
                            <p className="text-[10px] text-zinc-500 uppercase tracking-[0.15em] font-mono leading-tight">
                                Architected by
                            </p>
                            <p className="text-sm font-bold text-white font-mono leading-tight truncate">
                                develOP
                            </p>
                        </div>

                        {/* Action Icons */}
                        <div className="flex items-center gap-2">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleCopyLink}
                                className="relative w-7 h-7 rounded-full bg-white/5 hover:bg-cyan-500/20 border border-white/10 flex items-center justify-center transition-colors group"
                                title="Copy Link"
                            >
                                <Copy size={12} className="text-zinc-400 group-hover:text-cyan-400 transition-colors" />

                                {/* Tooltip */}
                                <AnimatePresence>
                                    {showTooltip && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0 }}
                                            className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-cyan-500 text-black text-[10px] font-bold rounded whitespace-nowrap"
                                        >
                                            Copied!
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.button>

                            <motion.a
                                href="https://github.com/develop"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-7 h-7 rounded-full bg-white/5 hover:bg-purple-500/20 border border-white/10 flex items-center justify-center transition-colors group"
                                title="GitHub"
                            >
                                <Github size={12} className="text-zinc-400 group-hover:text-purple-400 transition-colors" />
                            </motion.a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

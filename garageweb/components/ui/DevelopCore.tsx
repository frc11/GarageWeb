"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export const DevelopCore = () => {
    const ref = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    // --- 1. Magnetic Physics ---
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Spring configuration for "Magnetic" feel (heavier mass = more inertia)
    const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    // Parallax for content (moves slightly faster/further than background)
    const contentX = useTransform(springX, (val) => val * 1.2);
    const contentY = useTransform(springY, (val) => val * 1.2);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Calculate distance from center
        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;

        // Apply movement (limited range)
        x.set(distanceX * 0.3); // 30% of cursor movement
        y.set(distanceY * 0.3);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
    };

    // --- 2. Text Scramble Logic ---
    const [displayText, setDisplayText] = useState("develOP");
    const targetText = "CODE & DESIGN";
    const defaultText = "develOP";
    const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?/~";

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isHovered) {
            let iteration = 0;
            interval = setInterval(() => {
                setDisplayText(prev =>
                    targetText
                        .split("")
                        .map((letter, index) => {
                            if (index < iteration) {
                                return targetText[index];
                            }
                            return chars[Math.floor(Math.random() * chars.length)];
                        })
                        .join("")
                );

                if (iteration >= targetText.length) {
                    clearInterval(interval);
                }

                iteration += 1 / 2; // Speed of resolve
            }, 30);
        } else {
            // Reset logic could be similar animation or instant
            setDisplayText(defaultText);
        }

        return () => clearInterval(interval);
    }, [isHovered]);


    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            style={{ x: springX, y: springY }}
            className={cn(
                "relative cursor-pointer group select-none",
                "inline-flex items-center gap-3 px-6 py-3",
                "bg-[#050505] border border-white/10 rounded-full",
                "shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-shadow duration-500",
                "hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] hover:border-cyan-500/30"
            )}
        >
            {/* Ambient Breathing Glow (Idle) */}
            <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-cyan-500/5 blur-xl" />

            {/* --- Living Logo (Infinity Loop) --- */}
            <motion.div
                style={{ x: contentX, y: contentY }}
                className="relative w-8 h-4 shrink-0"
            >
                {/* 
                   CP / Infinity Path 
                   Approximation of a loop: M start -> cubic bezier loop -> cubic bezier return 
                */}
                <svg viewBox="0 0 40 20" className="w-full h-full overflow-visible">
                    <defs>
                        <linearGradient id="beamGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="transparent" />
                            <stop offset="50%" stopColor="#22d3ee" /> {/* Cyan */}
                            <stop offset="100%" stopColor="transparent" />
                        </linearGradient>
                    </defs>

                    {/* Base Track (Dim) */}
                    <path
                        d="M20 10 C 20 10, 35 0, 35 10 C 35 20, 20 20, 20 10 C 20 0, 5 0, 5 10 C 5 20, 20 20, 20 10"
                        fill="none"
                        stroke="#333"
                        strokeWidth="2"
                        strokeLinecap="round"
                    />

                    {/* Energy Beam (Animated) */}
                    <motion.path
                        d="M20 10 C 20 10, 35 0, 35 10 C 35 20, 20 20, 20 10 C 20 0, 5 0, 5 10 C 5 20, 20 20, 20 10"
                        fill="none"
                        stroke="url(#beamGrad)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        initial={{ pathLength: 1, strokeDasharray: "10 40", strokeDashoffset: 0 }}
                        animate={{
                            strokeDashoffset: -100 // Travel along the path
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />
                </svg>
            </motion.div>

            {/* --- Scramble Text --- */}
            <motion.span
                style={{ x: contentX, y: contentY }}
                className={cn(
                    "font-mono text-sm font-bold tracking-widest min-w-[120px]",
                    isHovered ? "text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" : "text-white"
                )}
            >
                {displayText}
            </motion.span>
        </motion.div>
    );
};

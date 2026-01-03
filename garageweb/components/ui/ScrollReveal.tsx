"use client";

import { motion } from "framer-motion";
import { UI_ANIMATIONS } from "@/lib/ui-data";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
    children: ReactNode;
    animation: keyof typeof UI_ANIMATIONS;
    className?: string;
    duration?: number;
}

export function ScrollReveal({ children, animation, className, duration }: ScrollRevealProps) {
    const config = UI_ANIMATIONS[animation];

    return (
        <motion.div
            className={cn(className)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={config}
            {...(duration ? { transition: { duration } } : {})}
        >
            {children}
        </motion.div>
    );
}

"use client";

import { motion, Variants } from "framer-motion";
import { UI_ANIMATIONS } from "@/lib/ui-data";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
    children: ReactNode;
    animation: keyof typeof UI_ANIMATIONS;
    className?: string;
    duration?: number;
    viewport?: {
        once?: boolean;
        margin?: string;
    };
}

const DEFAULT_VIEWPORT = { once: true, margin: "0px 0px -10% 0px" } as const;

export function ScrollReveal({ children, animation, className, duration, viewport = DEFAULT_VIEWPORT }: ScrollRevealProps) {
    const config = UI_ANIMATIONS[animation];

    return (
        <motion.div
            className={cn(className)}
            initial="hidden"
            whileInView="visible"
            // Disconnect observers after the first reveal and trigger slightly before full entry on mobile.
            viewport={viewport}
            variants={config as unknown as Variants}
            {...(duration ? { transition: { duration } } : {})}
        >
            {children}
        </motion.div>
    );
}

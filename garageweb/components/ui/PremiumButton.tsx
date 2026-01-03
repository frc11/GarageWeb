"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface PremiumButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
    children: ReactNode;
    variant?: 'primary' | 'outline' | 'glass';
    className?: string;
}

export function PremiumButton({
    children,
    variant = 'primary',
    className,
    ...props
}: PremiumButtonProps) {

    const variants = {
        primary: "bg-white text-black hover:bg-zinc-200 border-transparent",
        outline: "bg-transparent text-white border-white/20 hover:bg-white/10 hover:border-white/40",
        glass: "bg-white/5 text-white border-white/10 backdrop-blur-md hover:bg-white/10 hover:border-white/30"
    };

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }} // Snappy feel
            className={cn(
                "relative overflow-hidden px-8 py-4 rounded-full font-bold tracking-wide uppercase text-sm border transition-colors duration-300",
                variants[variant],
                className
            )}
            {...props}
        >
            {/* Optional Glow for primary/glass variants could go here */}
            {variant !== 'outline' && (
                <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
            )}

            <span className="relative z-10 flex items-center justify-center gap-2">
                {children}
            </span>
        </motion.button>
    );
}

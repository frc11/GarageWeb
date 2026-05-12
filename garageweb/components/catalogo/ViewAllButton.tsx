"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ViewAllButtonProps {
    onClick: () => void;
    className?: string;
}

export function ViewAllButton({ onClick, className }: ViewAllButtonProps) {
    return (
        <motion.button
            onClick={onClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
                "group relative overflow-hidden",
                "px-8 py-3.5 rounded-2xl",
                "bg-gradient-to-r from-white to-zinc-100",
                "border-2 border-white",
                "shadow-[0_0_30px_rgba(255,255,255,0.3)]",
                "transition-all duration-300",
                "hover:border-amber-400",
                className
            )}
        >
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400/0 via-amber-400/50 to-amber-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-0 rounded-[inherit] bg-[radial-gradient(circle_at_center,rgba(251,191,36,0.35),transparent_72%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <div className="relative flex items-center gap-3">
                <span className="text-sm font-bold uppercase tracking-[0.2em] text-black">
                    Ver Todas las Ofertas
                </span>
                <motion.div
                    animate={{ x: [0, 3, 0] }}
                    transition={{
                        repeat: Infinity,
                        duration: 1.5,
                        ease: "easeInOut"
                    }}
                >
                    <ArrowRight className="w-5 h-5 text-black" strokeWidth={2.5} />
                </motion.div>
            </div>
        </motion.button>
    );
}

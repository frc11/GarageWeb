"use client";

import { motion, useSpring, useTransform, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

interface CounterProps {
    value: number;
    suffix?: string;
    label: string;
}

export function Counter({ value, suffix = "", label }: CounterProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const spring = useSpring(0, {
        mass: 1,
        stiffness: 50,
        damping: 20,
        duration: 2000,
    });

    const display = useTransform(spring, (current) =>
        Math.round(current).toString()
    );

    useEffect(() => {
        if (isInView) {
            spring.set(value);
        }
    }, [isInView, value, spring]);

    return (
        <div ref={ref} className="text-center lg:text-left">
            <div className="flex items-baseline justify-center lg:justify-start gap-1">
                <motion.span className="block text-5xl md:text-6xl font-serif text-white mb-2">
                    {display}
                </motion.span>
                {suffix && (
                    <span className="text-3xl md:text-4xl font-serif text-white/80">{suffix}</span>
                )}
            </div>
            <span className="text-sm text-neutral-500 uppercase tracking-widest font-light">{label}</span>
        </div>
    );
}

"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import React from "react";

interface SectionHeadingProps {
    title: React.ReactNode;
    subtitle?: string;
    className?: string;
    align?: 'left' | 'center' | 'right';
}

export function SectionHeading({ title, subtitle, className, align = 'center' }: SectionHeadingProps) {
    const alignments = {
        left: "items-start text-left",
        center: "items-center text-center",
        right: "items-end text-right"
    };

    return (
        <div className={cn("flex flex-col gap-6 mb-16", alignments[align], className)}>
            {/* Vertical Line Accent */}
            <motion.div
                initial={{ height: 0, opacity: 0 }}
                whileInView={{ height: 48, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "circOut" }}
                className="w-px bg-gradient-to-b from-transparent via-white/50 to-transparent shadow-[0_0_10px_rgba(255,255,255,0.3)]"
            />

            <div className="space-y-3">
                {subtitle && (
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="inline-block px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-[10px] font-bold uppercase tracking-[0.25em] text-white/70"
                    >
                        {subtitle}
                    </motion.span>
                )}

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="text-4xl md:text-5xl lg:text-7xl font-serif font-black text-white tracking-tighter"
                >
                    {/* Using basic HTML parsing or just plain text? Prompt implies massive typography. 
                        If title contains <br/> or spans, we should accept ReactNode, but currently typed as string. 
                        I'll dangerouslySetInnerHTML if string contains HTML or just render string. 
                        Let's keep it simple: string. Only if user puts <br> it might fail. 
                        Usually titles are short. I'll allow ReactNode in future if needed.
                    */}
                    {title}
                </motion.h2>
            </div>
        </div>
    );
}

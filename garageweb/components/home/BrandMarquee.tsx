"use client";

import { Brand } from "@/types/main";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function BrandMarquee({ brands }: { brands: Brand[] }) {
    if (!brands || brands.length === 0) return null;

    // Double Buffer: Duplicating the array once ensures that when we translate -50%,
    // we show the exact same content as at 0%.
    const marqueeBrands = [...brands, ...brands];

    return (
        <section className="relative w-full py-10 bg-neutral-950 border-b border-white/5 overflow-hidden">
            {/* Fade Effect */}
            <div
                className="absolute inset-0 pointer-events-none z-10"
                style={{
                    background: "transparent",
                    maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
                    WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)"
                }}
            />

            <div className="flex w-full select-none overflow-hidden hover:cursor-pointer">
                <motion.div
                    className="flex min-w-full shrink-0 gap-24 items-center px-12"
                    initial={{ x: 0 }}
                    animate={{ x: "-50%" }}
                    transition={{
                        duration: Math.max(20, brands.length * 5),
                        ease: "linear",
                        repeat: Infinity,
                        repeatType: "loop"
                    }}
                    style={{ width: "max-content" }}
                >
                    {marqueeBrands.map((brand, i) => (
                        <Link
                            key={`${brand.id}-${i}`}
                            href={`/catalogo?brand=${encodeURIComponent(brand.slug)}`}
                            className="relative flex flex-col items-center justify-center shrink-0 py-4"
                            aria-label={`Ver catálogo de ${brand.name}`}
                        >
                            <motion.div
                                className="relative w-24 h-24 opacity-40 grayscale transition-all duration-300"
                                whileHover={{
                                    scale: 1.1,
                                    opacity: 1,
                                    grayscale: 0,
                                    zIndex: 50
                                }}
                            >
                                {brand.logo ? (
                                    <Image
                                        src={brand.logo}
                                        alt={brand.name}
                                        fill
                                        className="object-contain"
                                        sizes="96px"
                                    />
                                ) : (
                                    <span className="text-white text-xs font-mono">{brand.name}</span>
                                )}
                            </motion.div>
                        </Link>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

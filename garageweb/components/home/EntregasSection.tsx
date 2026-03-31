"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Quote, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { ENTREGAS_QUERY } from "@/sanity/lib/queries";

interface Entrega {
    id: string;
    clientName: string;
    review: string;
    imageUrl: string;
}

const EntregaCard = ({ item, isCenter = true }: { item: Entrega; isCenter?: boolean }) => (
    <div className={`entrega-card relative w-full aspect-[9/16] max-h-[700px] rounded-3xl overflow-hidden transition-all duration-500 group mx-auto ${isCenter
        ? 'shadow-[0_0_40px_rgba(245,158,11,0.3)] ring-1 ring-amber-500/50'
        : 'opacity-70 ring-1 ring-white/10'
        }`}>

        {/* Background Image */}
        <Image
            src={item.imageUrl}
            alt={`Entrega a ${item.clientName}`}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 400px"
        />

        {/* Gradient Overlay for Text Readability - Darker at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent pointer-events-none" />

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 flex flex-col justify-end">
            <Quote className="text-amber-500/60 w-8 h-8 mb-4 group-hover:text-amber-400 transition-colors duration-500" />
            
            <p className="text-white text-lg md:text-xl font-medium leading-relaxed mb-6 italic text-balance shadow-black drop-shadow-lg">
                "{item.review}"
            </p>

            <div className="flex items-center gap-3 pt-4 border-t border-white/20">
                <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                    <h4 className="text-white font-bold text-sm tracking-wider uppercase drop-shadow-md">{item.clientName}</h4>
                    <p className="text-white/60 text-xs mt-0.5">Cliente Verificado</p>
                </div>
            </div>
        </div>
    </div>
);

export function EntregasSection() {
    const [entregas, setEntregas] = useState<Entrega[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0); // -1 for prev, 1 for next
    
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const fetchEntregas = async () => {
            try {
                const data = await client.fetch(ENTREGAS_QUERY);
                setEntregas(data);
            } catch (error) {
                console.error("Error fetching entregas:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEntregas();
    }, []);

    const totalItems = entregas.length;

    // Circular Buffer Logic: Calculate visible items
    const getVisibleItems = useCallback(() => {
        if (totalItems === 0) return [];
        
        const prevIndex = (currentIndex - 1 + totalItems) % totalItems;
        const nextIndex = (currentIndex + 1) % totalItems;

        return [
            { item: entregas[prevIndex], position: 'prev', index: prevIndex },
            { item: entregas[currentIndex], position: 'center', index: currentIndex },
            { item: entregas[nextIndex], position: 'next', index: nextIndex }
        ];
    }, [currentIndex, totalItems, entregas]);

    const visibleItems = getVisibleItems();

    // Function to start/restart autoplay interval
    const startAutoplay = useCallback(() => {
        if (totalItems <= 1) return;

        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        intervalRef.current = setInterval(() => {
            setDirection(1);
            setCurrentIndex((prev) => (prev + 1) % totalItems);
        }, 5000); // 5 seconds
    }, [totalItems]);

    // Reset autoplay timer (called on manual interaction)
    const resetAutoplay = useCallback(() => {
        startAutoplay();
    }, [startAutoplay]);

    // Navigation Handlers with Timer Reset
    const handleNext = useCallback(() => {
        if (totalItems <= 1) return;
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % totalItems);
        resetAutoplay();
    }, [totalItems, resetAutoplay]);

    const handlePrev = useCallback(() => {
        if (totalItems <= 1) return;
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
        resetAutoplay();
    }, [totalItems, resetAutoplay]);

    // Initialize autoplay on mount and cleanup on unmount
    useEffect(() => {
        startAutoplay();

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [startAutoplay]);

    // Framer Motion Variants
    const containerVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.8
        }),
        center: {
            x: 0,
            opacity: 1,
            scale: 1
        },
        exit: (direction: number) => ({
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.8
        })
    };

    if (loading || totalItems === 0) return null;

    return (
        <section className="py-24 bg-neutral-900/50 backdrop-blur-sm relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-neutral-800/20 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">

                {/* Header */}
                <div className="max-w-xl mx-auto text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center justify-center gap-3 mb-4"
                    >
                        <span className="h-px w-12 bg-amber-500/50" />
                        <span className="text-amber-500 text-xs font-bold uppercase tracking-[0.2em]">Entregas</span>
                        <span className="h-px w-12 bg-amber-500/50" />
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-serif text-white leading-tight"
                    >
                        CLIENTES{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-600">
                            FELICES
                        </span>
                    </motion.h2>
                </div>

                {/* Content Area */}
                <div className="relative">
                    {totalItems <= 2 ? (
                        /* Static Grid for 1-2 items (vertical cards take more space horizontally, so max 2 is better for desktop) */
                        <div className={`grid gap-8 justify-center w-full max-w-4xl mx-auto ${
                            totalItems === 1 ? 'grid-cols-1 max-w-sm' : 
                            'grid-cols-1 md:grid-cols-2'
                        }`}>
                            {entregas.map((item) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="w-full"
                                >
                                    <EntregaCard item={item} isCenter={true} />
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        /* Circular Carousel for more than 2 items */
                        <div className="relative h-[650px] md:h-[700px] flex items-center justify-center">
                            {/* Sliding Window Render */}
                            <div className="absolute inset-0 flex items-center justify-center overflow-hidden md:overflow-visible">
                                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                                    {visibleItems.map(({ item, position, index }) => (
                                        <motion.div
                                            key={`${item.id}-${index}`}
                                            custom={direction}
                                            variants={containerVariants}
                                            initial="enter"
                                            animate="center"
                                            exit="exit"
                                            transition={{
                                                x: { type: "spring", stiffness: 300, damping: 30 },
                                                opacity: { duration: 0.3 }
                                            }}
                                            className={`absolute transition-all duration-500 w-[85%] max-w-[380px] ${position === 'center'
                                                ? 'z-30 scale-100 opacity-100'
                                                : position === 'prev'
                                                    ? 'z-10 -translate-x-[75%] md:-translate-x-[90%] scale-90 opacity-40 blur-[2px] pointer-events-none'
                                                    : 'z-10 translate-x-[75%] md:translate-x-[90%] scale-90 opacity-40 blur-[2px] pointer-events-none'
                                                }`}
                                        >
                                            <EntregaCard item={item} isCenter={position === 'center'} />
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>

                            {/* Custom Navigation Buttons */}
                            <button
                                onClick={handlePrev}
                                className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/80 hover:text-white hover:bg-black/80 hover:border-amber-500/50 hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all duration-300 group cursor-pointer active:scale-95"
                                aria-label="Entrega anterior"
                            >
                                <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform -translate-x-0.5" />
                            </button>

                            <button
                                onClick={handleNext}
                                className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/80 hover:text-white hover:bg-black/80 hover:border-amber-500/50 hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all duration-300 group cursor-pointer active:scale-95"
                                aria-label="Siguiente entrega"
                            >
                                <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform translate-x-0.5" />
                            </button>

                            {/* Pagination Dots */}
                            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                                {entregas.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => {
                                            setDirection(index > currentIndex ? 1 : -1);
                                            setCurrentIndex(index);
                                        }}
                                        className={`h-1.5 rounded-full transition-all duration-300 ${index === currentIndex
                                            ? 'w-8 bg-amber-500'
                                            : 'w-1.5 bg-white/20 hover:bg-white/40'
                                            }`}
                                        aria-label={`Ir a entrega ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

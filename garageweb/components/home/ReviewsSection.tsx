"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Star, Quote, CheckCircle2, ChevronLeft, ChevronRight, User } from "lucide-react";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { TESTIMONIALS_QUERY } from "@/sanity/lib/queries";

interface Testimonial {
    id: string;
    name: string;
    role?: string;
    car: string;
    text: string;
    stars: number;
    avatar?: string;
}

const ReviewCard = ({ item, isCenter = true }: { item: Testimonial; isCenter?: boolean }) => (
    <div className={`review-card relative backdrop-blur-xl border p-8 rounded-3xl transition-all duration-500 group h-full flex flex-col ${isCenter
        ? 'bg-neutral-950/80 border-amber-500/20 shadow-[0_0_40px_rgba(245,158,11,0.3)]'
        : 'bg-neutral-950/40 border-white/5'
        }`}>

        {/* Quote Icon */}
        <Quote className="absolute top-8 right-8 text-white/5 w-12 h-12 group-hover:text-amber-500/10 transition-colors duration-500" />

        {/* Stars */}
        <div className="flex gap-1 mb-6">
            {[...Array(item.stars)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
            ))}
        </div>

        {/* Content */}
        <p className="text-neutral-300 text-base sm:text-lg leading-relaxed mb-8 italic min-h-[120px]">
            "{item.text.length > 180 ? `${item.text.substring(0, 177)}...` : item.text}"
        </p>

        <div className="flex items-center justify-between border-t border-white/5 pt-6 mt-auto">
            <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/10 flex-shrink-0 bg-neutral-800 flex items-center justify-center">
                    {item.avatar ? (
                        <Image
                            src={item.avatar}
                            alt={item.name}
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <User className="text-neutral-500 w-6 h-6" />
                    )}
                </div>
                <div>
                    <div className="flex items-center gap-2">
                        <h4 className="text-white font-bold text-sm">{item.name}</h4>
                        <CheckCircle2 className="w-3 h-3 text-blue-400" />
                    </div>
                    {item.role && (
                        <p className="text-neutral-500 text-xs uppercase tracking-wider">{item.role}</p>
                    )}
                </div>
            </div>
            <div className="text-right">
                <p className="text-amber-500/80 text-[10px] font-bold uppercase tracking-wider mb-1">Dueño de</p>
                <p className="text-white text-xs font-serif">{item.car}</p>
            </div>
        </div>
    </div>
);

export function ReviewsSection() {
    const [reviews, setReviews] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0); // -1 for prev, 1 for next
    
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const data = await client.fetch(TESTIMONIALS_QUERY);
                setReviews(data);
            } catch (error) {
                console.error("Error fetching testimonials:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, []);

    const totalItems = reviews.length;

    // Circular Buffer Logic: Calculate visible items
    const getVisibleItems = useCallback(() => {
        if (totalItems === 0) return [];
        
        const prevIndex = (currentIndex - 1 + totalItems) % totalItems;
        const nextIndex = (currentIndex + 1) % totalItems;

        return [
            { item: reviews[prevIndex], position: 'prev', index: prevIndex },
            { item: reviews[currentIndex], position: 'center', index: currentIndex },
            { item: reviews[nextIndex], position: 'next', index: nextIndex }
        ];
    }, [currentIndex, totalItems, reviews]);

    const visibleItems = getVisibleItems();

    // Function to start/restart autoplay interval
    const startAutoplay = useCallback(() => {
        if (totalItems <= 1) return;

        // Clear any existing interval first
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        // Start new interval
        intervalRef.current = setInterval(() => {
            setDirection(1);
            setCurrentIndex((prev) => (prev + 1) % totalItems);
        }, 5000); // 5 seconds
    }, [totalItems]);

    // Reset autoplay timer (called on manual interaction)
    const resetAutoplay = useCallback(() => {
        startAutoplay(); // This clears old interval and starts fresh
    }, [startAutoplay]);

    // Navigation Handlers with Timer Reset
    const handleNext = useCallback(() => {
        if (totalItems <= 1) return;
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % totalItems);
        resetAutoplay(); // RESET TIMER on manual interaction
    }, [totalItems, resetAutoplay]);

    const handlePrev = useCallback(() => {
        if (totalItems <= 1) return;
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
        resetAutoplay(); // RESET TIMER on manual interaction
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
                        <span className="text-amber-500 text-xs font-bold uppercase tracking-[0.2em]">Testimonios</span>
                        <span className="h-px w-12 bg-amber-500/50" />
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-serif text-white leading-tight"
                    >
                        EXPERIENCIAS DE{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-600">
                            EXCELENCIA
                        </span>
                    </motion.h2>
                </div>

                {/* Content Area */}
                <div className="relative min-h-[400px]">
                    {totalItems <= 3 ? (
                        /* Static Grid for 1-3 items */
                        <div className={`grid gap-8 justify-center max-w-5xl mx-auto ${
                            totalItems === 1 ? 'grid-cols-1 max-w-lg' : 
                            totalItems === 2 ? 'grid-cols-1 md:grid-cols-2' : 
                            'grid-cols-1 md:grid-cols-3'
                        }`}>
                            {reviews.map((item) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                >
                                    <ReviewCard item={item} isCenter={true} />
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        /* Circular Carousel for more than 3 items */
                        <div className="relative h-[500px] md:h-[450px]">
                            {/* Sliding Window Render */}
                            <div className="absolute inset-0 flex items-center justify-center">
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
                                            className={`absolute transition-all duration-500 ${position === 'center'
                                                ? 'z-30 scale-100 opacity-100'
                                                : position === 'prev'
                                                    ? 'z-10 -translate-x-[60%] scale-90 opacity-40 blur-sm pointer-events-none'
                                                    : 'z-10 translate-x-[60%] scale-90 opacity-40 blur-sm pointer-events-none'
                                                }`}
                                            style={{
                                                width: position === 'center' ? '90%' : '90%',
                                                maxWidth: position === 'center' ? '500px' : '500px'
                                            }}
                                        >
                                            <ReviewCard item={item} isCenter={position === 'center'} />
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>

                            {/* Custom Navigation Buttons */}
                            <button
                                onClick={handlePrev}
                                className="absolute left-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-black/60 hover:border-amber-500/30 hover:shadow-[0_0_20px_rgba(245,158,11,0.2)] transition-all duration-300 group cursor-pointer active:scale-95"
                                aria-label="Previous review"
                            >
                                <ChevronLeft className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            </button>

                            <button
                                onClick={handleNext}
                                className="absolute right-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-black/60 hover:border-amber-500/30 hover:shadow-[0_0_20px_rgba(245,158,11,0.2)] transition-all duration-300 group cursor-pointer active:scale-95"
                                aria-label="Next review"
                            >
                                <ChevronRight className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            </button>

                            {/* Pagination Dots */}
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2">
                                {reviews.map((_, index) => (
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
                                        aria-label={`Go to review ${index + 1}`}
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

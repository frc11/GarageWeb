"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Star, Quote, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

// Mock Reviews Data
const REVIEWS = [
    {
        id: 1,
        user: "Carlos M.",
        role: "Coleccionista",
        car: "Porsche 911 GT3",
        text: "La atención al detalle en El Garage es incomparable. El proceso de adquisición fue tan exclusivo como el vehículo mismo. Absolutamente recomendable para quienes buscan lo mejor.",
        stars: 5,
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: 2,
        user: "Sofía R.",
        role: "Empresaria",
        car: "Mercedes-AMG G63",
        text: "Buscaba una unidad específica y el equipo no solo la consiguió, sino que superó mis expectativas en cuanto al estado y configuración. Profesionalismo puro.",
        stars: 5,
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: 3,
        user: "Marcelo D.",
        role: "CEO Tech",
        car: "Audi RS e-tron GT",
        text: "La transición hacia la movilidad eléctrica de lujo fue impecable gracias a su asesoramiento experto. Un servicio concierge de primer nivel.",
        stars: 5,
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop"
    },
    {
        id: 4,
        user: "Valentina L.",
        role: "Arquitecta",
        car: "Range Rover Autobiography",
        text: "Una experiencia de compra transparente y ágil. El showroom es una galería de arte automotriz. Feliz con mi nueva adquisición.",
        stars: 5,
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976&auto=format&fit=crop"
    },
    {
        id: 5,
        user: "Ricardo P.",
        role: "Inversor",
        car: "Ferrari 488 Pista",
        text: "El nivel de curación de su inventario y el conocimiento técnico del equipo son excepcionales. Una experiencia de adquisición sin fricción.",
        stars: 5,
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop"
    }
];

export function ReviewsSection() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0); // -1 for prev, 1 for next
    const totalItems = REVIEWS.length;

    // Ref to store the interval ID for autoplay
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    // Circular Buffer Logic: Calculate visible items
    const getVisibleItems = useCallback(() => {
        const prevIndex = (currentIndex - 1 + totalItems) % totalItems;
        const nextIndex = (currentIndex + 1) % totalItems;

        return [
            { item: REVIEWS[prevIndex], position: 'prev', index: prevIndex },
            { item: REVIEWS[currentIndex], position: 'center', index: currentIndex },
            { item: REVIEWS[nextIndex], position: 'next', index: nextIndex }
        ];
    }, [currentIndex, totalItems]);

    const visibleItems = getVisibleItems();

    // Function to start/restart autoplay interval
    const startAutoplay = useCallback(() => {
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
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % totalItems);
        resetAutoplay(); // RESET TIMER on manual interaction
    }, [totalItems, resetAutoplay]);

    const handlePrev = useCallback(() => {
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

                {/* Circular Carousel */}
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
                                    <div className={`review-card relative backdrop-blur-xl border p-8 rounded-3xl transition-all duration-500 group ${position === 'center'
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
                                            "{item.text}"
                                        </p>

                                        <div className="flex items-center justify-between border-t border-white/5 pt-6 mt-auto">
                                            <div className="flex items-center gap-4">
                                                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/10 flex-shrink-0">
                                                    <Image
                                                        src={item.avatar}
                                                        alt={item.user}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <h4 className="text-white font-bold text-sm">{item.user}</h4>
                                                        <CheckCircle2 className="w-3 h-3 text-blue-400" />
                                                    </div>
                                                    <p className="text-neutral-500 text-xs uppercase tracking-wider">{item.role}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-amber-500/80 text-[10px] font-bold uppercase tracking-wider mb-1">Dueño de</p>
                                                <p className="text-white text-xs font-serif">{item.car}</p>
                                            </div>
                                        </div>
                                    </div>
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
                        {REVIEWS.map((_, index) => (
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
            </div>
        </section>
    );
}

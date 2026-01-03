"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Timer, Zap, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Car } from "@/types/main";
import { formatCurrency } from "@/lib/utils";

// Swiper Import
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

interface FlashPromoProps {
    cars: Car[];
}

export function FlashPromo({ cars }: FlashPromoProps) {
    const [timeLeft, setTimeLeft] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const now = new Date();
        const target = new Date(now);
        target.setHours(24, 0, 0, 0);

        const calculateTimeLeft = () => {
            const difference = target.getTime() - new Date().getTime();

            if (difference > 0) {
                return {
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                };
            }
            return { hours: 0, minutes: 0, seconds: 0 };
        };

        setTimeLeft(calculateTimeLeft());
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    if (!cars || cars.length === 0) {
        return null;
    }

    return (
        <section className="bg-neutral-900 border-y border-white/10 relative overflow-hidden py-16">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-amber-500/5 blur-3xl pointer-events-none" />

            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-12 items-center">

                    {/* Left: Timer & Context */}
                    <div className="lg:w-1/3 text-center lg:text-left space-y-8 z-10 shrink-0">
                        <div className="inline-flex items-center gap-2 text-amber-500 font-bold tracking-wider text-sm uppercase mb-2">
                            <Timer size={16} />
                            <span>Oferta Relámpago</span>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-white leading-tight">
                            Oportunidades <span className="text-gray-500 italic">Únicas</span>
                        </h2>

                        {/* Timer */}
                        <div className="flex items-center justify-center lg:justify-start gap-4 text-white">
                            {['Hours', 'Mins', 'Segs'].map((label, i) => (
                                <div key={label} className="text-center">
                                    <div className="bg-black/50 border border-white/10 rounded-lg p-3 w-16 md:w-20 backdrop-blur-sm">
                                        <span className="text-2xl md:text-3xl font-bold font-mono block">
                                            {String(Object.values(timeLeft)[i]).padStart(2, '0')}
                                        </span>
                                    </div>
                                    <span className="text-xs text-gray-500 uppercase mt-2 block">{label}</span>
                                </div>
                            ))}
                        </div>

                        <p className="text-gray-400 max-w-sm mx-auto lg:mx-0">
                            Unidades seleccionadas con condiciones especiales de financiación y entrega inmediata solo por tiempo limitado.
                        </p>

                        {/* Navigation Buttons (Desktop) - Custom Swiper Navigation */}
                        <div className="hidden lg:flex gap-4 pt-4">
                            <button className="swiper-button-prev-custom p-3 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed">
                                <ChevronLeft size={20} />
                            </button>
                            <button className="swiper-button-next-custom p-3 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed">
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Right: Swiper Carousel */}
                    <div className="lg:w-2/3 w-full relative z-10 min-w-0"> {/* min-w-0 fixes flex child overflow issue */}
                        <Swiper
                            modules={[Autoplay, Navigation]}
                            spaceBetween={24}
                            slidesPerView={1.2}
                            loop={true}
                            autoplay={{
                                delay: 3500,
                                disableOnInteraction: false,
                            }}
                            breakpoints={{
                                640: {
                                    slidesPerView: 2.2,
                                },
                                1024: {
                                    slidesPerView: 3,
                                },
                            }}
                            navigation={{
                                prevEl: '.swiper-button-prev-custom',
                                nextEl: '.swiper-button-next-custom',
                            }}
                            className="!overflow-visible" // Allow shadows to overflow
                        >
                            {cars.map((car) => (
                                <SwiperSlide key={car.id}>
                                    <div className="relative group cursor-pointer h-full">
                                        <Link href={`/autos/${car.slug}`}>
                                            <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4 border border-white/10 bg-neutral-800">
                                                {/* Badge */}
                                                <div className="absolute top-3 right-3 z-10 bg-amber-500 text-black text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg animate-pulse">
                                                    <Zap size={12} fill="currentColor" />
                                                    OFERTA
                                                </div>
                                                <Image
                                                    src={car.images[0] || ""}
                                                    alt={`${car.brand} ${car.model}`}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                                                <div className="absolute bottom-4 left-4 right-4 z-20">
                                                    <h3 className="text-white font-bold text-lg leading-tight mb-1 truncate">{car.brand} {car.model}</h3>
                                                    <div className="flex items-baseline gap-2">
                                                        <span className="text-amber-500 font-bold text-xl">
                                                            {formatCurrency(car.price, car.currency)}
                                                        </span>
                                                        {car.originalPrice && (
                                                            <span className="text-gray-500 text-xs line-through decoration-gray-500">
                                                                {formatCurrency(car.originalPrice, car.currency)}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </SwiperSlide>
                            ))}

                            {/* View All Slide */}
                            <SwiperSlide>
                                <Link href="/catalogo" className="flex flex-col items-center justify-center h-full aspect-[4/3] rounded-xl border-2 border-dashed border-white/10 hover:border-amber-500/50 hover:bg-white/5 transition-all group">
                                    <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform text-white group-hover:text-amber-500">
                                        <ArrowRight size={24} />
                                    </div>
                                    <span className="text-sm font-medium uppercase tracking-wider text-gray-400 group-hover:text-white">Ver Inventario</span>
                                </Link>
                            </SwiperSlide>
                        </Swiper>
                    </div>

                </div>
            </div>
        </section>
    );
}

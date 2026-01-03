"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Timer, ArrowRight } from "lucide-react";
import { Car } from "@/types/main";
import { CarCard } from "@/components/cars/CarCard";

// Swiper Import
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
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
        <section className="bg-zinc-900 border-y border-white/5 relative overflow-hidden py-24">
            {/* Ambient Spotlights */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-amber-600/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-900/10 blur-[120px] rounded-full opacity-50" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                    {/* Left: Timer & Context */}
                    <div className="lg:col-span-4 text-center lg:text-left space-y-10 shrink-0 relative z-20">

                        {/* Header Group */}
                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-2 text-amber-500 font-bold tracking-[0.2em] text-xs uppercase bg-amber-500/10 px-3 py-1.5 rounded border border-amber-500/20">
                                <Timer size={14} />
                                <span>Flash Deals</span>
                            </div>

                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-black text-white leading-[1.1]">
                                Oportunidades <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 drop-shadow-lg">
                                    ÚNICAS
                                </span>
                            </h2>

                            <p className="text-zinc-400 text-lg max-w-sm mx-auto lg:mx-0 leading-relaxed">
                                Selección exclusiva de vehículos con beneficios limitados por tiempo.
                            </p>
                        </div>

                        {/* Metallic Timer */}
                        <div className="flex items-center justify-center lg:justify-start gap-4 text-white">
                            {['Hours', 'Mins', 'Segs'].map((label, i) => (
                                <div key={label} className="text-center group">
                                    <div className="relative bg-zinc-950 border border-white/10 rounded-xl p-4 w-20 md:w-24 backdrop-blur-md shadow-2xl group-hover:border-amber-500/30 transition-colors duration-500">
                                        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-xl pointer-events-none" />
                                        <span className="text-3xl md:text-4xl font-bold font-mono block text-white/90 group-hover:text-amber-400 transition-colors">
                                            {String(Object.values(timeLeft)[i]).padStart(2, '0')}
                                        </span>
                                    </div>
                                    <span className="text-[10px] font-bold tracking-widest text-zinc-600 uppercase mt-3 block group-hover:text-zinc-400 transition-colors">
                                        {label}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* CTA */}
                        <div>
                            <Link
                                href="/ofertas"
                                className="group inline-flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-white hover:text-amber-400 transition-colors"
                            >
                                <span className="border-b border-transparent group-hover:border-amber-400 pb-0.5 transition-all">Ver Inventario</span>
                                <div className="bg-white/10 p-1.5 rounded-full group-hover:bg-amber-500 group-hover:text-black transition-all">
                                    <ArrowRight size={14} className="group-hover:-rotate-45 transition-transform duration-300" />
                                </div>
                            </Link>
                        </div>
                    </div>

                    {/* Right: Swiper Carousel */}
                    <div className="lg:col-span-8 w-full min-w-0 relative z-10">
                        {/* Wrapper to allow overflow but keep structure */}
                        <div className="relative w-[110%] -mr-[10%] lg:w-full lg:mr-0 pl-4 lg:pl-0">
                            <Swiper
                                modules={[Autoplay]}
                                spaceBetween={32}
                                slidesPerView={1.1}
                                centeredSlides={false}
                                loop={true}
                                autoplay={{
                                    delay: 4000,
                                    disableOnInteraction: false,
                                }}
                                breakpoints={{
                                    640: {
                                        slidesPerView: 2.1,
                                    },
                                    1024: {
                                        slidesPerView: 2.5,
                                    },
                                    1280: {
                                        slidesPerView: 2.8,
                                    }
                                }}
                                className="py-12" // Removing !overflow-visible, increasing vertical padding
                            >
                                {cars.map((car) => (
                                    <SwiperSlide key={car.id} className="!h-auto transition-transform duration-500 hover:-translate-y-2">
                                        <CarCard car={car} />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

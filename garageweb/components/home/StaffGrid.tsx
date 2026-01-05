"use client";

import Image from "next/image";
import { m } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const STAFF = [
    {
        id: 1,
        name: "Carlos Rivera",
        role: "Director de Operaciones",
        specialty: "Coleccionismo Clásico",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1887&auto=format&fit=crop"
    },
    {
        id: 2,
        name: "Elena Vance",
        role: "Senior Brand Ambassador",
        specialty: "Superdeportivos Italianos",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop"
    },
    {
        id: 3,
        name: "Marco Rossi",
        role: "Head of Engineering",
        specialty: "Performance Tuning",
        image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: 4,
        name: "Sofia Chen",
        role: "Client Experience Manager",
        specialty: "Concierge VIP",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop"
    }
];

export function StaffGrid() {
    return (
        <section className="py-24 md:py-32 bg-neutral-900 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}
            />

            <div className="container mx-auto px-6 relative z-10">

                {/* Header */}
                <div className="text-center mb-20 flex flex-col items-center">
                    <m.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="flex items-center space-x-4 mb-4"
                    >
                        <div className="h-px w-8 bg-neutral-600" />
                        <span className="text-xs font-medium uppercase tracking-[0.3em] text-neutral-400 font-sans">
                            Nuestros Expertos
                        </span>
                        <div className="h-px w-8 bg-neutral-600" />
                    </m.div>

                    <m.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-3xl md:text-5xl font-light text-white tracking-tight font-display"
                    >
                        CONOCE A LOS <span className="font-serif italic text-neutral-400">CURADORES</span>
                    </m.h2>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {STAFF.map((member, i) => (
                        <m.div
                            key={member.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                            className="group relative cursor-pointer"
                        >
                            <div className="relative aspect-[3/4] overflow-hidden bg-neutral-800 transition-all duration-500 ease-out group-hover:scale-[1.02] shadow-2xl">
                                <Image
                                    src={member.image}
                                    alt={member.name}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                    className="object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
                                />

                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                                {/* Interactive Content */}
                                <div className="absolute inset-0 p-6 flex flex-col justify-end transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    <div className="space-y-1">
                                        <p className="text-[10px] tracking-widest uppercase text-amber-500 font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 translate-y-2 group-hover:translate-y-0 transform">
                                            {member.specialty}
                                        </p>
                                        <h3 className="text-2xl font-display font-medium text-white">
                                            {member.name}
                                        </h3>
                                        <p className="text-sm text-neutral-400 font-light border-l-2 border-neutral-700 pl-3">
                                            {member.role}
                                        </p>
                                    </div>

                                    {/* Action Button */}
                                    <div className="mt-6 pt-6 border-t border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200 flex items-center justify-between">
                                        <span className="text-xs text-white/80 uppercase tracking-wider">Contactar</span>
                                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm group-hover:bg-white group-hover:text-black transition-colors">
                                            <ArrowUpRight className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </m.div>
                    ))}
                </div>

            </div>
        </section>
    );
}

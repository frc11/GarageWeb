"use client";

import Image from "next/image";
import { m } from "framer-motion";
import { ArrowUpRight, MessageCircle } from "lucide-react";

const STAFF = [
    {
        id: 1,
        name: "Carlos Rivera",
        role: "Director de Operaciones",
        specialty: "Coleccionismo Clásico",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1887&auto=format&fit=crop",
        whatsapp: "https://wa.me/5493814154708"
    },
    {
        id: 2,
        name: "Elena Vance",
        role: "Embajadora de marcas senior",
        specialty: "Superdeportivos Italianos",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop",
        whatsapp: "https://wa.me/5493815674738"
    },
    {
        id: 3,
        name: "Marco Rossi",
        role: "Ingeniero",
        specialty: "Asegurador de calidad",
        image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=2070&auto=format&fit=crop",
        whatsapp: "https://wa.me/5493814154708"
    },
    {
        id: 4,
        name: "Sofia Chen",
        role: "Encargada de ventas",
        specialty: "Negociadora profesional",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop",
        whatsapp: "https://wa.me/5493815674738"
    }
];

export function StaffGrid() {
    return (
        <section className="py-25 md:py-32 bg-neutral-950 relative overflow-hidden">
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
                        CONOCÉ AL <span className="font-serif italic text-neutral-400">STAFF</span>
                    </m.h2>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {STAFF.map((member, i) => (
                        <a href={member.whatsapp} target="_blank" rel="noopener noreferrer" key={member.id}>
                            <m.div
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
                                        className="object-cover transition-all duration-700 grayscale-0 scale-100 lg:grayscale lg:group-hover:grayscale-0 lg:group-hover:scale-110"
                                    />

                                    {/* Overlay Gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                                    {/* Interactive Content */}
                                    <div className="absolute inset-0 p-6 flex flex-col justify-end transform transition-transform duration-500 translate-y-0 lg:translate-y-4 lg:group-hover:translate-y-0">
                                        <div className="space-y-1">
                                            <p className="text-[10px] tracking-widest uppercase text-orange-400 font-bold [text-shadow:0_1px_3px_rgba(0,0,0,0.9)] transition-opacity duration-500 delay-100 transform opacity-100 translate-y-0 lg:opacity-0 lg:translate-y-2 lg:group-hover:opacity-100 lg:group-hover:translate-y-0">
                                                {member.specialty}
                                            </p>
                                            <h3 className="text-2xl font-display font-medium text-white">
                                                {member.name}
                                            </h3>
                                            <p className="text-sm text-white font-light border-l-2 border-neutral-700 pl-3">
                                                {member.role}
                                            </p>
                                        </div>

                                        {/* Action Button */}
                                        <div className="mt-6 pt-6 border-t border-white/10 transition-all duration-500 delay-200 flex items-center justify-between opacity-100 lg:opacity-0 lg:group-hover:opacity-100">
                                            <span className="text-xs text-white/80 uppercase tracking-wider">Contactar</span>
                                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm group-hover:bg-orange-400 group-hover:text-black transition-colors">
                                                <MessageCircle className="w-4 h-4" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </m.div>
                        </a>
                    ))}
                </div>

            </div>
        </section>
    );
}
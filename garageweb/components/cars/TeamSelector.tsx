"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { MessageCircle } from "lucide-react";

interface TeamSelectorProps {
    className?: string;
    carName: string;
}

const STAFF = [
    {
        id: 1,
        name: "Carlos",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1887&auto=format&fit=crop",
        whatsapp: "5493814154708"
    },
    {
        id: 2,
        name: "Elena",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop",
        whatsapp: "5493815674738"
    },
    {
        id: 3,
        name: "Marco",
        image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=2070&auto=format&fit=crop",
        whatsapp: "5493814154708"
    },
    {
        id: 4,
        name: "Sofia",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop",
        whatsapp: "5493815674738"
    }
];

export function TeamSelector({ className, carName }: TeamSelectorProps) {

    return (
        <div className={cn("space-y-4 select-none", className)}>
            <div className="flex items-center justify-between mb-4">
                <p className="text-xs uppercase tracking-widest text-zinc-500 font-bold">Elige tu asesor</p>
            </div>

            <div className="grid grid-cols-4 gap-3">
                {STAFF.map((member) => {
                    // Custom message for each member
                    const message = `Hola ${member.name}, ¡quiero comprar el ${carName} que vi en la página!`;
                    const whatsappUrl = `https://wa.me/${member.whatsapp}?text=${encodeURIComponent(message)}`;

                    return (
                        <a
                            key={member.id}
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative flex flex-col items-center gap-2 cursor-pointer select-none"
                        >
                            <div className="relative w-full aspect-square rounded-2xl overflow-hidden border border-white/10 transition-all duration-300 scale-110 border-amber-500/50 lg:group-hover:scale-110 lg:group-hover:border-amber-500/50 lg:scale-100 lg:border-white/10 before:absolute before:inset-0 before:rounded-[inherit] before:pointer-events-none before:bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.2),transparent_72%)] before:opacity-100 before:transition-opacity before:duration-300 lg:before:opacity-0 lg:group-hover:before:opacity-100">
                                <Image
                                    src={member.image}
                                    alt={`Asesor ${member.name} de El Garage`}
                                    fill
                                    className="object-cover grayscale-0 lg:grayscale lg:group-hover:grayscale-0 transition-all duration-300"
                                    sizes="(max-width: 768px) 25vw, 96px"
                                />

                                {/* Overlay Icon - Visible on hover only on desktop, maybe subtle on mobile? keeping it simpler as per request for 'colored photo' */}
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300">
                                    <MessageCircle className="w-5 h-5 text-amber-500" />
                                </div>
                            </div>
                            <span className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider group-hover:text-white transition-colors">
                                {member.name}
                            </span>
                        </a>
                    );
                })}
            </div>
        </div>
    );
}

"use client";

import Link from "next/link";
import { Instagram, Facebook, MapPin, Mail, MessageSquare } from "lucide-react";
import { DeveloperBadge } from "./DeveloperBadge";
import { usePathname } from "next/navigation";

export function Footer() {
    const pathname = usePathname();

    if (pathname?.startsWith("/studio")) {
        return null;
    }

    return (
        // z-50 para que la sombra tape el corte de la sección anterior
        <footer className="relative bg-zinc-950 pt-20 pb-10 overflow-visible z-50">

            {/* === SOMBRA DE INTEGRACIÓN (FADE TO BLACK) === */}
            {/* Sube 128px (-top-32) hacia la sección de arriba.
                Crea un degradado que va de transparente al color del footer (zinc-950).
                Esto hace que la página se "oscurezca" suavemente antes de llegar al footer. */}
            <div className="absolute -top-32 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-zinc-950/60 to-zinc-950 pointer-events-none" />

            {/* NOTA: Se eliminó el div 'h-px' que generaba la línea divisora */}

            <div className="container mx-auto px-6 relative z-10">

                {/* Main Grid: 4 Columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-32 mix-blend-difference text-center md:text-left">

                    {/* Column 1: Brand */}
                    <div className="space-y-6">
                        <span className="text-2xl font-black tracking-tighter text-white">EL GARAGE.</span>
                        <p className="text-zinc-400 text-sm leading-relaxed max-w-xs mx-auto md:mx-0 mt-6">
                            Desde 2016 brindando la mejor experiencia en la compra y venta de vehículos seleccionados. Más de 10 años garantizando confianza, asesoramiento claro y total responsabilidad.
                        </p>
                    </div>

                    {/* Column 2: Navigation */}
                    <div>
                        <h3 className="text-white font-bold mb-6 text-sm tracking-widest uppercase">Navegación</h3>
                        <ul className="space-y-4">
                            <li><Link href="/" className="text-zinc-400 hover:text-white transition-colors text-sm">Inicio</Link></li>
                            <li><Link href="/catalogo" className="text-zinc-400 hover:text-white transition-colors text-sm">Catálogo</Link></li>
                            <li><Link href="/contacto" className="text-zinc-400 hover:text-white transition-colors text-sm">Contacto</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Contact */}
                    <div>
                        <h3 className="text-white font-bold mb-6 text-sm tracking-widest uppercase">Contacto</h3>
                        <ul className="space-y-4">
                            <li className="text-sm text-zinc-400">
                                <a href="https://maps.app.goo.gl/PXUmFowAsKH8FTqPA" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 hover:text-white transition-colors justify-center md:justify-start">
                                    <MapPin size={18} className="shrink-0 mt-0.5" />
                                    <span>Yerba Buena, Tucumán<br />Argentina</span>
                                </a>
                            </li>
                            <li className="text-sm text-zinc-400">
                                <a href="mailto:elgarageautomoviles@gmail.com" className="flex items-center gap-3 hover:text-white transition-colors justify-center md:justify-start">
                                    <Mail size={18} className="shrink-0" />
                                    <span>elgarageautomoviles@gmail.com</span>
                                </a>
                            </li>
                            <li className="text-sm text-zinc-400">
                                <a href="https://wa.me/5493814663032" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-white transition-colors justify-center md:justify-start">
                                    <MessageSquare size={18} className="shrink-0" />
                                    <span>+54 9 381 4663032</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: Social */}
                    <div>
                        <h3 className="text-white font-bold mb-6 text-sm tracking-widest uppercase">Seguinos</h3>
                        <div className="flex gap-4 justify-center md:justify-start">
                            <a href="https://www.instagram.com/elgarageautomoviles/" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-full hover:bg-white hover:text-black transition-all text-white">
                                <Instagram size={20} />
                            </a>
                            <a href="https://www.facebook.com/profile.php?id=100075887566882" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-full hover:bg-white hover:text-black transition-all text-white">
                                <Facebook size={20} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-white/5 pt-12 flex flex-col items-center">

                    {/* Copyright & Legal */}
                    <div className="flex flex-col md:flex-row items-center gap-6 text-xs text-zinc-600 mb-12 text-center">
                        <p>© {new Date().getFullYear()} EL GARAGE. Todos los derechos reservados.</p>
                        <div className="flex gap-6">
                            <Link href="/privacidad" className="hover:text-zinc-400 transition-colors">Privacidad</Link>
                            <Link href="/terminos" className="hover:text-zinc-400 transition-colors">Términos</Link>
                        </div>
                    </div>

                    {/* SIGNATURE BLOCK */}
                    <DeveloperBadge />
                </div>
            </div>

            {/* MASSIVE TYPOGRAPHY BACKGROUND */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none select-none leading-none z-0">
                <h1 className="text-[17vw] font-black text-zinc-900/50 tracking-tighter text-center whitespace-nowrap translate-y-[20%]">
                    EL GARAGE
                </h1>
            </div>
        </footer>
    );
}
"use client";

import Link from "next/link";
import { Instagram, Facebook, MapPin, Mail } from "lucide-react";

export function Footer() {
    return (
        <footer className="relative bg-zinc-950 pt-20 overflow-hidden">
            {/* Gradient Divider */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="container mx-auto px-6 relative z-10 pb-12">

                {/* CTA Block */}
                <div className="mb-32 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div>
                        <h3 className="text-3xl font-serif text-white mb-2">¿Listo para conducir?</h3>
                        <p className="text-zinc-500">Encuentra tu próximo vehículo hoy.</p>
                    </div>
                    <Link href="/catalogo" className="px-8 py-4 bg-white text-black rounded-full font-bold uppercase tracking-wider hover:bg-zinc-200 transition-colors">
                        Ver Catálogo
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-32 mix-blend-difference text-white">
                    {/* Brand */}
                    <div className="space-y-6">
                        <span className="text-2xl font-black tracking-tighter">GARAGE.</span>
                        <p className="text-zinc-400 text-sm leading-relaxed max-w-xs">
                            Redefiniendo el estándar en la comercialización de vehículos de alta gama.
                            Pasión, exclusividad y confianza.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h3 className="font-bold mb-6 text-sm uppercase tracking-widest text-zinc-500">Navegación</h3>
                        <ul className="space-y-4">
                            <li><Link href="/" className="hover:text-zinc-300 transition-colors text-sm">Inicio</Link></li>
                            <li><Link href="/catalogo" className="hover:text-zinc-300 transition-colors text-sm">Catálogo</Link></li>
                            <li><Link href="/vender" className="hover:text-zinc-300 transition-colors text-sm">Vender</Link></li>
                            <li><Link href="/contacto" className="hover:text-zinc-300 transition-colors text-sm">Contacto</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-bold mb-6 text-sm uppercase tracking-widest text-zinc-500">Contacto</h3>
                        <ul className="space-y-4">
                            <li className="text-sm">
                                <a href="https://maps.app.goo.gl/PXUmFowAsKH8FTqPA" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 hover:text-zinc-300 transition-colors">
                                    <MapPin size={18} className="shrink-0 mt-0.5" />
                                    <span>Yerba Buena, Tucumán<br />Argentina</span>
                                </a>
                            </li>
                            <li className="flex items-center gap-3 text-sm">
                                <Mail size={18} className="shrink-0" />
                                <a href="mailto:elgarageautomoviles@gmail.com" className="hover:text-zinc-300 transition-colors">
                                    elgarageautomoviles@gmail.com
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h3 className="font-bold mb-6 text-sm uppercase tracking-widest text-zinc-500">Síguenos</h3>
                        <div className="flex gap-4">
                            <a href="https://www.instagram.com/elgarageautomoviles/" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-full hover:bg-white hover:text-black transition-all">
                                <Instagram size={20} />
                            </a>
                            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-full hover:bg-white hover:text-black transition-all">
                                <Facebook size={20} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-600">
                    <p>© {new Date().getFullYear()} GARAGE. Todos los derechos reservados.</p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-zinc-400">Privacidad</Link>
                        <Link href="/terms" className="hover:text-zinc-400">Términos</Link>
                    </div>
                </div>
            </div>

            {/* MASSIVE TYPOGRAPHY BACKGROUND */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none select-none leading-none z-0">
                <h1 className="text-[17vw] font-black text-zinc-900/50 tracking-tighter text-center whitespace-nowrap translate-y-[20%]">
                    ELGARAGE
                </h1>
            </div>
            {/* Gradient Fade for text bottom part if needed, or let it cut */}
        </footer>
    );
}

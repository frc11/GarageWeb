"use client";

import Link from "next/link";
import { Instagram, Facebook, MapPin, Mail } from "lucide-react";

export function Footer() {
    return (
        <footer className="relative bg-zinc-950 pt-20 pb-10 overflow-hidden">
            {/* Gradient Divider */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="container mx-auto px-6 relative z-10">
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

                {/* Main Grid: 4 Columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-32 mix-blend-difference">

                    {/* Column 1: Brand */}
                    <div className="space-y-6">
                        <span className="text-2xl font-black tracking-tighter text-white">EL GARAGE.</span>
                        <p className="text-zinc-400 text-sm leading-relaxed max-w-xs">
                            Redefiniendo el estándar en la comercialización de vehículos de alta gama.
                            Pasión, exclusividad y confianza.
                        </p>
                    </div>

                    {/* Column 2: Navigation */}
                    <div>
                        <h3 className="text-white font-bold mb-6 text-sm tracking-widest uppercase">Navegación</h3>
                        <ul className="space-y-4">
                            <li><Link href="/" className="text-zinc-400 hover:text-white transition-colors text-sm">Inicio</Link></li>
                            <li><Link href="/catalogo" className="text-zinc-400 hover:text-white transition-colors text-sm">Catálogo</Link></li>
                            <li><Link href="/vender" className="text-zinc-400 hover:text-white transition-colors text-sm">Vender</Link></li>
                            <li><Link href="/contacto" className="text-zinc-400 hover:text-white transition-colors text-sm">Contacto</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Contact */}
                    <div>
                        <h3 className="text-white font-bold mb-6 text-sm tracking-widest uppercase">Contacto</h3>
                        <ul className="space-y-4">
                            <li className="text-sm text-zinc-400">
                                <a href="https://maps.app.goo.gl/PXUmFowAsKH8FTqPA" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 hover:text-white transition-colors">
                                    <MapPin size={18} className="shrink-0 mt-0.5" />
                                    <span>Yerba Buena, Tucumán<br />Argentina</span>
                                </a>
                            </li>
                            <li className="flex items-center gap-3 text-sm text-zinc-400">
                                <Mail size={18} className="shrink-0" />
                                <a href="mailto:elgarageautomoviles@gmail.com" className="hover:text-white transition-colors">
                                    elgarageautomoviles@gmail.com
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: Social */}
                    <div>
                        <h3 className="text-white font-bold mb-6 text-sm tracking-widest uppercase">Síguenos</h3>
                        <div className="flex gap-4">
                            <a href="https://www.instagram.com/elgarageautomoviles/" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-full hover:bg-white hover:text-black transition-all text-white">
                                <Instagram size={20} />
                            </a>
                            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-full hover:bg-white hover:text-black transition-all text-white">
                                <Facebook size={20} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-white/5 pt-12 flex flex-col items-center">

                    {/* Copyright & Legal - Low Contrast to emphasize Signature */}
                    <div className="flex flex-col md:flex-row items-center gap-6 text-xs text-zinc-600 mb-12">
                        <p>© {new Date().getFullYear()} EL GARAGE. Todos los derechos reservados.</p>
                        <div className="flex gap-6">
                            <Link href="/privacidad" className="hover:text-zinc-400 transition-colors">Privacidad</Link>
                            <Link href="/terminos" className="hover:text-zinc-400 transition-colors">Términos</Link>
                        </div>
                    </div>

                    {/* SIGNATURE BLOCK: The centerpiece of the bottom */}
                    {/* High-End Cinematic Version */}
                    <Link
                        href="https://develop-webdesign.netlify.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col items-center justify-center gap-4 transition-all duration-500"
                    >
                        {/* Logo Container */}
                        <div className="relative">
                            {/* Glow effect behind */}
                            <div className="absolute inset-0 bg-white/5 rounded-full blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-700" />

                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="/logo-develop.png"
                                alt="DevelOP"
                                className="relative w-12 h-12 object-cover rounded-full border border-white/10 grayscale opacity-40 blur-[0.5px] transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:opacity-100 group-hover:blur-0 group-hover:scale-110 group-hover:border-white/20 shadow-2xl"
                            />
                        </div>

                        {/* Text Branding */}
                        <span className="text-[10px] tracking-[0.2em] text-zinc-600 uppercase transition-colors duration-500 group-hover:text-zinc-400">
                            Desarrollado por devel<span className="font-bold text-white tracking-widest transition-colors duration-500">OP</span>
                        </span>
                    </Link>
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

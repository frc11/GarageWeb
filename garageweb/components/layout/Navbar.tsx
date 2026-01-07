"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { m, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 50);
    });

    const navLinks = [
        { name: "Inicio", href: "/" },
        { name: "Catálogo", href: "/catalogo" },
        { name: "Vender", href: "/vender" },
    ];

    return (
        <>
            <m.nav
                initial="top"
                animate={isScrolled ? "scrolled" : "top"}
                variants={{
                    top: {
                        y: 0,
                        width: "100%",
                        maxWidth: "100%",
                        top: 0,
                        borderRadius: 0,
                        backgroundColor: "rgba(0, 0, 0, 0)",
                        borderBottomColor: "rgba(255, 255, 255, 0.05)",
                        backdropFilter: "blur(0px)",
                        paddingTop: "20px",
                        paddingBottom: "20px",
                        paddingLeft: "24px",
                        paddingRight: "24px",
                        marginTop: "-2px",
                    },
                    scrolled: {
                        y: 0,
                        // CAMBIO: Aumentamos el width base en sticky para que tenga más aire a los lados
                        // Antes: "90%", Ahora: "95%" (o calc(100% - 32px) para margen fijo)
                        width: "calc(100% - 24px)",
                        // CAMBIO: Aumentamos el maxWidth para que en pantallas grandes se expanda más
                        maxWidth: "1280px", // max-w-7xl equivalente
                        top: 20,
                        borderRadius: "9999px",
                        backgroundColor: "rgba(0, 0, 0, 0.8)",
                        borderBottomColor: "rgba(255, 255, 255, 0.1)",
                        backdropFilter: "blur(16px)",
                        paddingTop: "12px",
                        paddingBottom: "12px",
                        // CAMBIO: Paddings laterales más generosos en sticky para centrar contenido visualmente
                        paddingLeft: "32px",
                        paddingRight: "32px"
                    }
                }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="fixed left-1/2 -translate-x-1/2 z-50 border border-transparent shadow-2xl box-border" // Agregado box-border por seguridad
                style={{
                    background: isScrolled ? undefined : "linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)"
                }}
            >
                {/* CAMBIO: Quitamos 'max-w-7xl' aquí porque ya limitamos el ancho en el motion.nav padre.
                   Usamos 'w-full' para que el flex ocupe todo el espacio disponible dentro del pill.
                */}
                <div className="flex items-center justify-between w-full h-full">

                    {/* Logo */}
                    <Link href="/" className="flex items-center shrink-0 relative z-50">
                        <div className="relative w-28 h-9 md:w-40 md:h-12 transition-all duration-300">
                            <Image
                                src="/ElGarageLogo-Modificado.png"
                                alt="El Garage Logo"
                                fill
                                sizes="(max-width: 768px) 112px, 160px"
                                className="object-contain object-left brightness-0 invert" // object-left ayuda a anclarlo visualmente si tiene padding interno la imagen
                                priority
                            />
                        </div>
                    </Link>

                    {/* Desktop Navigation - Centrado Absoluto */}
                    {/* Truco: Usamos posición absoluta para que esté perfectamente al centro, 
                        independientemente del ancho del logo o del botón de contacto */}
                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-10 lg:gap-14">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="relative group"
                            >
                                <span className={cn(
                                    "text-sm font-medium tracking-[0.15em] uppercase transition-colors duration-300",
                                    "text-neutral-300 group-hover:text-white"
                                )}>
                                    {link.name}
                                </span>
                                <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-amber-500 transition-all duration-300 group-hover:w-full" />
                            </Link>
                        ))}
                    </div>

                    {/* Contact Button & Mobile Toggle */}
                    <div className="flex items-center gap-6 shrink-0">
                        <Link
                            href="/contacto"
                            className="hidden md:inline-flex items-center justify-center px-8 py-3 bg-white text-black rounded-full text-xs font-bold uppercase tracking-widest hover:bg-neutral-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                        >
                            Contacto
                        </Link>

                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden text-white p-2 rounded-full hover:bg-white/10 transition-colors relative z-50"
                            aria-label="Toggle Menu"
                        >
                            {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
                        </button>
                    </div>
                </div>
            </m.nav>

            {/* Mobile Menu Overlay - (Sin cambios aquí) */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <m.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="fixed inset-0 z-40 bg-black/95 backdrop-blur-3xl pt-32 px-6 md:hidden flex flex-col items-center justify-center space-y-10"
                    >
                        <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

                        {navLinks.map((link, i) => (
                            <m.div
                                key={link.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * i, duration: 0.5 }}
                            >
                                <Link
                                    href={link.href}
                                    className="text-4xl font-serif font-light text-white tracking-tight hover:text-amber-500 transition-colors"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            </m.div>
                        ))}

                        <m.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="mt-8"
                        >
                            <Link
                                href="/contacto"
                                className="px-10 py-4 bg-white text-black text-sm font-bold uppercase tracking-widest rounded-full hover:bg-neutral-200 transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Contacto
                            </Link>
                        </m.div>
                    </m.div>
                )}
            </AnimatePresence>
        </>
    );
}
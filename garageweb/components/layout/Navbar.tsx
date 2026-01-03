"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Inicio", href: "/" },
        { name: "Catálogo", href: "/catalogo" },
        { name: "Vender", href: "/vender" },
    ];

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                className={cn(
                    "fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl transition-all duration-300",
                    "bg-black/60 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 shadow-2xl shadow-black/20"
                )}
            >
                <div className="flex items-center justify-between h-14">
                    {/* Logo */}
                    <Link href="/" className="flex items-center shrink-0">
                        <Image
                            src="/ElGarageLogo.png"
                            alt="El Garage Logo"
                            width={120}
                            height={40}
                            className="w-auto h-12 object-contain brightness-0 invert" // Ensure it's white if strict white is needed (assuming png is transparent)
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="relative group text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 hover:text-white transition-colors"
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
                            </Link>
                        ))}
                    </div>

                    {/* Contact Button (Desktop) & Mobile Toggle */}
                    <div className="flex items-center gap-4">
                        <Link
                            href="/contacto"
                            className="hidden md:inline-flex items-center justify-center px-5 py-2 bg-white text-black rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-zinc-200 transition-colors"
                        >
                            Contacto
                        </Link>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden text-white p-2 rounded-full hover:bg-white/10 transition-colors"
                        >
                            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-40 bg-black/95 backdrop-blur-3xl pt-32 px-6 md:hidden"
                    >
                        <div className="flex flex-col items-center gap-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-2xl font-serif font-light text-white tracking-wider"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <Link
                                href="/contacto"
                                className="mt-8 px-8 py-4 bg-white text-black rounded-full font-bold uppercase tracking-widest"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Contacto
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

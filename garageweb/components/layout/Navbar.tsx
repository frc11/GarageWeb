"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

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

    return (
        <nav
            className={cn(
                "fixed top-0 z-50 w-full transition-all duration-300",
                isScrolled
                    ? "bg-black/80 backdrop-blur-md border-b border-white/5"
                    : "bg-transparent"
            )}
        >
            <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="text-2xl font-display font-bold text-white tracking-wide">
                    GARAGE
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    <Link href="/" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                        Inicio
                    </Link>
                    <Link href="/catalogo" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                        Catálogo
                    </Link>
                    <Link href="/vender" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                        Vender
                    </Link>
                </div>

                {/* Contact Button (Desktop) */}
                <div className="hidden md:block">
                    <Link
                        href="/contacto"
                        className="bg-white text-black px-6 py-2.5 text-sm font-semibold hover:bg-gray-100 transition-colors"
                    >
                        Contacto
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="md:hidden text-white"
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-20 left-0 w-full bg-black border-b border-white/10 px-6 py-8 flex flex-col gap-6">
                    <Link
                        href="/"
                        className="text-lg font-medium text-white"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Inicio
                    </Link>
                    <Link
                        href="/catalogo"
                        className="text-lg font-medium text-white"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Catálogo
                    </Link>
                    <Link
                        href="/vender"
                        className="text-lg font-medium text-white"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Vender
                    </Link>
                    <Link
                        href="/contacto"
                        className="bg-white text-black text-center px-6 py-3 font-semibold hover:bg-gray-100 transition-colors w-full"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Contacto
                    </Link>
                </div>
            )}
        </nav>
    );
}

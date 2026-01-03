import Link from "next/link";
import { Instagram, MapPin, Mail, Phone } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-black border-t border-white/10 pt-20 pb-10">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div className="space-y-6">
                        <Link href="/" className="text-3xl font-display font-bold text-white tracking-wide">
                            GARAGE
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Redefiniendo el estándar en la comercialización de vehículos de alta gama.
                            Pasión, exclusividad y confianza.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h3 className="text-white font-bold mb-6">Navegación</h3>
                        <ul className="space-y-4">
                            <li>
                                <Link href="/" className="text-gray-400 hover:text-white transition-colors text-sm">
                                    Inicio
                                </Link>
                            </li>
                            <li>
                                <Link href="/catalogo" className="text-gray-400 hover:text-white transition-colors text-sm">
                                    Catálogo
                                </Link>
                            </li>
                            <li>
                                <Link href="/vender" className="text-gray-400 hover:text-white transition-colors text-sm">
                                    Vender
                                </Link>
                            </li>
                            <li>
                                <Link href="/contacto" className="text-gray-400 hover:text-white transition-colors text-sm">
                                    Contacto
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-white font-bold mb-6">Contacto</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-gray-400 text-sm">
                                <MapPin size={18} className="shrink-0 mt-0.5" />
                                <span>Puerto Madero, CABA<br />Argentina</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-400 text-sm">
                                <Mail size={18} className="shrink-0" />
                                <a href="mailto:info@garage.com" className="hover:text-white transition-colors">
                                    info@garage.com
                                </a>
                            </li>
                            <li className="flex items-center gap-3 text-gray-400 text-sm">
                                <Phone size={18} className="shrink-0" />
                                <a href="tel:+5491112345678" className="hover:text-white transition-colors">
                                    +54 9 11 1234-5678
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h3 className="text-white font-bold mb-6">Síguenos</h3>
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                        >
                            <Instagram size={20} />
                            <span className="text-sm">Instagram</span>
                        </a>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-center md:text-left text-gray-500">
                    <p>© {new Date().getFullYear()} GARAGE. Todos los derechos reservados.</p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-gray-300 transition-colors">
                            Privacidad
                        </Link>
                        <Link href="/terms" className="hover:text-gray-300 transition-colors">
                            Términos
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

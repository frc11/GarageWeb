import Link from "next/link";
import { Instagram, Facebook, MapPin, Mail } from "lucide-react";

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
                            <li className="text-gray-400 text-sm">
                                <a
                                    href="https://maps.app.goo.gl/PXUmFowAsKH8FTqPA"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-start gap-3 hover:text-white transition-colors"
                                >
                                    <MapPin size={18} className="shrink-0 mt-0.5" />
                                    <span>Yerba Buena, Tucumán<br />Argentina</span>
                                </a>
                            </li>
                            <li className="flex items-center gap-3 text-gray-400 text-sm">
                                <Mail size={18} className="shrink-0" />
                                <a
                                    href="mailto:elgarageautomoviles@gmail.com?subject=Quiero%20vender%20mi%20auto&body=Hola%2C%20quiero%20m%C3%A1s%20informaci%C3%B3n."
                                    className="hover:text-white transition-colors"
                                >
                                    elgarageautomoviles@gmail.com
                                </a>
                            </li>
                            <li className="flex items-center gap-3 text-gray-400 text-sm">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="shrink-0"
                                >
                                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.463 1.065 2.876 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                                </svg>
                                <a
                                    href="https://wa.me/5493814154708?text=Hola!%20Quiero%20consultar%20para%20vender%20mi%20auto."
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-white transition-colors"
                                >
                                    +54 9 381 415-4708
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h3 className="text-white font-bold mb-6">Síguenos</h3>
                        <div className="flex flex-col gap-4">
                            <a
                                href="https://www.instagram.com/elgarageautomoviles/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                            >
                                <Instagram size={20} />
                                <span className="text-sm">Instagram</span>
                            </a>
                            <a
                                href="https://www.facebook.com/profile.php?id=100072796362811&ref=pl_edit_ig_profile_ac"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                            >
                                <Facebook size={20} />
                                <span className="text-sm">Facebook</span>
                            </a>
                        </div>
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

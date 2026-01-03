"use client";

import { useState } from "react";
import Image from "next/image";
import { MapPin, Clock, Phone, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        message: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const text = `Hola! Mi nombre es ${formData.name}. Mi teléfono es ${formData.phone}. Mi consulta es: ${formData.message}`;
        const encodedText = encodeURIComponent(text);
        window.open(`https://wa.me/5493814154708?text=${encodedText}`, '_blank');
    };

    return (
        <main className="pt-32 pb-24 bg-black min-h-screen">
            <div className="container mx-auto px-6">

                {/* Header */}
                <div className="text-center space-y-4 mb-20">
                    <h1 className="text-4xl md:text-6xl font-display font-bold text-white tracking-tight">
                        VISÍTANOS
                    </h1>
                    <p className="text-xl text-gray-400 font-light max-w-2xl mx-auto">
                        Una experiencia de compra personalizada en nuestro showroom exclusivo.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
                    {/* Left Column: Contact Info */}
                    <div className="space-y-16">
                        <div className="space-y-8">
                            <div className="flex gap-6 items-start">
                                <MapPin className="text-white shrink-0 mt-1" size={32} />
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">Showroom Principal</h3>
                                    <p className="text-gray-400 text-lg leading-relaxed">
                                        <a
                                            href="https://maps.app.goo.gl/PXUmFowAsKH8FTqPA"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:text-white transition-colors"
                                        >
                                            Yerba Buena, Tucumán, Argentina
                                        </a>
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-6 items-start">
                                <Clock className="text-white shrink-0 mt-1" size={32} />
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">Horarios de Atención</h3>
                                    <p className="text-gray-400 text-lg leading-relaxed">
                                        Lunes a Viernes: 10:00 - 19:00<br />
                                        Sábados: 10:00 - 14:00 (Con cita previa)
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-6 items-start">
                                <Phone className="text-white shrink-0 mt-1" size={32} />
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">Contacto Directo</h3>
                                    <div className="text-gray-400 text-lg leading-relaxed flex flex-col gap-1">
                                        <a
                                            href="https://wa.me/5493814154708?text=Hola!%20Quiero%20consultar%20para%20vender%20mi%20auto."
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:text-white transition-colors"
                                        >
                                            +54 9 381 415-4708
                                        </a>
                                        <a
                                            href="mailto:elgarageautomoviles@gmail.com"
                                            className="hover:text-white transition-colors"
                                        >
                                            elgarageautomoviles@gmail.com
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* General Inquiry Form */}
                        <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
                            <h3 className="text-xl font-bold text-white mb-6">Consulta General</h3>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Nombre Completo</Label>
                                    <Input
                                        id="name"
                                        placeholder="Tu nombre"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Número de Teléfono</Label>
                                    <Input
                                        id="phone"
                                        type="tel"
                                        placeholder="Tu número (ej: +54 9 381...)"
                                        required
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="message">Mensaje</Label>
                                    <Textarea
                                        id="message"
                                        placeholder="¿En qué podemos ayudarte?"
                                        required
                                        value={formData.message}
                                        onChange={handleChange}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-white text-black font-bold py-3 rounded hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
                                >
                                    {/* Whatsapp Icon */}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.463 1.065 2.876 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                                    </svg>
                                    ENVIAR POR WHATSAPP
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Right Column: Visuals */}
                    <div className="flex flex-col">
                        {/* Showroom Image - Premium Facade */}
                        <div className="relative w-full h-[450px] rounded-t-[12px] overflow-hidden">
                            <Image
                                src="/showroom-facade.png"
                                alt="Fachada Showroom Garage"
                                fill
                                className="object-cover object-top"
                                priority
                            />
                        </div>

                        {/* Map - Dark Mode Location */}
                        <div className="w-full relative">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.8039805712106!2d-65.28765080175678!3d-26.81436944297848!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9422432712fa04b5%3A0x5b8e5424abc337cb!2sEl%20Garage%20Autom%C3%B3viles!5e0!3m2!1ses-419!2sar!4v1767415974545!5m2!1ses-419!2sar"
                                width="100%"
                                height="450"
                                style={{
                                    border: 'none',
                                    borderRadius: '0 0 12px 12px',
                                    filter: 'grayscale(100%) invert(92%) contrast(83%) brightness(90%)',
                                    WebkitFilter: 'grayscale(100%) invert(92%) contrast(83%) brightness(90%)',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                                }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

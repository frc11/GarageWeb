"use client";

import { MapPin, Clock, Phone, Mail, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate form submission
        alert("Mensaje enviado (Simulación). En producción esto conectaría con tu backend o API.");
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
                                        Av. Alicia Moreau de Justo 1500<br />
                                        Puerto Madero, C1107<br />
                                        Buenos Aires, Argentina
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
                                    <p className="text-gray-400 text-lg leading-relaxed">
                                        +54 9 11 1234-5678<br />
                                        ventas@garage-exclusivo.com
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* General Inquiry Form */}
                        <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
                            <h3 className="text-xl font-bold text-white mb-6">Consulta General</h3>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Nombre Completo</Label>
                                    <Input id="name" placeholder="Tu nombre" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="email" placeholder="tu@email.com" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="message">Mensaje</Label>
                                    <Textarea id="message" placeholder="¿En qué podemos ayudarte?" required />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-white text-black font-bold py-3 rounded hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
                                >
                                    <Send size={18} />
                                    ENVIAR MENSAJE
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Right Column: Map */}
                    <div className="h-[600px] lg:h-auto rounded-2xl overflow-hidden border border-white/10 relative">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13136.066850016401!2d-58.36470376174316!3d-34.61205219999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a334d909568285%3A0x6334a170135df389!2sPuerto%20Madero%2C%20CABA!5e0!3m2!1ses-419!2sar!4v1714705000000!5m2!1ses-419!2sar"
                            width="100%"
                            height="100%"
                            style={{ border: 0, filter: "grayscale(100%) invert(1)" }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>

                        {/* Overlay for better integration */}
                        <div className="absolute inset-0 pointer-events-none border border-white/10 rounded-2xl shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]"></div>
                    </div>
                </div>
            </div>
        </main>
    );
}

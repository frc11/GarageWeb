"use client";

import { useState } from "react";
import Image from "next/image";
import { m } from "framer-motion";
import { MapPin, Phone, MessageSquare, ArrowRight, Loader2, ArrowUpRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export default function ContactPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [interest, setInterest] = useState<string>("Comprar");
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        message: ""
    });

    const interests = ["Comprar", "Vender", "Valuación", "Solo Mirar"];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate network request
        await new Promise(resolve => setTimeout(resolve, 1500));

        const text = `*SOLICITUD DE CITA - CONSENCIONARIA*\n\n*INTERÉS:* ${interest}\n\n*CONTACTO:*\n• Nombre: ${formData.name}\n• Tel: ${formData.phone}\n• Email: ${formData.email}\n\n*MENSAJE:*\n${formData.message || "Sin mensaje adicional"}`;
        const encodedText = encodeURIComponent(text);
        window.open(`https://wa.me/5493814663032?text=${encodedText}`, '_blank');
        setIsLoading(false);
    };

    // CLASE CSS PERSONALIZADA PARA AUTOFILL
    // Esta cadena inyecta una sombra interior del color #0a0a0a (neutral-950)
    // y fuerza el texto a blanco cuando el navegador autocompleta.
    const autofillClass = "[&:-webkit-autofill]:shadow-[inset_0_0_0_1000px_#0d0d0d] [&:-webkit-autofill]:[-webkit-text-fill-color:white] [&:-webkit-autofill]:transition-[background-color_5000s_ease-in-out_0s]";

    return (
        <main className="min-h-[100dvh] pt-24.5 bg-neutral-950 text-white selection:bg-amber-500/30">
            <div className="flex flex-col lg:flex-row min-h-[100dvh]">

                {/* Visual Column (Sticky) */}
                <div className="group lg:w-[45%] relative h-[50svh] lg:h-[100dvh] lg:sticky lg:top-0 overflow-hidden border-r border-white/5">
                    <div className="absolute inset-0 z-0">
                        <Image
                            src="/showroom-facade.png"
                            alt="Garage Showroom Ambience"
                            fill
                            className="object-cover opacity-60 lg:grayscale transition-all duration-300 ease-in-out group-hover:grayscale-0 "
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-neutral-950/40" />
                        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/80 to-transparent" />
                    </div>

                    <div className="absolute inset-0 flex flex-col justify-between p-8 lg:p-12 z-10 pointer-events-none">
                        <m.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="mt-20 lg:mt-0"
                        >
                            <span className="inline-block px-3 py-1 mb-6 text-[10px] font-bold tracking-widest uppercase border border-white/20 rounded-full bg-black/20 backdrop-blur-md">
                                La Consecionaria
                            </span>
                            <h1 className="text-5xl lg:text-7xl font-serif tracking-tight leading-[0.9]">
                                VISITA <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">PRIVADA</span>
                            </h1>
                        </m.div>

                        <div className="hidden lg:block space-y-2 text-neutral-400 mb-15">
                            <p className="text-sm font-light tracking-wide">
                                Vehículos seleccionados y asesoramiento premium en Yerba Buena.
                            </p>
                            <p className="text-xs uppercase tracking-widest opacity-50">
                                Vení a conocer la concesionaria.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Interaction Column (Scrollable) */}
                <div className="lg:w-[55%] bg-neutral-950 relative">
                    {/* Background Texture */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

                    <div className="px-6 py-16 lg:px-20 lg:py-24 max-w-2xl mx-auto space-y-20">

                        {/* Atelier Info */}
                        <section className="space-y-12">
                            <m.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="space-y-8"
                            >
                                <div className="space-y-4">
                                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-amber-500/80 flex items-center gap-2">
                                        <MapPin className="w-3 h-3" /> Casa central
                                    </h3>
                                    <p className="text-3xl font-serif leading-tight text-white/90">
                                        Av. Aconquija 1252,<br />
                                        Yerba Buena, Tucumán
                                    </p>
                                    <a
                                        href="https://maps.app.goo.gl/PXUmFowAsKH8FTqPA"
                                        target="_blank"
                                        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-500 hover:text-white transition-colors group"
                                    >
                                        Ver en Mapa <ArrowUpRight className="w-3 h-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                    </a>
                                </div>

                                <div className="flex flex-col md:flex-row gap-8 md:gap-16 pt-8 border-t border-white/5">
                                    <div className="space-y-2">
                                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Semana</h4>
                                        <p className="text-sm text-neutral-300 font-light">Lunes — Viernes</p>
                                        <p className="text-sm text-white font-medium">9:00 — 13:00</p>
                                        <p className="text-sm text-white font-medium">16:30 — 20:30</p>
                                    </div>
                                    <div className="space-y-2">
                                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Fin De semana</h4>
                                        <p className="text-sm text-neutral-300 font-light">Sábados</p>
                                        <p className="text-sm text-white font-medium">10:00 — 13:00</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <a href="tel:+5493814663032" className="px-6 py-3 border border-white/10 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all flex items-center gap-2">
                                        <Phone className="w-3 h-3" /> Llamar
                                    </a>
                                    <a href="https://wa.me/5493814663032" className="px-6 py-3 border border-white/10 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all flex items-center gap-2">
                                        <MessageSquare className="w-3 h-3" /> WhatsApp
                                    </a>
                                </div>
                            </m.div>
                        </section>

                        {/* Priority Access Form */}
                        <section className="space-y-8 relative">
                            <div className="space-y-2">
                                <h2 className="text-2xl font-serif text-white">Veni a visitarnos</h2>
                                <p className="text-sm text-neutral-500 leading-relaxed max-w-md">
                                    Agenda una visita privada o solicita asesoramiento experto.
                                    Su tiempo es nuestra prioridad.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-8">
                                {/* Interest Selector */}
                                <div className="space-y-3">
                                    <Label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Interés Principal</Label>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {interests.map((item) => (
                                            <button
                                                key={item}
                                                type="button"
                                                onClick={() => setInterest(item)}
                                                className={cn(
                                                    "px-4 py-2 text-xs uppercase tracking-widest border transition-all duration-300",
                                                    interest === item
                                                        ? "bg-white text-black border-white font-bold"
                                                        : "bg-transparent text-neutral-500 border-white/10 hover:border-white/30"
                                                )}
                                            >
                                                {item}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Inputs */}
                                <div className="space-y-6">
                                    <div className="group">
                                        <Label htmlFor="name" className="text-[10px] uppercase tracking-widest text-neutral-500 group-focus-within:text-white transition-colors">Nombre Completo</Label>
                                        <Input
                                            id="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            // AQUI APLICAMOS LA CLASE PERSONALIZADA
                                            className={`bg-transparent border-0 border-b border-white/10 rounded-none px-0 py-4 focus-visible:ring-0 focus-visible:border-white transition-colors text-lg placeholder:text-neutral-700 ${autofillClass}`}
                                            placeholder="Ingrese su nombre"
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="group">
                                            <Label htmlFor="phone" className="text-[10px] uppercase tracking-widest text-neutral-500 group-focus-within:text-white transition-colors">Teléfono</Label>
                                            <Input
                                                id="phone"
                                                type="tel"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                required
                                                // AQUI APLICAMOS LA CLASE PERSONALIZADA
                                                className={`bg-transparent border-0 border-b border-white/10 rounded-none px-0 py-4 focus-visible:ring-0 focus-visible:border-white transition-colors text-lg placeholder:text-neutral-700 ${autofillClass}`}
                                                placeholder="+54 9..."
                                            />
                                        </div>
                                        <div className="group">
                                            <Label htmlFor="email" className="text-[10px] uppercase tracking-widest text-neutral-500 group-focus-within:text-white transition-colors">Email</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                // AQUI APLICAMOS LA CLASE PERSONALIZADA
                                                className={`bg-transparent border-0 border-b border-white/10 rounded-none px-0 py-4 focus-visible:ring-0 focus-visible:border-white transition-colors text-lg placeholder:text-neutral-700 ${autofillClass}`}
                                                placeholder="correo@ejemplo.com"
                                            />
                                        </div>
                                    </div>
                                    <div className="group">
                                        <Label htmlFor="message" className="text-[10px] uppercase tracking-widest text-neutral-500 group-focus-within:text-white transition-colors">Mensaje (Opcional)</Label>
                                        <Textarea
                                            id="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            // AQUI APLICAMOS LA CLASE PERSONALIZADA
                                            className={`bg-transparent border-0 border-b border-white/10 rounded-none px-0 py-4 focus-visible:ring-0 focus-visible:border-white transition-colors text-lg placeholder:text-neutral-700 min-h-[80px] resize-none ${autofillClass}`}
                                            placeholder="Detalles sobre su visita..."
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="group w-full bg-white text-black py-5 px-6 flex items-center justify-between hover:bg-neutral-200 transition-colors disabled:opacity-50"
                                >
                                    <span className="text-xs font-bold uppercase tracking-[0.2em]">
                                        {isLoading ? "Enviando..." : "Solicitar Cita"}
                                    </span>
                                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                                </button>
                            </form>
                        </section>

                        {/* Map Integration */}
                        <div className="w-full h-[300px] rounded-lg overflow-hidden border border-white/5 relative group grayscale hover:grayscale-0 transition-all duration-700">
                            <div className="absolute inset-0 bg-neutral-900 z-0 animate-pulse" /> {/* Placeholder while loading */}
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.8039805712106!2d-65.28765080175678!3d-26.81436944297848!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9422432712fa04b5%3A0x5b8e5424abc337cb!2sEl%20Garage%20Autom%C3%B3viles!5e0!3m2!1ses-419!2sar!4v1767415974545!5m2!1ses-419!2sar"
                                width="100%"
                                height="100%"
                                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="relative z-10 opacity-80 group-hover:opacity-100 transition-opacity"
                            />
                            {/* Overlay to darken the inverted map */}
                            <div className="absolute inset-0 bg-black/20 pointer-events-none z-20 mix-blend-multiply" />
                        </div>

                        <footer className="pt-12 text-center text-neutral-600 text-xs tracking-widest uppercase mb-12">
                            © 2026 Garage. Todos los derechos reservados.
                        </footer>

                    </div>
                </div>
            </div>
        </main>
    );
}
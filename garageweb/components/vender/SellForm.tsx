"use client";

import { useState } from "react";
import { m } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function SellForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        brand: "",
        model: "",
        year: "",
        mileage: "",
        name: "",
        phone: "",
        email: "",
        message: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate network delay for effect
        await new Promise(resolve => setTimeout(resolve, 1500));

        const message = `*SOLICITUD DE TASACIÓN - EL GARAGE*\n\n*VEHÍCULO:*\n• Marca: ${formData.brand}\n• Modelo: ${formData.model}\n• Año: ${formData.year}\n• Km: ${formData.mileage}\n\n*CONTACTO:*\n• Nombre: ${formData.name}\n• Tel: ${formData.phone}\n• Email: ${formData.email}\n\n*NOTAS:*\n${formData.message || "Sin notas adicionales"}`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/+5493814154708?text=${encodedMessage}`;

        window.open(whatsappUrl, '_blank');
        setIsLoading(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const inputClasses = "bg-neutral-100 dark:bg-white/5 border-0 focus-visible:ring-1 focus-visible:ring-amber-500 text-black py-6 transition-all duration-300 placeholder:text-neutral-500/50";
    const labelClasses = "text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 mb-2 block";

    return (
        <m.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="space-y-12"
        >
            {/* Section 1: The Asset */}
            <div className="space-y-8">
                <div className="flex items-center gap-4">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full border border-neutral-700 text-[10px] text-neutral-400 font-mono">01</span>
                    <h3 className="text-sm font-bold text-white uppercase tracking-widest">Vehículo</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-10">
                    <div className="space-y-2">
                        <label htmlFor="brand" className={labelClasses}>Marca</label>
                        <Input
                            id="brand"
                            name="brand"
                            placeholder="FERRARI"
                            required
                            value={formData.brand}
                            onChange={handleChange}
                            className={inputClasses}
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="model" className={labelClasses}>Modelo</label>
                        <Input
                            id="model"
                            name="model"
                            placeholder="488 PISTA"
                            required
                            value={formData.model}
                            onChange={handleChange}
                            className={inputClasses}
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="year" className={labelClasses}>Año</label>
                        <Input
                            id="year"
                            name="year"
                            type="number"
                            placeholder="2020"
                            required
                            value={formData.year}
                            onChange={handleChange}
                            className={inputClasses}
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="mileage" className={labelClasses}>Kilometraje</label>
                        <Input
                            id="mileage"
                            name="mileage"
                            type="number"
                            placeholder="3200"
                            required
                            value={formData.mileage}
                            onChange={handleChange}
                            className={inputClasses}
                        />
                    </div>
                </div>
            </div>

            {/* Section 2: The Owner */}
            <div className="space-y-8">
                <div className="flex items-center gap-4">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full border border-neutral-700 text-[10px] text-neutral-400 font-mono">02</span>
                    <h3 className="text-sm font-bold text-white uppercase tracking-widest">Propietario</h3>
                </div>

                <div className="space-y-6 pl-10">
                    <div className="space-y-2">
                        <label htmlFor="name" className={labelClasses}>Nombre Completo</label>
                        <Input
                            id="name"
                            name="name"
                            placeholder="JUAN PÉREZ"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className={inputClasses}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label htmlFor="phone" className={labelClasses}>Teléfono / WhatsApp</label>
                            <Input
                                id="phone"
                                name="phone"
                                type="tel"
                                placeholder="+54 9 11..."
                                required
                                value={formData.phone}
                                onChange={handleChange}
                                className={inputClasses}
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="email" className={labelClasses}>Email</label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="juan@ejemplo.com"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className={inputClasses}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="message" className={labelClasses}>Notas Adicionales</label>
                        <Textarea
                            id="message"
                            name="message"
                            placeholder="Equipamiento opcional, historial de services..."
                            value={formData.message}
                            onChange={handleChange}
                            className={cn(inputClasses, "min-h-[100px] resize-none")}
                        />
                    </div>
                </div>
            </div>

            <div className="pl-10 pt-4">
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full relative group bg-white hover:bg-neutral-200 text-black font-bold py-5 px-8 transition-all duration-300 flex items-center justify-between overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    <span className="relative z-10 text-sm uppercase tracking-[0.2em]">
                        {isLoading ? "Procesando Solicitud..." : "Solicitar Valuación"}
                    </span>

                    <div className="relative z-10 flex items-center justify-center w-8 h-8 rounded-full bg-black text-white group-hover:scale-110 transition-transform duration-300">
                        {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
                    </div>

                    {/* Button Hover Effect */}
                    <div className="absolute inset-0 bg-blue-50 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                </button>
                <p className="mt-4 text-center text-[10px] text-neutral-600 uppercase tracking-wider">
                    Su solicitud es confidencial y sin compromiso de venta.
                </p>
            </div>
        </m.form>
    );
}

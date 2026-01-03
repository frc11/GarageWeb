"use client";

import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function SellForm() {
    const [formData, setFormData] = useState({
        brand: "",
        model: "",
        year: "",
        mileage: "",
        name: "",
        phone: "",
        message: ""
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const message = `Hola El Garage, me interesa tasar mi vehículo:
- Marca: ${formData.brand}
- Modelo: ${formData.model}
- Año: ${formData.year}
- Kilometraje: ${formData.mileage}
- Mi Nombre: ${formData.name}
- Contacto: ${formData.phone}
- Notas: ${formData.message || "N/A"}`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/+5493814154708?text=${encodedMessage}`;

        window.open(whatsappUrl, '_blank');
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="brand">Marca</Label>
                    <Input
                        id="brand"
                        name="brand"
                        placeholder="Ej: Porsche"
                        required
                        value={formData.brand}
                        onChange={handleChange}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="model">Modelo</Label>
                    <Input
                        id="model"
                        name="model"
                        placeholder="Ej: 911 Carrera S"
                        required
                        value={formData.model}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="year">Año</Label>
                    <Input
                        id="year"
                        name="year"
                        type="number"
                        placeholder="2020"
                        required
                        value={formData.year}
                        onChange={handleChange}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="mileage">Kilometraje</Label>
                    <Input
                        id="mileage"
                        name="mileage"
                        type="number"
                        placeholder="15000"
                        required
                        value={formData.mileage}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="name">Tu Nombre</Label>
                <Input
                    id="name"
                    name="name"
                    placeholder="Juan Pérez"
                    required
                    value={formData.name}
                    onChange={handleChange}
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="phone">Tu Teléfono</Label>
                <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+54 9 11..."
                    required
                    value={formData.phone}
                    onChange={handleChange}
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="message">Información Adicional (Opcional)</Label>
                <Textarea
                    id="message"
                    name="message"
                    placeholder="Estado de los neumáticos, services oficiales, accesorios..."
                    value={formData.message}
                    onChange={handleChange}
                />
            </div>

            <button
                type="submit"
                className="w-full bg-white text-black font-bold py-4 rounded hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
            >
                {/* Icono de WhatsApp SVG */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="mr-2"
                >
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.463 1.065 2.876 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
                SOLICITAR TASACIÓN
            </button>
        </form>
    );
}

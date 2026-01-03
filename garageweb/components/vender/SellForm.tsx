"use client";

import { useState } from "react";
import { Send } from "lucide-react";
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

        const text = `Hola, quiero tasar mi vehículo:%0A%0A- Marca: ${formData.brand}%0A- Modelo: ${formData.model}%0A- Año: ${formData.year}%0A- Km: ${formData.mileage}%0A%0A- Nombre: ${formData.name}%0A- Mensaje: ${formData.message}`;

        window.open(`https://wa.me/5491112345678?text=${text}`, '_blank');
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
                <Send size={18} />
                SOLICITAR TASACIÓN
            </button>
        </form>
    );
}

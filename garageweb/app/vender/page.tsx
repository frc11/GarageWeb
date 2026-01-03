import type { Metadata } from "next";
import { SellForm } from "@/components/vender/SellForm";
import { Camera, FileCheck, DollarSign } from "lucide-react";

export const metadata: Metadata = {
    title: "Vender mi Auto | Garage",
    description: "Consigna tu vehículo exótico con nosotros. Tasación profesional y máxima confidencialidad.",
};

export default function SellPage() {
    return (
        <main className="pt-32 pb-24 bg-black min-h-screen">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                    {/* Left Column: Info */}
                    <div className="space-y-12">
                        <div className="space-y-6">
                            <h1 className="text-4xl md:text-6xl font-display font-bold text-white tracking-tight leading-tight">
                                VENDEMOS <br />
                                TU VEHÍCULO
                            </h1>
                            <p className="text-xl text-gray-400 font-light leading-relaxed max-w-lg">
                                Gestión integral, confidencialidad absoluta y la mejor exposición del mercado para tu unidad.
                            </p>
                        </div>

                        <div className="space-y-8">
                            <div className="flex gap-6">
                                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                                    <FileCheck className="text-white" size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">1. Evaluación</h3>
                                    <p className="text-gray-400 leading-relaxed">
                                        Analizamos el estado de tu vehículo, historial de mantenimiento y documentación para ofrecerte una tasación justa de mercado.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-6">
                                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                                    <Camera className="text-white" size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">2. Producción</h3>
                                    <p className="text-gray-400 leading-relaxed">
                                        Realizamos una sesión de fotos y video profesional para destacar cada detalle de tu unidad en nuestras plataformas.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-6">
                                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                                    <DollarSign className="text-white" size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">3. Venta</h3>
                                    <p className="text-gray-400 leading-relaxed">
                                        Nos encargamos de todo el proceso de negociación, cobro y transferencia. Tú solo recibes el pago.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Form */}
                    <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
                        <h2 className="text-2xl font-bold text-white mb-6">Solicita tu Tasación</h2>
                        <SellForm />
                    </div>

                </div>
            </div>
        </main>
    );
}

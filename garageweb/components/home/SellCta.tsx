"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function SellCta() {
    return (
        <section className="py-32 bg-neutral-900 border-t border-white/5">
            <div className="container mx-auto px-6">
                <div className="max-w-3xl mx-auto text-center space-y-8">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight uppercase"
                    >
                        ¿Quieres vender tu exótico?
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-lg md:text-xl text-gray-400 font-light leading-relaxed"
                    >
                        Gestionamos la venta de tu vehículo con la máxima confidencialidad
                        y exposición a nuestra cartera de clientes selectos.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <Link
                            href="/vender"
                            className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 font-bold hover:bg-gray-100 transition-colors rounded-none"
                        >
                            Contactar Tasador
                            <ArrowRight size={20} />
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

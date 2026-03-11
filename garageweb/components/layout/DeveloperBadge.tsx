"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export function DeveloperBadge() {
    return (
        <Link
            href="https://develop-portfolio.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center"
        >
            <motion.div
                // CAMBIO: En móvil ya tiene borde brillante y fondo activo (border-white/20 bg-white/10).
                // En desktop (lg:) vuelve al estado apagado por defecto.
                className="relative flex items-center gap-3 px-4 py-2 rounded-full overflow-hidden transition-colors duration-500 backdrop-blur-sm
                           border-white/20 bg-white/10 
                           lg:bg-white/5 lg:border-white/10 
                           lg:group-hover:border-white/20 lg:group-hover:bg-white/10"
                initial="initial"
                whileHover="whileHover"
            >
                {/* 1. THE LOGO MARK */}
                <motion.div
                    className="relative w-6 h-6 flex items-center justify-center"
                // CAMBIO: Usamos variantes condicionales no es fácil con CSS puro en framer, 
                // así que usaremos CSS classes para el estado base móvil y Framer solo para la animación desktop.
                >
                    <Image
                        src="/logo-develop.png"
                        alt="develOP Logo"
                        width={24}
                        height={24}
                        // CAMBIO: 
                        // Móvil: Sin filtros (color y brillo full).
                        // Desktop (lg:): Grayscale y opacidad baja por defecto, full al hover del grupo.
                        className="object-contain transition-all duration-300
                                   filter grayscale-0 opacity-100 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] scale-110
                                   lg:grayscale lg:opacity-70 lg:drop-shadow-none lg:scale-100
                                   lg:group-hover:grayscale-0 lg:group-hover:opacity-100 lg:group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] lg:group-hover:scale-110"
                    />
                </motion.div>

                {/* 2. THE TEXT INTERACTION */}
                <div className="flex flex-col items-start justify-center overflow-hidden h-4 relative w-[100px]">

                    {/* TEXTO 1: develOP */}
                    <span
                        // CAMBIO:
                        // Móvil: Siempre visible (opacity-100, translate-y-0).
                        // Desktop: Visible por defecto, se oculta al hover (-translate-y-full).
                        className="font-mono text-[13px] font-bold tracking-[0.2em] leading-none absolute left-3 transition-all duration-300
                                   text-white opacity-100 translate-y-0
                                   lg:text-white/50 
                                   lg:group-hover:-translate-y-[20px] lg:group-hover:opacity-0"
                    >
                        develOP
                    </span>

                    {/* TEXTO 2: code and design */}
                    <span
                        // CAMBIO:
                        // Móvil: Siempre oculto (hidden o opacity-0 permanente).
                        // Desktop: Oculto por defecto (translate-y-full), aparece al hover.
                        className="font-mono text-[10px] font-bold text-white tracking-widest whitespace-nowrap leading-none absolute left-0 transition-all duration-300
                                   opacity-0 translate-y-[20px]
                                   lg:group-hover:translate-y-0 lg:group-hover:opacity-100"
                    >
                        code and design
                    </span>
                </div>

                {/* 3. BORDER GLOW ANIMATION */}
                {/* CAMBIO: En móvil el borde cian ya está presente suavemente o lo quitamos si prefieres el estilo "activo" blanco.
                    Aquí lo dejaré activo en móvil también para que resalte. */}
                <div className="absolute inset-0 rounded-full border transition-colors duration-300
                                border-cyan-500/30
                                lg:border-transparent lg:group-hover:border-cyan-500/50"
                />
            </motion.div>
        </Link>
    );
}
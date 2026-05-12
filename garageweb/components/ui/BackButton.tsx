"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export function BackButton() {
    const router = useRouter();

    return (
        <button
            onClick={() => router.back()}
            aria-label="Volver a la pÃ¡gina anterior"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 backdrop-blur-md bg-black/30 px-4 py-2 rounded-full border border-white/10 transition-colors text-sm font-medium uppercase tracking-wider focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/30"
        >
            <ArrowLeft size={16} />
            Volver
        </button>
    );
}

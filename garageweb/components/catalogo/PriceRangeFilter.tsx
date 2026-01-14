"use client";

import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

interface PriceRangeFilterProps {
    min: number;
    max: number;
    onChange: (range: [number, number]) => void;
    className?: string;
}

export function PriceRangeFilter({ min, max, onChange, className }: PriceRangeFilterProps) {
    const [minVal, setMinVal] = useState(min);
    const [maxVal, setMaxVal] = useState(max);
    const minGap = 1000; // Minimum gap of $1,000

    useEffect(() => {
        setMinVal(min);
        setMaxVal(max);
    }, [min, max]);

    const getPercent = useCallback((value: number) =>
        Math.round(((value - min) / (max - min)) * 100),
        [min, max]);

    const handleMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.min(Number(event.target.value), maxVal - minGap);
        setMinVal(value);
    };

    const handleMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.max(Number(event.target.value), minVal + minGap);
        setMaxVal(value);
    };

    const handleCommit = () => {
        onChange([minVal, maxVal]);
    };

    const formatMoney = (value: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0,
        }).format(value);
    };

    return (
        <div className={cn("w-full min-w-[200px] px-2", className)}>
            {/* Estilos para asegurar que los inputs sean 'agarrables' pero invisibles */}
            <style jsx global>{`
        .thumb-interact::-webkit-slider-thumb {
          pointer-events: auto;
          cursor: grab;
          -webkit-appearance: none;
          height: 24px; /* Área táctil más grande */
          width: 24px;
          border-radius: 50%;
          background: transparent;
          margin-top: -10px;
        }
        .thumb-interact::-moz-range-thumb {
          pointer-events: auto;
          cursor: grab;
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: transparent;
          border: none;
        }
      `}</style>

            <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">Rango de Precio</span>
                <div className="flex items-center gap-2">
                    <span className="bg-zinc-800 px-2 py-1 rounded text-xs font-mono text-white">{formatMoney(minVal)}</span>
                    <span className="text-zinc-600">-</span>
                    <span className="bg-zinc-800 px-2 py-1 rounded text-xs font-mono text-white">{formatMoney(maxVal)}</span>
                </div>
            </div>

            <div className="relative w-full h-8 flex items-center">
                {/* Track Fondo */}
                <div className="absolute w-full h-1 bg-zinc-800 rounded-full z-0" />

                {/* Track Activo (Relleno) */}
                <div
                    className="absolute h-1 bg-gradient-to-r from-amber-600 to-amber-400 rounded-full z-10 opacity-80"
                    style={{
                        left: `${getPercent(minVal)}%`,
                        width: `${getPercent(maxVal) - getPercent(minVal)}%`
                    }}
                />

                {/* --- CIRCULITOS VISUALES (Visual Thumbs) --- */}
                {/* Min Thumb Visual */}
                <div
                    className="absolute h-4 w-4 bg-white rounded-full shadow-[0_0_10px_rgba(245,158,11,0.5)] border-2 border-amber-500 z-20 pointer-events-none transition-transform"
                    style={{
                        left: `${getPercent(minVal)}%`,
                        transform: 'translateX(-50%) scale(1.1)' // Centrado exacto
                    }}
                />
                {/* Max Thumb Visual */}
                <div
                    className="absolute h-4 w-4 bg-white rounded-full shadow-[0_0_10px_rgba(245,158,11,0.5)] border-2 border-amber-500 z-20 pointer-events-none transition-transform"
                    style={{
                        left: `${getPercent(maxVal)}%`,
                        transform: 'translateX(-50%) scale(1.1)'
                    }}
                />

                {/* Inputs Invisibles para Interacción */}
                <input
                    type="range"
                    min={min}
                    max={max}
                    value={minVal}
                    onChange={handleMinChange}
                    onMouseUp={handleCommit}
                    onTouchEnd={handleCommit}
                    className="thumb-interact absolute pointer-events-none appearance-none z-30 h-full w-full opacity-0"
                    style={{ zIndex: minVal > max - 1000 ? "50" : "30" }}
                />
                <input
                    type="range"
                    min={min}
                    max={max}
                    value={maxVal}
                    onChange={handleMaxChange}
                    onMouseUp={handleCommit}
                    onTouchEnd={handleCommit}
                    className="thumb-interact absolute pointer-events-none appearance-none z-30 h-full w-full opacity-0"
                    style={{ zIndex: 40 }}
                />
            </div>
        </div>
    );
}

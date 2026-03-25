"use client";

import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

interface PriceRangeFilterProps {
    min: number;
    max: number;
    value?: [number, number];
    onChange: (range: [number, number]) => void;
    className?: string;
}

export function PriceRangeFilter({ min, max, value, onChange, className }: PriceRangeFilterProps) {
    const [minVal, setMinVal] = useState(min);
    const [maxVal, setMaxVal] = useState(max);

    // Texto editable (sin símbolo de moneda para facilitar edición)
    const [minText, setMinText] = useState(String(min));
    const [maxText, setMaxText] = useState(String(max));

    const minGap = Math.max(1, Math.round((max - min) * 0.05));

    useEffect(() => {
        if (value) {
            setMinVal(value[0]);
            setMaxVal(value[1]);
            setMinText(String(value[0]));
            setMaxText(String(value[1]));
        }
    }, [value]);

    useEffect(() => {
        if (!value) {
            setMinVal(min);
            setMaxVal(max);
            setMinText(String(min));
            setMaxText(String(max));
        }
    }, [min, max]);

    const getPercent = useCallback(
        (val: number) => Math.round(((val - min) / (max - min)) * 100),
        [min, max]
    );

    const formatMoney = (val: number) =>
        new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
        }).format(val);

    // --- Slider handlers ---
    const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const v = Math.min(Number(e.target.value), maxVal - minGap);
        setMinVal(v);
        setMinText(String(v));
    };

    const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const v = Math.max(Number(e.target.value), minVal + minGap);
        setMaxVal(v);
        setMaxText(String(v));
    };

    const handleCommit = () => onChange([minVal, maxVal]);

    // --- Editable input handlers ---
    const commitMinText = () => {
        const parsed = parseInt(minText.replace(/[^\d]/g, ""), 10);
        if (!isNaN(parsed)) {
            const clamped = Math.max(min, Math.min(parsed, maxVal - minGap));
            setMinVal(clamped);
            setMinText(String(clamped));
            onChange([clamped, maxVal]);
        } else {
            setMinText(String(minVal));
        }
    };

    const commitMaxText = () => {
        const parsed = parseInt(maxText.replace(/[^\d]/g, ""), 10);
        if (!isNaN(parsed)) {
            const clamped = Math.min(max, Math.max(parsed, minVal + minGap));
            setMaxVal(clamped);
            setMaxText(String(clamped));
            onChange([minVal, clamped]);
        } else {
            setMaxText(String(maxVal));
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent, commit: () => void) => {
        if (e.key === "Enter") {
            (e.target as HTMLInputElement).blur();
            commit();
        }
    };

    return (
        <div className={cn("w-full min-w-[200px] px-2", className)}>
            <style jsx global>{`
        /* Thumb invisible con hitbox grande */
        .thumb-pr::-webkit-slider-thumb {
          pointer-events: auto;
          cursor: grab;
          -webkit-appearance: none;
          height: 44px;
          width: 44px;
          border-radius: 50%;
          background: transparent;
          margin-top: -20px;
        }
        .thumb-pr::-moz-range-thumb {
          pointer-events: auto;
          cursor: grab;
          height: 44px;
          width: 44px;
          border-radius: 50%;
          background: transparent;
          border: none;
        }
      `}</style>

            <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">Rango de Precio</span>
                <div className="flex items-center gap-1">
                    {/* Prefijo $ estático + input editable */}
                    <div className="flex items-center bg-zinc-800 rounded px-2 py-1 border border-transparent focus-within:border-amber-500 transition-colors">
                        <span className="text-xs font-mono text-zinc-400">$</span>
                        <input
                            type="number"
                            value={minText}
                            onChange={e => setMinText(e.target.value)}
                            onBlur={commitMinText}
                            onKeyDown={e => handleKeyDown(e, commitMinText)}
                            className="w-[60px] bg-transparent text-xs font-mono text-white text-center focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                        />
                    </div>
                    <span className="text-zinc-600">-</span>
                    <div className="flex items-center bg-zinc-800 rounded px-2 py-1 border border-transparent focus-within:border-amber-500 transition-colors">
                        <span className="text-xs font-mono text-zinc-400">$</span>
                        <input
                            type="number"
                            value={maxText}
                            onChange={e => setMaxText(e.target.value)}
                            onBlur={commitMaxText}
                            onKeyDown={e => handleKeyDown(e, commitMaxText)}
                            className="w-[60px] bg-transparent text-xs font-mono text-white text-center focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                        />
                    </div>
                </div>
            </div>

            <div className="relative w-full h-10 flex items-center">
                {/* Track Fondo */}
                <div className="absolute w-full h-1 bg-zinc-800 rounded-full z-0" />

                {/* Track Activo */}
                <div
                    className="absolute h-1 bg-gradient-to-r from-amber-600 to-amber-400 rounded-full z-10 opacity-80"
                    style={{
                        left: `${getPercent(minVal)}%`,
                        width: `${getPercent(maxVal) - getPercent(minVal)}%`,
                    }}
                />

                {/* Thumb Visual Min */}
                <div
                    className="absolute h-4 w-4 bg-white rounded-full shadow-[0_0_10px_rgba(245,158,11,0.5)] border-2 border-amber-500 z-20 pointer-events-none"
                    style={{ left: `${getPercent(minVal)}%`, transform: "translateX(-50%)" }}
                />
                {/* Thumb Visual Max */}
                <div
                    className="absolute h-4 w-4 bg-white rounded-full shadow-[0_0_10px_rgba(245,158,11,0.5)] border-2 border-amber-500 z-20 pointer-events-none"
                    style={{ left: `${getPercent(maxVal)}%`, transform: "translateX(-50%)" }}
                />

                {/* Inputs invisibles */}
                <input
                    type="range"
                    min={min}
                    max={max}
                    value={minVal}
                    onChange={handleMinChange}
                    onMouseUp={handleCommit}
                    onTouchEnd={handleCommit}
                    className="thumb-pr absolute pointer-events-none appearance-none h-full w-full opacity-0"
                    style={{ zIndex: minVal > max - (max - min) / 10 ? 50 : 30 }}
                />
                <input
                    type="range"
                    min={min}
                    max={max}
                    value={maxVal}
                    onChange={handleMaxChange}
                    onMouseUp={handleCommit}
                    onTouchEnd={handleCommit}
                    className="thumb-pr absolute pointer-events-none appearance-none h-full w-full opacity-0"
                    style={{ zIndex: maxVal < min + (max - min) / 10 ? 50 : 40 }}
                />
            </div>
        </div>
    );
}

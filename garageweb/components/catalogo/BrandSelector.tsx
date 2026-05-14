"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface BrandSelectorProps {
    brands: string[];
    selectedBrand: string;
    onBrandChange: (brand: string) => void;
    className?: string;
}

export function BrandSelector({ brands, selectedBrand, onBrandChange, className }: BrandSelectorProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const menuId = "brand-selector-menu";

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    // Use native CSS overscroll behavior instead of blocking wheel events

    const handleSelect = (brand: string) => {
        onBrandChange(brand);
        setIsOpen(false);
    };

    return (
        <div ref={dropdownRef} className={cn("relative select-none", className)}>
            {/* Selector Trigger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                aria-label={selectedBrand === "Todas" ? "Seleccionar marca" : `Marca seleccionada: ${selectedBrand}`}
                aria-expanded={isOpen}
                aria-haspopup="listbox"
                aria-controls={menuId}
                className={cn(
                    "w-full flex items-center justify-between gap-3",
                    "px-6 py-3.5 min-h-11 rounded-2xl",
                    "bg-zinc-900/60 backdrop-blur-xl",
                    "border border-white/10",
                    "text-sm font-medium text-white",
                    "transition-all duration-300",
                    "hover:bg-zinc-900/80 hover:border-white/20",
                    "focus-visible:outline-none focus-visible:border-amber-500/50 focus-visible:ring-1 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
                    isOpen && "border-amber-500/50 ring-2 ring-amber-500/20"
                )}
            >
                <span className="truncate">
                    {selectedBrand === "Todas" ? (
                        <span className="text-zinc-400">Seleccionar Marca</span>
                    ) : (
                        <span className="font-semibold tracking-wide">{selectedBrand}</span>
                    )}
                </span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    aria-hidden="true"
                >
                    <ChevronDown className="w-4 h-4 text-amber-500" />
                </motion.div>
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        ref={menuRef}
                        id={menuId}
                        role="listbox"
                        aria-label="Opciones de marca"
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className={cn(
                            "absolute top-full left-0 right-0 mt-2 z-50",
                            "max-h-[320px] overflow-y-auto overscroll-contain",
                            "bg-zinc-950/95 backdrop-blur-2xl",
                            "border border-white/10 rounded-2xl",
                            "shadow-[0_20px_60px_rgba(0,0,0,0.8)]",
                            // Custom scrollbar
                            "scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20"
                        )}
                    >
                        <div className="p-2">
                            {brands.map((brand, index) => {
                                const isSelected = brand === selectedBrand;
                                return (
                                    <motion.button
                                        key={brand}
                                        onClick={() => handleSelect(brand)}
                                        role="option"
                                        aria-selected={isSelected}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.02 }}
                                        className={cn(
                                            "w-full flex items-center justify-between gap-3",
                                            "px-4 py-3 min-h-11 rounded-xl",
                                            "text-sm font-medium transition-all duration-200",
                                            "group",
                                            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
                                            isSelected
                                                ? "bg-amber-500/20 text-white border border-amber-500/30"
                                                : "text-zinc-400 hover:bg-white/5 hover:text-white border border-transparent"
                                        )}
                                    >
                                        <span className={cn(
                                            "tracking-wide transition-all duration-200",
                                            isSelected && "font-semibold tracking-wider"
                                        )}>
                                            {brand}
                                        </span>
                                        {isSelected && (
                                            <motion.div
                                                initial={{ scale: 0, rotate: -180 }}
                                                animate={{ scale: 1, rotate: 0 }}
                                                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                                            >
                                                <Check className="w-4 h-4 text-amber-500" strokeWidth={3} />
                                            </motion.div>
                                        )}
                                    </motion.button>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

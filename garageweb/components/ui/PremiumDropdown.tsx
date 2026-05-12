"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface PremiumDropdownProps {
    options: string[];
    value: string | null;
    onChange: (value: string | null) => void;
    placeholder?: string;
    className?: string;
    allowClear?: boolean;
}

export function PremiumDropdown({
    options,
    value,
    onChange,
    placeholder = "Select...",
    className,
    allowClear = true
}: PremiumDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const menuId = "premium-dropdown-menu";

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

    // Prevent page scroll when scrolling inside dropdown
    useEffect(() => {
        const menuElement = menuRef.current;
        if (!menuElement || !isOpen) return;

        const handleWheel = (e: WheelEvent) => {
            const { scrollTop, scrollHeight, clientHeight } = menuElement;
            const isAtTop = scrollTop === 0;
            const isAtBottom = scrollTop + clientHeight >= scrollHeight;

            // Prevent page scroll only if we're not at the boundaries
            if (
                (e.deltaY < 0 && !isAtTop) || // Scrolling up and not at top
                (e.deltaY > 0 && !isAtBottom)  // Scrolling down and not at bottom
            ) {
                e.preventDefault();
                e.stopPropagation();
            }
        };

        menuElement.addEventListener("wheel", handleWheel, { passive: false });

        return () => {
            menuElement.removeEventListener("wheel", handleWheel);
        };
    }, [isOpen]);

    const handleSelect = (option: string) => {
        onChange(option);
        setIsOpen(false);
    };

    const displayValue = value || placeholder;
    const hasValue = value !== null && value !== "";

    return (
        <div ref={dropdownRef} className={cn("relative", className)}>
            {/* Selector Trigger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                aria-label={hasValue ? `Seleccionado: ${displayValue}` : placeholder}
                aria-expanded={isOpen}
                aria-haspopup="listbox"
                aria-controls={menuId}
                className={cn(
                    "w-full flex items-center justify-between gap-3",
                    "px-6 py-3.5 min-h-11 rounded-2xl",
                    "bg-zinc-900/60 backdrop-blur-xl",
                    "border border-white/10",
                    "text-sm font-medium",
                    "transition-all duration-300",
                    "hover:bg-zinc-900/80 hover:border-white/20",
                    "focus-visible:outline-none focus-visible:border-amber-500/50 focus-visible:ring-1 focus-visible:ring-white/30",
                    isOpen && "border-amber-500/50 ring-2 ring-amber-500/20"
                )}
            >
                <span className={cn(
                    "truncate",
                    hasValue ? "text-white font-semibold tracking-wide" : "text-zinc-400"
                )}>
                    {displayValue}
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
                        aria-label={placeholder}
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className={cn(
                            "absolute top-full left-0 right-0 mt-2 z-50",
                            "max-h-[280px] overflow-y-auto",
                            "bg-zinc-950/95 backdrop-blur-2xl",
                            "border border-white/10 rounded-2xl",
                            "shadow-[0_20px_60px_rgba(0,0,0,0.8)]",
                            // Custom scrollbar
                            "scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20"
                        )}
                    >
                        <div className="p-2">
                            {/* Clear Option (if allowClear) */}
                            {allowClear && (
                                <motion.button
                                    onClick={() => {
                                        onChange(null);
                                        setIsOpen(false);
                                    }}
                                    role="option"
                                    aria-selected={!hasValue}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0 }}
                                    className={cn(
                                        "w-full flex items-center justify-between gap-3",
                                        "px-4 py-3 min-h-11 rounded-xl",
                                        "text-sm font-medium transition-all duration-200",
                                        "group",
                                        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/30",
                                        !hasValue
                                            ? "bg-amber-500/20 text-white border border-amber-500/30"
                                            : "text-zinc-500 hover:bg-white/5 hover:text-zinc-300 border border-transparent"
                                    )}
                                >
                                    <span className={cn(
                                        "tracking-wide transition-all duration-200 italic",
                                        !hasValue && "font-semibold tracking-wider"
                                    )}>
                                        {placeholder}
                                    </span>
                                    {!hasValue && (
                                        <motion.div
                                            initial={{ scale: 0, rotate: -180 }}
                                            animate={{ scale: 1, rotate: 0 }}
                                            transition={{ type: "spring", stiffness: 200, damping: 15 }}
                                        >
                                            <Check className="w-4 h-4 text-amber-500" strokeWidth={3} />
                                        </motion.div>
                                    )}
                                </motion.button>
                            )}

                            {/* Options */}
                            {options.map((option, index) => {
                                const isSelected = option === value;
                                const animationDelay = allowClear ? (index + 1) * 0.02 : index * 0.02;

                                return (
                                    <motion.button
                                        key={option}
                                        onClick={() => handleSelect(option)}
                                        role="option"
                                        aria-selected={isSelected}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: animationDelay }}
                                        className={cn(
                                            "w-full flex items-center justify-between gap-3",
                                            "px-4 py-3 min-h-11 rounded-xl",
                                            "text-sm font-medium transition-all duration-200",
                                            "group",
                                            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/30",
                                            isSelected
                                                ? "bg-amber-500/20 text-white border border-amber-500/30"
                                                : "text-zinc-400 hover:bg-white/5 hover:text-white border border-transparent"
                                        )}
                                    >
                                        <span className={cn(
                                            "tracking-wide transition-all duration-200",
                                            isSelected && "font-semibold tracking-wider"
                                        )}>
                                            {option}
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

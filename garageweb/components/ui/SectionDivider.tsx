"use client";

import { SECTION_DIVIDERS } from "@/lib/ui-data";
import { DividerPreset } from "@/types/ui";
import { cn } from "@/lib/utils";

interface SectionDividerProps {
    variant: DividerPreset;
    position?: 'top' | 'bottom';
    className?: string;
}

export function SectionDivider({ variant, position = 'top', className }: SectionDividerProps) {
    const divider = SECTION_DIVIDERS.find((d) => d.id === variant);

    if (!divider) return null;

    return (
        <svg
            className={cn(
                "w-full absolute z-10 pointer-events-none",
                position === 'top' ? '-mt-[1px] top-0' : '-mb-[1px] bottom-0 rotate-180',
                className
            )}
            viewBox={divider.viewBox}
            preserveAspectRatio={divider.preserveAspectRatio}
            style={{
                height: 'auto',
                maxHeight: `${divider.height}px`
            }}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d={divider.path} fill="currentColor" />
        </svg>
    );
}

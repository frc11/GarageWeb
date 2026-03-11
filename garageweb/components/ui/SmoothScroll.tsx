"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

function LenisScroller({ children }: { children: React.ReactNode }) {
    const lenisRef = useRef<Lenis | null>(null);
    const pathname = usePathname();

    // 1. Initialize Lenis exactly once to avoid hook dependency size changes
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.5,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential easing
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
        });

        lenisRef.current = lenis;

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
            lenisRef.current = null;
            document.documentElement.style.removeProperty("overflow");
        };
    }, []);

    // 2. Handle route changes: scroll to top
    useEffect(() => {
        if (lenisRef.current) {
            lenisRef.current.scrollTo(0, { immediate: true });
        } else {
            window.scrollTo(0, 0);
        }
    }, [pathname]);

    return <>{children}</>;
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isStudio = pathname?.toLowerCase().includes("/studio");

    // Clear residual classes if navigated directly to Studio without mounting Lenis
    useEffect(() => {
        if (isStudio) {
            document.documentElement.style.overflow = "auto";
            document.documentElement.classList.remove("lenis", "lenis-smooth", "lenis-scrolling", "lenis-stopped");
        }
    }, [isStudio]);

    if (isStudio) {
        return <>{children}</>;
    }

    return <LenisScroller>{children}</LenisScroller>;
}

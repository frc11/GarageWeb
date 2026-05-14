"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const PAUSE_SELECTOR = '[data-lenis-pause="true"], [aria-modal="true"]';

function restoreNativeScroll() {
    document.documentElement.style.removeProperty("overflow");
    document.documentElement.classList.remove("lenis", "lenis-smooth", "lenis-scrolling", "lenis-stopped");
    document.body.classList.remove("lenis", "lenis-smooth", "lenis-scrolling", "lenis-stopped");
}

function isScrollPausedByOverlay() {
    const webkitDocument = document as Document & { webkitFullscreenElement?: Element | null };
    return Boolean(
        document.fullscreenElement ||
        webkitDocument.webkitFullscreenElement ||
        document.querySelector(PAUSE_SELECTOR)
    );
}

function LenisScroller({ children }: { children: ReactNode }) {
    const lenisRef = useRef<Lenis | null>(null);
    const frameRef = useRef<number | null>(null);
    const pathname = usePathname();

    useEffect(() => {
        const motionQuery = window.matchMedia(REDUCED_MOTION_QUERY);
        let lenis: Lenis | null = null;
        let isPaused = false;

        const stopFrame = () => {
            if (frameRef.current !== null) {
                window.cancelAnimationFrame(frameRef.current);
                frameRef.current = null;
            }
        };

        const startFrame = () => {
            if (!lenis || isPaused || frameRef.current !== null) return;

            const raf = (time: number) => {
                if (!lenis || isPaused) {
                    frameRef.current = null;
                    return;
                }

                lenis.raf(time);
                frameRef.current = window.requestAnimationFrame(raf);
            };

            frameRef.current = window.requestAnimationFrame(raf);
        };

        const destroyLenis = () => {
            stopFrame();
            lenis?.destroy();
            lenis = null;
            lenisRef.current = null;
            restoreNativeScroll();
        };

        const syncOverlayPause = () => {
            const shouldPause = isScrollPausedByOverlay();
            if (shouldPause === isPaused) return;

            isPaused = shouldPause;

            if (!lenis) return;

            if (isPaused) {
                lenis.stop();
                stopFrame();
                return;
            }

            lenis.start();
            startFrame();
        };

        const createLenis = () => {
            if (lenis || motionQuery.matches) return;

            lenis = new Lenis({
                duration: 1.5,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                orientation: "vertical",
                gestureOrientation: "vertical",
                smoothWheel: true,
                wheelMultiplier: 1,
                touchMultiplier: 2,
            });

            lenisRef.current = lenis;
            isPaused = isScrollPausedByOverlay();

            if (isPaused) {
                lenis.stop();
            } else {
                startFrame();
            }
        };

        const syncMotionPreference = () => {
            if (motionQuery.matches) {
                destroyLenis();
                return;
            }

            createLenis();
            syncOverlayPause();
        };

        const observer = new MutationObserver(syncOverlayPause);
        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ["data-lenis-pause", "aria-modal", "open"],
        });

        if (typeof motionQuery.addEventListener === "function") {
            motionQuery.addEventListener("change", syncMotionPreference);
        } else {
            motionQuery.addListener(syncMotionPreference);
        }
        document.addEventListener("fullscreenchange", syncOverlayPause);
        document.addEventListener("webkitfullscreenchange", syncOverlayPause);

        syncMotionPreference();

        return () => {
            if (typeof motionQuery.removeEventListener === "function") {
                motionQuery.removeEventListener("change", syncMotionPreference);
            } else {
                motionQuery.removeListener(syncMotionPreference);
            }
            document.removeEventListener("fullscreenchange", syncOverlayPause);
            document.removeEventListener("webkitfullscreenchange", syncOverlayPause);
            observer.disconnect();
            destroyLenis();
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

export function SmoothScroll({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const isStudio = pathname?.toLowerCase().includes("/studio");

    // Clear residual classes if navigated directly to Studio without mounting Lenis
    useEffect(() => {
        if (isStudio) {
            restoreNativeScroll();
            document.documentElement.style.overflow = "auto";
        }
    }, [isStudio]);

    if (isStudio) {
        return <>{children}</>;
    }

    return <LenisScroller>{children}</LenisScroller>;
}

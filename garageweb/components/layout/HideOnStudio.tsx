"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export function HideOnStudio({ children }: { children: ReactNode }) {
    const pathname = usePathname();

    if (pathname?.toLowerCase().includes("/studio")) {
        return null;
    }

    return <>{children}</>;
}

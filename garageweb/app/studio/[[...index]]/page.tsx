"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../sanity.config";

// Interceptar y silenciar el warning inofensivo de React 19 sobre disableTransition en Sanity
if (typeof console !== "undefined") {
    const originalError = console.error;
    console.error = (...args) => {
        if (typeof args[0] === "string" && args[0].includes("disableTransition")) {
            return;
        }
        originalError(...args);
    };
}

export default function StudioPage() {
    return <NextStudio config={config} />;
}

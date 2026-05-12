"use client";

import { Share2 } from "lucide-react";
// import { toast } from "sonner"; // Assuming sonner is used, or basic alert/fallback
import { cn } from "@/lib/utils";

interface ShareButtonProps {
    title: string;
    text: string;
    url: string;
    className?: string;
}

export function ShareButton({ title, text, url, className }: ShareButtonProps) {
    const handleShare = async () => {
        // We concatenate URL + Text to force the order "[Link] [Message]" requested by the user.
        // We omit the 'url' field because usually OS share sheets append it at the end.
        const shareData = {
            title: title,
            text: `${url} ${text}`,
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                // Fallback for browsers that don't support navigator.share
                await navigator.clipboard.writeText(`${url} ${text}`);
                // Simple feedback if no toast library
                alert("Link copiado al portapapeles");
            }
        } catch (err) {
            console.error("Error sharing:", err);
        }
    };

    return (
        <button
            onClick={handleShare}
            className={cn("p-3 min-w-11 min-h-11 flex items-center justify-center rounded-full bg-white/5 text-white hover:bg-white hover:text-black transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/30", className)}
            aria-label="Compartir"
        >
            <Share2 size={18} />
        </button>
    );
}

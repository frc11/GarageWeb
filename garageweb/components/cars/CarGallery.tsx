"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface CarGalleryProps {
    images: string[];
    alt: string;
}

export function CarGallery({ images, alt }: CarGalleryProps) {
    if (!images || images.length === 0) {
        return (
            <div className="relative aspect-[4/3] md:aspect-[16/9] w-full bg-zinc-900 rounded-lg border border-white/10 flex items-center justify-center">
                <p className="text-zinc-500 text-sm uppercase tracking-widest font-medium">
                    No hay fotos del vehículo por el momento
                </p>
            </div>
        );
    }

    const [selectedImage, setSelectedImage] = useState(images[0]);

    // Helper to check if URL is a video
    const isVideo = (url: string) => {
        return url.match(/\.(mp4|webm|mov|m4v)(\?.*)?$/i);
    };

    return (
        <div className="space-y-4">
            {/* Main Image / Video */}
            <div className="relative aspect-[4/3] md:aspect-[16/9] w-full bg-zinc-900 rounded-lg overflow-hidden border border-white/10">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedImage}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0"
                    >
                        {isVideo(selectedImage) ? (
                            <video
                                src={selectedImage}
                                autoPlay
                                muted
                                loop
                                playsInline
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <Image
                                src={selectedImage}
                                alt={alt}
                                fill
                                className="object-cover"
                                priority
                            />
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {images.map((media, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedImage(media)}
                        className={cn(
                            "relative h-20 w-32 shrink-0 rounded-md overflow-hidden border-2 transition-all",
                            selectedImage === media
                                ? "border-white opacity-100"
                                : "border-transparent opacity-60 hover:opacity-100"
                        )}
                    >
                        {isVideo(media) ? (
                            <div className="relative w-full h-full bg-black flex items-center justify-center">
                                <video
                                    src={media}
                                    muted
                                    playsInline
                                    className="w-full h-full object-cover opacity-80"
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                                        <div className="w-2 h-2 bg-white rounded-full ml-0.5 shadow-sm" style={{ clipPath: 'polygon(0 0, 0 100%, 100% 50%)' }} />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <Image
                                src={media}
                                alt={`${alt} thumbnail ${index + 1}`}
                                fill
                                className="object-cover"
                            />
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}

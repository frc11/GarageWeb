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
    const [selectedImage, setSelectedImage] = useState(images[0]);

    return (
        <div className="space-y-4">
            {/* Main Image */}
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
                        <Image
                            src={selectedImage}
                            alt={alt}
                            fill
                            className="object-cover"
                            priority
                        />
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {images.map((image, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedImage(image)}
                        className={cn(
                            "relative h-20 w-32 shrink-0 rounded-md overflow-hidden border-2 transition-all",
                            selectedImage === image
                                ? "border-white opacity-100"
                                : "border-transparent opacity-60 hover:opacity-100"
                        )}
                    >
                        <Image
                            src={image}
                            alt={`${alt} thumbnail ${index + 1}`}
                            fill
                            className="object-cover"
                        />
                    </button>
                ))}
            </div>
        </div>
    );
}

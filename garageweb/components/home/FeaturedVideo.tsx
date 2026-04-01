"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, Maximize } from "lucide-react";

interface FeaturedVideoProps {
    videoUrl: string | null;
}

export function FeaturedVideo({ videoUrl }: FeaturedVideoProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(true);
    const [progress, setProgress] = useState(0);
    const [showControls, setShowControls] = useState(true);
    const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Initial check and autoPlay handling
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.muted = isMuted;
        }
    }, [isMuted]);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const toggleMute = () => {
        setIsMuted(!isMuted);
    };

    const handleProgress = () => {
        if (videoRef.current) {
            const currentProgress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
            setProgress(currentProgress);
        }
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (videoRef.current) {
            const seekTime = (Number(e.target.value) / 100) * videoRef.current.duration;
            videoRef.current.currentTime = seekTime;
            setProgress(Number(e.target.value));
        }
    };

    const toggleFullscreen = () => {
        const video = videoRef.current;
        if (!video) return;
        // iOS Safari requires webkitEnterFullscreen() on the <video> element itself
        if ((video as any).webkitEnterFullscreen) {
            (video as any).webkitEnterFullscreen();
        } else if (video.requestFullscreen) {
            video.requestFullscreen();
        }
    };

    const triggerControlsTimeout = () => {
        setShowControls(true);
        if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
        controlsTimeoutRef.current = setTimeout(() => {
            if (isPlaying) setShowControls(false);
        }, 3000);
    };

    // Alias for mouse and touch
    const handleMouseMove = triggerControlsTimeout;
    const handleTouchStart = triggerControlsTimeout;

    if (!videoUrl) return null;

    return (
        <section
            className="relative w-full bg-[#050505] overflow-hidden py-24 md:py-40 z-10"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => isPlaying && setShowControls(false)}
            onTouchStart={handleTouchStart}
        >
            {/* Top Fade */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-zinc-950 to-transparent z-20 pointer-events-none" />

            {/* Premium Dark Background */}
            <div className="absolute inset-0 z-0 opacity-40">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_#1a1a1a_0%,_transparent_50%)]" />
                <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

                <motion.div
                    animate={{
                        x: [0, 40, 0],
                        y: [0, -40, 0],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-0 right-0 w-[800px] h-[800px] bg-amber-500/10 blur-[150px] rounded-full mix-blend-screen"
                />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Section Title */}
                <div className="flex flex-col items-center mb-12 md:mb-20 space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-4"
                    >
                        <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-amber-500/50" />
                        <span className="text-amber-500 text-[10px] md:text-xs font-bold uppercase tracking-[0.5em] drop-shadow-[0_0_8px_rgba(245,158,11,0.4)]">Exclusivo</span>
                        <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-amber-500/50" />
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-7xl font-black text-white tracking-tighter uppercase text-center leading-none"
                    >
                        Video <span className="text-zinc-600 block md:inline italic font-light opacity-80">Destacado</span>
                    </motion.h2>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="relative w-full max-w-5xl mx-auto rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-white/10 bg-black shadow-[0_48px_100px_-20px_rgba(0,0,0,1)] ring-1 ring-white/5 group"
                >
                    <div className="relative w-full flex items-center justify-center bg-zinc-950 aspect-video md:max-h-[80vh]">
                        <video
                            ref={videoRef}
                            src={videoUrl}
                            autoPlay
                            muted
                            loop
                            playsInline
                            onTimeUpdate={handleProgress}
                            onClick={togglePlay}
                            className="w-full h-full object-contain relative z-10 cursor-pointer"
                        />

                        {/* Custom Controls Overlay */}
                        <AnimatePresence>
                            {(showControls || !isPlaying) && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 z-30 flex flex-col justify-between p-6 md:p-10 pointer-events-none"
                                >
                                    {/* Center Spacer (Removed middle button) */}
                                    <div className="flex-1" />

                                    {/* Bottom Control Bar */}
                                    <motion.div
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        className="w-full max-w-4xl mx-auto bg-black/40 backdrop-blur-2xl border border-white/10 rounded-2xl md:rounded-full p-2 md:p-3 flex items-center gap-4 md:gap-6 pointer-events-auto shadow-2xl"
                                    >
                                        {/* Mini Play Toggle */}
                                        <button onClick={togglePlay} className="text-white hover:text-amber-500 transition-colors p-2">
                                            {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
                                        </button>

                                        {/* Progress Bar Container */}
                                        <div className="flex-1 relative group/progress flex items-center h-full">
                                            <input
                                                type="range"
                                                min="0"
                                                max="100"
                                                value={progress}
                                                onChange={handleSeek}
                                                className="w-full h-1 bg-white/20 rounded-full appearance-none cursor-pointer accent-amber-500 overflow-hidden"
                                                style={{
                                                    background: `linear-gradient(to right, #f59e0b ${progress}%, rgba(255,255,255,0.2) ${progress}%)`
                                                }}
                                            />
                                        </div>

                                        {/* Controls Right */}
                                        <div className="flex items-center gap-2 md:gap-4 pr-2">
                                            <button onClick={toggleMute} className="text-white hover:text-amber-500 transition-colors">
                                                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                                            </button>
                                            <button onClick={toggleFullscreen} className="text-white hover:text-amber-500 transition-colors">
                                                <Maximize className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Elegant Light Reflection */}
                        <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/10 via-transparent to-transparent z-20 opacity-50 transition-opacity duration-700" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

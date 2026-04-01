"use client";

import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
    return (
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ ease: [0.33, 1, 0.68, 1], duration: 0.75 }}
            className="min-h-[100svh]"
        >
            {children}
        </motion.div>
    );
}

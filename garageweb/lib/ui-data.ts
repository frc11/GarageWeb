// garageweb/lib/ui-data.ts
import { SectionDivider, AnimationConfig } from '@/types/ui';

export const SECTION_DIVIDERS: SectionDivider[] = [
    {
        id: "curve-soft",
        name: "Luxury Curve",
        path: "M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
        height: 320,
        viewBox: "0 0 1440 320",
        preserveAspectRatio: "none"
    },
    {
        id: "wave-asymmetric",
        name: "Organic Flow",
        path: "M0,192L60,170.7C120,149,240,107,360,112C480,117,600,171,720,197.3C840,224,960,224,1080,197.3C1200,171,1320,117,1380,90.7L1440,64L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z",
        height: 320,
        viewBox: "0 0 1440 320",
        preserveAspectRatio: "none"
    },
    {
        id: "slant-aggressive",
        name: "Sport Diagonal",
        path: "M0,224L1440,32L1440,320L0,320Z",
        height: 320,
        viewBox: "0 0 1440 320",
        preserveAspectRatio: "none"
    },
    {
        id: "gradient-fade",
        name: "Soft Fade",
        path: "M0,64L1440,0L1440,320L0,320Z",
        height: 120,
        viewBox: "0 0 1440 320",
        preserveAspectRatio: "none"
    }
];

export const UI_ANIMATIONS: AnimationConfig = {
    "fade-up-stagger": {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut",
                staggerChildren: 0.2
            }
        }
    },
    "hero-zoom": {
        hidden: { scale: 1, opacity: 0.8 },
        visible: {
            scale: 1.1,
            opacity: 1,
            transition: {
                duration: 10,
                ease: "linear",
                repeat: Infinity,
                repeatType: "mirror"
            }
        }
    },
    "text-reveal": {
        hidden: { y: "100%", opacity: 0, filter: "blur(5px)" },
        visible: {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            transition: {
                duration: 0.6,
                ease: [0.33, 1, 0.68, 1], // Cubic Bezier para sensación premium
                staggerChildren: 0.05
            }
        }
    }
};

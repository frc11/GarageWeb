// garageweb/types/ui.ts

export type DividerPreset = 'curve-soft' | 'wave-asymmetric' | 'slant-aggressive' | 'gradient-fade';

export interface SectionDivider {
    id: DividerPreset;
    name: string;
    path: string; // SVG 'd' path command
    height: number; // Altura en px
    viewBox: string; // Estrictamente "0 0 1440 320" para escalado full-width
    preserveAspectRatio: string;
    className?: string;
}

export interface AnimationVariant {
    hidden: any; // Framer Motion variant state
    visible: any; // Framer Motion variant state
}

export interface AnimationConfig {
    [key: string]: AnimationVariant;
}

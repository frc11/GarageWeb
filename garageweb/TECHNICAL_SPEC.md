🛠️ TECHNICAL SPECIFICATION: Premium Auto Dealer Platform
Project Name: GarageWeb (Premium Dealer) Stack: Next.js 15 (App Router), TypeScript, Tailwind CSS v4, Framer Motion, Shadcn/UI. Version: 1.0.0

1. Architecture Overview
The application follows a Server-First architecture using Next.js App Router.

Rendering Strategy: Heavy reliance on React Server Components (RSC) for initial load performance and SEO.

Client Components: Restricted strictly to interactive elements (Carousels, Filters, Buttons, Navbar Scroll State).

State Management:

Global UI State: Minimal.

Filter State: URL Search Params (Source of Truth) to ensure shareable links.

Styling: Tailwind CSS v4 using CSS Variables for the "Strict Monochrome" theme.

2. File Structure & Organization
Strict adherence to modular architecture.

Plaintext

src/
├── app/
│   ├── layout.tsx             # Root Layout (Fonts, Global Providers)
│   ├── page.tsx               # Homepage (Landing)
│   ├── catalogo/              # Inventory Page
│   │   ├── page.tsx           # Server Component (Fetches cars)
│   │   └── loading.tsx        # Skeleton Loading
│   └── autos/
│       └── [slug]/            # Dynamic Product Page
│           └── page.tsx       # Server Component (Fetches specific car)
├── components/
│   ├── ui/                    # Shadcn Generic Components (Button, Card, etc.)
│   ├── layout/                # Navbar, Footer, Container
│   ├── home/                  # Hero, FeaturedCars, ValueProps
│   └── cars/                  # CarCard, CarGrid, CarGallery, FilterBar
├── lib/
│   ├── utils.ts               # CN utility (clsx + tailwind-merge)
│   ├── constants.ts           # Static data (Nav links, Socials)
│   └── mock-data.ts           # Temporary inventory data (Phase 1)
├── types/
│   └── index.ts               # Global TypeScript Interfaces
└── styles/
    └── globals.css            # Tailwind v4 configuration + Custom Variables
3. Data Models (TypeScript Interfaces)
Crucial: All components must strictly adhere to these interfaces.

TypeScript

// src/types/index.ts

export type CarStatus = 'available' | 'reserved' | 'sold';

export interface Car {
  id: string;
  slug: string; // url-friendly-name
  brand: string; // e.g., "Porsche"
  model: string; // e.g., "911 Carrera S"
  year: number;
  price: number;
  currency: 'USD' | 'ARS';
  mileage: number; // in km
  transmission: 'Automatic' | 'Manual' | 'PDK' | 'Tiptronic';
  fuelType: 'Petrol' | 'Diesel' | 'Hybrid' | 'Electric';
  images: string[]; // URLs
  videoUrl?: string; // YouTube/Vimeo ID
  description: string;
  features: string[]; // ["Sunroof", "Leather Seats", etc.]
  status: CarStatus;
  isFeatured: boolean; // For homepage
}

export interface FilterState {
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  year?: number;
}
4. Design System & Tokens (Strict Monochrome)
Configuration is handled in globals.css via Tailwind v4 variables.

Colors:

--background: #020202 (Deep Black)

--foreground: #FFFFFF (Pure White)

--card: #0A0A0A (Subtle separation)

--border: #262626 (Neutral-800)

--primary: #FFFFFF (White Buttons)

--primary-foreground: #000000 (Black Text on Buttons)

Typography:

Display Font: Manrope (Variable wght). Used for H1, H2, Prices.

Body Font: Inter. Used for descriptions, specs.

Spacing: Generous whitespace. Standard padding py-20 for sections.

5. Core Components Implementation Details
A. Navbar (src/components/layout/Navbar.tsx)
Type: Client Component ("use client").

Behavior:

Initial state: bg-transparent.

On Scroll > 10px: bg-black/80 + backdrop-blur-md + border-b border-white/10.

Layout: Logo (Left), Desktop Links (Center), Mobile Menu Trigger + CTA (Right).

B. Hero Section (src/components/home/Hero.tsx)
Background: <video> element.

Attributes: autoPlay loop muted playsInline className="object-cover w-full h-full".

Overlay: Absolute div bg-black/40 z-10 over the video.

Animation: Framer Motion initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}.

C. Car Card (src/components/cars/CarCard.tsx)
Visuals: Minimalist.

Image aspect ratio: aspect-[4/3].

Hover effect: Image scales slightly (scale-105), details remain static.

Content: Brand (Small/Gray), Model (Bold/White), Price (Right aligned).

Micro-interaction: "View Details" button appears on hover (Desktop) or static icon (Mobile).

D. WhatsApp Conversion Logic
Link Generation:

TypeScript

const generateMessage = (car: Car) => 
  `https://wa.me/549XXXXXXXXX?text=${encodeURIComponent(`Hola, me interesa el ${car.brand} ${car.model} (${car.year}) publicado en la web.`)}`;
Floating Button: Fixed bottom-6 right-6 z-50.

6. Development Rules (For AI)
Do not create new CSS files. Use Tailwind utility classes for everything.

Use next/link for all internal navigation.

Use next/image for all images with appropriate width, height or fill props.

Error Handling: Always check if optional properties (like videoUrl) exist before rendering.

Responsiveness: Mobile-first approach. Test layouts with grid-cols-1 md:grid-cols-2 lg:grid-cols-3.
import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap"
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

export const metadata: Metadata = {
  title: {
    default: "El Garage | Autos de Lujo y Exóticos",
    template: "%s | El Garage"
  },
  description: "Concesionaria premium en Tucumán. Comercialización de vehículos de alta gama, exclusividad y confianza.",
  keywords: ["autos de lujo", "concesionaria tucuman", "venta de autos", "audi", "bmw", "mercedes benz", "porsche"],
  authors: [{ name: "El Garage Team" }],
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "https://elgarage.com.ar",
    title: 'El Garage | Autos de Lujo y Exóticos',
    description: "La colección de vehículos más exclusiva del norte argentino.",
    siteName: 'El Garage Luxury Cars',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'El Garage Luxury Cars Showroom',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: 'El Garage | Autos de Lujo y Exóticos',
    description: 'Compra, venta y consignación de vehículos exclusivos.',
    images: ['https://images.unsplash.com/photo-1503376763036-066120622c74?q=80&w=1200&auto=format&fit=crop'],
  },
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🏎️</text></svg>',
  },
};

import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { MotionProvider } from "@/components/providers/MotionProvider";

// ... (imports)

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${manrope.variable} ${inter.variable} font-sans bg-black text-white antialiased selection:bg-white selection:text-black`}>
        <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
        <SmoothScroll>
          <MotionProvider>
            <Navbar />
            {children}
            <Footer />
          </MotionProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
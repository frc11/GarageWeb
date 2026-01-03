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
    default: "Garage | Luxury & Exotic Cars",
    template: "%s | Garage"
  },
  description: "Concesionaria líder en vehículos de alta gama y deportivos exóticos. Compra, venta y consignación con máxima confidencialidad.",
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: 'https://garageweb.vercel.app', // URL genérica por ahora
    title: 'Garage | Luxury & Exotic Cars',
    description: 'Concesionaria líder en vehículos de alta gama y deportivos exóticos.',
    siteName: 'Garage Luxury Cars',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1503376763036-066120622c74?q=80&w=1200&auto=format&fit=crop',
        width: 1200,
        height: 630,
        alt: 'Garage Luxury Cars Showroom',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Garage | Luxury & Exotic Cars',
    description: 'Compra, venta y consignación de vehículos exclusivos.',
    images: ['https://images.unsplash.com/photo-1503376763036-066120622c74?q=80&w=1200&auto=format&fit=crop'],
  },
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🏎️</text></svg>',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${manrope.variable} ${inter.variable} font-sans bg-black text-white antialiased`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
import dynamic from "next/dynamic";
import { Hero } from "@/components/home/Hero";
import { BrandMarquee } from "@/components/home/BrandMarquee";
import { getFeaturedCars, getOfferCars, getStockBrands, getFeaturedVideo } from "@/sanity/lib/fetch";

const FeaturedVideoSection = dynamic(
  () => import("@/components/home/FeaturedVideo").then((mod) => mod.FeaturedVideo),
  { loading: () => <FeaturedVideoFallback /> }
);

const FlashPromoSection = dynamic(
  () => import("@/components/home/FlashPromo").then((mod) => mod.FlashPromo),
  { loading: () => <FlashPromoFallback /> }
);

const FeaturedCarsSection = dynamic(
  () => import("@/components/home/FeaturedCars").then((mod) => mod.FeaturedCars),
  { loading: () => <FeaturedCarsFallback /> }
);

const EntregasSection = dynamic(
  () => import("@/components/home/EntregasSection").then((mod) => mod.EntregasSection),
  { loading: () => <EntregasFallback /> }
);

const AboutSection = dynamic(
  () => import("@/components/home/AboutSection").then((mod) => mod.AboutSection),
  { loading: () => <AboutFallback /> }
);

const CinematicBanner = dynamic(
  () => import("@/components/home/CinematicBanner").then((mod) => mod.CinematicBanner),
  { loading: () => <CinematicFallback /> }
);

// Revalidate every 60 seconds (ISR)
export const revalidate = 60;

function FeaturedVideoFallback() {
  return (
    <section aria-hidden="true" className="relative w-full bg-[#050505] overflow-hidden py-24 md:py-40 z-10">
      <div className="container mx-auto px-6">
        <div className="h-[420px] md:h-[620px] max-w-5xl mx-auto rounded-[2rem] md:rounded-[3rem] border border-white/10 bg-white/[0.03]" />
      </div>
    </section>
  );
}

function FlashPromoFallback() {
  return <section aria-hidden="true" className="bg-neutral-950 relative z-10 pt-50 pb-25 -mt-25 min-h-[520px]" />;
}

function FeaturedCarsFallback() {
  return <section aria-hidden="true" className="py-25 bg-neutral-950 relative z-20 min-h-[900px]" />;
}

function EntregasFallback() {
  return <section aria-hidden="true" className="py-24 bg-neutral-900/50 relative overflow-hidden min-h-[760px]" />;
}

function AboutFallback() {
  return <section aria-hidden="true" className="relative py-16 lg:py-24 bg-neutral-50 dark:bg-zinc-950 overflow-hidden z-10 min-h-[760px]" />;
}

function CinematicFallback() {
  return <section aria-hidden="true" className="w-full bg-black relative overflow-hidden -mt-2 z-20 min-h-screen" />;
}

export default async function Home() {
  const featuredCars = await getFeaturedCars();
  const offerCars = await getOfferCars();
  const brands = await getStockBrands();
  const featuredVideoUrl = await getFeaturedVideo();
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://elgarage.com";
  const autoDealerJsonLd = {
    "@context": "https://schema.org",
    "@type": "AutoDealer",
    name: "El Garage",
    url: baseUrl,
    description: "Concesionaria premium de autos de lujo y exóticos en Argentina.",
    priceRange: "$$$$",
    areaServed: "Argentina",
    availableLanguage: ["es", "es-AR"],
    brand: brands.map((brand) => brand.name),
    knowsAbout: ["autos de lujo", "autos exóticos", "vehículos premium", "venta de autos en Argentina"],
    makesOffer: featuredCars.slice(0, 6).map((car) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Car",
        name: `${car.brand} ${car.model}`,
        brand: car.brand,
        vehicleModelDate: car.year?.toString(),
        vehicleTransmission: car.transmission,
      },
      price: car.price,
      priceCurrency: car.currency,
      availability: "https://schema.org/InStock",
      url: `${baseUrl}/autos/${car.slug}`,
    })),
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(autoDealerJsonLd) }}
      />
      <Hero />
      {featuredVideoUrl ? <FeaturedVideoSection videoUrl={featuredVideoUrl} /> : null}

      <section className="relative z-10 bg-[#050505] py-24">
        {/* Decorative Background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900/50 to-transparent pointer-events-none" />



        <BrandMarquee />

        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none" />
      </section>

      {offerCars.length > 0 ? <FlashPromoSection offers={offerCars} /> : null}
      {featuredCars.length > 0 ? <FeaturedCarsSection cars={featuredCars} /> : null}
      <EntregasSection />
      <AboutSection />

      <CinematicBanner />
    </main>
  );
}

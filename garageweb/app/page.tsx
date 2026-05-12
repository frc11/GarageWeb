import { Hero } from "@/components/home/Hero";
import { FeaturedCars } from "@/components/home/FeaturedCars";
import { CinematicBanner } from "@/components/home/CinematicBanner";
import { FlashPromo } from "@/components/home/FlashPromo";
import { AboutSection } from "@/components/home/AboutSection";
import { BrandMarquee } from "@/components/home/BrandMarquee";
import { EntregasSection } from "@/components/home/EntregasSection";
import { FeaturedVideo } from "@/components/home/FeaturedVideo";
import { getFeaturedCars, getOfferCars, getStockBrands, getFeaturedVideo } from "@/sanity/lib/fetch";

// Revalidate every 60 seconds (ISR)
export const revalidate = 60;

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
      <FeaturedVideo videoUrl={featuredVideoUrl} />

      <section className="relative z-10 bg-[#050505] py-24">
        {/* Decorative Background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900/50 to-transparent pointer-events-none" />



        <BrandMarquee />

        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none" />
      </section>

      <FlashPromo offers={offerCars} />
      <FeaturedCars cars={featuredCars} />
      <EntregasSection />
      <AboutSection />

      <CinematicBanner />
    </main>
  );
}

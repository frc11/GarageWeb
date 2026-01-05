import { Hero } from "@/components/home/Hero";
import { FeaturedCars } from "@/components/home/FeaturedCars";
import { CinematicBanner } from "@/components/home/CinematicBanner";
import { FlashPromo } from "@/components/home/FlashPromo";
import { AboutSection } from "@/components/home/AboutSection";
import { StaffGrid } from "@/components/home/StaffGrid";
import { BrandMarquee } from "@/components/home/BrandMarquee";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { getFeaturedCars, getOfferCars, getAvailableBrands } from "@/sanity/lib/fetch";
import { BRAND_ASSETS_MAP } from "@/lib/brand-assets";
import { Brand } from "@/types/main";

// Revalidate every 60 seconds (ISR)
export const revalidate = 60;

export default async function Home() {
  const featuredCars = await getFeaturedCars();
  const offerCars = await getOfferCars();

  // Hybrid Architecture: Fetch real inventory brands, map to local aesthetics
  const availableBrandNames = await getAvailableBrands();

  const brands: Brand[] = availableBrandNames
    .map((name) => {
      const slug = name.toLowerCase().replace(/\s+/g, "-");
      // Check exact match or slug match in map
      // The map keys are lowercased slugs mostly
      // "Mercedes-Benz" -> "mercedes-benz"
      const assetPath = BRAND_ASSETS_MAP[slug] || BRAND_ASSETS_MAP[name.toLowerCase()];

      if (!assetPath) return null;

      return {
        id: slug,
        name: name,
        slug: slug,
        logo: assetPath
      };
    })
    .filter((b): b is Brand => b !== null);

  return (
    <main>
      <Hero />

      <section className="relative z-10 bg-zinc-950 py-24 overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900/50 to-transparent pointer-events-none" />



        <BrandMarquee brands={brands} />

        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none" />
      </section>

      <FlashPromo offers={offerCars} />
      <FeaturedCars cars={featuredCars} />
      <AboutSection />
      <StaffGrid />
      <CinematicBanner />
    </main>
  );
}
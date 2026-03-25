import { Hero } from "@/components/home/Hero";
import { FeaturedCars } from "@/components/home/FeaturedCars";
import { CinematicBanner } from "@/components/home/CinematicBanner";
import { FlashPromo } from "@/components/home/FlashPromo";
import { AboutSection } from "@/components/home/AboutSection";
import { StaffGrid } from "@/components/home/StaffGrid";
import { BrandMarquee } from "@/components/home/BrandMarquee";
import { ReviewsSection } from "@/components/home/ReviewsSection";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { FeaturedVideo } from "@/components/home/FeaturedVideo";
import { getFeaturedCars, getOfferCars, getStockBrands, getFeaturedVideo } from "@/sanity/lib/fetch";

// Revalidate every 60 seconds (ISR)
export const revalidate = 60;

export default async function Home() {
  const featuredCars = await getFeaturedCars();
  const offerCars = await getOfferCars();
  const brands = await getStockBrands();
  const featuredVideoUrl = await getFeaturedVideo();

  return (
    <main>
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
      <ReviewsSection />
      <AboutSection />

      <CinematicBanner />
    </main>
  );
}
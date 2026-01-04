import { Hero } from "@/components/home/Hero";
import { FeaturedCars } from "@/components/home/FeaturedCars";
import { SellCta } from "@/components/home/SellCta";
import { FlashPromo } from "@/components/home/FlashPromo";
import { AboutSection } from "@/components/home/AboutSection";
import { StaffGrid } from "@/components/home/StaffGrid";
import { BrandMarquee } from "@/components/home/BrandMarquee";
import { getFeaturedCars, getOfferCars, getStockBrands } from "@/sanity/lib/fetch";

// Revalidate every 60 seconds (ISR)
export const revalidate = 60;

export default async function Home() {
  const featuredCars = await getFeaturedCars();
  const offerCars = await getOfferCars();
  const brands = await getStockBrands();

  return (
    <main>
      <Hero />
      <BrandMarquee brands={brands} />
      <FlashPromo cars={offerCars} />
      <FeaturedCars cars={featuredCars} />
      <AboutSection />
      <StaffGrid />
      <SellCta />
    </main>
  );
}
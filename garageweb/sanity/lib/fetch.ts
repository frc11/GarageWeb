import { client } from "./client";
import { CARS_QUERY, FEATURED_CARS_QUERY, CAR_BY_SLUG_QUERY, OFFER_CARS_QUERY, ALL_OFFERS_QUERY, BRANDS_QUERY, STOCK_BRANDS_QUERY, AVAILABLE_BRANDS_QUERY } from "./queries";
import { Car, Brand } from "@/types/main";

// Mapper helper to ensure strict type compliance
// In our queries we are already projecting images->url, but we double check here
function mapSanityCarToCar(raw: any): Car {
    return {
        id: raw.id || raw._id,
        slug: raw.slug,
        brand: raw.brand,
        model: raw.model,
        year: raw.year,
        price: raw.price,
        currency: raw.currency,
        mileage: raw.mileage,
        transmission: raw.transmission,
        fuelType: raw.fuelType,
        status: raw.status,
        images: Array.isArray(raw.images) ? raw.images : [], // Queries project this as strings
        description: raw.description,
        features: raw.features || [],
        isFeatured: raw.isFeatured,
        isOffer: raw.isOffer,
        originalPrice: raw.originalPrice
    };
}

export async function getCars(brandSlug?: string): Promise<Car[]> {
    const rawCars = await client.fetch(CARS_QUERY, { brandSlug: brandSlug || null });
    return rawCars.map(mapSanityCarToCar);
}

export async function getFeaturedCars(): Promise<Car[]> {
    const rawCars = await client.fetch(FEATURED_CARS_QUERY);
    return rawCars.map(mapSanityCarToCar);
}

export async function getOfferCars(): Promise<Car[]> {
    const rawCars = await client.fetch(OFFER_CARS_QUERY);
    return rawCars.map(mapSanityCarToCar);
}

export async function getAllOffers(): Promise<Car[]> {
    const rawCars = await client.fetch(ALL_OFFERS_QUERY);
    return rawCars.map(mapSanityCarToCar);
}

export async function getCarBySlug(slug: string): Promise<Car | null> {
    const rawCar = await client.fetch(CAR_BY_SLUG_QUERY, { slug });
    if (!rawCar) return null;
    return mapSanityCarToCar(rawCar);
}

export async function getBrands(): Promise<Brand[]> {
    return await client.fetch(BRANDS_QUERY);
}

export async function getStockBrands(): Promise<Brand[]> {
    return await client.fetch(STOCK_BRANDS_QUERY);
}

export async function getAvailableBrands(): Promise<string[]> {
    const brands: string[] = await client.fetch(AVAILABLE_BRANDS_QUERY);
    // Dedup and filter nulls
    return Array.from(new Set(brands)).filter(Boolean);
}


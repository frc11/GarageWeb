import { client } from "./client";
import { CARS_QUERY, FEATURED_CARS_QUERY, CAR_BY_SLUG_QUERY, OFFER_CARS_QUERY } from "./queries";
import { Car } from "@/types/main";

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

export async function getCars(): Promise<Car[]> {
    const rawCars = await client.fetch(CARS_QUERY);
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

export async function getCarBySlug(slug: string): Promise<Car | null> {
    const rawCar = await client.fetch(CAR_BY_SLUG_QUERY, { slug });
    if (!rawCar) return null;
    return mapSanityCarToCar(rawCar);
}

export interface Car {
    id: string;
    slug: string;
    brand: string;
    model: string;
    year?: number;
    price?: number;
    currency: 'USD' | 'ARS';
    mileage?: number;
    transmission: 'Automática' | 'Manual';
    thumbnailImage?: string;
    coverImage?: string;
    gallery?: string[];
    description: string;
    features: string[];
    isFeatured?: boolean;
    isOffer?: boolean;
    originalPrice?: number;
    discount?: number;
    category?: 'Deportivos' | 'SUV' | 'Sedán' | 'Pick-up' | 'Clásicos'; // Added for Catalog Filter
}

export interface FilterState {
    brand: string | null;
    minPrice: number | null;
    maxPrice: number | null;
    minYear: number | null;
    maxYear: number | null;
}

export interface Brand {
    id: string;
    name: string;
    slug: string;
    logo: string;
}

import { createClient } from "next-sanity";
import { NextResponse } from "next/server";
import { apiVersion, dataset, projectId } from "@/sanity/env";
import { BRAND_ASSETS_MAP } from "@/lib/brand-assets";

export async function GET() {
    // 1. Configure Sanity Client with Write Token
    const token = process.env.SANITY_API_TOKEN;

    if (!token) {
        return NextResponse.json({ error: "Missing SANITY_API_TOKEN in .env.local" }, { status: 500 });
    }

    const client = createClient({
        projectId,
        dataset,
        apiVersion,
        useCdn: false, // Must be false for write operations
        token: token,
    });

    try {
        // FASE 1: PURGA (Destructive Operation)
        console.log("⚠️ Starting Database Purge...");
        const deleteResult = await client.delete({ query: '*[_type == "car"]' });
        console.log(`🗑️ Deleted cars`);

        // FASE 2: PREPARACIÓN DE DATOS
        const brands = Object.keys(BRAND_ASSETS_MAP);
        const results = [];
        const errors = [];

        // Helper to capitalize brand names for better display
        const toTitleCase = (str: string) => {
            return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        };

        // FASE 3: GENERACIÓN (Seeding)
        console.log(`🌱 Seeding ${brands.length} brand entries...`);

        for (const brandKey of brands) {
            try {
                const displayBrand = toTitleCase(brandKey);
                // Creating a dummy car for this brand
                const doc = {
                    _type: 'car',
                    brand: displayBrand, // Use Title Case for display (e.g., "Mercedes Benz")
                    model: `${displayBrand} Concept Model`,
                    slug: {
                        _type: 'slug',
                        current: `${brandKey}-concept-${Math.floor(Math.random() * 10000)}`
                    },
                    year: 2024,
                    price: Math.floor(Math.random() * 200000) + 50000,
                    currency: 'USD',
                    mileage: 0,
                    transmission: 'Automatic',
                    fuelType: 'Hybrid',
                    status: 'available',
                    description: `Auto de prueba generado automáticamente para validar la marca ${displayBrand}.`,
                    features: ["Autopilot", "Launch Control", "Premium Sound"],
                    isFeatured: true,
                    isOffer: Math.random() > 0.5,
                    images: [] // No images for now, avoiding external deps issues
                };

                const createdCar = await client.create(doc);
                results.push({ brand: brandKey, id: createdCar._id });
                console.log(`✅ Created car for: ${displayBrand}`);

            } catch (error: any) {
                console.error(`❌ Failed to seed ${brandKey}:`, error);
                errors.push({ brand: brandKey, error: error.message });
            }
        }

        return NextResponse.json({
            success: true,
            operation: "Hard Reset & Seed",
            deleted_count: "All cars removed",
            created_count: results.length,
            details: results,
            errors: errors
        });

    } catch (error: any) {
        console.error("SERVER ERROR:", error);
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 });
    }
}

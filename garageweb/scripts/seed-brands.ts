import { createClient } from "next-sanity"; // Use next-sanity if available or @sanity/client
import { createClient as createSanityClient } from "@sanity/client";
import axios from "axios";
import dotenv from "dotenv";
import path from "path";

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

// Configuration
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
// Note: You need a write token for this!
const token = process.env.SANITY_API_TOKEN || process.env.NEXT_PUBLIC_SANITY_TOKEN;

const BRANDS = ["Ferrari", "Porsche", "Lamborghini", "Mercedes-Benz", "BMW", "Audi", "Mclaren"];

async function main() {
    if (!projectId || !dataset || !token) {
        console.error("❌ Missing configuration:");
        console.error(`   Project ID: ${projectId}`);
        console.error(`   Dataset: ${dataset}`);
        console.error(`   Token: ${token ? "SET" : "MISSING"}`);
        console.error("   Please ensure .env.local has these values and SANITY_API_TOKEN is set.");
        process.exit(1);
    }

    const client = createSanityClient({
        projectId,
        dataset,
        token,
        useCdn: false,
        apiVersion: "2024-01-01",
    });

    console.log(`🚀 Starting brand seed for project: ${projectId}`);

    for (const brandName of BRANDS) {
        const slug = brandName.toLowerCase().replace(/\s+/g, "-");
        // SimpleIcons uses lowercase slugs. 'mclaren' is 'mclaren'. 'mercedes-benz' is 'mercedes'.
        // Wait, SimpleIcons slugs might differ.
        // Mercedes-Benz -> mercedes
        // McLaren -> mclaren
        // I will perform a quick mapping or just try the slug.
        // User said: use 'https://cdn.simpleicons.org/{brand_slug}/ffffff'
        // I'll stick to the generated slug but handle known exceptions if I knew them.
        // 'mercedes-benz' is usually 'mercedes' on simpleicons? Let's check or just use the slug.
        // Actually, simpleicons usually matches standard slug.
        // Mercedes-Benz -> mercedes on simpleicons? Check: https://simpleicons.org/?q=mercedes -> "Mercedes" (slug 'mercedes').
        // So for "Mercedes-Benz", slug "mercedes-benz" might fail.
        // I'll use a map for robustness if I can, or strict logic.
        // User instructions: "Use 'https://cdn.simpleicons.org/{brand_slug}/ffffff' for high-quality white SVGs."
        // I will trust the user, but maybe add a fallback or log.

        let iconSlug = slug;
        if (slug === 'mercedes-benz') iconSlug = 'mercedes';

        const logoUrl = `https://cdn.simpleicons.org/${iconSlug}/ffffff`;

        try {
            // 1. Check existence
            const existing = await client.fetch(`*[_type == "brand" && slug.current == $slug][0]`, { slug });
            if (existing) {
                console.log(`✅ Brand already exists: ${brandName}`);
                continue;
            }

            console.log(`⏳ Processing: ${brandName} (Fetching from ${logoUrl})...`);

            // 2. Download Image
            const response = await axios.get(logoUrl, { responseType: "stream" });

            // 3. Upload Asset
            const asset = await client.assets.upload("image", response.data, {
                filename: `${slug}.svg`
            });

            // 4. Create Document
            const doc = {
                _type: "brand",
                name: brandName,
                slug: { _type: "slug", current: slug },
                logo: {
                    _type: "image",
                    asset: {
                        _type: "reference",
                        _ref: asset._id
                    }
                }
            };

            await client.create(doc);
            console.log(`✨ Created brand: ${brandName}`);

        } catch (error: any) { // Type 'any' to avoid strict unknown error in TS
            if (error.response && error.response.status === 404) {
                console.warn(`⚠️  Logo not found for ${brandName} at ${logoUrl}`);
            } else {
                console.error(`❌ Error processing ${brandName}:`, error.message);
            }
        }
    }

    console.log("🏁 Done!");
}

main().catch(console.error);

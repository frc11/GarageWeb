import { getCars } from "@/sanity/lib/fetch";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://elgarage.com";
    const now = new Date();
    let cars = [] as Awaited<ReturnType<typeof getCars>>;

    try {
        cars = await getCars();
    } catch {
        cars = [];
    }

    const staticRoutes: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: now,
            changeFrequency: "daily",
            priority: 1.0,
        },
        {
            url: `${baseUrl}/catalogo`,
            lastModified: now,
            changeFrequency: "daily",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/ofertas`,
            lastModified: now,
            changeFrequency: "daily",
            priority: 0.7,
        },
        {
            url: `${baseUrl}/contacto`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.5,
        },
    ];

    const vehicleRoutes: MetadataRoute.Sitemap = cars.map((car) => ({
        url: `${baseUrl}/autos/${car.slug}`,
        lastModified: now,
        changeFrequency: "daily",
        priority: 0.8,
    }));

    return [...staticRoutes, ...vehicleRoutes];
}

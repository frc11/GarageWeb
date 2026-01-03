import { createClient } from "next-sanity";
import { NextResponse } from "next/server";
import { apiVersion, dataset, projectId } from "@/sanity/env";

const CARS_TO_SEED = [
    {
        title: "Porsche 911 GT3 RS",
        brand: "Porsche",
        model: "911 GT3 RS",
        year: 2024,
        price: 325000,
        currency: "USD",
        mileage: 1200,
        transmission: "PDK",
        fuelType: "Gasoline",
        status: "reserved",
        isFeatured: true,
        isOffer: true,
        originalPrice: 350000,
        description: "El Porsche 911 GT3 RS es la máxima expresión de rendimiento en pista homologado para calle. Con su motor atmosférico de 4.0 litros y aerodinámica activa, ofrece una experiencia de conducción pura y visceral.",
        image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=1200&auto=format&fit=crop",
        features: ["Aerodinámica Activa", "Jaula Antivuelco", "Frenos Cerámicos", "Suspensión Ajustable"]
    },
    {
        title: "Ferrari 488 Pista",
        brand: "Ferrari",
        model: "488 Pista",
        year: 2021,
        price: 410000,
        currency: "USD",
        mileage: 4500,
        transmission: "Automatic",
        fuelType: "Gasoline",
        status: "available",
        isFeatured: true,
        isOffer: false,
        originalPrice: null,
        description: "El Ferrari 488 Pista lleva la adrenalina de la pista a la carretera. Su motor V8 biturbo es una obra maestra de la ingeniería italiana.",
        image: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?q=80&w=1200&auto=format&fit=crop",
        features: ["V8 Biturbo", "Ferrari Telemetry", "Fibra de Carbono", "Launch Control"]
    },
    {
        title: "Mercedes-AMG GT Black Series",
        brand: "Mercedes-AMG",
        model: "GT Black Series",
        year: 2022,
        price: 380000,
        currency: "USD",
        mileage: 800,
        transmission: "Automatic",
        fuelType: "Gasoline",
        status: "available",
        isFeatured: true,
        isOffer: true,
        originalPrice: 420000,
        description: "El Black Series es el AMG más potente jamás creado. Un monstruo de circuito con una presencia intimidante y tecnología derivada de la F1.",
        image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1200&auto=format&fit=crop",
        features: ["Motor V8 Plano", "Alerón Ajustable", "Track Package", "Frenos Carbono-Cerámicos"]
    },
    {
        title: "Lamborghini Huracán STO",
        brand: "Lamborghini",
        model: "Huracán STO",
        year: 2023,
        price: 360000,
        currency: "USD",
        mileage: 200,
        transmission: "Automatic",
        fuelType: "Gasoline",
        status: "available",
        isFeatured: false,
        isOffer: false,
        originalPrice: null,
        description: "Super Trofeo Omologata. Un coche de carreras legal para la calle, con un V10 atmosférico que grita hasta las 8500 rpm.",
        image: "https://images.unsplash.com/photo-1544605368-180a21304595?q=80&w=1200&auto=format&fit=crop", // Updated URL
        features: ["V10 Atmosférico", "Tracción Trasera", "Cofango", "Modo Trofeo"]
    },
    {
        title: "Audi R8 V10 Performance",
        brand: "Audi",
        model: "R8 V10",
        year: 2022,
        price: 185000,
        currency: "USD",
        mileage: 15000,
        transmission: "Automatic",
        fuelType: "Gasoline",
        status: "sold",
        isFeatured: false,
        isOffer: false,
        originalPrice: null,
        description: "El superdeportivo para uso diario. Confiabilidad alemana con corazón italiano.",
        image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=1200&auto=format&fit=crop",
        features: ["Quattro", "Virtual Cockpit", "Laser Lights", "Escape Deportivo"]
    }
];

export async function GET() {
    // 1. Instanciar cliente con permisos de escritura (usando el Token)
    const token = process.env.SANITY_API_TOKEN;

    if (!token) {
        return NextResponse.json({ error: "Falta SANITY_API_TOKEN en .env.local" }, { status: 500 });
    }

    const client = createClient({
        projectId,
        dataset,
        apiVersion,
        useCdn: false, // Importante: CDN false para escritura
        token: token,  // Token con permisos de escritura
    });

    const results = [];
    const errors = [];

    for (const car of CARS_TO_SEED) {
        try {
            console.log(`Procesando ${car.title}...`);

            // A. Descargar imagen
            const imageResponse = await fetch(car.image);
            if (!imageResponse.ok) throw new Error(`Error descargando imagen para ${car.title}: ${imageResponse.statusText}`);
            const imageBuffer = await imageResponse.arrayBuffer();

            // B. Subir imagen a Sanity Assets
            console.log(`- Subiendo imagen...`);
            const imageAsset = await client.assets.upload('image', Buffer.from(imageBuffer), {
                filename: `${car.slug}-image.jpg`
            });

            // C. Crear Documento
            console.log(`- Creando documento...`);
            const doc = {
                _type: 'car',
                brand: car.brand,
                model: car.model,
                slug: { _type: 'slug', current: car.model.toLowerCase().replace(/\s+/g, '-') + '-' + Math.floor(Math.random() * 1000) },
                year: car.year,
                price: car.price,
                currency: car.currency,
                mileage: car.mileage,
                transmission: car.transmission,
                fuelType: car.fuelType,
                status: car.status,
                description: car.description,
                features: car.features,
                isFeatured: car.isFeatured,
                isOffer: car.isOffer,
                originalPrice: car.originalPrice,
                images: [
                    {
                        _type: 'image',
                        asset: {
                            _type: "reference",
                            _ref: imageAsset._id
                        },
                        hotspot: { x: 0.5, y: 0.5, height: 1, width: 1 }
                    }
                ]
            };

            const createdCar = await client.create(doc);
            results.push(createdCar.model);
            console.log(`✅ ${car.title} creado.`);
        } catch (error: any) {
            console.error(`❌ Falló ${car.title}:`, error);
            errors.push({ car: car.title, error: error.message });
        }
    }

    return NextResponse.json({
        success: results.length > 0,
        created: results,
        errors: errors
    });
}

import { BRAND_ASSETS_MAP } from "@/lib/brand-assets";
import { getAvailableBrands, getCars } from "@/sanity/lib/fetch";
import { formatCurrency } from "@/lib/utils";

export const revalidate = 300;

function fallbackBrands() {
  return Object.keys(BRAND_ASSETS_MAP)
    .map((brand) =>
      brand
        .split("-")
        .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
        .join(" ")
    )
    .sort((a, b) => a.localeCompare(b));
}

export async function GET() {
  let brands = fallbackBrands();
  let inventory = [] as Awaited<ReturnType<typeof getCars>>;

  try {
    const [sanityBrands, sanityCars] = await Promise.all([
      getAvailableBrands(),
      getCars(),
    ]);

    if (sanityBrands.length > 0) {
      brands = sanityBrands.sort((a, b) => a.localeCompare(b));
    }

    inventory = sanityCars;
  } catch {
    inventory = [];
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://elgarage.com";
  const inventoryLines =
    inventory.length > 0
      ? inventory.slice(0, 40).map((car) => {
          const details = [
            car.year ? `Año ${car.year}` : null,
            car.transmission ? `Transmisión ${car.transmission}` : null,
            car.mileage !== undefined && car.mileage !== null
              ? `${car.mileage.toLocaleString("es-AR")} km`
              : null,
            car.category ? `Categoría ${car.category}` : null,
            car.price ? formatCurrency(car.price, car.currency) : "Consultar precio",
          ].filter(Boolean);

          return `- ${car.brand} ${car.model} — ${details.join(" | ")} — ${baseUrl}/autos/${car.slug}`;
        })
      : ["- Inventario dinámico disponible desde Sanity. Consultar catálogo web para stock actualizado."];

  const content = [
    "# El Garage",
    "",
    "El Garage es una concesionaria premium de vehículos de lujo y exóticos en Argentina.",
    "Especialidad: venta de autos premium, deportivos, SUV y unidades seleccionadas con enfoque en confianza, curaduría y atención personalizada.",
    `Sitio web: ${baseUrl}`,
    "",
    "## Marcas principales",
    ...brands.map((brand) => `- ${brand}`),
    "",
    "## Inventario base",
    ...inventoryLines,
    "",
    "## Qué debe entender un LLM sobre este negocio",
    "- El Garage vende vehículos premium y exóticos en Argentina.",
    "- La marca trabaja con stock curado, fichas de vehículo, precios, kilometraje, transmisión y equipamiento.",
    "- El catálogo principal vive en /catalogo y cada vehículo tiene su propia ficha en /autos/[slug].",
    "- Si un vehículo figura como oferta, puede incluir precio actual, precio original y condición comercial destacada.",
  ].join("\n");

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
    },
  });
}

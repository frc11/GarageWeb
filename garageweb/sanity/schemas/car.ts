import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'car',
    title: 'Vehículo',
    type: 'document',
    fields: [
        defineField({
            name: 'brand',
            title: 'Marca',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'model',
            title: 'Modelo',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'category',
            title: 'Categoría',
            type: 'string',
            options: {
                list: ['Deportivos', 'SUV', 'Sedán', 'Pick-up', 'Clásicos'],
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'URL Slug',
            type: 'slug',
            options: {
                source: (doc) => `${doc.brand}-${doc.model}`,
                maxLength: 96,
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'price',
            title: 'Price',
            type: 'number',
            validation: (rule) => rule.required().positive(),
        }),
        defineField({
            name: 'originalPrice',
            title: 'Precio Original (Antes de Oferta)',
            type: 'number',
            description: 'Solo completar si el auto está en oferta. Se mostrará tachado al lado del precio actual.',
        }),
        defineField({
            name: 'isOffer',
            title: '¿Es Oferta Flash?',
            type: 'boolean',
            initialValue: false,
            description: "Activa el badge de oferta y logic de descuento.",
        }),
        defineField({
            name: 'discount',
            title: 'Porcentaje de Descuento (0-100)',
            type: 'number',
            validation: (rule) => rule.min(0).max(100),
            hidden: false,
            description: 'Si se establece, anula el cálculo automático. Ejemplo: 15 para 15% OFF.',
        }),
        defineField({
            name: 'currency',
            title: 'Currency',
            type: 'string',
            options: {
                list: ['USD', 'EUR', 'ARS'],
            },
            initialValue: 'USD',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'year',
            title: 'Year',
            type: 'number',
            validation: (rule) => rule.required().min(1900).max(new Date().getFullYear() + 1),
        }),
        defineField({
            name: 'mileage',
            title: 'Kilometraje',
            type: 'number',
            validation: (rule) => rule.required().min(0),
        }),
        defineField({
            name: 'transmission',
            title: 'Transmission',
            type: 'string',
            options: {
                list: ['Automatic', 'Manual', 'PDK', 'Tiptronic'],
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'fuelType',
            title: 'Fuel Type',
            type: 'string',
            options: {
                list: ['Gasoline', 'Diesel', 'Hybrid', 'Electric'],
            },
            initialValue: 'Gasoline',
        }),
        defineField({
            name: 'status',
            title: 'Status',
            type: 'string',
            options: {
                list: [
                    { title: 'Available', value: 'available' },
                    { title: 'Reserved', value: 'reserved' },
                    { title: 'Sold', value: 'sold' },
                ],
            },
            initialValue: 'available',
        }),
        defineField({
            name: 'coverImage',
            title: 'Portada del Auto (Hero)',
            type: 'array',
            of: [
                { type: 'image', options: { hotspot: true } },
                { type: 'file', options: { accept: 'video/mp4,video/webm' } }
            ],
            validation: (rule) => rule.required().max(1),
            description: 'Imagen o video principal que ocupará toda la pantalla al entrar al detalle del vehículo.'
        }),
        defineField({
            name: 'thumbnailImage',
            title: 'Miniatura del Auto (Catálogo)',
            type: 'array',
            of: [
                { type: 'image', options: { hotspot: true } },
                { type: 'file', options: { accept: 'video/mp4,video/webm' } }
            ],
            validation: (rule) => rule.required().max(1),
            description: 'Imagen o video (silenciado) que servirá de previsualización en la lista principal de autos.'
        }),
        defineField({
            name: 'gallery',
            title: 'Galería Visual',
            type: 'array',
            of: [
                { type: 'image', options: { hotspot: true } },
                { type: 'file', options: { accept: 'video/mp4,video/webm' } }
            ],
            description: 'Fotos y videos adicionales que aparecerán en la grilla inferior del detalle del vehículo.'
        }),
        defineField({
            name: 'description',
            title: 'Descripción',
            type: 'text',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'features',
            title: 'Equipamiento',
            type: 'array',
            of: [{ type: 'string' }],
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'isFeatured',
            title: '¿Destacar en Home?',
            type: 'boolean',
            initialValue: false,
            validation: (rule) =>
                rule.custom(async (isFeatured, context) => {
                    if (!isFeatured) return true;

                    const { getClient } = context;
                    const client = getClient({ apiVersion: '2024-01-01' });

                    // Count how many OTHER docs are featured
                    // We exclude the current document ID ($id) so we don't count itself if updating
                    const query = `count(*[_type == "car" && isFeatured == true && _id != $id])`;
                    const params = { id: context.document?._id || 'new-doc-id' };

                    const featuredCount = await client.fetch(query, params);

                    // Limit is 10
                    if (featuredCount >= 10) {
                        return `Límite alcanzado    : Solo se pueden destacar hasta 10 vehículos en el Home. Desactiva otro vehículo antes de activar este.`;
                    }

                    return true;
                }),
        }),

    ],
    preview: {
        select: {
            title: 'model',
            subtitle: 'brand',
            media: 'coverImage.0',
        },
    },
})

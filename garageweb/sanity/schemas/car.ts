import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'car',
    title: 'Vehículo',
    type: 'document',
    groups: [
        { name: 'general', title: 'Datos Principales', default: true },
        { name: 'pricing', title: 'Precio y Ofertas' },
        { name: 'specs', title: 'Especificaciones' },
        { name: 'media', title: 'Imágenes y Videos' },
    ],
    fieldsets: [
        {
            name: 'oferta',
            title: 'Configuración de Oferta Exclusiva',
            options: { collapsible: true, collapsed: false }
        }
    ],
    fields: [
        defineField({
            name: 'brand',
            title: 'Marca',
            type: 'string',
            group: 'general',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'model',
            title: 'Modelo',
            type: 'string',
            group: 'general',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'category',
            title: 'Categoría',
            type: 'string',
            group: 'general',
            options: {
                list: [
                    { title: 'Deportivos', value: 'Deportivos' },
                    { title: 'SUV', value: 'SUV' },
                    { title: 'Sedán', value: 'Sedán' },
                    { title: 'Pick-up', value: 'Pick-up' },
                    { title: 'Clásicos', value: 'Clásicos' },
                ],
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'URL',
            type: 'slug',
            group: 'general',
            options: {
                source: (doc) => `${doc.brand}-${doc.model}`,
                maxLength: 96,
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'price',
            title: 'Precio',
            type: 'number',
            group: 'pricing',
            validation: (rule) => rule.positive(),
        }),
        defineField({
            name: 'originalPrice',
            title: 'Precio Original (Antes de Oferta)',
            type: 'number',
            group: 'pricing',
            fieldset: 'oferta',
            validation: (rule) => rule.custom((value, context) => {
                const doc = context.document as any;
                if (value && !doc?.price) {
                    return '❌ Error: Debes ingresar el "Precio" base primero.';
                }
                return true;
            }),
            description: 'Se mostrará tachado al lado del precio base.',
        }),
        defineField({
            name: 'isOffer',
            title: '¿Es Oferta Flash?',
            type: 'boolean',
            initialValue: false,
            group: 'pricing',
            fieldset: 'oferta',
            validation: (rule) => rule.custom((value, context) => {
                const doc = context.document as any;
                if (value && !doc?.originalPrice) {
                    return '❌ Error: Debes ingresar un "Precio Original" para activar la Oferta Flash.';
                }
                return true;
            }),
            description: "Activa el badge de oferta. Carga el Precio Original primero.",
        }),
        defineField({
            name: 'currency',
            title: 'Moneda',
            type: 'string',
            group: 'pricing',
            options: {
                list: [
                    { title: 'Dólares (USD)', value: 'USD' },
                    { title: 'Pesos (ARS)', value: 'ARS' },
                ],
            },
            initialValue: 'USD',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'year',
            title: 'Año',
            type: 'number',
            group: 'specs',
            validation: (rule) => rule.min(1900).max(new Date().getFullYear() + 1),
        }),
        defineField({
            name: 'mileage',
            title: 'Kilometraje',
            type: 'number',
            group: 'specs',
            validation: (rule) => rule.min(0),
        }),
        defineField({
            name: 'transmission',
            title: 'Transmisión',
            type: 'string',
            group: 'specs',
            options: {
                list: [
                    { title: 'Automática', value: 'Automática' },
                    { title: 'Manual', value: 'Manual' },
                ],
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'coverImage',
            title: 'Portada del Auto (Hero)',
            type: 'array',
            group: 'media',
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
            group: 'media',
            of: [
                { type: 'image', options: { hotspot: true } }
            ],
            validation: (rule) => rule.required().max(1),
            description: 'Foto compacta que se muestra en las listas. SOLO se permiten imágenes.'
        }),
        defineField({
            name: 'gallery',
            title: 'Galería Visual',
            type: 'array',
            group: 'media',
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
            group: 'specs',
        }),
        defineField({
            name: 'features',
            title: 'Equipamiento',
            type: 'array',
            group: 'specs',
            of: [{ type: 'string' }],
        }),
        defineField({
            name: 'isFeatured',
            title: '¿Destacar en Home?',
            type: 'boolean',
            group: 'general',
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

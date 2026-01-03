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
            name: 'images',
            title: 'Images',
            type: 'array',
            of: [{ type: 'image', options: { hotspot: true } }],
            validation: (rule) => rule.required().min(1),
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 4,
        }),
        defineField({
            name: 'features',
            title: 'Features',
            type: 'array',
            of: [{ type: 'string' }],
        }),
        defineField({
            name: 'isFeatured',
            title: '¿Destacar en Home?',
            type: 'boolean',
            initialValue: false,
        }),
        defineField({
            name: 'isOffer',
            title: '¿Es Oferta Relámpago?',
            type: 'boolean',
            initialValue: false,
        }),
        defineField({
            name: 'originalPrice',
            title: 'Precio Original (Antes de Oferta)',
            type: 'number',
        }),
    ],
    preview: {
        select: {
            title: 'model',
            subtitle: 'brand',
            media: 'images.0',
        },
    },
})

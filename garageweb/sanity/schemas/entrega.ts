import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'entrega',
    title: 'Entregas',
    type: 'document',
    fieldsets: [
        { name: 'details', title: 'Detalles de la Entrega', options: { collapsible: false } }
    ],
    fields: [
        defineField({
            name: 'clientName',
            title: 'Nombre del Cliente',
            type: 'string',
            fieldset: 'details',
        }),
        defineField({
            name: 'review',
            title: 'Breve Reseña / Mensaje',
            type: 'text',
            fieldset: 'details',
            description: 'Ej: "Felicidades amigo! Disfruta de tu nueva Chata. Muchas gracias."',
            validation: (rule) => rule.max(100),
        }),
        defineField({
            name: 'image',
            title: 'Foto de la Entrega (Vertical)',
            type: 'image',
            fieldset: 'details',
            options: {
                hotspot: true,
            },
            description: 'Sube una foto retrato. Relación de aspecto recomendada: 9:16 (estilo historia de Instagram) o 3:4.',
            validation: (rule) => rule.required(),
        }),
    ],
    preview: {
        select: {
            title: 'clientName',
            subtitle: 'review',
            media: 'image',
        },
    },
})

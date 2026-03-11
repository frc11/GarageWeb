import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'testimonial',
    title: 'Testimonios',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Nombre',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'role',
            title: 'Labor / Trabajo',
            type: 'string',
            description: 'Ej: Inversor, Coleccionista, Empresaria. Si se deja vacío, no se mostrará.',
        }),
        defineField({
            name: 'car',
            title: 'Dueño de',
            type: 'string',
            description: 'Ej: Porsche 911 GT3',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'stars',
            title: 'Estrellas',
            type: 'number',
            options: {
                list: [1, 2, 3, 4, 5],
            },
            initialValue: 5,
            validation: (rule) => rule.required().min(1).max(5),
        }),
        defineField({
            name: 'text',
            title: 'Contenido del Testimonio',
            type: 'text',
            description: 'Máximo recomendado: 180 caracteres para una visualización óptima.',
            validation: (rule) => rule.required().max(180).warning('A partir de 180 caracteres se cortará con "..." en la web.'),
        }),
        defineField({
            name: 'avatar',
            title: 'Foto de Perfil',
            type: 'image',
            options: {
                hotspot: true,
            },
            description: 'Si no se sube ninguna, se mostrará una imagen de usuario predeterminada.',
        }),
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'car',
            media: 'avatar',
        },
    },
})

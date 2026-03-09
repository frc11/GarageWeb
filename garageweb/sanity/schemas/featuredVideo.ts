import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'featuredVideo',
    title: 'Video Destacado (Home)',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Título de Referencia',
            type: 'string',
            description: 'Nombre interno para identificar este video (No se muestra en la web).'
        }),
        defineField({
            name: 'videoFile',
            title: 'Archivo de Video',
            type: 'file',
            options: {
                accept: 'video/mp4,video/webm'
            },
            validation: (Rule) => Rule.required(),
            description: 'Sube el video principal para el Home. Se recomienda formato horizontal 16:9 para desktop, aunque el sistema adaptará videos verticales.'
        }),
    ],
    preview: {
        select: {
            title: 'title',
        },
        prepare({ title }) {
            return {
                title: title || 'Video Destacado'
            }
        }
    }
})

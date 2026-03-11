import { type SchemaTypeDefinition } from 'sanity'
import car from './schemas/car'
import featuredVideo from './schemas/featuredVideo'
import testimonial from './schemas/testimonial'

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [car, featuredVideo, testimonial],
}

import { type SchemaTypeDefinition } from 'sanity'
import car from './schemas/car'
import featuredVideo from './schemas/featuredVideo'
import entrega from './schemas/entrega'

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [car, featuredVideo, entrega],
}

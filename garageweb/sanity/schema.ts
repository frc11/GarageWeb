import { type SchemaTypeDefinition } from 'sanity'
import car from './schemas/car'

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [car],
}

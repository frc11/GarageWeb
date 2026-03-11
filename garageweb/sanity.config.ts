'use client'

/**
 * Validates that Sanity configuration is present for the Studio.
 */

// Removed Vision tool import
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

import { apiVersion, dataset, projectId } from './sanity/env'
import { schema } from './sanity/schema'

import { esESLocale } from '@sanity/locale-es-es'

export default defineConfig({
    basePath: '/studio',
    projectId,
    dataset,
    // Add and edit the content schema in the './sanity/schema' folder
    schema,
    plugins: [
        structureTool({ title: 'Contenido' }),
        esESLocale(),
    ],
})

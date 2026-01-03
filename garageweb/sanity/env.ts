export const apiVersion =
    process.env.NEXT_PUBLIC_SANITY_API_VERSION?.trim() || '2024-01-01'

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() || 'production'

export const projectId = assertValue(
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim(),
    'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)

export const useCdn = false

function assertValue<T>(v: T | undefined, errorMessage: string): T {
    if (v === undefined) {
        throw new Error(errorMessage)
    }
    return v
}

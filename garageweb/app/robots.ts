import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/studio/', // Hide CMS from search engines
        },
        sitemap: 'https://garageweb.vercel.app/sitemap.xml',
    }
}

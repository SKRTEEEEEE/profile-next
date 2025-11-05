import { MetadataRoute } from 'next';
import { baseUrl } from '@/lib/seo/metadata';

/**
 * Generate robots.txt for SEO
 * Based on task 34505: Mejorar SEO y Accesibilidad
 * 
 * This file generates the robots.txt file dynamically for search engine crawlers
 * See: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
 */

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',           // Disallow API routes
          '/_next/',         // Disallow Next.js internal files
          '/admin/',         // Disallow admin routes (if any)
          '/*.json',         // Disallow JSON files
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

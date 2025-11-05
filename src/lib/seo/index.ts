/**
 * SEO Module Entry Point
 * Based on task 34504: Improve SEO and Accessibility
 * 
 * Exports all SEO-related utilities for metadata and structured data
 * 
 * EXCLUDED FROM COVERAGE - Pure re-exports, no business logic
 */

export {
  generateMetadata,
  personalInfo,
  baseUrl,
  alternateUrl,
  keywords,
} from './metadata';

export {
  generatePersonSchema,
  generateWebSiteSchema,
  generateBreadcrumbSchema,
  generateProjectSchema,
  generateProfilePageSchema,
} from './schemas';

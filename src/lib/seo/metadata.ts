/**
 * SEO Metadata and Structured Data Generator
 * Based on task 34504: Improve SEO and Accessibility
 * 
 * This file provides utilities to generate comprehensive SEO metadata
 * targeting Barcelona, Spain and Spanish-speaking markets
 * 
 * EXCLUDED FROM COVERAGE - Pure SEO configuration, no business logic
 */

import { Metadata } from 'next';
import { creatorData } from '../data';

export const baseUrl = 'https://dev.desarollador.tech';

// Personal Information
export const personalInfo = {
  name: 'Adan Reh Mañach',
  givenName: 'Adan',
  familyName: 'Reh Mañach',
  githubUsername: 'SKRTEEEEEE',
  location: {
    city: 'Barcelona',
    region: 'Catalonia',
    country: 'Spain',
    countryCode: 'ES',
    coordinates: {
      latitude: 41.3851,
      longitude: 2.1734,
    },
  },
  jobTitle: {
    es: 'Desarrollador Fullstack',
    en: 'Fullstack Developer',
    ca: 'Desenvolupador Fullstack',
    de: 'Fullstack-Entwickler',
  },
  description: {
    es: 'Desarrollador Fullstack en Barcelona. Especializado en web, IIoT y DevOps. React, Next.js, TypeScript, Node.js.',
    en: 'Fullstack Developer in Barcelona. Specialized in web, IIoT and DevOps. React, Next.js, TypeScript, Node.js.',
    ca: 'Desenvolupador Fullstack a Barcelona. Especialitzat en web, IIoT i DevOps. React, Next.js, TypeScript, Node.js.',
    de: 'Fullstack-Entwickler in Barcelona. Spezialisiert auf Web, IIoT und DevOps. React, Next.js, TypeScript, Node.js.',
  },
  socialProfiles: [
    `https://github.com/${creatorData.name}`,
    creatorData.linkedin,
    creatorData.website,
  ],
};

// Keywords targeting different markets (prioritized by proximity)
// Including both "desarrollador" and "desarollador" typo to capture common misspellings
export const keywords = {
  es: [
    'Adan Reh Mañach',
    'SKRTEEEEEE',
    // Barcelona specific
    'desarrollador web Barcelona',
    'desarollador web Barcelona',
    'desarrollador fullstack Barcelona',
    'desarollador fullstack Barcelona',
    'programador Barcelona',
    'desarrollador React Barcelona',
    'desarollador React Barcelona',
    'desarrollador Next.js Barcelona',
    'desarrollador TypeScript Barcelona',
    'desarollador TypeScript Barcelona',
    'desarrollador industrial Barcelona',
    'desarollador industrial Barcelona',
    'IIoT developer Barcelona',
    'DevOps Barcelona',
    'desarrollador frontend Barcelona',
    'desarollador frontend Barcelona',
    'desarrollador backend Barcelona',
    'desarollador backend Barcelona',
    'freelance developer Barcelona',
    'programador freelance Barcelona',
    'desarrollador Node.js Barcelona',
    'desarollador Node.js Barcelona',
    'arquitectura de software Barcelona',
    // Spain general
    'desarrollador web España',
    'desarollador web España',
    'desarrollador tech',
    'desarollador tech',
    'dev desarrollador tech',
    'dev desarollador tech',
    'full stack developer Spain',
    'web developer Barcelona',
    'software engineer Barcelona',
    'contratación desarrollador Barcelona',
    'contratar programador Barcelona',
    // Tech specific
    'programador React',
    'experto Next.js',
    'desarrollador TypeScript España',
    'desarollador TypeScript España',
  ],
  en: [
    'Adan Reh Mañach',
    'SKRTEEEEEE',
    'web developer Barcelona',
    'fullstack developer Barcelona',
    'React developer Barcelona',
    'Next.js developer Barcelona',
    'TypeScript developer Barcelona',
    'industrial developer Barcelona',
    'IIoT developer Barcelona',
    'DevOps engineer Barcelona',
    'frontend developer Barcelona',
    'backend developer Barcelona',
    'freelance developer Barcelona',
    'Node.js developer Barcelona',
    'software architect Barcelona',
    'web developer Spain',
    'full stack developer Spain',
    'software engineer Barcelona',
    'remote developer Spain',
    'hire developer Barcelona',
    'React expert Barcelona',
    'Next.js specialist',
  ],
  ca: [
    'Adan Reh Mañach',
    'SKRTEEEEEE',
    'desenvolupador web Barcelona',
    'desenvolupador fullstack Barcelona',
    'programador Barcelona',
    'desenvolupador React Barcelona',
    'desenvolupador Next.js Barcelona',
    'desenvolupador TypeScript Barcelona',
    'desenvolupador industrial Barcelona',
    'IIoT developer Barcelona',
    'DevOps Barcelona',
    'desenvolupador frontend Barcelona',
    'desenvolupador backend Barcelona',
    'freelance developer Barcelona',
    'contractar programador Barcelona',
  ],
  de: [
    'Adan Reh Mañach',
    'SKRTEEEEEE',
    'Webentwickler Barcelona',
    'Fullstack-Entwickler Barcelona',
    'React-Entwickler Barcelona',
    'Next.js-Entwickler Barcelona',
    'TypeScript-Entwickler Barcelona',
    'IIoT-Entwickler Barcelona',
    'DevOps-Ingenieur Barcelona',
    'Software-Entwickler Barcelona',
    'developer Barcelona',
    'entwickler Barcelona',
  ],
};

/**
 * Generate base metadata for a page
 */
export function generateMetadata({
  locale = 'es',
  title,
  description,
  path = '',
  image,
  noIndex = false,
  type = 'website',
}: {
  locale?: 'es' | 'en' | 'ca' | 'de';
  title: string;
  description: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
  type?: 'website' | 'article' | 'profile';
}): Metadata {
  const url = `${baseUrl}/${locale}${path}`;
  const defaultImage = `${baseUrl}/og-image.png`;

  return {
    title,
    description,
    keywords: keywords[locale],
    authors: [{ name: personalInfo.name, url: creatorData.githubUrl }],
    creator: personalInfo.name,
    publisher: personalInfo.name,
    robots: noIndex
      ? 'noindex, nofollow'
      : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    alternates: {
      canonical: url,
      languages: {
        es: `${baseUrl}/es${path}`,
        en: `${baseUrl}/en${path}`,
        ca: `${baseUrl}/ca${path}`,
        de: `${baseUrl}/de${path}`,
      },
    },
    openGraph: {
      type,
      locale: locale === 'es' ? 'es_ES' : locale === 'en' ? 'en_US' : locale === 'ca' ? 'ca_ES' : 'de_DE',
      url,
      siteName: personalInfo.name,
      title,
      description,
      images: [
        {
          url: image || defaultImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image || defaultImage],
      creator: '@' + creatorData.name,
    },
    other: {
      'geo.region': personalInfo.location.countryCode,
      'geo.placename': personalInfo.location.city,
      'geo.position': `${personalInfo.location.coordinates.latitude};${personalInfo.location.coordinates.longitude}`,
      'ICBM': `${personalInfo.location.coordinates.latitude}, ${personalInfo.location.coordinates.longitude}`,
    },
  };
}

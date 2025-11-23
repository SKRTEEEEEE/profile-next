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
    // Sant Cugat del Vallès - baja competencia SEO
    altCity: 'Sant Cugat del Vallès',
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
  // Meta descriptions optimizadas (máx 155 caracteres para SEO óptimo)
  description: {
    es: 'Programador Fullstack Barcelona. Desarrollo web, apps y SCADA. React, Next.js, TypeScript. Presupuesto sin compromiso.',
    en: 'Fullstack Developer Barcelona. Web, apps & SCADA development. React, Next.js, TypeScript. Free quote.',
    ca: 'Programador Fullstack Barcelona. Desenvolupament web, apps i SCADA. React, Next.js, TypeScript.',
    de: 'Fullstack-Entwickler Barcelona. Web, Apps & SCADA. React, Next.js, TypeScript. Kostenloser Kostenvoranschlag.',
  },
  socialProfiles: [
    `https://github.com/${creatorData.name}`,
    creatorData.linkedin,
    creatorData.website,
  ],
};

// Keywords targeting different markets (prioritized by proximity and low competition)
// Including both "desarrollador" and "desarollador" typo to capture common misspellings
// Prioridad: Sant Cugat > Catalunya/Cataluña > Barcelona > España
export const keywords = {
  es: [
    'Adan Reh Mañach',
    'SKRTEEEEEE',
    // Baja competencia - Sant Cugat del Vallès
    'programador Sant Cugat del Valles',
    'desarrollador Sant Cugat',
    'programador industrial Sant Cugat',
    'presupuesto SCADA Sant Cugat',
    // Catalunya/Cataluña - menor competencia
    'programador Catalunya',
    'programador Cataluña',
    'desarrollador web Catalunya',
    'programador industrial Catalunya',
    'contratar programador Catalunya',
    'presupuesto SCADA Catalunya',
    'desarrollador fullstack Catalunya',
    // Barcelona - keywords principales
    'programador industrial bcn',
    'programador industrial Barcelona',
    'contratar programador industrial bcn',
    'contratar programador industrial Barcelona',
    'presupuesto SCADA bcn',
    'presupuesto SCADA Barcelona',
    'programador fullstack bcn',
    'programador fullstack Barcelona',
    'desarrollador web Barcelona',
    'desarollador web Barcelona',
    'desarrollador fullstack Barcelona',
    'desarollador fullstack Barcelona',
    'programador Barcelona',
    'desarrollador React Barcelona',
    'desarrollador Next.js Barcelona',
    'desarrollador TypeScript Barcelona',
    'desarrollador industrial Barcelona',
    'desarollador industrial Barcelona',
    'DevOps Barcelona',
    'freelance developer Barcelona',
    'programador freelance Barcelona',
    // Sinónimos dev/desarrollador/programador
    'dev desarrollador tech',
    'dev desarollador tech',
    'dev fullstack Barcelona',
    // Spain general
    'desarrollador web España',
    'full stack developer Spain',
    'web developer Barcelona',
    'software engineer Barcelona',
    'contratar programador Barcelona',
    // Tech specific
    'programador React',
    'experto Next.js',
    'desarrollador TypeScript España',
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
    // Baja competencia - Sant Cugat del Vallès
    'programador Sant Cugat del Valles',
    'desenvolupador Sant Cugat',
    'programador industrial Sant Cugat',
    'pressupost SCADA Sant Cugat',
    // Catalunya
    'programador Catalunya',
    'desenvolupador web Catalunya',
    'programador industrial Catalunya',
    'contractar programador Catalunya',
    'pressupost SCADA Catalunya',
    'desenvolupador fullstack Catalunya',
    // Barcelona
    'programador industrial bcn',
    'contractar programador industrial bcn',
    'pressupost SCADA bcn',
    'programador fullstack bcn',
    'desenvolupador web Barcelona',
    'desenvolupador fullstack Barcelona',
    'programador Barcelona',
    'desenvolupador React Barcelona',
    'desenvolupador Next.js Barcelona',
    'desenvolupador TypeScript Barcelona',
    'desenvolupador industrial Barcelona',
    'DevOps Barcelona',
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

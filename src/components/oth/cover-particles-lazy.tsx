"use client"

import dynamic from 'next/dynamic';

// Lazy load CoverParticles component to improve initial load performance
const CoverParticlesDynamic = dynamic(
  () => import('./cover-particles').then(mod => ({ default: mod.CoverParticles })),
  { 
    ssr: false,  // Don't render on server - particles are client-only
    loading: () => null  // No loading state needed for background effect
  }
);

export const CoverParticlesLazy = () => {
  return <CoverParticlesDynamic />;
};

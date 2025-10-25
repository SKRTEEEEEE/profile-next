import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';

export type AllPathnamesType = keyof typeof routing.pathnames;


export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'de', "es", "ca"],
 
  // Used when no locale matches
  defaultLocale: 'en',

  // List of rutes translation
  pathnames: {
    "/":"/",
    "/perf": "/perf",
    "/proyectos": {
      en: "/projects",
      de: "/projekte",
      es: "/proyectos",
      ca: "/projectes"
    },
    "/proyectos/[id]": {
      en: "/projects/[id]",
      de: "/projekte/[id]",
      es: "/proyectos/[id]",
      ca: "/projectes/[id]"
    },
    "/portafolio": {
      en: "/portfolio",
      de: "/portfolio",
      es: "/portafolio",
      ca: "/portafoli"
    },
    "/portafolio/perf": {
      en: "/portfolio/perf",
      de: "/portfolio/perf",
      es: "/portafolio/perf",
      ca: "/portafoli/perf"
    },
    "/info": "/info",
    "/info/perf": "/info/perf",
    "/estudios": {
      en: "/studies",
      de: "/studien",
      es: "/estudios",
      ca: "/estudis"
    },
    "/estudios/perf": {
      en: "/studies/perf",
      de: "/studien/perf",
      es: "/estudios/perf",
      ca: "/estudis/perf"
    },
    "/docs/[slug]":"/docs/[slug]",
    "/code": "/code",
    "/code/perf": "/code/perf",
    "/gradients": "/gradients",
    "/gradients/perf": "/gradients/perf",
    // "/academia":{
    //   en: "/academy",
    //   de: "/akademie",
    //   es: "/academia",
    //   ca: "/academia"
    // },
    // "/academia/ejercicios":"/academia/ejercicios",
    // "/academia/ejercicios/[...slug]":"/academia/ejercicios/[...slug]",
    // "/academia/tarifas":"/academia/tarifas",
    // "/academia/temas-ejercicios": "/academia/temas-ejercicios",
    // "/academia/temas-ejercicios/[tema]": "/academia/temas-ejercicios/[tema]",
    // "/academia/verify-email":"/academia/verify-email",
    // "/admin":"/admin",
    // "/admin/techs":"/admin/techs",
    // "/admin/users":"/admin/users",


  }
});
 
// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation(routing);
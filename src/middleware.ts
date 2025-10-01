import createMiddleware from 'next-intl/middleware';
import type { NextRequest } from 'next/server';
import { routing } from './lib/i18n/routing';

// Crear una función que combine el middleware de internacionalización con tu lógica
const middleware = async (request: NextRequest) => {
  const i18nMiddleware = createMiddleware(routing);
  if (request.nextUrl.pathname === '/') {
    

    return i18nMiddleware(request)
  }

  // Ejecutar el middleware de internacionalización
  return i18nMiddleware(request)
};

export default middleware;

export const config = {
  matcher: ['/', '/(de|en|es|ca)/:path*']
};
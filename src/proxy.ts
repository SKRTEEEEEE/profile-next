import createMiddleware from 'next-intl/middleware';
import { routing } from './lib/i18n/routing';

// Create i18n middleware with routing configuration
const proxy = createMiddleware(routing);

export default proxy;

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: ['/', '/(de|en|es|ca)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)']
};
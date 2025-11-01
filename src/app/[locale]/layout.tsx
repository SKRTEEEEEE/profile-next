import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { cn, gradients } from "@/lib/utils";
import { Inter as FontSans } from "next/font/google";
import { routing } from "@/lib/i18n/routing";
import { Toaster } from "@/components/ui/sonner";
import { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import { Navbar } from "@/components/oth/navbar";
import { 
  generateMetadata as generateSEOMetadata, 
  generatePersonSchema, 
  generateWebSiteSchema,
  personalInfo 
} from "@/lib/metadata";
import { Metadata } from "next";

// Optimize font loading for better LCP
const fontSans = FontSans({ 
  subsets: ["latin"], 
  variable: "--font-sans",
  display: 'swap', // Use swap for faster text display
  preload: true,
  fallback: ['system-ui', 'arial', 'sans-serif'],
  adjustFontFallback: true, // Reduce layout shift
});

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: LocaleLayoutProps): Promise<Metadata> {
  const { locale } = await params;
  
  const titles = {
    es: `${personalInfo.name} - Desarrollador Fullstack Barcelona`,
    en: `${personalInfo.name} - Fullstack Developer Barcelona`,
    ca: `${personalInfo.name} - Desenvolupador Fullstack Barcelona`,
    de: `${personalInfo.name} - Fullstack-Entwickler Barcelona`,
  };

  return generateSEOMetadata({
    locale: locale as 'es' | 'en' | 'ca' | 'de',
    title: titles[locale as keyof typeof titles] || titles.es,
    description: personalInfo.description[locale as keyof typeof personalInfo.description] || personalInfo.description.es,
    path: '',
  });
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as "en" | "de" | "es" | "ca")) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages({ locale });

  const randomIndex = Math.floor(Math.random() * gradients.length);
  const randomGradient = gradients[randomIndex];

  // Generate structured data for SEO
  const personSchema = generatePersonSchema(locale as 'es' | 'en' | 'ca' | 'de');
  const websiteSchema = generateWebSiteSchema(locale as 'es' | 'en' | 'ca' | 'de');

  return (
    <html suppressHydrationWarning className="scroll-pt-[3.5rem] dark" lang={locale}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme-preference') || 'dark';
                document.documentElement.classList.add(theme);
              } catch (e) {
                document.documentElement.classList.add('dark');
              }
            `,
          }}
        />
        {/* JSON-LD Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body
        className={cn("max-h-dvh  bg-background font-sans antialiased", fontSans.variable)}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          storageKey="theme-preference"
        >
          <NextIntlClientProvider messages={messages}>
            <div
              style={{
                backgroundImage: randomGradient,
              }}
              className="h-dvh bg-no-repeat "
            >
                <div className="backdrop-blur-3xl bg-neutral-100/10 shadow-lg w-full py-1 fixed flex z-50 justify-center">
                  <Navbar />
                </div>

              <Toaster position="bottom-right" />
              {children}
            </div>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

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

const fontSans = FontSans({ subsets: ["latin"], variable: "--font-sans" });

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
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

  return (
    <html suppressHydrationWarning className="scroll-pt-[3.5rem]" lang={locale}>
      <body
        className={cn("bg-background font-sans antialiased", fontSans.variable)}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
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

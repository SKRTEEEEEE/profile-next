"use client";

import * as React from "react";
import { GithubIcon, LinkedinIcon, Mail, SatelliteDish } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Link as LinkLocale, usePathname } from "@/lib/i18n/routing";
import Link from "next/link";
import { creatorData } from "@/lib/data";
import LocalSwitcher from "./local-switch";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import { useTranslations } from "next-intl";

function Github({ className }: { className?: string }) {
  return (
    <NavigationMenuLink className={className} asChild>
      <Link
        href={creatorData.githubUrl}
        target="_blank"
        className="flex-row items-center gap-2"
      >
        <GithubIcon />
        Github
      </Link>
    </NavigationMenuLink>
  );
}
function LinkedIn({ className }: { className?: string }) {
  return (
    <NavigationMenuLink className={className} asChild>
      <Link
        href={creatorData.linkedin}
        target="_blank"
        className="flex-row items-center gap-2"
      >
        <LinkedinIcon />
        LinkedIn
      </Link>
    </NavigationMenuLink>
  );
}
function Email({ className }: { className?: string }) {
  return (
    <NavigationMenuLink className={className} asChild>
      <Link
        href={creatorData.emailTo}
        target="_blank"
        className="flex-row items-center gap-2"
      >
        <Mail />
        eMail
      </Link>
    </NavigationMenuLink>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const isSmallScreen = useMediaQuery("(max-width: 640px)");
  const t = useTranslations("ceo");

  return (
    <NavigationMenu className="z-50">
      <NavigationMenuList>
        {pathname !== "/" && (
          <NavigationMenuItem>
            <NavigationMenuTrigger>Apps</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <LinkLocale
                      className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
                      href="/"
                    >
                      <div className="mt-4 mb-2 text-lg font-medium">
                        shadcn/ui
                      </div>
                      <p className="text-muted-foreground text-sm leading-tight">
                        Beautifully designed components built with Tailwind CSS.
                      </p>
                    </LinkLocale>
                  </NavigationMenuLink>
                </li>
                <ListItem
                  href="https://profile-skrt.vercel.app/es/academia"
                  title="Blog"
                >
                  Blog y formación para desarrolladores. SaaS de muestra.
                </ListItem>
                <ListItem
                  href="https://profile-skrt.vercel.app/es/admin"
                  title="Dashboard Admin"
                >
                  Panel de administración para gestionar la página y sus
                  contenidos.
                </ListItem>
                <li>
                  <NavigationMenuLink asChild>
                    <LinkLocale href="/" >
                      <div className="text-sm leading-none font-medium">
                        Desarrollador
                      </div>
                      <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                        Información sobre el desarrollador y su experiencia.
                      </p>
                    </LinkLocale>
                  </NavigationMenuLink>
                </li>
                
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        )}

        {pathname !== "/" ? !isSmallScreen ? (
          <>
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <LinkLocale
              href="/"
              className=" flex flex-row items-center gap-2"
            >
              <div>💻</div>
              <div className="w-full text-center">
                {t("main.introduction.buttons.view_projects")}
              </div>
            </LinkLocale>
            </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <LinkLocale
              href="/info"
              className=" w-52 flex items-center px-4 py-2 sm:my-2 transition-all border-2 cursor-pointer text-md  bg-primary-ceo-800/70 hover:bg-primary-ceo-900/20 rounded-xl hover:shadow-md hover:shadow-white/50"
            >
              <div>⚙️</div>
              <div className="w-full text-center">
                {t("main.introduction.buttons.tech_stack")}
              </div>
            </LinkLocale>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Email className={navigationMenuTriggerStyle()} />
            </NavigationMenuItem>
          </>
        ) : (
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              <div className="flex items-center gap-2">
                <SatelliteDish className="h-4 w-4" />
                Working
              </div>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[250px] gap-3 p-4">
                <ListItem
                  href={creatorData.githubUrl}
                  title="Github"
                  target="_blank"
                > 
                  Repositorios y proyectos open source
                </ListItem>
                <ListItem
                  href={creatorData.linkedin}
                  title="LinkedIn"
                  target="_blank"
                >
                  Perfil profesional y experiencia
                </ListItem>
                <ListItem
                  href={creatorData.emailTo}
                  title="Email"
                  target="_blank"
                >
                  Contacto directo por correo
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ):null}

        {pathname === "/" && !isSmallScreen ? (
          <>
            <NavigationMenuItem>
              <Github className={navigationMenuTriggerStyle()} />
            </NavigationMenuItem>
            <NavigationMenuItem>
              <LinkedIn className={navigationMenuTriggerStyle()} />
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Email className={navigationMenuTriggerStyle()} />
            </NavigationMenuItem>
          </>
        ) : (
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              <div className="flex items-center gap-2">
                <SatelliteDish className="h-4 w-4" />
                Social
              </div>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[250px] gap-3 p-4">
                <ListItem
                  href={creatorData.githubUrl}
                  title="Github"
                  target="_blank"
                > 
                  Repositorios y proyectos open source
                </ListItem>
                <ListItem
                  href={creatorData.linkedin}
                  title="LinkedIn"
                  target="_blank"
                >
                  Perfil profesional y experiencia
                </ListItem>
                <ListItem
                  href={creatorData.emailTo}
                  title="Email"
                  target="_blank"
                >
                  Contacto directo por correo
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        )}

        <LocalSwitcher />
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function ListItem({
  title,
  children,
  href,
  target = undefined,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string; target?: "_blank" }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href} target={target}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}

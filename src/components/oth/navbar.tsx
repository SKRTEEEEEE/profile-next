"use client";

import * as React from "react";
import { GithubIcon, LinkedinIcon, Mail } from "lucide-react";

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
  return (
    <NavigationMenu className="z-50" viewport={false}>
      <NavigationMenuList>
        {pathname !== "/" && (
          <NavigationMenuItem>
            <NavigationMenuTrigger>Home</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
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
                <ListItem
                  href="/docs/primitives/typography"
                  target="_blank"
                  title="Desarrollador"
                >
                  Información sobre el desarrollador y su experiencia.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        )}

        {pathname !== "/" ? (
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <LinkLocale href="/">Stack Tech</LinkLocale>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ) : (
          <NavigationMenuItem>
            <Github className={navigationMenuTriggerStyle()} />
          </NavigationMenuItem>
        )}
        {pathname !== "/" ? (
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <LinkLocale href="/">Stack Tech</LinkLocale>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ) : (
          <NavigationMenuItem>
            <LinkedIn className={navigationMenuTriggerStyle()} />
          </NavigationMenuItem>
        )}
        {pathname !== "/" ? (
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <LinkLocale href="/">Stack Tech</LinkLocale>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ) : (
          <NavigationMenuItem>
            <Email className={navigationMenuTriggerStyle()} />
          </NavigationMenuItem>
        )}

        {pathname !== "/" && (
          <NavigationMenuItem>
            <NavigationMenuTrigger>Social</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[200px] gap-4">
                <li>
                  <Github />
                  <LinkedIn />
                  <Email />
                </li>
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

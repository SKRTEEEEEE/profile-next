"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Languages } from "lucide-react";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
// import { Button } from '@/components/ui/button';

export default function LocalSwitcher() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const localActive = useLocale();
  const route = usePathname();
  const t = useTranslations("root")

  const pathname = route.split("/").slice(2).join("/");

  const onSelectChange = (nextLocale: string) => {
    startTransition(() => {
      router.push(`/${nextLocale}/${pathname}`);
    });
  };

  const languages = [
    { value: "es", label: "Español" },
    { value: "ca", label: "Català" },
    { value: "en", label: "English" },
    { value: "de", label: "Deutsch" },
  ];

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger >
        {/* <Button 
          variant="ghost" 
          size="icon"
          aria-label="Seleccionar idioma"
          className="w-10 h-10 rounded-full"
        >
          <Globe className="h-5 w-5" />
        </Button> */}
        <div className="flex items-center gap-2">
            <Languages  className="h-4 w-4" />
            {t("lang")}
        </div>
        
      </NavigationMenuTrigger>
      <NavigationMenuContent className="w-[200px] p-0">
        <ul className="flex flex-col gap-2">
          {languages.map(({ value, label }) => (
            <li
              key={value}
              onClick={() => onSelectChange(value)}
              className={`flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 transition hover:bg-neutral-800/50 ${
                isPending ? "opacity-50 pointer-events-none" : ""
              }`}
            >
              <Avatar className="h-6 w-6">
                <AvatarImage
                  src={`/comm/logo-${value}.png`}
                  alt={`${label} flag`}
                />
                <AvatarFallback>{value.toUpperCase()}</AvatarFallback>
              </Avatar>
              <span>{label}</span>
              {value === localActive && (
                <span className="ml-auto text-green-600">✓</span>
              )}
            </li>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}

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

export default function LocalSwitcher() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const localActive = useLocale();
  const route = usePathname();
  const t = useTranslations("root");

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
      <NavigationMenuTrigger>
        <div className="flex items-center gap-2">
          <Languages className="h-4 w-4" />
          {t("lang")}
        </div>
      </NavigationMenuTrigger>
      <NavigationMenuContent >
        <ul className="grid w-[200px] gap-2 p-4">
          {languages.map(({ value, label }) => (
            <li
              key={value}
              onClick={() => onSelectChange(value)}
              className={`flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 transition hover:bg-neutral-800/50 ${
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
              <span className="text-sm">{label}</span>
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
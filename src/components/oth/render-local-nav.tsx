"use client";

import { ReactNode } from "react";
import { Link } from "@/lib/i18n/routing";
import { useLocale } from "next-intl";

export function RenderLocalNav({
  type,
  config,
  className = "flex flex-row items-center gap-2",
  title,
}: {
  type: "estudios" | "info" | "portafolio" | "cv";
  config: {
    text: string
    pathname: string
  }
  className?: string;
  children?: ReactNode;
  title?: string;
}) {
  const locale = useLocale();
  
  let pathname: "/estudios" | "/info" | "/portafolio" | "/" ; 
  let icon: string;

  switch (type) {
    case "estudios":
      pathname = "/estudios";
      icon = "🧑‍🎓";
      break;
    case "info":
      pathname = "/info";
      icon = "⚙️";
      break;
    case "portafolio":
      pathname = "/portafolio";
      icon = "💻";
      break;
    case "cv":
      pathname = "/";
      icon = "📋";
      break;
    default:
      pathname = "/";
      icon = "❓";
      break;
  }

  // Manejo especial para el CV: abrir PDF en nueva pestaña
  if (type === "cv") {
    const handleCvClick = () => {
      // Mapear 'ca' (catalán) a 'es' (español)
      const cvLocale = locale === "ca" ? "es" : locale;
      const cvUrl = `/cv/adan-reh-cv-${cvLocale}.pdf`;
      window.open(cvUrl, "_blank");
    };

    return (
      <button onClick={handleCvClick} className={className} title={title}>
        <div>{icon}</div>
        <div className="w-full text-center">{config.text}</div>
      </button>
    );
  }

  return (
    <Link href={pathname} className={className} title={title}>
      <div>{icon}</div>
      <div className="w-full text-center">{config.text}</div>
    </Link>
  );
}

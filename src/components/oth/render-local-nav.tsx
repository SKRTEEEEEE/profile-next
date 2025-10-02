import { ReactNode } from "react";
import { Link } from "@/lib/i18n/routing";

export function RenderLocalNav({
  type,
  config,
  className = "flex flex-row items-center gap-2",
}: {
  type: "estudios" | "info" | "portafolio" | "cv";
  config: {
    text: string
    pathname: string
  }
  className?: string;
  children?: ReactNode; 
}) {
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

  return (
    <Link href={pathname} className={className}>
      <div>{icon}</div>
      <div className="w-full text-center">{config.text}</div>
    </Link>
  );
}

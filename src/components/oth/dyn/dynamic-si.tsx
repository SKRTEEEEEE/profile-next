import React from "react";
import * as SimpleIcons from "simple-icons";
import { SimpleIcon } from "simple-icons";

export type SimpleIconNames = keyof typeof SimpleIcons;

interface DynamicSimpleIconProps extends React.SVGAttributes<SVGElement> {
  iconName: SimpleIconNames | undefined;
  size?: string | number;
  color?: string;
}

export const DynamicSimpleIcon: React.FC<DynamicSimpleIconProps> = ({
  iconName,
  size = 24,
  color,
  ...props
}) => {
  const icon = SimpleIcons[iconName!] as SimpleIcon | undefined;

  if (!icon) {
    console.warn(`Icon "${String(iconName)}" not found in Simple Icons`);
    return null;
  }

  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={color || `#${icon.hex}`}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>{icon.title}</title>
      <path d={icon.path} />
    </svg>
  );
};

const exceptionsSINameBadge: Record<string, SimpleIconNames> = {
  "css": "siCss",
  "js": "siJavascript",
  "ts": "siTypescript",
  // puedes añadir más excepciones aquí
};

/**
 * Devuelve el nombre de icono correcto de SimpleIcons
 * según el slug o nombre de badge dado.
 */
export const createSimpleIconByNameBadge = (
  nameBadge: string
): SimpleIconNames | undefined => {
  // comprobar excepciones
  if (nameBadge.toLowerCase() in exceptionsSINameBadge) {
    return exceptionsSINameBadge[nameBadge.toLowerCase()];
  }

  // intentamos generar el nombre normalizado
  const candidate = `si${nameBadge
    .charAt(0)
    .toUpperCase()}${nameBadge.slice(1)}` as SimpleIconNames;

  // comprobar si existe en SimpleIcons
  if (candidate in SimpleIcons) {
    return candidate;
  }

  console.warn(`Badge "${nameBadge}" no tiene icono en SimpleIcons`);
  return undefined;
};
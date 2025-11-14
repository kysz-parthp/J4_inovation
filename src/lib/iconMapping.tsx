// lib/iconMapping.ts
// Helper to map icon name strings to lucide-react icon components

import * as LucideIcons from "lucide-react";
import { ReactElement } from "react";

type IconName = keyof typeof LucideIcons;

/**
 * Get an icon component by name
 * @param iconName - Name of the icon (e.g., "Code", "Bot", "Mic")
 * @param size - Size of the icon (default: 40)
 * @returns React element with the icon, or null if not found
 */
export function getIconComponent(
  iconName: string | undefined,
  size: number = 40
): ReactElement | null {
  if (!iconName) return null;

  // Convert icon name to match lucide-react naming (e.g., "Code2" -> "Code2")
  const IconComponent = LucideIcons[iconName as IconName] as
    | React.ComponentType<{ size?: number }>
    | undefined;

  if (!IconComponent) {
    console.warn(`Icon "${iconName}" not found in lucide-react`);
    return null;
  }

  return <IconComponent size={size} />;
}

/**
 * Get an icon component with default fallback
 * @param iconName - Name of the icon
 * @param fallbackIcon - Fallback icon component
 * @param size - Size of the icon
 * @returns React element with the icon
 */
export function getIconWithFallback(
  iconName: string | undefined,
  fallbackIcon: ReactElement,
  size: number = 40
): ReactElement {
  const icon = getIconComponent(iconName, size);
  return icon || fallbackIcon;
}

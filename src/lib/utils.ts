import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import { isMobile, isTablet } from "react-device-detect";
import type { DeviceType } from "..";



export const getDeviceType = ():DeviceType => {
  if (isMobile) return "mobile";
  if (isTablet) return "tablet";
  return "desktop";
};

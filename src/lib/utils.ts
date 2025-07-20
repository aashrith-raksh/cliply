import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import { isMobile, isTablet } from "react-device-detect";
import type { DeviceChartEntry, DeviceType } from "..";
import { monthNames } from "./constant";

export const getDeviceType = (): DeviceType => {
  if (isMobile) return "mobile";
  if (isTablet) return "tablet";
  return "desktop";
};

type City = "hyderabad" | "mumbai" | "delhi" | "bangalore";

type ChartEntry = {
  [key in City]: number;
} & {
  month: string;
};

export function generateClicksChartDataTemplate() {
  const cities = ["hyderabad", "mumbai", "delhi", "bangalore"];

  const clicksChartDataTemplate = monthNames.map((month) => {
    //@ts-ignore
    const entry: ChartEntry = { month } as Partial<ChartEntry>;

    for (const city of cities) {
      entry[city as City] = 0;
    }
    return entry;
  });

  return clicksChartDataTemplate;
}


export function generateDevicesChartDataTemplate() {
  const devices:DeviceType[] = ["tablet", "mobile", "desktop"]
  const devicesChartDataTemplate:DeviceChartEntry[] = devices.map(device => ({device, clicks:0, fill:`var(--color-${device})`}))
  return devicesChartDataTemplate
}
import { createContext, useContext } from "react";
import type { DashboardStateType } from "@/index";

export const dashboardContext = createContext<DashboardStateType>({
  urls: [],
  totalClicks: null,
  totalLinksCreated: null,
  fetchAllUrls: async () => {return undefined},
  setFetchedUrls: () => {}
});

export function useDashboardContext() {
  return useContext(dashboardContext);
}

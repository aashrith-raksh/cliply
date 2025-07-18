import { createContext, useContext } from "react";
import type { DashboardStateType } from "..";

export const dashboardContext = createContext<DashboardStateType>({
  urls: [],
  totalClicks: null,
  totalLinksCreated: null,
  fetchAllUrls:() => {}
});

export function useDashboardContext() {
  return useContext(dashboardContext);
}

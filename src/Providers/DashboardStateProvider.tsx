import { dashboardContext } from "@/store/dashboard-state";
import { useEffect, useState, type ReactNode } from "react";
import type { URL_Type } from "..";
import {
  getAllUrlsOfCurrentUser,
  getTotalClicksFromDB,
} from "@/lib/supabase/url-utils";
import { useGlobalContext } from "@/store/global-state";



const DashboardStateProvider = ({ children }: { children: ReactNode }) => {
  const [fetchedUrls, setFetchedUrls] = useState<URL_Type[] | null>(null);

  const [totalLinksCreated, setTotalLinksCreated] = useState<number | null>(
    null
  );
  const [totalClicks, setTotalClicks] = useState<number | null>(null);

  const { user } = useGlobalContext();

  async function fetchAllUrls() {
      try {
        const data = await getAllUrlsOfCurrentUser(user!.id);
        setFetchedUrls(data);
        setTotalLinksCreated(data.length);
      } catch (error) {
        console.log((error as Error).message);
      }
    }

  useEffect(() => {
    async function getTotalClicks() {
      const urlIds = [...fetchedUrls!.map((url) => url.id)];
      return await getTotalClicksFromDB(urlIds);
    }

    if (fetchedUrls) {
      getTotalClicks().then((totalClicks) => setTotalClicks(totalClicks));
    }
  }, [fetchedUrls]);

  useEffect(() => {
    fetchAllUrls();
  }, []);

  const value = { urls: fetchedUrls, totalClicks, totalLinksCreated, fetchAllUrls };
  return (
    <dashboardContext.Provider value={value}>
      {children}
    </dashboardContext.Provider>
  );
};

export default DashboardStateProvider;

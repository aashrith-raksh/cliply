import { useState, useEffect } from "react";
import { toast } from "sonner";

export function useFetchChartData<T, Args extends unknown[]>(
  fetchFn: (...args: Args) => Promise<T>,
  ...fetchArgs: Args
):[T | null] {
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    fetchFn(...fetchArgs)
      .then((chartData: T) => setData(chartData))
      .catch((e: Error) => toast(e.message));
  }, []);

  return [data];
}

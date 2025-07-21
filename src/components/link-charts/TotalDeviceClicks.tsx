import { Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { monthNames } from "@/lib/constant";
import type { DeviceChartEntry } from "@/index";
import { generateDevicesChartData } from "@/lib/supabase/url-utils";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

export const description = "A simple pie chart";

const chartConfig = {
  mobile: {
    label: "Mobile",
    color: "var(--chart-1)",
  },
  desktop: {
    label: "Desktop",
    color: "var(--chart-2)",
  },
  tablet: {
    label: "Tablet",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

const currentMonth = monthNames[new Date().getMonth()];
const currentYear = new Date().getFullYear();

export function TotalDeviceClicksChart() {
  const [data, setData] = useState<DeviceChartEntry[]>();
  const params = useParams();
  const urlIdentifier = params.id;

  let showChart = false;
  if (data) {
    showChart = data[0].clicks > 0 || data[2].clicks > 0 || data[2].clicks > 0;
  }
  useEffect(() => {
    generateDevicesChartData(urlIdentifier!)
      .then((chartData) => setData(chartData))
      .catch((e: Error) => toast(e.message));
  }, []);
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Total Clicks By Device Type</CardTitle>
        <CardDescription>{`January - ${currentMonth} ${currentYear}`}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        {showChart ? (
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Pie data={data} dataKey="clicks" nameKey="device" />
            </PieChart>
          </ChartContainer>
        ) : (
          <div className="min-h-60 grid place-items-center">
            <p>No clicks yet...</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

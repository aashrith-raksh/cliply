"use client";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

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
import { useEffect, useState } from "react";
import { LoaderCircle } from "lucide-react";
import { generateClicksChartData } from "@/lib/supabase/url-utils";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import type { ChartEntry } from "@/index";

const chartConfig = {
  hyderabad: {
    label: "Hyderabad",
    color: "var(--chart-1)",
  },
  mumbai: {
    label: "Mumbai",
    color: "var(--chart-2)",
  },
  bangalore: {
    label: "Banglore",
    color: "var(--chart-3)",
  },
  delhi: {
    label: "Delhi",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig;

const currentMonth = monthNames[new Date().getMonth()];
const currentYear = new Date().getFullYear();

export function MonthlyCityClicksChart() {
  const [data, setData] = useState<ChartEntry[] | null>(null);
  const params = useParams();
  const urlIdentifier = params.id;

  useEffect(() => {
    generateClicksChartData(urlIdentifier!)
      .then((charData) => setData(charData))
      .catch((e: Error) => toast(e.message));
  }, []);
  return (
    <Card>
      <CardHeader>
        <CardTitle>City Wise Clicks</CardTitle>
        <CardDescription>{`January - ${currentMonth} ${currentYear}`}</CardDescription>
      </CardHeader>
      <CardContent className="max-h-">
        {data ? (
          <ChartContainer config={chartConfig} className="max-h-60 w-full">
            <LineChart
              accessibilityLayer
              data={data}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Line
                dataKey="hyderabad"
                type="monotone"
                stroke="var(--color-hyderabad)"
                strokeWidth={2}
                dot={false}
              />
              <Line
                dataKey="mumbai"
                type="monotone"
                stroke="var(--color-mumbai)"
                strokeWidth={2}
                dot={false}
              />
              <Line
                dataKey="delhi"
                type="monotone"
                stroke="var(--color-delhi)"
                strokeWidth={2}
                dot={false}
              />
              <Line
                dataKey="bangalore"
                type="monotone"
                stroke="var(--color-bangalore)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        ) : (
          <LoaderCircle className="animate-spin w-10 h-auto text-blue-500 stroke-[1.2]" />
        )}
      </CardContent>
    </Card>
  );
}

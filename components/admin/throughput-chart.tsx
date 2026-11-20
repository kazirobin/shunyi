"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

export type ThroughputPoint = { date: string; label: string; received: number; finished: number };

export function ThroughputChart({
  data,
  labels,
}: {
  data: ThroughputPoint[];
  labels: { received: string; finished: string };
}) {
  const config = {
    received: { label: labels.received, color: "var(--chart-2)" },
    finished: { label: labels.finished, color: "var(--chart-1)" },
  } satisfies ChartConfig;
  return (
    <ChartContainer config={config} className="aspect-auto h-72 w-full">
      <AreaChart data={data} margin={{ left: 0, right: 8, top: 8 }}>
        <defs>
          <linearGradient id="fill-received" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-received)" stopOpacity={0.22} />
            <stop offset="100%" stopColor="var(--color-received)" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="fill-finished" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-finished)" stopOpacity={0.28} />
            <stop offset="100%" stopColor="var(--color-finished)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} strokeDasharray="3 4" />
        <XAxis dataKey="label" tickLine={false} axisLine={false} tickMargin={10} minTickGap={24} />
        <YAxis tickLine={false} axisLine={false} width={44} tickMargin={6} allowDecimals={false} />
        <ChartTooltip cursor={{ strokeDasharray: "3 3" }} content={<ChartTooltipContent indicator="line" />} />
        <Area
          dataKey="received"
          type="monotone"
          stroke="var(--color-received)"
          strokeWidth={2}
          fill="url(#fill-received)"
        />
        <Area
          dataKey="finished"
          type="monotone"
          stroke="var(--color-finished)"
          strokeWidth={2}
          fill="url(#fill-finished)"
        />
        <ChartLegend content={<ChartLegendContent />} />
      </AreaChart>
    </ChartContainer>
  );
}

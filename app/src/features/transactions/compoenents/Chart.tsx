import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ChartLegend, ChartLegendContent } from "@/components/ui/chart";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const chartData = [
  { month: "January", income: 186, expense: 80 },
  { month: "February", income: 305, expense: 200 },
  { month: "March", income: 237, expense: 120 },
  { month: "April", income: 73, expense: 190 },
  { month: "May", income: 209, expense: 130 },
  { month: "June", income: 214, expense: 140 },
];

const chartConfig = {
  income: {
    label: "収入",
    color: "#16a34a",
  },
  expense: {
    label: "支出",
    color: "#dc2626",
  },
} satisfies ChartConfig;

export function Chart() {
  return (
    <>
      <Tabs defaultValue="account" className="w-80 sm:w-full mx-auto">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="week">週</TabsTrigger>
          <TabsTrigger value="month">月</TabsTrigger>
          <TabsTrigger value="year">年</TabsTrigger>
        </TabsList>
        <TabsContent value="account"></TabsContent>
        <TabsContent value="password"></TabsContent>
      </Tabs>
      <ChartContainer
        config={chartConfig}
        className="h-[200px] sm:h-[450px] w-full"
      >
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="income" fill="var(--color-income)" radius={4} />
          <Bar dataKey="expense" fill="var(--color-expense)" radius={4} />
        </BarChart>
      </ChartContainer>
    </>
  );
}

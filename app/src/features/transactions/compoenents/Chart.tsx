import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ChartLegend, ChartLegendContent } from "@/components/ui/chart";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { db, Transaction } from "@/db/client";
import { useLiveQuery } from "dexie-react-hooks";

const DayOfWeek = {
  Sunday: { full: "Sunday", short: "Sun.", abbr: "Su." },
  Monday: { full: "Monday", short: "Mon.", abbr: "Mo." },
  Tuesday: { full: "Tuesday", short: "Tue.", abbr: "Tu." },
  Wednesday: { full: "Wednesday", short: "Wed.", abbr: "We." },
  Thursday: { full: "Thursday", short: "Thu.", abbr: "Th." },
  Friday: { full: "Friday", short: "Fri.", abbr: "Fr." },
  Saturday: { full: "Saturday", short: "Sat.", abbr: "Sa." },
} as const;

function getAbbrByFull(full: string): AbbrDayOfWeekType {
  return (
    Object.values(DayOfWeek).find((day) => day.full === full)?.abbr ?? "Mo."
  );
}

type DayOfWeekType = (typeof DayOfWeek)[keyof typeof DayOfWeek]["full"];
type AbbrDayOfWeekType = (typeof DayOfWeek)[keyof typeof DayOfWeek]["abbr"];

type ChartItem = {
  dayOfWeek: AbbrDayOfWeekType;
  income: number;
  expense: number;
};
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

const groupTransactionsByDay = (transactions: Transaction[]): ChartItem[] => {
  const daysOfWeek: DayOfWeekType[] = [
    ...Object.entries(DayOfWeek).map(([_key, value]) => value.full),
  ];

  return daysOfWeek.map((day) => {
    const filteredTransactions = transactions.filter((transaction) => {
      return day === daysOfWeek[new Date(transaction.createAt).getDay()];
    });

    const { income, expense } = filteredTransactions.reduce(
      (totals, transaction) => {
        if (transaction.amount > 0) {
          totals.income += transaction.amount;
        } else {
          totals.expense += transaction.amount;
        }
        return totals;
      },
      { income: 0, expense: 0 }
    );

    return {
      dayOfWeek: getAbbrByFull(day),
      income,
      expense: Math.abs(expense),
    };
  });
};

export function Chart() {
  const now = new Date();

  const getStartOfWeek = () => {
    const firstDayOfWeek = new Date(now.setDate(now.getDate() - now.getDay())); // Sunday is considered the start of the week
    firstDayOfWeek.setHours(0, 0, 0, 0);
    return firstDayOfWeek;
  };

  const getEndOfWeek = () => {
    const lastDayOfWeek = new Date(
      now.setDate(now.getDate() + (6 - now.getDay()))
    );
    lastDayOfWeek.setHours(23, 59, 59, 999);
    return lastDayOfWeek;
  };

  const startOfWeek = getStartOfWeek();
  const endOfWeek = getEndOfWeek();
  const chartData =
    useLiveQuery(async () => {
      const transactions = await db.transactions
        .where("createAt")
        .between(startOfWeek, endOfWeek, true, true)
        .toArray();
      console.log({ transactions });

      const chartList: ChartItem[] = groupTransactionsByDay(transactions);
      return chartList;
    }) ?? [];
  return (
    <>
      <Tabs defaultValue="week" className="w-80 sm:w-full mx-auto  px-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="week">週</TabsTrigger>
          <TabsTrigger value="month" disabled>
            月
          </TabsTrigger>
          <TabsTrigger value="year" disabled>
            年
          </TabsTrigger>
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
            dataKey="dayOfWeek"
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

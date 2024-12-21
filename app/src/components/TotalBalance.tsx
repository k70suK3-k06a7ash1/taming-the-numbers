import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownIcon, ArrowUpIcon, MinusIcon } from "lucide-react";

interface TotalBalanceProps {
  income: number;
  expenses: number;
}
export function TotalBalance({ income, expenses }: TotalBalanceProps) {
  const balance = income - expenses;

  return (
    <div className="grid gap-4 md:grid-cols-3 mb-4">
      <Card className="overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">収入</CardTitle>
          <ArrowUpIcon className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-500">
            ¥{Math.round(income).toLocaleString()}円
          </div>
          <div className="text-xs text-muted-foreground">前月比 +2.5%</div>
        </CardContent>
        <div className="bg-green-500/10 h-1 w-full">
          <div
            className="bg-green-500 h-full w-3/4"
            style={{ width: `${(income / (income + expenses)) * 100}%` }}
          ></div>
        </div>
      </Card>
      <Card className="overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">支出</CardTitle>
          <ArrowDownIcon className="h-4 w-4 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-500">
            ¥{Math.round(expenses).toLocaleString()}円
          </div>
          <div className="text-xs text-muted-foreground">前月比 -1.5%</div>
        </CardContent>
        <div className="bg-red-500/10 h-1 w-full">
          <div
            className="bg-red-500 h-full"
            style={{ width: `${(expenses / (income + expenses)) * 100}%` }}
          ></div>
        </div>
      </Card>
      <Card className="overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">残高</CardTitle>
          <MinusIcon className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div
            className={`text-2xl font-bold ${
              balance >= 0 ? "text-blue-500" : "text-red-500"
            }`}
          >
            ¥{Math.round(balance).toLocaleString()}円
          </div>
          <div className="text-xs text-muted-foreground">前月比 +4.5%</div>
        </CardContent>
        <div className="bg-blue-500/10 h-1 w-full">
          <div
            className="bg-blue-500 h-full"
            style={{
              width: `${(Math.abs(balance) / (income + expenses)) * 100}%`,
            }}
          ></div>
        </div>
      </Card>
    </div>
  );
}

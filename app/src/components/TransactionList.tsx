import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
// ダミーデータを生成する関数
function generateDummyTransactions(count: number) {
  const categories = [
    "Food",
    "Income",
    "Utilities",
    "Transportation",
    "Entertainment",
    "Other",
  ];
  const transactions = [];

  for (let i = 1; i <= count; i++) {
    const amount = Math.random() * 1000 - 500; // -500 to 500
    transactions.push({
      id: i,
      date: new Date(2023, 0, i).toISOString().split("T")[0], // 2023-01-01 to 2023-12-31
      description: `Transaction ${i}`,
      amount: parseFloat(amount.toFixed(2)),
      category: categories[Math.floor(Math.random() * categories.length)],
    });
  }

  return transactions;
}

const transactions = generateDummyTransactions(50); // 50個のダミートランザクションを生成

export default function TransactionList() {
  return (
    <div className="space-y-4 p-4">
      {transactions.map((transaction) => (
        <Card key={transaction.id} className="">
          <CardContent className="flex justify-between items-center p-4">
            <div className="flex items-center space-x-4">
              <div
                className={`p-2 rounded-full ${
                  transaction.amount >= 0
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {transaction.amount >= 0 ? (
                  <ArrowUpRight className="h-5 w-5" />
                ) : (
                  <ArrowDownRight className="h-5 w-5" />
                )}
              </div>
              <div>
                <p className="font-semibold">{transaction.description}</p>
                <p className="text-sm text-muted-foreground">
                  {transaction.category}
                </p>
                <p className="text-sm text-muted-foreground">
                  {transaction.date}
                </p>
              </div>
            </div>
            <p
              className={`font-bold whitespace-nowrap ${
                transaction.amount >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {transaction.amount >= 0 ? "+" : ""}
              {transaction.amount.toFixed(2)}円
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

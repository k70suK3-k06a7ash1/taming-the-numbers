import { TotalBalance } from "@/components/TotalBalance";
import { Card, CardContent } from "@/components/ui/card";
import { db } from "@/db/client";
import { useLiveQuery } from "dexie-react-hooks";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

// const transactions = generateDummyTransactions(); // 50個のダミートランザクションを生成

export default function TransactionList() {
  const transactions =
    useLiveQuery(
      async () => {
        //
        // Query Dexie's API
        //
        const transactions = await db.transactions
          // .where("age")
          // .between(minAge, maxAge)
          .toArray();

        // Return result
        return transactions;
      },
      // specify vars that affect query:
      []
    ) ?? [];
  const totalIncome = transactions.reduce(
    (sum, transaction) =>
      transaction.amount > 0 ? sum + transaction.amount : sum,
    0
  );
  const totalExpenses = transactions.reduce(
    (sum, transaction) =>
      transaction.amount < 0 ? sum + Math.abs(transaction.amount) : sum,
    0
  );

  return (
    <div className="space-y-4 p-4">
      <TotalBalance income={totalIncome} expenses={totalExpenses} />
      <h2 className="text-2xl font-bold mb-4">最近の取引</h2>

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
                  {transaction.description}
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

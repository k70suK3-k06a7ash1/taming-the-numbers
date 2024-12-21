import { Card, CardContent } from "@/components/ui/card";
import { Transaction } from "@/db/client";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

type TransactionCardProps = {
  transaction: Transaction;
};
export const TransactionCard = ({ transaction }: TransactionCardProps) => (
  <Card className="rounded-lg">
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
        {transaction.amount.toFixed(0)}円
      </p>
    </CardContent>
  </Card>
);

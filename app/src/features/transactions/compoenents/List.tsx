import { TotalBalance } from "@/components/TotalBalance";
import { db } from "@/db/client";
import { useLiveQuery } from "dexie-react-hooks";

export default function TransactionList() {
  const transactions =
    useLiveQuery(
      async () => await db.transactions.toArray(),
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

  return <TotalBalance income={totalIncome} expenses={totalExpenses} />;
}

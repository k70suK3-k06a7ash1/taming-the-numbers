import { Card, CardContent } from "@/components/ui/card";

const transactions = [
  {
    id: 1,
    date: "2023-05-01",
    description: "Grocery shopping",
    amount: -50.25,
  },
  { id: 2, date: "2023-05-02", description: "Salary", amount: 2000 },
  { id: 3, date: "2023-05-03", description: "Electric bill", amount: -75.5 },
  // Add more transactions as needed
];

export default function TransactionList() {
  return (
    <div className="space-y-4 p-4">
      {transactions.map((transaction) => (
        <Card key={transaction.id} className="">
          <CardContent className="flex justify-between items-center p-4">
            <div>
              <p className="font-semibold">{transaction.description}</p>
              <p className="text-sm text-muted-foreground">
                {transaction.date}
              </p>
            </div>
            <p
              className={`font-bold ${
                transaction.amount >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {transaction.amount.toFixed(2)}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// db.ts
import Dexie, { type EntityTable } from "dexie";

interface Category {
  id: number;
  title: string;
}
interface Transaction {
  id: number;
  description: string;
  category: string;
  amount: number;
  createAt: Date;
  updateAt: Date;
}

const db = new Dexie("Database") as Dexie & {
  transactions: EntityTable<Transaction, "id">;
};

// Schema declaration:
db.version(1).stores({
  transactions: "++id, description, category, amount",
  categories: "++id, title",
});

export type { Transaction, Category };
export { db };

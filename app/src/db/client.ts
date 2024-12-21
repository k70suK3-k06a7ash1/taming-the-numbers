// db.ts
import Dexie, { type EntityTable } from "dexie";

interface Bookkeeping {
  id: number;
  title: string;
  description: string;
  createAt: Date;
  updateAt: Date;
}
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
  bookkeepingId: number;
}

const db = new Dexie("Database") as Dexie & {
  transactions: EntityTable<Transaction, "id">;
};

// Schema declaration:
db.version(1).stores({
  transactions:
    "++id, description, category, amount,createAt, updateAt, bookkeepingId",
  categories: "++id, title",
});

export type { Transaction, Category, Bookkeeping };
export { db };

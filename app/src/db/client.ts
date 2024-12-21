// db.ts
import Dexie, { type EntityTable } from "dexie";

interface Transaction {
  id: number;
  description: string;
  category: string;
  amount: number;
  createAt: Date;
  updateAt: Date;
}

const db = new Dexie("FriendsDatabase") as Dexie & {
  transactions: EntityTable<Transaction, "id">;
};

// Schema declaration:
db.version(1).stores({
  friends: "++id, name, age", // primary key "id" (for the runtime!)
  transactions: "++id, description, category, amount",
});

export type { Transaction };
export { db };

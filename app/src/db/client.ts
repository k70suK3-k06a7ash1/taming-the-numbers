// db.ts
import Dexie, { type EntityTable } from "dexie";

interface Friend {
  id: number;
  name: string;
  age: number;
}

interface Transaction {
  id: number;
  description: string;
  category: string;
  amount: number;
  createAt: Date;
  updateAt: Date;
}

const db = new Dexie("FriendsDatabase") as Dexie & {
  friends: EntityTable<
    Friend,
    "id" // primary key "id" (for the typings only)
  >;
  transactions: EntityTable<Transaction, "id">;
};

// Schema declaration:
db.version(1).stores({
  friends: "++id, name, age", // primary key "id" (for the runtime!)
  transactions: "++id, description, category, amount",
});

export type { Friend, Transaction };
export { db };

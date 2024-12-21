"use client";

import { useState } from "react";
import { SwipeableListItem } from "./SwipeableListItem";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Transaction } from "@/db/client";
import { TransactionCard } from "@/features/transactions/compoenents/Card";

type Props = {
  transactions: Transaction[];
};
export const SwipeableList = ({ transactions }: Props) => {
  const [items, setItems] = useState<Transaction[]>(transactions);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");
  const [openItemId, setOpenItemId] = useState<number | null>(null);

  const handleDelete = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleEdit = (id: number) => {
    const itemToEdit = items.find((item) => item.id === id);
    if (itemToEdit) {
      setEditingId(id);
      setEditText(itemToEdit.description);
    }
  };

  const handleSaveEdit = () => {
    if (editingId !== null) {
      setItems(
        items.map((item) =>
          item.id === editingId ? { ...item, text: editText } : item
        )
      );
      setEditingId(null);
      setEditText("");
    }
  };

  const handleOutsideClick = () => {
    if (openItemId !== null) {
      setOpenItemId(null);
    }
  };

  return (
    <div className="w-full mx-auto" onClick={handleOutsideClick}>
      <ul className="bg-gray-100 rounded-lg overflow-hidden">
        {items.map((item) => (
          <li
            key={item.id}
            className="border-b border-gray-200 last:border-b-0"
          >
            {editingId === item.id ? (
              <div className="p-4 flex">
                <Input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="flex-grow mr-2"
                />
                <Button onClick={handleSaveEdit}>Save</Button>
              </div>
            ) : (
              <SwipeableListItem
                onDelete={() => handleDelete(item.id)}
                onEdit={() => handleEdit(item.id)}
                isOpen={openItemId === item.id}
                setIsOpen={(isOpen) => setOpenItemId(isOpen ? item.id : null)}
              >
                <TransactionCard key={item.id} transaction={item} />
              </SwipeableListItem>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

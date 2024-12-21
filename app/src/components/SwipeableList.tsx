"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SwipeableListItem } from "@/components/SwipeableListItem";

interface Item {
  id: number;
  text: string;
}

export const SwipeableList: React.FC = () => {
  const [items, setItems] = useState<Item[]>([
    { id: 1, text: "Buy groceries" },
    { id: 2, text: "Clean the house" },
    { id: 3, text: "Walk the dog" },
    { id: 4, text: "Do laundry" },
  ]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");

  const handleDelete = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleEdit = (id: number) => {
    const itemToEdit = items.find((item) => item.id === id);
    if (itemToEdit) {
      setEditingId(id);
      setEditText(itemToEdit.text);
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

  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Reminders</h1>
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
              >
                <div className="p-4">
                  <span>{item.text}</span>
                </div>
              </SwipeableListItem>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

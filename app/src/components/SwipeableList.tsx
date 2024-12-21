import { SwipeableListItem } from "./SwipeableListItem";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { db, Transaction } from "@/db/client";
import { TransactionCard } from "@/features/transactions/compoenents/Card";

import { useReducer, useCallback, useEffect } from "react";
import { useLiveQuery } from "dexie-react-hooks";

interface State {
  items: Transaction[];
  editingId: number | null;
  editText: string;
  openItemId: number | null;
}

type Action =
  | { type: "INIT_ITEM"; payload: { items: Transaction[] } }
  | { type: "DELETE_ITEM"; payload: { id: number } }
  | { type: "START_EDIT"; payload: { id: number; description: string } }
  | { type: "SAVE_EDIT" }
  | { type: "CANCEL_EDIT" }
  | { type: "SET_OPEN_ITEM"; payload: { id: number | null } }
  | { type: "UPDATE_EDIT_TEXT"; payload: { text: string } };

const initialState = (transactions: Transaction[]): State => ({
  items: transactions,
  editingId: null,
  editText: "",
  openItemId: null,
});

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "INIT_ITEM":
      return {
        ...state,
        items: action.payload.items,
      };
    case "DELETE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
      };
    case "START_EDIT":
      return {
        ...state,
        editingId: action.payload.id,
        editText: action.payload.description,
      };
    case "SAVE_EDIT":
      if (state.editingId === null) return state;
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === state.editingId
            ? { ...item, description: state.editText }
            : item
        ),
        editingId: null,
        editText: "",
      };
    case "CANCEL_EDIT":
      return { ...state, editingId: null, editText: "" };
    case "SET_OPEN_ITEM":
      return { ...state, openItemId: action.payload.id };
    case "UPDATE_EDIT_TEXT":
      return { ...state, editText: action.payload.text };
    default:
      return state;
  }
};

export const SwipeableList = () => {
  const transactions =
    useLiveQuery(async () => await db.transactions.toArray(), []) ?? [];

  useEffect(() => {
    transactions.length > 0 &&
      dispatch({ type: "INIT_ITEM", payload: { items: transactions } });
  }, [transactions]);
  const [state, dispatch] = useReducer(reducer, transactions, initialState);

  useEffect(() => {
    // dispatchでstateを更新
  }, [transactions]);
  const handleDelete = useCallback((id: number) => {
    dispatch({ type: "DELETE_ITEM", payload: { id } });
  }, []);

  const handleEdit = useCallback((id: number, description: string) => {
    dispatch({ type: "START_EDIT", payload: { id, description } });
  }, []);

  const handleSaveEdit = useCallback(() => {
    dispatch({ type: "SAVE_EDIT" });
  }, []);

  const handleCancelEdit = useCallback(() => {
    dispatch({ type: "CANCEL_EDIT" });
  }, []);

  const handleSetOpenItem = useCallback((id: number | null) => {
    dispatch({ type: "SET_OPEN_ITEM", payload: { id } });
  }, []);

  const handleEditTextChange = useCallback((text: string) => {
    dispatch({ type: "UPDATE_EDIT_TEXT", payload: { text } });
  }, []);

  return (
    <div className="w-full mx-auto" onClick={() => handleSetOpenItem(null)}>
      <ul className="bg-gray-100 rounded-lg overflow-hidden">
        {state.items.map((item) => (
          <li
            key={item.id}
            className="border-b border-gray-200 last:border-b-0"
          >
            {state.editingId === item.id ? (
              <div className="p-4 flex">
                <Input
                  value={state.editText}
                  onChange={(e) => handleEditTextChange(e.target.value)}
                  className="flex-grow mr-2"
                />
                <Button onClick={handleSaveEdit}>Save</Button>
                <Button onClick={handleCancelEdit} className="ml-2">
                  Cancel
                </Button>
              </div>
            ) : (
              <SwipeableListItem
                onDelete={() => handleDelete(item.id)}
                onEdit={() => handleEdit(item.id, item.description)}
                isOpen={state.openItemId === item.id}
                setIsOpen={(isOpen) =>
                  handleSetOpenItem(isOpen ? item.id : null)
                }
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

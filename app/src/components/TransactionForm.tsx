import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";

const SelectMode = {
  INPUT: "input",
  SELECT: "select",
} as const;

type SelectModeType = (typeof SelectMode)[keyof typeof SelectMode];

const STORAGE_KEY = {
  AMOUNT_MODE: "amount-mode",
} as const;
export const TransactionForm = () => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const [amountMode, setAmountMode] = useState<SelectModeType>(
    (localStorage.getItem(STORAGE_KEY.AMOUNT_MODE) as SelectModeType) ||
      SelectMode.INPUT
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically save the new transaction
    console.log("New transaction:", {
      description,
      amount: parseFloat(amount),
      category,
    });
  };

  const handleCheckedAmountMode = () => {
    const newAmountMode =
      amountMode === SelectMode.INPUT ? SelectMode.SELECT : SelectMode.INPUT;
    setAmountMode(newAmountMode);
    localStorage.setItem(STORAGE_KEY.AMOUNT_MODE, newAmountMode);
  };
  return (
    <Drawer>
      <DrawerTrigger
        asChild
        className="fixed bottom-3 right-3 rounded-full w-14 h-14"
      >
        <Button>
          <Plus className="w-6 h-6" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <DrawerHeader>
            <DrawerDescription>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label className="flex justify-start" htmlFor="description">
                    説明
                  </Label>
                  <Input
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label
                    className="flex justify-between items-center"
                    htmlFor="amount"
                  >
                    金額
                    <div className="py-1 flex justify-end items-center gap-1">
                      <span className="text-xs">プルダウンで入力</span>
                      <Switch
                        checked={amountMode === SelectMode.SELECT}
                        onCheckedChange={handleCheckedAmountMode}
                      />
                    </div>
                  </Label>
                  {amountMode === SelectMode.INPUT && (
                    <Input
                      id="amount"
                      type="number"
                      step="0.01"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      required
                      className="mt-1"
                    />
                  )}
                  {amountMode === SelectMode.SELECT && (
                    <Select onValueChange={setAmount} required>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="金額を入力" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="100">100</SelectItem>
                        <SelectItem value="200">200</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                </div>
                <div>
                  <Label className="flex justify-start" htmlFor="category">
                    カテゴリー
                  </Label>
                  <Select onValueChange={setCategory} required>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="カテゴリーを選択" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="income">収入</SelectItem>
                      <SelectItem value="food">食費</SelectItem>
                      <SelectItem value="utilities">光熱費</SelectItem>
                      <SelectItem value="transportation">交通費</SelectItem>
                      <SelectItem value="entertainment">娯楽費</SelectItem>
                      <SelectItem value="other">その他</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </form>
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter className="pt-0">
            <section className="flex gap-2">
              <DrawerClose asChild>
                <Button className="w-1/5">Cancel</Button>
              </DrawerClose>
              <Button type="submit" className=" w-3/4">
                Add Transaction
              </Button>
            </section>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
};

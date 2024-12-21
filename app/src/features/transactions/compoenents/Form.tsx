import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerDescription,
  DrawerFooter,
  DrawerTitle,
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
import { STORAGE_KEY } from "@/constants/storage-key";
import { generateFibonacci } from "@/helpers/generate-fibonacci";
import { db } from "@/db/client";
import { useToast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const SelectMode = {
  INPUT: "input",
  SELECT: "select",
} as const;

const TransactionPattern = {
  EXPENSE: "expense",
  INCOME: "income",
} as const;

type TransactionType =
  (typeof TransactionPattern)[keyof typeof TransactionPattern];

const isTransactionType = (e: any): e is TransactionType =>
  new Set([
    ...Object.entries(TransactionPattern).map(([_key, value]) => value),
  ]).has(e as any);

type SelectModeType = (typeof SelectMode)[keyof typeof SelectMode];

export const TransactionForm = () => {
  const { toast } = useToast();
  const [transactionType, setTransactionType] = useState<TransactionType>(
    TransactionPattern.EXPENSE
  );

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const [amountMode, setAmountMode] = useState<SelectModeType>(
    (localStorage.getItem(STORAGE_KEY.AMOUNT_MODE) as SelectModeType) ||
      SelectMode.INPUT
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const today = new Date();
    await db.transactions.add({
      description,
      amount: Number.isNaN(parseFloat(amount))
        ? 0
        : transactionType === TransactionPattern.EXPENSE
        ? -Math.abs(parseFloat(amount))
        : parseFloat(amount),
      category,
      createAt: today,
      updateAt: today,
      bookkeepingId: 1,
    });

    toast({ title: "登録しました" });
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
        className="fixed bottom-3 right-3 rounded-full w-14 h-14 z-20"
      >
        <Button>
          <Plus className="w-6 h-6" />
        </Button>
      </DrawerTrigger>
      <DrawerTitle></DrawerTitle>
      <DrawerContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <DrawerHeader>
            <RadioGroup
              defaultValue={transactionType}
              onValueChange={(e) =>
                isTransactionType(e) && setTransactionType(e)
              }
              className="grid grid-cols-2 gap-4 mb-2"
            >
              <div>
                <RadioGroupItem
                  value="expense"
                  id="expense"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="expense"
                  className="flex justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  支出
                </Label>
              </div>
              <div>
                <RadioGroupItem
                  value="income"
                  id="income"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="income"
                  className="flex justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  収入
                </Label>
              </div>
            </RadioGroup>
            <DrawerDescription>
              <section className="space-y-4">
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
                    <div className="py-1 flex justify-end items-center gap-2">
                      <Label className="text-xs" htmlFor="amount-mode">
                        プルダウンで入力
                      </Label>
                      <Switch
                        id="amount-mode"
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
                        {generateFibonacci(40000).map((amount) => (
                          <SelectItem key={amount} value={String(amount)}>
                            {amount.toLocaleString()}円
                          </SelectItem>
                        ))}
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
              </section>
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter className="pt-0">
            <section className="flex gap-2">
              <Button className="w-1/4" variant={"destructive"}>
                キャンセル
              </Button>
              <Button type="submit" className="w-4/5" variant={"secondary"}>
                追加する
              </Button>
            </section>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
};

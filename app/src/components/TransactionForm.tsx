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

export const TransactionForm = () => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically save the new transaction
    console.log("New transaction:", {
      description,
      amount: parseFloat(amount),
      category,
    });
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
              {/* <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex justify-center items-center z-50 animate-fade-in">
                <div className="bg-card p-6 rounded-lg shadow-lg w-full max-w-md animate-slide-in">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">新規取引</h2>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={onClose}
                      aria-label="Close"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div> */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="description">説明</Label>
                  <Input
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="amount">金額</Label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="category">カテゴリー</Label>
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
                {/* <Button type="submit" className="w-full">
                  取引を追加
                </Button> */}
              </form>
              {/* </div>
              </div> */}
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter className="pt-0">
            <section className="flex gap-2">
              {" "}
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

import { AddFriendForm } from "./components/AddFriendForm";
import { FriendList } from "./components/FriendList";
// import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Label } from "@radix-ui/react-label";
import TransactionList from "@/components/TransactionList";
import { Plus } from "lucide-react";
function App() {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically save the new transaction
    console.log("New transaction:", {
      description,
      amount: parseFloat(amount),
    });
  };

  return (
    <>
      {" "}
      <div>
        <h1>My simple Dexie app</h1>

        <h2>Add Friend</h2>
        <AddFriendForm defaultAge={21} />
        <h2>Friend List</h2>
        <FriendList minAge={18} maxAge={65} />
        <TransactionList />
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
                <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                <DrawerDescription>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="amount">Amount</Label>
                    <Input
                      id="amount"
                      type="number"
                      step="0.01"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      required
                    />
                  </div>
                </DrawerDescription>
              </DrawerHeader>
              <DrawerFooter>
                <Button type="submit" className="w-full">
                  Add Transaction
                </Button>
                <DrawerClose>
                  <Button>Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </form>
          </DrawerContent>
        </Drawer>
      </div>
      {/* <SidebarTrigger className="" size={"lg"} /> */}
    </>
  );
}

export default App;

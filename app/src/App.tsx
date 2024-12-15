// import { AddFriendForm } from "./components/AddFriendForm";
// import { FriendList } from "./components/FriendList";
import { SidebarTrigger } from "@/components/ui/sidebar";
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
import { Menu, Moon, Plus, Sun } from "lucide-react";
import { useTheme } from "@/providers/Theme";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { AppSidebar } from "@/components/Sidebar";
function App() {
  const { theme, setTheme } = useTheme();
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("New transaction:", {
      description,
      amount: parseFloat(amount),
    });
  };

  return (
    <div className="flex w-screen h-screen bg-background text-foreground">
      <main className="flex-1 overflow-hidden">
        <div className="container mx-auto h-full flex flex-col">
          <header className="flex justify-between items-center py-4 px-4 bg-primary text-primary-foreground">
            <h1 className="text-2xl font-bold">MyFinance</h1>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
              <SidebarTrigger>
                <Button variant="ghost" size="icon" aria-label="Open menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SidebarTrigger>
            </div>
          </header>
          <div>
            <ScrollArea className="flex-1 px-4">
              <TransactionList />
            </ScrollArea>
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
        </div>
        {/* <SidebarTrigger className="" size={"lg"} /> */}
      </main>
      <AppSidebar />
    </div>
  );
}

export default App;

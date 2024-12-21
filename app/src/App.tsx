// import { AddFriendForm } from "./components/AddFriendForm";
// import { FriendList } from "./components/FriendList";
import { SidebarTrigger } from "@/components/ui/sidebar";
// import {
//   Drawer,
//   DrawerClose,
//   DrawerContent,
//   DrawerDescription,
//   DrawerFooter,
//   DrawerHeader,
//   DrawerTrigger,
// } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { useState } from "react";
// import { Label } from "@radix-ui/react-label";
import TransactionList from "@/components/TransactionList";
import { Menu, Moon, Sun } from "lucide-react";
import { useTheme } from "@/providers/Theme";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AppSidebar } from "@/components/Sidebar";
import { TransactionForm } from "@/components/TransactionForm";
import { SwipeableList } from "@/components/SwipeableList";
function App() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex w-screen h-screen bg-background text-foreground">
      <main className="flex-1 flex flex-col overflow-scroll">
        <header className=" py-4 px-4">
          <section className="container flex justify-between items-center mx-auto px-4 sm:px-8">
            <h1 className="text-xl font-bold whitespace-nowrap font-serif">
              Taming The Number
            </h1>
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
                <Button
                  asChild
                  variant="ghost"
                  size="icon"
                  aria-label="Open menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SidebarTrigger>
            </div>
          </section>
        </header>
        <ScrollArea className="container mx-auto flex-1 px-4 h-full">
          <div className="py-4">
            <TransactionList />
          </div>
        </ScrollArea>
        <TransactionForm />
        <SwipeableList />
      </main>
      <AppSidebar />
    </div>
  );
}

export default App;

import { SidebarTrigger } from "@/components/ui/sidebar";

import { Button } from "@/components/ui/button";

import { TransactionSummary } from "@/features/transactions/compoenents/Summary";
import { Menu, Moon, Sun } from "lucide-react";
import { useTheme } from "@/providers/Theme";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AppSidebar } from "@/components/Sidebar";
import { TransactionForm } from "@/features/transactions/compoenents/Form";
import { SwipeableList } from "@/components/SwipeableList";
import { DateSelector } from "@/components/DateSelector";
import { Chart } from "@/features/transactions/compoenents/Chart";
function App() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex w-screen h-svh bg-background text-foreground">
      <main className="flex-1 flex flex-col overflow-scroll">
        <header className=" py-4 px-4">
          <section className="container flex justify-between items-center mx-auto px-4 sm:px-8">
            <h1 className="text-xl font-bold whitespace-nowrap font-serif">
              Srv.Vinci
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
        <section className=" container mx-auto px-4">
          <DateSelector />
        </section>
        <ScrollArea className="container mx-auto flex-1 px-4 h-full">
          <div className="py-2">
            <TransactionSummary />
            <Chart />
            <SwipeableList />
          </div>
        </ScrollArea>
        <TransactionForm />
      </main>
      <AppSidebar />
    </div>
  );
}

export default App;

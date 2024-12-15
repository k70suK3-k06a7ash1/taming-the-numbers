// import { Calendar, Home, Search, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  //   SidebarGroup,
  //   SidebarGroupContent,
  //   SidebarGroupLabel,
  SidebarHeader,
  //   SidebarMenu,
  //   SidebarMenuButton,
  //   SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

// Menu items.
// const items = [
//   {
//     title: "Dashboard",
//     url: "/",
//   },

//   {
//     title: "Transactions",
//     url: "/",
//   },
//   {
//     title: "Reports",
//     url: "/",
//   },
//   {
//     title: "Amount Options",
//     url: "/",
//   },
//   {
//     title: "Categories",
//     url: "/",
//   },
//   {
//     title: "Settings",
//     url: "/",
//     icon: Settings,
//   },
//   {
//     title: "Web LLM",
//     url: "/",
//   },
// ];

export function AppSidebar() {
  return (
    <Sidebar side="right">
      <SidebarHeader>
        <h2 className="text-xl font-semibold p-4">Menu</h2>
      </SidebarHeader>
      <SidebarContent>
        <nav className="space-y-2 p-4">
          <Button variant="ghost" className="w-full justify-start">
            Dashboard
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            Transactions
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            Reports
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            Settings
          </Button>
        </nav>
      </SidebarContent>
    </Sidebar>
  );
}

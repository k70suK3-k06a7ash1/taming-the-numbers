import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { AudioWaveform, Command, GalleryVerticalEnd } from "lucide-react";

import { TeamSwitcher } from "@/components/TeamSwitcher";

const data = {
  teams: [
    {
      name: "Daily Expense Management Budget",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Savings & Asset Building Budget",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Budgeting & Planning Budget",
      logo: Command,
      plan: "Free",
    },
  ],
};

export function AppSidebar() {
  return (
    <Sidebar side="right">
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <nav className="space-y-2 p-4">
          {/* <Button variant="ghost" className="w-full justify-start">
            Dashboard
          </Button> */}
          <Button variant="ghost" className="w-full justify-start">
            Transactions
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            Categories
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

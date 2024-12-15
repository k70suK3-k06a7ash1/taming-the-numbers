import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { SidebarProvider } from "@/components/ui/sidebar.tsx";
import { ThemeProvider } from "@/providers/Theme.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark">
      <SidebarProvider defaultOpen={false}>
        <App />
      </SidebarProvider>
    </ThemeProvider>
  </StrictMode>
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { SidebarProvider } from "@/components/ui/sidebar.tsx";
import { ThemeProvider } from "@/providers/Theme.tsx";
import { STORAGE_KEY } from "@/constants/storage-key.ts";
import { Toaster } from "@/components/ui/toaster.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey={STORAGE_KEY.THEME}>
      <SidebarProvider defaultOpen={false}>
        <App />
      </SidebarProvider>
    </ThemeProvider>
    <Toaster />
  </StrictMode>
);

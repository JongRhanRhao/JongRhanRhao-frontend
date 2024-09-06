import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { SidebarProvider } from "@/contexts/SideBarContext.tsx";
import { UserProvider } from "@/contexts/UserContext.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <SidebarProvider>
          <App />
        </SidebarProvider>
      </QueryClientProvider>
    </UserProvider>
  </React.StrictMode>
);

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import ReactDOM from "react-dom/client";

import App from "@/App";
import { StateContextProvider } from "@/context";
import "@/index.css";
import AuthMiddleware from "@/services/firebase/auth/AuthMiddleware";
import ThemeProvider from "@/theme/ThemeProvider";

const seconds = 1000;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      staleTime: 60 * seconds,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <StateContextProvider>
        <AuthMiddleware>
          <App />
        </AuthMiddleware>
      </StateContextProvider>
    </ThemeProvider>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);

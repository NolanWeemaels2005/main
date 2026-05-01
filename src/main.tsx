import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";
import { LanguageProvider } from "./i18n/LanguageContext";
import "./styles/global.css";

const redirectRoute = window.location.search.match(/^\?\/([^&]*)/);
if (redirectRoute) {
  const route = redirectRoute[1];
  const search = window.location.search.replace(/^\?\/[^&]*/, "").replace(/^&/, "?");
  window.history.replaceState(null, "", `${import.meta.env.BASE_URL}${route}${search}${window.location.hash}`);
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 10,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
);

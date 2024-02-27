import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

// {
//   defaultOptions: {
//     queries: {
//       refetchOnWindowFocus: false,
//       refetchOnMount: false,
//       refetchOnReconnect: false,
//       retry: 2,
//       staleTime: 5 * 1000,
//     },
//   },
// }

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);

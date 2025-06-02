import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { InputContextProvider } from "./context/InputContext.jsx";
import { MessageContextProvider } from "./context/MessageContext.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <InputContextProvider>
        <MessageContextProvider>
          <App />
        </MessageContextProvider>
      </InputContextProvider>
    </QueryClientProvider>
  </StrictMode>
);

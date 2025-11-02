import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { HeroUIProvider, ToastProvider } from "@heroui/react";
import { store } from "@/store/store.ts";
import "./index.css";
import App from "./App.tsx";

const queryClient = new QueryClient({
     defaultOptions: {
          queries: {
               staleTime: 1000 * 60 * 60, // 1 hour
          },
     },
});

createRoot(document.getElementById("root")!).render(
     <StrictMode>
          <Provider store={store}>
               <QueryClientProvider client={queryClient}>
                    <HeroUIProvider>
                         <ToastProvider
                              placement="top-right"
                              toastOffset={"top-right".includes("top") ? 10 : 0}
                         />
                         <BrowserRouter>
                              <main className="text-foreground bg-background">
                                   <App />
                              </main>
                         </BrowserRouter>
                    </HeroUIProvider>
               </QueryClientProvider>
          </Provider>
     </StrictMode>
);

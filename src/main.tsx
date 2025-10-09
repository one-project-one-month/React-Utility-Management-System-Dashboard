import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import { HeroUIProvider } from '@heroui/react'
import { store } from '@/store/store.ts'
import './index.css'
import App from './App.tsx'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 60, // 1 hour
        },
    },
});

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <HeroUIProvider>
                    <main className="text-foreground bg-background">
                        <App />
                    </main>
                </HeroUIProvider>
            </QueryClientProvider>
        </Provider>
    </StrictMode>,
)

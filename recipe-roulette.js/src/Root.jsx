import { BrowserRouter } from "react-router-dom"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'react-material-symbols/outlined'

import App from "./App"

const queryClient = new QueryClient()

export function Root() {
    return (
        <QueryClientProvider client={queryClient}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
        </QueryClientProvider>
    )
}

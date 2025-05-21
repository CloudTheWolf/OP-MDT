import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router'
import './index.css'
import {routeTree} from "@/routeTree.gen.ts";
import {AuthProvider} from "@/context/auth-context.tsx";

const router = createRouter({ routeTree })

const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement)
    root.render(
        <StrictMode>
            <AuthProvider>
                <RouterProvider router={router} />
            </AuthProvider>
        </StrictMode>,
    )
}

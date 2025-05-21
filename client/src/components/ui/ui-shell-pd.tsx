"use client"
import { PropsWithChildren } from 'react'
import {SidebarInset, SidebarProvider} from "@/components/ui/sidebar";
import {SiteHeader} from "@/components/site-header";
import {AppSidebar} from "@/components/app-sidebar";

export function UIShellPd({ children }: PropsWithChildren) {
    return (
        <div className="[--header-height:calc(theme(spacing.14))]">
            <SidebarProvider className="flex flex-col">
                <SiteHeader />
                <div className="flex flex-1">
                    <AppSidebar />
                    <SidebarInset>
                        {children}
                    </SidebarInset>
                </div>
            </SidebarProvider>
        </div>
    )
}
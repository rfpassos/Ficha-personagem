"use client"

import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { useState } from "react"
import { SearchProvider } from "@/contexts/search-context"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <SearchProvider>
            <div className="min-h-screen bg-background">
                {/* Desktop Sidebar */}
                <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:flex-col z-50">
                    <Sidebar
                        collapsed={sidebarCollapsed}
                        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
                    />
                </div>

                {/* Mobile Sidebar */}
                <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                    <SheetContent side="left" className="p-0 w-[250px]">
                        <Sidebar />
                    </SheetContent>
                </Sheet>

                {/* Main Content */}
                <div className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:pl-[70px]' : 'lg:pl-[250px]'}`}>
                    <Header onMenuClick={() => setMobileMenuOpen(true)} />
                    <main className="p-4 lg:p-6">
                        {children}
                    </main>
                </div>
            </div>
        </SearchProvider>
    )
}


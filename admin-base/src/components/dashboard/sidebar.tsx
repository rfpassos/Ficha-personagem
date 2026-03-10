"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import {
    LayoutDashboard,
    Inbox,
    Users,
    Ticket,
    TrendingUp,
    UserCircle,
    FileBarChart,
    Settings,
    HelpCircle,
    ChevronLeft,
    ChevronRight,
    Kanban,
    Palette,
} from "lucide-react"
import { useState } from "react"

const mainNavItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Kanban", href: "/dashboard/kanban", icon: Kanban },
    { name: "Inbox", href: "/dashboard/inbox", icon: Inbox },
    { name: "Clientes", href: "/dashboard/customers", icon: Users },
    { name: "Tickets", href: "/dashboard/tickets", icon: Ticket },
]

const analyticsNavItems = [
    { name: "Insights", href: "/dashboard/insights", icon: TrendingUp },
    { name: "Influenciadores", href: "/dashboard/influencers", icon: UserCircle },
    { name: "Relatórios", href: "/dashboard/reports", icon: FileBarChart },
]

const settingsNavItems = [
    { name: "Configurações", href: "/dashboard/settings", icon: Settings },
    { name: "Design System", href: "/dashboard/design-system", icon: Palette },
    { name: "Suporte", href: "/dashboard/support", icon: HelpCircle },
]

interface SidebarProps {
    collapsed?: boolean
    onToggle?: () => void
}

export function Sidebar({ collapsed = false, onToggle }: SidebarProps) {
    const pathname = usePathname()

    return (
        <div className={cn(
            "flex flex-col h-full bg-card border-r border-border transition-all duration-300",
            collapsed ? "w-[70px]" : "w-[250px]"
        )}>
            {/* Logo */}
            <div className="flex items-center h-16 px-4 border-b border-border">
                <Link href="/dashboard" className="flex items-center gap-3">
                    <div className="relative w-8 h-8 flex-shrink-0">
                        <svg
                            className="w-full h-full drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]"
                            viewBox="0 0 100 100"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M25 50C25 36.1929 36.1929 25 50 25C63.8071 25 75 36.1929 75 50"
                                stroke="#38bdf8"
                                strokeWidth="8"
                                strokeLinecap="round"
                            />
                            <path
                                d="M75 50C75 63.8071 63.8071 75 50 75C36.1929 75 25 63.8071 25 50"
                                stroke="url(#paint0_sidebar)"
                                strokeWidth="8"
                                strokeLinecap="round"
                                strokeDasharray="1 12"
                            />
                            <defs>
                                <linearGradient id="paint0_sidebar" x1="25" y1="50" x2="75" y2="50" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#38bdf8" />
                                    <stop offset="1" stopColor="#818cf8" />
                                </linearGradient>
                            </defs>
                            <circle cx="50" cy="50" r="7" className="fill-foreground" />
                        </svg>
                    </div>
                    {!collapsed && (
                        <span className="text-lg font-bold text-foreground whitespace-nowrap">
                            Loop Studio <span className="bg-gradient-to-br from-sky-400 to-indigo-400 bg-clip-text text-transparent">IA</span>
                        </span>
                    )}
                </Link>
            </div>

            {/* Navigation */}
            <ScrollArea className="flex-1 py-4">
                <nav className="space-y-6 px-3">
                    {/* Main Navigation */}
                    <div className="space-y-1">
                        {mainNavItems.map((item) => {
                            const isActive = pathname === item.href
                            return (
                                <Link key={item.href} href={item.href}>
                                    <Button
                                        variant={isActive ? "default" : "ghost"}
                                        className={cn(
                                            "w-full justify-start gap-3",
                                            collapsed && "justify-center px-2"
                                        )}
                                    >
                                        <item.icon className="h-5 w-5 flex-shrink-0" />
                                        {!collapsed && <span>{item.name}</span>}
                                    </Button>
                                </Link>
                            )
                        })}
                    </div>

                    {/* Analytics */}
                    <div className="space-y-1">
                        {!collapsed && (
                            <p className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                                Analytics
                            </p>
                        )}
                        {analyticsNavItems.map((item) => {
                            const isActive = pathname === item.href
                            return (
                                <Link key={item.href} href={item.href}>
                                    <Button
                                        variant={isActive ? "default" : "ghost"}
                                        className={cn(
                                            "w-full justify-start gap-3",
                                            collapsed && "justify-center px-2"
                                        )}
                                    >
                                        <item.icon className="h-5 w-5 flex-shrink-0" />
                                        {!collapsed && <span>{item.name}</span>}
                                    </Button>
                                </Link>
                            )
                        })}
                    </div>

                    {/* Settings */}
                    <div className="space-y-1">
                        {!collapsed && (
                            <p className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                                Sistema
                            </p>
                        )}
                        {settingsNavItems.map((item) => {
                            const isActive = pathname === item.href
                            return (
                                <Link key={item.href} href={item.href}>
                                    <Button
                                        variant={isActive ? "default" : "ghost"}
                                        className={cn(
                                            "w-full justify-start gap-3",
                                            collapsed && "justify-center px-2"
                                        )}
                                    >
                                        <item.icon className="h-5 w-5 flex-shrink-0" />
                                        {!collapsed && <span>{item.name}</span>}
                                    </Button>
                                </Link>
                            )
                        })}
                    </div>
                </nav>
            </ScrollArea>

            {/* Collapse Toggle */}
            <div className="border-t border-border p-3">
                <Button
                    variant="ghost"
                    size="icon"
                    className="w-full"
                    onClick={onToggle}
                >
                    {collapsed ? (
                        <ChevronRight className="h-4 w-4" />
                    ) : (
                        <ChevronLeft className="h-4 w-4" />
                    )}
                </Button>
            </div>
        </div>
    )
}

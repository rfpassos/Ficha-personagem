"use client"

import { useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { EmptyState } from "@/components/ui/empty-state"
import { Ghost, SearchX } from "lucide-react"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis } from "@/components/ui/pagination"
import { DataTableToolbar } from "@/components/ui/data-table-toolbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, XAxis, YAxis, Line, LineChart, ResponsiveContainer } from "recharts"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartLegend,
    ChartLegendContent
} from "@/components/ui/chart"

import { TrendingUp, TrendingDown, MoreHorizontal, Menu, ArrowUpRight, Copy, Scissors, Clipboard, Trash2, FolderOpen, Share2, Download, Edit, Eye, Settings, User, Mail, MessageSquare, Bell, LogOut, ChevronRight, ChevronDown, Search, X, PanelLeft } from "lucide-react"
import {
    ContextMenu,
    ContextMenuCheckboxItem,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuLabel,
    ContextMenuRadioGroup,
    ContextMenuRadioItem,
    ContextMenuSeparator,
    ContextMenuShortcut,
    ContextMenuSub,
    ContextMenuSubContent,
    ContextMenuSubTrigger,
    ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import {
    IconStatCard,
    MiniBarChartCard,
    MiniLineChartCard,
    GaugeCard,
    DotMatrixCard,
    SparklineCard,
    AreaChartCard,
    StatCardIcons
} from "@/components/ui/stat-cards"
import { DollarSign, ShoppingBag, Users, Package, AlertTriangle } from "lucide-react"
import { ConfirmDialog } from "@/components/ui/confirm-dialog"
import { DatePicker, DateRangePicker } from "@/components/ui/date-picker"
import { KanbanBoard } from "@/components/ui/kanban-board"
import { FileUpload } from "@/components/ui/file-upload"
import { toast } from "sonner"

import { useSystemTheme } from "@/hooks/use-system-theme"
import { BrainPowerSection } from "@/components/landing/brain-power-section"
import { BrainPowerModal } from "@/components/landing/brain-power-modal"
import { ThemeToggle } from "@/components/theme-toggle"
import { Bot, Command, Wrench } from "lucide-react"
import { LoopStudioLogo } from "@/components/brand/logo"
import { AnimatedLogo } from "@/components/layout/animated-logo"

export default function DesignSystemPage() {
    // Theme Hook
    const { theme, updateColor, resetTheme, isDual } = useSystemTheme()

    // Table display options state
    const [tableWithSeparator, setTableWithSeparator] = useState(false)
    const [tableWithHeaderHighlight, setTableWithHeaderHighlight] = useState(false)
    const [tableActionsFirst, setTableActionsFirst] = useState(false)

    // Helper to extract string color (for globals)
    const getGlobalColor = (key: string) => {
        const val = theme[key]
        return typeof val === 'string' ? val : (val as any).light // Fallback
    }

    return (
        <div className="min-h-screen bg-background p-8 font-sans space-y-12">

            <div className="max-w-6xl mx-auto space-y-12">

                {/* Header */}
                <div className="space-y-2">
                    <h1 className="text-4xl font-bold tracking-tight text-foreground">Design System</h1>
                    <p className="text-xl text-muted-foreground">
                        Biblioteca de Componentes Dark/Light Mode
                    </p>
                </div>

                <Separator />

                {/* Color Palette */}
                <section className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-semibold tracking-tight">Color Palette</h2>
                        <Button variant="outline" size="sm" onClick={resetTheme}>
                            Restaurar Padrões
                        </Button>
                    </div>

                    {/* Global Colors */}
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        <ColorSwatch
                            name="Primary: Magenta"
                            color={getGlobalColor("--primary")}
                            variable="--primary"
                            onColorChange={(v, val) => updateColor(v as any, val)}
                        />
                        <ColorSwatch
                            name="Secondary: Cyan"
                            color={getGlobalColor("--secondary")}
                            variable="--secondary"
                            onColorChange={(v, val) => updateColor(v as any, val)}
                        />
                        <ColorSwatch
                            name="Success: Green"
                            color={getGlobalColor("--success")}
                            variable="--success"
                            onColorChange={(v, val) => updateColor(v as any, val)}
                        />
                        <ColorSwatch
                            name="Warning: Yellow"
                            color={getGlobalColor("--chart-4")}
                            variable="--chart-4"
                            onColorChange={(v, val) => updateColor(v as any, val)}
                        />
                        <ColorSwatch
                            name="Error: Red"
                            color={getGlobalColor("--destructive")}
                            variable="--destructive"
                            onColorChange={(v, val) => updateColor(v as any, val)}
                        />
                    </div>

                    {/* Dual Mode Colors */}
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        <DualColorSwatch
                            name="Background"
                            variable="--background"
                            lightColor={(theme["--background"] as any).light}
                            darkColor={(theme["--background"] as any).dark}
                            onLightChange={(val) => updateColor("--background", val, 'light')}
                            onDarkChange={(val) => updateColor("--background", val, 'dark')}
                        />
                        <DualColorSwatch
                            name="Card BG"
                            variable="--card"
                            lightColor={(theme["--card"] as any).light}
                            darkColor={(theme["--card"] as any).dark}
                            onLightChange={(val) => updateColor("--card", val, 'light')}
                            onDarkChange={(val) => updateColor("--card", val, 'dark')}
                        />
                        <DualColorSwatch
                            name="Text"
                            variable="--foreground"
                            lightColor={(theme["--foreground"] as any).light}
                            darkColor={(theme["--foreground"] as any).dark}
                            onLightChange={(val) => updateColor("--foreground", val, 'light')}
                            onDarkChange={(val) => updateColor("--foreground", val, 'dark')}
                        />
                        <DualColorSwatch
                            name="Muted Text"
                            variable="--muted-foreground"
                            lightColor={(theme["--muted-foreground"] as any).light}
                            darkColor={(theme["--muted-foreground"] as any).dark}
                            onLightChange={(val) => updateColor("--muted-foreground", val, 'light')}
                            onDarkChange={(val) => updateColor("--muted-foreground", val, 'dark')}
                        />
                        <DualColorSwatch
                            name="Accent / Hover"
                            variable="--accent"
                            lightColor={(theme["--accent"] as any).light}
                            darkColor={(theme["--accent"] as any).dark}
                            onLightChange={(val) => updateColor("--accent", val, 'light')}
                            onDarkChange={(val) => updateColor("--accent", val, 'dark')}
                        />
                    </div>
                </section>

                <Separator />

                {/* Logotypes */}
                <section className="space-y-6">
                    <h2 className="text-2xl font-semibold tracking-tight">Logotypes</h2>
                    <div className="grid gap-6 md:grid-cols-2">
                        {/* Static Logo Variants */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Static Logo</CardTitle>
                                <CardDescription>Default brand identity components</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-8 pt-6">
                                <div className="space-y-4">
                                    <Label className="text-xs text-muted-foreground uppercase">Full Logo (Large)</Label>
                                    <div className="p-6 border rounded-lg flex items-center justify-center bg-muted/20">
                                        <LoopStudioLogo size="lg" />
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <Label className="text-xs text-muted-foreground uppercase">Full Logo (Medium)</Label>
                                    <div className="p-6 border rounded-lg flex items-center justify-center bg-muted/20">
                                        <LoopStudioLogo size="md" />
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <Label className="text-xs text-muted-foreground uppercase">Icon Only</Label>
                                    <div className="flex gap-8 p-6 border rounded-lg items-center justify-center bg-muted/20">
                                        <LoopStudioLogo variant="icon" size="lg" />
                                        <LoopStudioLogo variant="icon" size="md" />
                                        <LoopStudioLogo variant="icon" size="sm" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Animated Logo */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Animated Logo</CardTitle>
                                <CardDescription>Used in Splash Screens and Loading states</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-8 pt-6">
                                <div className="space-y-4">
                                    <Label className="text-xs text-muted-foreground uppercase">Base Animation</Label>
                                    <div className="h-64 p-6 border rounded-lg flex flex-col items-center justify-center bg-muted/20 gap-4">
                                        <AnimatedLogo className="w-24 h-24" />
                                        <p className="text-sm text-muted-foreground mt-4">
                                            Auto-plays on mount.
                                        </p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <Label className="text-xs text-muted-foreground uppercase">Interactive (Hover)</Label>
                                    <div className="h-64 p-6 border rounded-lg flex flex-col items-center justify-center bg-muted/20 gap-4 cursor-pointer hover:bg-muted/30 transition-colors">
                                        <AnimatedLogo className="w-24 h-24" enableHover />
                                        <p className="text-sm text-muted-foreground mt-4">
                                            Hover to play animation.
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                <Separator />

                {/* Typography */}
                <section className="space-y-6">
                    <h2 className="text-2xl font-semibold tracking-tight">Typography</h2>
                    <Card>
                        <CardContent className="pt-6 space-y-6">
                            <div>
                                <span className="text-xs text-muted-foreground uppercase tracking-wider">Heading 1 (Inter Bold, 32px)</span>
                                <h1 className="text-[32px] font-bold leading-tight">Heading 1 (Inter Bold, 32px)</h1>
                            </div>
                            <div>
                                <span className="text-xs text-muted-foreground uppercase tracking-wider">Heading 2 (Inter Semibold, 24px)</span>
                                <h2 className="text-2xl font-semibold leading-tight">Heading 2 (Inter Semibold, 24px)</h2>
                            </div>
                            <div>
                                <span className="text-xs text-muted-foreground uppercase tracking-wider">Body Text</span>
                                <p className="text-base leading-relaxed">Body Text (Inter Regular, 15px)</p>
                            </div>
                            <div>
                                <span className="text-xs text-muted-foreground uppercase tracking-wider">Caption</span>
                                <p className="text-xs text-muted-foreground">Caption (Inter Regular, 12px)</p>
                            </div>
                        </CardContent>
                    </Card>
                </section>

                <Separator />

                {/* Form Fields */}
                <section className="space-y-6">
                    <h2 className="text-2xl font-semibold tracking-tight">Form Fields</h2>
                    <Card>
                        <CardContent className="pt-6 grid gap-6 md:grid-cols-2">
                            {/* Text Inputs */}
                            <div className="space-y-2">
                                <Label className="text-xs text-muted-foreground uppercase">Text Input (Default, Placeholder)</Label>
                                <Input placeholder="Text Input, Placeholder" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs text-muted-foreground uppercase">Text Input (Focused, Magenta Border)</Label>
                                <Input placeholder="Text Input" className="border-primary focus-visible:ring-primary" />
                            </div>

                            {/* Dropdown */}
                            <div className="space-y-2">
                                <Label className="text-xs text-muted-foreground uppercase">Dropdown Menu (Closed)</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Dropdown Menu" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="option1">Option 1</SelectItem>
                                        <SelectItem value="option2">Option 2</SelectItem>
                                        <SelectItem value="option3">Option 3</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Checkbox */}
                            <div className="space-y-2">
                                <Label className="text-xs text-muted-foreground uppercase">Checkbox (Checked/Unchecked)</Label>
                                <div className="flex items-center gap-6">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="checked" defaultChecked />
                                        <Label htmlFor="checked">Checked</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="unchecked" />
                                        <Label htmlFor="unchecked">Unchecked</Label>
                                    </div>
                                </div>
                            </div>

                            {/* Radio Buttons */}
                            <div className="space-y-2">
                                <Label className="text-xs text-muted-foreground uppercase">Radio Button (Selected/Unselected)</Label>
                                <RadioGroup defaultValue="selected" className="flex gap-6">
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="selected" id="selected" />
                                        <Label htmlFor="selected">Selected</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="unselected" id="unselected" />
                                        <Label htmlFor="unselected">Unselected</Label>
                                    </div>
                                </RadioGroup>
                            </div>

                            {/* Toggle Switch */}
                            <div className="space-y-2">
                                <Label className="text-xs text-muted-foreground uppercase">Toggle Switch (On/Off)</Label>
                                <div className="flex items-center gap-2">
                                    <Switch defaultChecked id="toggle-on" />
                                    <Label htmlFor="toggle-on">On</Label>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </section>

                <Separator />

                {/* Charts & Data Viz */}
                <section className="space-y-6">
                    <h2 className="text-2xl font-semibold tracking-tight">Charts & Data Viz</h2>

                    <div className="grid gap-6 lg:grid-cols-3">
                        {/* Area Chart - Total Revenue */}
                        <Card className="lg:col-span-2">
                            <CardHeader>
                                <CardTitle>Total Revenue</CardTitle>
                                <CardDescription>Company's sales and expenses</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ChartContainer config={{
                                    revenue: { label: "Revenue", color: "var(--primary)" },
                                }}>
                                    <AreaChart
                                        data={[
                                            { month: "Jan", revenue: 2500 },
                                            { month: "Feb", revenue: 5500 },
                                            { month: "Mar", revenue: 10000 },
                                            { month: "Apr", revenue: 8500 },
                                            { month: "May", revenue: 14000 },
                                            { month: "Jun", revenue: 18000 },
                                            { month: "Jul", revenue: 16500 },
                                            { month: "Aug", revenue: 22000 },
                                        ]}
                                        margin={{ left: 12, right: 12 }}
                                    >
                                        <defs>
                                            <linearGradient id="fillRevenue2" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="var(--color-revenue)" stopOpacity={0.8} />
                                                <stop offset="95%" stopColor="var(--color-revenue)" stopOpacity={0.1} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid vertical={false} strokeDasharray="3 3" />
                                        <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                                        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                                        <Area
                                            dataKey="revenue"
                                            type="monotone"
                                            fill="url(#fillRevenue2)"
                                            fillOpacity={1}
                                            stroke="var(--color-revenue)"
                                            strokeWidth={2}
                                        />
                                    </AreaChart>
                                </ChartContainer>
                            </CardContent>
                        </Card>

                        {/* Donut Chart with Center Value */}
                        <Card>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <div className="h-full cursor-help">
                                            <CardHeader>
                                                <CardTitle>Win Rate</CardTitle>
                                                <CardDescription>Deal success percentage</CardDescription>
                                            </CardHeader>
                                            <CardContent className="flex items-center justify-center pb-0">
                                                <div className="relative">
                                                    <ChartContainer config={{
                                                        won: { label: "Won", color: "var(--primary)" },
                                                        lost: { label: "Lost", color: "var(--muted)" },
                                                    }} className="mx-auto aspect-square w-[200px] h-[200px]">
                                                        <PieChart>
                                                            <Pie
                                                                data={[
                                                                    { name: "won", value: 73, fill: "var(--color-won)" },
                                                                    { name: "lost", value: 27, fill: "var(--color-lost)" },
                                                                ]}
                                                                dataKey="value"
                                                                nameKey="name"
                                                                cx="50%"
                                                                cy="50%"
                                                                innerRadius={60}
                                                                outerRadius={80}
                                                                strokeWidth={0}
                                                            />
                                                        </PieChart>
                                                    </ChartContainer>
                                                    {/* Center Value Overlay */}
                                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                                        <span className="text-4xl font-bold text-foreground">73</span>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Win Rate: 73%</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </Card>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {/* Bar Chart - Sales Performance */}
                        <Card className="lg:col-span-2">
                            <CardHeader>
                                <CardTitle>Sales Performance</CardTitle>
                                <CardDescription>Monthly sales breakdown</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ChartContainer config={{
                                    desktop: { label: "Desktop", color: "var(--primary)" },
                                    mobile: { label: "Mobile", color: "var(--secondary)" },
                                }} className="min-h-[200px] w-full">
                                    <BarChart data={[
                                        { month: "Jan", desktop: 186, mobile: 80 },
                                        { month: "Feb", desktop: 305, mobile: 200 },
                                        { month: "Mar", desktop: 237, mobile: 120 },
                                        { month: "Apr", desktop: 73, mobile: 190 },
                                        { month: "May", desktop: 209, mobile: 130 },
                                        { month: "Jun", desktop: 214, mobile: 140 },
                                        { month: "Jul", desktop: 260, mobile: 160 },
                                    ]}>
                                        <CartesianGrid vertical={false} strokeDasharray="3 3" />
                                        <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
                                        <ChartTooltip content={<ChartTooltipContent />} />
                                        <ChartLegend content={<ChartLegendContent />} />
                                        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                                        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
                                    </BarChart>
                                </ChartContainer>
                            </CardContent>
                        </Card>

                        {/* Multi-color Pie Chart */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Deal Distribution</CardTitle>
                                <CardDescription>By stage</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ChartContainer config={{
                                    leads: { label: "Leads", color: "#E91E63" },
                                    qualified: { label: "Qualified", color: "#00BCD4" },
                                    negotiation: { label: "Negotiation", color: "#4CAF50" },
                                    closed: { label: "Closed", color: "#FFC107" },
                                    lost: { label: "Lost", color: "#F44336" },
                                }} className="mx-auto aspect-square max-h-[200px]">
                                    <PieChart>
                                        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                                        <Pie
                                            data={[
                                                { name: "leads", value: 275, fill: "var(--color-leads)" },
                                                { name: "qualified", value: 200, fill: "var(--color-qualified)" },
                                                { name: "negotiation", value: 187, fill: "var(--color-negotiation)" },
                                                { name: "closed", value: 173, fill: "var(--color-closed)" },
                                                { name: "lost", value: 90, fill: "var(--color-lost)" },
                                            ]}
                                            dataKey="value"
                                            nameKey="name"
                                            innerRadius={0}
                                            strokeWidth={2}
                                        />
                                    </PieChart>
                                </ChartContainer>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sparkline / Mini Charts */}
                    <div className="grid gap-4 md:grid-cols-4">
                        <Card>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <div className="h-full cursor-help">
                                            <CardHeader className="pb-2">
                                                <CardDescription>Total Revenue</CardDescription>
                                                <CardTitle className="text-2xl flex items-baseline gap-2">
                                                    $1.2M
                                                    <span className="text-sm font-normal text-green-500 flex items-center">
                                                        <TrendingUp className="w-3 h-3 mr-1" /> +12.5%
                                                    </span>
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent className="pb-4">
                                                <div className="h-[40px]">
                                                    <ChartContainer config={{ value: { color: "var(--primary)" } }} className="w-full h-full">
                                                        <LineChart data={[{ v: 20 }, { v: 40 }, { v: 30 }, { v: 50 }, { v: 45 }, { v: 60 }, { v: 55 }, { v: 70 }]}>
                                                            <Line type="monotone" dataKey="v" stroke="var(--color-value)" strokeWidth={2} dot={false} />
                                                        </LineChart>
                                                    </ChartContainer>
                                                </div>
                                            </CardContent>
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Total Revenue: $1.2M</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </Card>
                        <Card>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <div className="h-full cursor-help">
                                            <CardHeader className="pb-2">
                                                <CardDescription>Active Deals</CardDescription>
                                                <CardTitle className="text-2xl flex items-baseline gap-2">
                                                    145
                                                    <span className="text-sm font-normal text-green-500">+5%</span>
                                                </CardTitle>
                                            </CardHeader>
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Active Deals: 145</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </Card>
                        <Card>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <div className="h-full cursor-help">
                                            <CardHeader className="pb-2">
                                                <CardDescription>Avg. Deal Size</CardDescription>
                                                <CardTitle className="text-2xl flex items-baseline gap-2">
                                                    $8,400
                                                    <span className="text-sm font-normal text-red-500 flex items-center">
                                                        <TrendingDown className="w-3 h-3 mr-1" /> -2%
                                                    </span>
                                                </CardTitle>
                                            </CardHeader>
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Avg. Deal Size: $8,400</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </Card>
                        <Card>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <div className="h-full cursor-help">
                                            <CardHeader className="pb-2">
                                                <CardDescription>Win Rate</CardDescription>
                                                <CardTitle className="text-2xl flex items-baseline gap-2">
                                                    32%
                                                    <span className="text-sm font-normal text-green-500">+4%</span>
                                                </CardTitle>
                                            </CardHeader>
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Win Rate: 32%</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </Card>
                    </div>

                    {/* Deal Stage Funnel */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Deal Stage Funnel</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {[
                                    { stage: "Qualified", value: 100, color: "bg-primary" },
                                    { stage: "Proposal", value: 75, color: "bg-primary" },
                                    { stage: "Negotiation", value: 50, color: "bg-primary" },
                                    { stage: "Implementation", value: 35, color: "bg-primary" },
                                    { stage: "Closed Won", value: 25, color: "bg-accent" },
                                    { stage: "Closed Lost", value: 15, color: "bg-destructive" },
                                ].map((item) => (
                                    <div key={item.stage} className="flex items-center gap-4">
                                        <span className="w-32 text-sm text-muted-foreground">{item.stage}</span>
                                        <div className="flex-1 h-6 bg-muted rounded overflow-hidden">
                                            <div
                                                className={`h-full ${item.color} rounded`}
                                                style={{ width: `${item.value}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </section>

                <Separator />

                {/* Buttons & Elements */}
                <section className="space-y-6">
                    <h2 className="text-2xl font-semibold tracking-tight">Buttons & Elements</h2>
                    <Card>
                        <CardContent className="pt-6 space-y-6">
                            <div className="flex flex-wrap gap-4 items-center">
                                <Button>Primary Button (Magenta)</Button>
                                <Button variant="outline">Secondary Button (Outline)</Button>
                                <Button variant="secondary">Secondary</Button>
                                <Button variant="ghost">Ghost</Button>
                                <Button variant="link">Link</Button>
                            </div>
                            <div className="flex flex-wrap gap-4 items-center">
                                <Button variant="outline" size="icon">
                                    <Menu className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                                <Button size="sm">Small</Button>
                                <Button size="lg">Large</Button>
                                <Button variant="destructive">Destructive</Button>
                                <div className="border border-border rounded-full p-2 bg-muted/30">
                                    <ThemeToggle />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </section>

                <Separator />

                {/* Badges */}
                <section className="space-y-6">
                    <h2 className="text-2xl font-semibold tracking-tight">Badges</h2>
                    <Card>
                        <CardContent className="pt-6 flex flex-wrap gap-4 items-center">
                            <Badge>Default</Badge>
                            <Badge className="bg-green-500 hover:bg-green-600">Success</Badge>
                            <Badge className="bg-yellow-500 hover:bg-yellow-600 text-black">Warning</Badge>
                            <Badge variant="destructive">Error</Badge>
                            <Badge variant="secondary">Secondary</Badge>
                            <Badge variant="outline">Outline</Badge>
                            <Badge className="bg-cyan-500 hover:bg-cyan-600">Pending</Badge>
                            <Badge className="bg-purple-500 hover:bg-purple-600">Won</Badge>
                            <Badge className="bg-orange-500 hover:bg-orange-600">Lost</Badge>
                        </CardContent>
                    </Card>
                </section>

                <Separator />

                {/* Progress Bars */}
                <section className="space-y-6">
                    <h2 className="text-2xl font-semibold tracking-tight">Progress Bar</h2>
                    <Card>
                        <CardContent className="pt-6 space-y-6">
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span>Default Progress</span>
                                    <span>75%</span>
                                </div>
                                <Progress value={75} />
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span>Multi-color Progress</span>
                                </div>
                                <div className="flex h-2 w-full overflow-hidden rounded-full">
                                    <div className="bg-primary h-full" style={{ width: "40%" }} />
                                    <div className="bg-secondary h-full" style={{ width: "25%" }} />
                                    <div className="bg-accent h-full" style={{ width: "20%" }} />
                                    <div className="bg-destructive h-full" style={{ width: "15%" }} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </section>

                <Separator />

                {/* Tables */}
                <section className="space-y-6">
                    <h2 className="text-2xl font-semibold tracking-tight">Tables</h2>
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Deals</CardTitle>
                            <CardDescription>Experimente as opções de exibição da tabela usando os controles abaixo</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Table Controls */}
                            <div className="flex flex-wrap gap-6 pb-4 border-b border-border">
                                <div className="flex items-center gap-3">
                                    <Switch
                                        id="table-separator"
                                        checked={tableWithSeparator}
                                        onCheckedChange={setTableWithSeparator}
                                    />
                                    <Label htmlFor="table-separator" className="cursor-pointer">
                                        <span className="font-medium">Separadores de Linha</span>
                                        <span className="block text-xs text-muted-foreground">Adiciona linhas divisórias entre as rows</span>
                                    </Label>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Switch
                                        id="table-header"
                                        checked={tableWithHeaderHighlight}
                                        onCheckedChange={setTableWithHeaderHighlight}
                                    />
                                    <Label htmlFor="table-header" className="cursor-pointer">
                                        <span className="font-medium">Destaque no Header</span>
                                        <span className="block text-xs text-muted-foreground">Destaca o cabeçalho com fundo</span>
                                    </Label>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Switch
                                        id="table-actions-first"
                                        checked={tableActionsFirst}
                                        onCheckedChange={setTableActionsFirst}
                                    />
                                    <Label htmlFor="table-actions-first" className="cursor-pointer">
                                        <span className="font-medium">Ações no Início</span>
                                        <span className="block text-xs text-muted-foreground">Move coluna de ações para o início</span>
                                    </Label>
                                </div>
                            </div>

                            {/* Table with Dynamic Props */}
                            <Table withSeparator={tableWithSeparator} withHeaderHighlight={tableWithHeaderHighlight} actionsFirst={tableActionsFirst}>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Deal Name</TableHead>
                                        <TableHead>Company</TableHead>
                                        <TableHead>Amount</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead isAction></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="font-medium">Deal Name #1</TableCell>
                                        <TableCell>Apple</TableCell>
                                        <TableCell>$10,500.00</TableCell>
                                        <TableCell><Badge className="bg-purple-500">Won</Badge></TableCell>
                                        <TableCell isAction><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">Deal Name #2</TableCell>
                                        <TableCell>Apple</TableCell>
                                        <TableCell>$1,400.00</TableCell>
                                        <TableCell><Badge className="bg-cyan-500">Pending</Badge></TableCell>
                                        <TableCell isAction><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">Deal Name #3</TableCell>
                                        <TableCell>Company</TableCell>
                                        <TableCell>$3,500.00</TableCell>
                                        <TableCell><Badge className="bg-orange-500">Lost</Badge></TableCell>
                                        <TableCell isAction><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">Product Name #4</TableCell>
                                        <TableCell>Company</TableCell>
                                        <TableCell>$5,200.00</TableCell>
                                        <TableCell><Badge className="bg-cyan-500">Pending</Badge></TableCell>
                                        <TableCell isAction><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">Deal Name #5</TableCell>
                                        <TableCell>Apple</TableCell>
                                        <TableCell>$3,400.00</TableCell>
                                        <TableCell><Badge className="bg-purple-500">Won</Badge></TableCell>
                                        <TableCell isAction><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>

                            {/* Usage Code Example */}
                            <div className="mt-4 p-4 rounded-lg bg-muted/50 border border-border">
                                <Label className="text-xs text-muted-foreground uppercase mb-2 block">Código de uso</Label>
                                <code className="text-sm text-primary font-mono">
                                    {`<Table${tableWithSeparator ? ' withSeparator' : ''}${tableWithHeaderHighlight ? ' withHeaderHighlight' : ''}${tableActionsFirst ? ' actionsFirst' : ''}>`}
                                </code>
                                {tableActionsFirst && (
                                    <p className="text-xs text-muted-foreground mt-2">
                                        💡 Adicione <code className="text-primary">isAction</code> nas células de ação: <code className="text-primary">{`<TableCell isAction>...</TableCell>`}</code>
                                    </p>
                                )}
                            </div>

                            <div className="mt-4 text-center">
                                <Button variant="link" className="text-primary">
                                    Show more <ArrowUpRight className="w-4 h-4 ml-1" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </section>

                <Separator />

                {/* Upcoming Tasks */}
                <section className="space-y-6">
                    <h2 className="text-2xl font-semibold tracking-tight">Task Lists</h2>
                    <Card>
                        <CardHeader>
                            <CardTitle>Upcoming Tasks</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {[
                                { task: "Create a new form for scales", deadline: "Deadline 2", checked: false },
                                { task: "Some time what deadline requirements", deadline: "Deadline 3", checked: false },
                                { task: "Send volums message a just plan", deadline: "Mon8 - Nov 19", checked: false, highlight: true },
                                { task: "Get a de ambech-clean tulls", deadline: "Deadline 5", checked: false },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                                    <div className="flex items-center gap-3">
                                        <Checkbox />
                                        <span className="text-sm">{item.task}</span>
                                    </div>
                                    <span className={`text-xs ${item.highlight ? 'text-primary' : 'text-muted-foreground'}`}>
                                        {item.deadline}
                                    </span>
                                </div>
                            ))}
                            <Button variant="link" className="text-primary p-0">
                                Show more <ArrowUpRight className="w-4 h-4 ml-1" />
                            </Button>
                        </CardContent>
                    </Card>
                </section>

                <Separator />

                {/* Additional UI Elements */}
                <section className="space-y-6">
                    <h2 className="text-2xl font-semibold tracking-tight">Additional Elements</h2>
                    <div className="grid gap-6 md:grid-cols-2">
                        {/* Slider */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Slider</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <Slider defaultValue={[50]} max={100} step={1} />
                                <Slider defaultValue={[25, 75]} max={100} step={1} />
                            </CardContent>
                        </Card>

                        {/* Tabs */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Tabs</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Tabs defaultValue="account">
                                    <TabsList className="grid w-full grid-cols-3">
                                        <TabsTrigger value="account">Account</TabsTrigger>
                                        <TabsTrigger value="password">Password</TabsTrigger>
                                        <TabsTrigger value="settings">Settings</TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="account" className="mt-4">
                                        <p className="text-sm text-muted-foreground">Account settings content here.</p>
                                    </TabsContent>
                                    <TabsContent value="password" className="mt-4">
                                        <p className="text-sm text-muted-foreground">Password settings content here.</p>
                                    </TabsContent>
                                    <TabsContent value="settings" className="mt-4">
                                        <p className="text-sm text-muted-foreground">General settings content here.</p>
                                    </TabsContent>
                                </Tabs>
                            </CardContent>
                        </Card>

                        {/* Tooltips */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Tooltips</CardTitle>
                            </CardHeader>
                            <CardContent className="flex gap-4">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button variant="outline">Hover me</Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>This is a tooltip</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </CardContent>
                        </Card>

                        {/* Avatars */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Avatars</CardTitle>
                            </CardHeader>
                            <CardContent className="flex gap-4 items-center">
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <Avatar>
                                    <AvatarFallback className="bg-primary text-primary-foreground">JD</AvatarFallback>
                                </Avatar>
                                <Avatar>
                                    <AvatarFallback className="bg-secondary text-secondary-foreground">AB</AvatarFallback>
                                </Avatar>
                                <Avatar>
                                    <AvatarFallback className="bg-accent text-accent-foreground">XY</AvatarFallback>
                                </Avatar>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                <Separator />

                {/* Context Menu */}
                <section className="space-y-6">
                    <h2 className="text-2xl font-semibold tracking-tight">Context Menu (Right-Click)</h2>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="grid gap-6 md:grid-cols-2">
                                {/* Basic Context Menu */}
                                <div className="space-y-2">
                                    <Label className="text-xs text-muted-foreground uppercase">Basic Context Menu</Label>
                                    <ContextMenu>
                                        <ContextMenuTrigger className="flex h-[150px] w-full items-center justify-center rounded-md border border-dashed border-border text-sm text-muted-foreground hover:border-primary hover:text-primary transition-colors">
                                            Clique com botão direito aqui
                                        </ContextMenuTrigger>
                                        <ContextMenuContent className="w-64">
                                            <ContextMenuItem>
                                                <Eye className="mr-2 h-4 w-4" />
                                                Visualizar
                                                <ContextMenuShortcut>⌘V</ContextMenuShortcut>
                                            </ContextMenuItem>
                                            <ContextMenuItem>
                                                <Edit className="mr-2 h-4 w-4" />
                                                Editar
                                                <ContextMenuShortcut>⌘E</ContextMenuShortcut>
                                            </ContextMenuItem>
                                            <ContextMenuItem>
                                                <Copy className="mr-2 h-4 w-4" />
                                                Copiar
                                                <ContextMenuShortcut>⌘C</ContextMenuShortcut>
                                            </ContextMenuItem>
                                            <ContextMenuSeparator />
                                            <ContextMenuItem>
                                                <Download className="mr-2 h-4 w-4" />
                                                Download
                                            </ContextMenuItem>
                                            <ContextMenuItem>
                                                <Share2 className="mr-2 h-4 w-4" />
                                                Compartilhar
                                            </ContextMenuItem>
                                            <ContextMenuSeparator />
                                            <ContextMenuItem className="text-destructive focus:text-destructive">
                                                <Trash2 className="mr-2 h-4 w-4" />
                                                Excluir
                                                <ContextMenuShortcut>⌫</ContextMenuShortcut>
                                            </ContextMenuItem>
                                        </ContextMenuContent>
                                    </ContextMenu>
                                </div>

                                {/* Context Menu with Submenus */}
                                <div className="space-y-2">
                                    <Label className="text-xs text-muted-foreground uppercase">Com Submenus e Checkboxes</Label>
                                    <ContextMenu>
                                        <ContextMenuTrigger className="flex h-[150px] w-full items-center justify-center rounded-md border border-dashed border-border text-sm text-muted-foreground hover:border-secondary hover:text-secondary transition-colors">
                                            Clique com botão direito aqui
                                        </ContextMenuTrigger>
                                        <ContextMenuContent className="w-64">
                                            <ContextMenuLabel>Minha Conta</ContextMenuLabel>
                                            <ContextMenuSeparator />
                                            <ContextMenuItem>
                                                <User className="mr-2 h-4 w-4" />
                                                Perfil
                                            </ContextMenuItem>
                                            <ContextMenuItem>
                                                <Settings className="mr-2 h-4 w-4" />
                                                Configurações
                                            </ContextMenuItem>
                                            <ContextMenuSeparator />

                                            {/* Submenu */}
                                            <ContextMenuSub>
                                                <ContextMenuSubTrigger>
                                                    <Mail className="mr-2 h-4 w-4" />
                                                    Notificações
                                                </ContextMenuSubTrigger>
                                                <ContextMenuSubContent className="w-48">
                                                    <ContextMenuItem>
                                                        <Bell className="mr-2 h-4 w-4" />
                                                        Push Notifications
                                                    </ContextMenuItem>
                                                    <ContextMenuItem>
                                                        <Mail className="mr-2 h-4 w-4" />
                                                        Email
                                                    </ContextMenuItem>
                                                    <ContextMenuItem>
                                                        <MessageSquare className="mr-2 h-4 w-4" />
                                                        SMS
                                                    </ContextMenuItem>
                                                </ContextMenuSubContent>
                                            </ContextMenuSub>

                                            <ContextMenuSub>
                                                <ContextMenuSubTrigger>
                                                    <FolderOpen className="mr-2 h-4 w-4" />
                                                    Mover para
                                                </ContextMenuSubTrigger>
                                                <ContextMenuSubContent className="w-48">
                                                    <ContextMenuItem>Pasta 1</ContextMenuItem>
                                                    <ContextMenuItem>Pasta 2</ContextMenuItem>
                                                    <ContextMenuItem>Pasta 3</ContextMenuItem>
                                                    <ContextMenuSeparator />
                                                    <ContextMenuItem>Nova Pasta...</ContextMenuItem>
                                                </ContextMenuSubContent>
                                            </ContextMenuSub>

                                            <ContextMenuSeparator />
                                            <ContextMenuCheckboxItem checked>
                                                Mostrar barra de status
                                            </ContextMenuCheckboxItem>
                                            <ContextMenuCheckboxItem>
                                                Mostrar linha do tempo
                                            </ContextMenuCheckboxItem>
                                            <ContextMenuSeparator />
                                            <ContextMenuItem className="text-destructive focus:text-destructive">
                                                <LogOut className="mr-2 h-4 w-4" />
                                                Sair
                                            </ContextMenuItem>
                                        </ContextMenuContent>
                                    </ContextMenu>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </section>

                <Separator />

                {/* Dropdown Menu */}
                <section className="space-y-6">
                    <h2 className="text-2xl font-semibold tracking-tight">Dropdown Menu</h2>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="grid gap-6 md:grid-cols-3">
                                {/* Basic Dropdown */}
                                <div className="space-y-2">
                                    <Label className="text-xs text-muted-foreground uppercase">Basic Dropdown</Label>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="outline" className="w-full justify-between">
                                                Opções
                                                <ChevronDown className="h-4 w-4 ml-2" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-56">
                                            <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>
                                                <User className="mr-2 h-4 w-4" />
                                                Perfil
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <Settings className="mr-2 h-4 w-4" />
                                                Configurações
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem className="text-destructive">
                                                <LogOut className="mr-2 h-4 w-4" />
                                                Sair
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>

                                {/* User Dropdown */}
                                <div className="space-y-2">
                                    <Label className="text-xs text-muted-foreground uppercase">User Dropdown</Label>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="flex items-center gap-2 px-2">
                                                <Avatar className="h-8 w-8">
                                                    <AvatarFallback className="bg-primary text-primary-foreground">JD</AvatarFallback>
                                                </Avatar>
                                                <div className="flex flex-col items-start">
                                                    <span className="text-sm font-medium">John Doe</span>
                                                </div>
                                                <ChevronDown className="h-4 w-4 text-muted-foreground" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-56">
                                            <DropdownMenuLabel>
                                                <div className="flex flex-col">
                                                    <span>John Doe</span>
                                                    <span className="text-xs text-muted-foreground font-normal">john@example.com</span>
                                                </div>
                                            </DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>
                                                <User className="mr-2 h-4 w-4" />
                                                Meu Perfil
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <Bell className="mr-2 h-4 w-4" />
                                                Notificações
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem className="text-destructive">
                                                <LogOut className="mr-2 h-4 w-4" />
                                                Sair
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>

                                {/* Actions Dropdown */}
                                <div className="space-y-2">
                                    <Label className="text-xs text-muted-foreground uppercase">Actions Dropdown</Label>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem>
                                                <Eye className="mr-2 h-4 w-4" />
                                                Visualizar
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <Edit className="mr-2 h-4 w-4" />
                                                Editar
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <Copy className="mr-2 h-4 w-4" />
                                                Duplicar
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem className="text-destructive">
                                                <Trash2 className="mr-2 h-4 w-4" />
                                                Excluir
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </section>

                <Separator />

                {/* Sheet (Side Panel) */}
                <section className="space-y-6">
                    <h2 className="text-2xl font-semibold tracking-tight">Sheet (Side Panel)</h2>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="grid gap-6 md:grid-cols-2">
                                {/* Left Sheet */}
                                <div className="space-y-2">
                                    <Label className="text-xs text-muted-foreground uppercase">Left Sheet</Label>
                                    <Sheet>
                                        <SheetTrigger asChild>
                                            <Button variant="outline" className="w-full">
                                                <PanelLeft className="mr-2 h-4 w-4" />
                                                Abrir Menu Lateral
                                            </Button>
                                        </SheetTrigger>
                                        <SheetContent side="left">
                                            <SheetHeader>
                                                <SheetTitle>Menu de Navegação</SheetTitle>
                                                <SheetDescription>
                                                    Painel lateral para navegação mobile
                                                </SheetDescription>
                                            </SheetHeader>
                                            <div className="py-4 space-y-4">
                                                <Button variant="ghost" className="w-full justify-start">
                                                    Dashboard
                                                </Button>
                                                <Button variant="ghost" className="w-full justify-start">
                                                    Clientes
                                                </Button>
                                                <Button variant="ghost" className="w-full justify-start">
                                                    Relatórios
                                                </Button>
                                                <Button variant="ghost" className="w-full justify-start">
                                                    Configurações
                                                </Button>
                                            </div>
                                        </SheetContent>
                                    </Sheet>
                                </div>

                                {/* Right Sheet */}
                                <div className="space-y-2">
                                    <Label className="text-xs text-muted-foreground uppercase">Right Sheet (Default)</Label>
                                    <Sheet>
                                        <SheetTrigger asChild>
                                            <Button className="w-full">
                                                Abrir Detalhes
                                            </Button>
                                        </SheetTrigger>
                                        <SheetContent>
                                            <SheetHeader>
                                                <SheetTitle>Detalhes do Item</SheetTitle>
                                                <SheetDescription>
                                                    Visualize e edite as informações
                                                </SheetDescription>
                                            </SheetHeader>
                                            <div className="py-4 space-y-4">
                                                <div className="space-y-2">
                                                    <Label>Nome</Label>
                                                    <Input defaultValue="Exemplo de Item" />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>Descrição</Label>
                                                    <Textarea defaultValue="Uma descrição detalhada do item." />
                                                </div>
                                                <Button className="w-full">Salvar</Button>
                                            </div>
                                        </SheetContent>
                                    </Sheet>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </section>

                <Separator />

                {/* Scroll Area */}
                <section className="space-y-6">
                    <h2 className="text-2xl font-semibold tracking-tight">Scroll Area</h2>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="grid gap-6 md:grid-cols-2">
                                {/* Vertical Scroll */}
                                <div className="space-y-2">
                                    <Label className="text-xs text-muted-foreground uppercase">Vertical Scroll</Label>
                                    <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                                        <div className="space-y-4">
                                            {Array.from({ length: 20 }).map((_, i) => (
                                                <div key={i} className="flex items-center gap-3 p-2 rounded hover:bg-muted">
                                                    <Avatar className="h-8 w-8">
                                                        <AvatarFallback>U{i + 1}</AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <p className="text-sm font-medium">Usuário {i + 1}</p>
                                                        <p className="text-xs text-muted-foreground">usuario{i + 1}@email.com</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </ScrollArea>
                                </div>

                                {/* Horizontal Scroll */}
                                <div className="space-y-2">
                                    <Label className="text-xs text-muted-foreground uppercase">Tags com Scroll Horizontal</Label>
                                    <ScrollArea className="w-full whitespace-nowrap rounded-md border">
                                        <div className="flex w-max space-x-4 p-4">
                                            {["React", "Next.js", "TypeScript", "Tailwind CSS", "Shadcn UI", "Prisma", "Supabase", "Vercel", "Node.js", "PostgreSQL"].map((tag) => (
                                                <Badge key={tag} variant="secondary" className="flex-shrink-0">
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                    </ScrollArea>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </section>

                <Separator />

                {/* Kanban Board */}
                <section className="space-y-6">
                    <h2 className="text-2xl font-semibold tracking-tight">Kanban Board</h2>
                    <Card>
                        <CardContent className="pt-6">
                            <p className="text-sm text-muted-foreground mb-4">
                                Componente de quadro Kanban para gerenciamento visual de tarefas. Cada coluna representa um estágio do fluxo de trabalho.
                            </p>
                            <ScrollArea className="w-full">
                                <KanbanBoard />
                            </ScrollArea>
                        </CardContent>
                    </Card>
                </section>

                <Separator />

                {/* Stat Cards */}
                <section className="space-y-6">
                    <h2 className="text-2xl font-semibold tracking-tight">Stat Cards</h2>
                    <p className="text-muted-foreground">Cards para exibição de métricas e estatísticas com ícones e gráficos.</p>

                    {/* Icon Stat Cards */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Icon Stat Cards</CardTitle>
                            <CardDescription>Cards com ícones coloridos e métricas de destaque</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <IconStatCard
                                    title="Total Sales"
                                    value="$5k"
                                    change="+10% from yesterday"
                                    changeType="positive"
                                    icon={DollarSign}
                                    iconColor="text-violet-400"
                                    iconBgColor="bg-violet-400/10"
                                />
                                <IconStatCard
                                    title="Total Order"
                                    value="500"
                                    change="+8% from yesterday"
                                    changeType="positive"
                                    icon={ShoppingBag}
                                    iconColor="text-yellow-400"
                                    iconBgColor="bg-yellow-400/10"
                                />
                                <IconStatCard
                                    title="Product Sold"
                                    value="9"
                                    change="+2% from yesterday"
                                    changeType="positive"
                                    icon={Package}
                                    iconColor="text-orange-400"
                                    iconBgColor="bg-orange-400/10"
                                />
                                <IconStatCard
                                    title="New Customer"
                                    value="12"
                                    change="+3% from yesterday"
                                    changeType="positive"
                                    icon={Users}
                                    iconColor="text-pink-400"
                                    iconBgColor="bg-pink-400/10"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Gauge Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Gauge Card</CardTitle>
                            <CardDescription>Card com gráfico de medidor radial</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="max-w-xs">
                                <GaugeCard
                                    title="Earnings"
                                    subtitle="Total Expense"
                                    value="$6078.76"
                                    percentage={80}
                                    description="Profit is 48% More than last Month"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Mini Chart Cards */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Mini Chart Cards</CardTitle>
                            <CardDescription>Cards com mini gráficos de barras, linhas e áreas</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <MiniBarChartCard
                                    title="Total hours"
                                    value="53h 28m"
                                    change="+29.1%"
                                    changeType="positive"
                                    dateRange="Nov 20 - Dec 4, 2024"
                                    data={[30, 45, 25, 60, 35, 80, 55, 40, 70, 45]}
                                    barColor="bg-primary"
                                />
                                <MiniLineChartCard
                                    title="Total Net Worth"
                                    value="513,920"
                                    change="+29.1%"
                                    changeType="positive"
                                    dateRange="Nov 20 - Dec 4, 2024"
                                    data={[20, 35, 25, 45, 30, 55, 40, 60, 45, 70]}
                                />
                                <AreaChartCard
                                    title="Total Net Worth"
                                    value="513,920"
                                    change="+29.1%"
                                    changeType="positive"
                                    dateRange="Nov 20 - Dec 4, 2024"
                                    data={[30, 45, 35, 55, 40, 65, 50, 75, 60, 80]}
                                    showAnnotation={true}
                                    annotationValue={150}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Dot Matrix Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Dot Matrix Card</CardTitle>
                            <CardDescription>Card com visualização de matriz de pontos (heatmap)</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="max-w-sm">
                                <DotMatrixCard
                                    title="Total Net Worth"
                                    value="513,920"
                                    change="+29.1%"
                                    changeType="positive"
                                    dateRange="Nov 20 - Dec 4, 2024"
                                    data={[
                                        [3, 5, 2, 7, 4, 6, 3],
                                        [5, 8, 4, 9, 6, 7, 5],
                                        [2, 4, 6, 5, 8, 4, 2],
                                        [6, 7, 5, 8, 9, 6, 4],
                                    ]}
                                    dotColor="bg-cyan-500"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Sparkline Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Sparkline Card</CardTitle>
                            <CardDescription>Card com múltiplas linhas de tendência</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="max-w-sm">
                                <SparklineCard
                                    title="Total Net Worth"
                                    value="513,920"
                                    change="+29.1%"
                                    changeType="positive"
                                    dateRange="Nov 20 - Dec 4, 2024"
                                    datasets={[
                                        { data: [100, 120, 140, 130, 150, 170, 160, 180], color: "#3b82f6" },
                                        { data: [80, 100, 90, 110, 100, 120, 130, 140], color: "#8b5cf6" },
                                        { data: [60, 70, 80, 75, 85, 90, 95, 100], color: "#06b6d4" },
                                    ]}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </section>

                {/* ========================================= */}
                {/* New Components Section */}
                {/* ========================================= */}
                <section className="space-y-6">
                    <h2 className="text-2xl font-bold text-foreground border-b pb-2">Novos Componentes</h2>

                    {/* Toast Notifications */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Toast Notifications</CardTitle>
                            <CardDescription>Notificações temporárias usando Sonner</CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-wrap gap-2">
                            <Button onClick={() => toast.success("Operação concluída com sucesso!")}>Success</Button>
                            <Button onClick={() => toast.error("Erro ao processar a solicitação")} variant="destructive">Error</Button>
                            <Button onClick={() => toast.warning("Atenção: verifique os dados")} variant="outline">Warning</Button>
                            <Button onClick={() => toast.info("Dica: você pode arrastar para fechar")} variant="secondary">Info</Button>
                            <Button onClick={() => toast.promise(
                                new Promise((resolve) => setTimeout(resolve, 2000)),
                                {
                                    loading: "Carregando...",
                                    success: "Dados carregados!",
                                    error: "Erro ao carregar"
                                }
                            )} variant="outline">Promise Toast</Button>
                        </CardContent>
                    </Card>

                    {/* Confirm Dialog */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Confirm Dialog</CardTitle>
                            <CardDescription>Modal de confirmação com variantes</CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-wrap gap-2">
                            <ConfirmDialog
                                trigger={<Button>Default</Button>}
                                title="Confirmar ação"
                                description="Você tem certeza que deseja continuar com esta ação?"
                                onConfirm={() => { toast.success("Ação confirmada!") }}
                            />
                            <ConfirmDialog
                                trigger={<Button variant="destructive">Deletar Item</Button>}
                                title="Deletar permanentemente?"
                                description="Esta ação não pode ser desfeita. O item será removido permanentemente."
                                variant="destructive"
                                confirmText="Sim, deletar"
                                onConfirm={() => { toast.success("Item deletado!") }}
                            />
                            <ConfirmDialog
                                trigger={<Button variant="outline"><AlertTriangle className="h-4 w-4 mr-2" />Warning</Button>}
                                title="Atenção!"
                                description="Esta ação pode ter consequências. Deseja prosseguir?"
                                variant="warning"
                                confirmText="Prosseguir"
                                onConfirm={() => { toast.success("Ação executada!") }}
                            />
                        </CardContent>
                    </Card>

                    {/* Date Picker */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Date Picker</CardTitle>
                            <CardDescription>Componentes para seleção de data simples e períodos, com opção de limpeza e digitação.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid gap-6 md:grid-cols-2">
                                <div>
                                    <label className="text-sm font-medium mb-2 block">Seleção Simples (Single Date)</label>
                                    <DatePicker
                                        placeholder="dd/mm/aaaa"
                                        onDateChange={(date) => date && toast.info(`Data selecionada: ${date.toLocaleDateString("pt-BR")}`)}
                                    />
                                    <p className="text-xs text-muted-foreground mt-2">Digite a data ou clique no calendário. Use o X para limpar.</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium mb-2 block">Seleção de Período (Date Range)</label>
                                    <DateRangePicker
                                        placeholderFrom="dd/mm/aaaa"
                                        placeholderTo="dd/mm/aaaa"
                                        onDateRangeChange={(range) => range.from && range.to && toast.info(`Período: ${range.from.toLocaleDateString("pt-BR")} - ${range.to.toLocaleDateString("pt-BR")}`)}
                                    />
                                    <p className="text-xs text-muted-foreground mt-2">Dois campos separados com seta indicando intervalo.</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* File Upload */}
                    <Card>
                        <CardHeader>
                            <CardTitle>File Upload</CardTitle>
                            <CardDescription>Upload de arquivos com drag-and-drop, preview e opções de recorte</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="max-w-xl space-y-8">
                                <div>
                                    <h3 className="text-sm font-medium mb-3">Upload Básico (Múltiplos arquivos)</h3>
                                    <FileUpload
                                        accept="image/*,.pdf,.doc,.docx,.txt,.md,.html,.css,.js,.json,.csv,.xlsx,.zip"
                                        maxSize={5}
                                        maxFiles={5}
                                        onFilesChange={(files) => toast.success(`${files.length} arquivo(s) selecionado(s)`)}
                                    />
                                </div>

                                <Separator />

                                <div>
                                    <h3 className="text-sm font-medium mb-3">Upload com Recorte 1:1 (Avatar)</h3>
                                    <p className="text-xs text-muted-foreground mb-3">Ideal para fotos de perfil. Força o usuário a recortar a imagem em quadrado.</p>
                                    <FileUpload
                                        accept="image/*"
                                        maxFiles={1}
                                        crop={true}
                                        cropAspectRatio={1}
                                        cropLabel="Recorte sua foto de perfil"
                                        onFilesChange={(files) => toast.success(`Imagem preparada: ${files[0]?.name}`)}
                                    />
                                </div>

                                <Separator />

                                <div>
                                    <h3 className="text-sm font-medium mb-3">Upload com Recorte Livre</h3>
                                    <p className="text-xs text-muted-foreground mb-3">Permite ajuste livre das dimensões e rotação.</p>
                                    <FileUpload
                                        accept="image/*"
                                        maxFiles={1}
                                        crop={true}
                                        cropLabel="Ajuste a imagem como preferir"
                                        onFilesChange={(files) => toast.success(`Imagem preparada: ${files[0]?.name}`)}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </section>

                <section id="advanced-ui" className="space-y-6">
                    <h2 className="text-2xl font-semibold tracking-tight">Advanced UI & Loading</h2>
                    <Separator className="my-4" />

                    <div className="grid gap-6 md:grid-cols-2">
                        {/* Loading States */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Skeleton Loading</CardTitle>
                                <CardDescription>Estados de carregamento para melhor percepção de performance.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center space-x-4">
                                    <Skeleton className="h-12 w-12 rounded-full" />
                                    <div className="space-y-2">
                                        <Skeleton className="h-4 w-[200px]" />
                                        <Skeleton className="h-4 w-[150px]" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Skeleton className="h-[125px] w-full rounded-xl" />
                                    <div className="space-y-2">
                                        <Skeleton className="h-4 w-full" />
                                        <Skeleton className="h-4 w-[80%]" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Animations Showcase */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Micro-Animations</CardTitle>
                                <CardDescription>Interações suaves usando tailwindcss-animate.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-4 items-center justify-center p-4">
                                    <Button className="transition-all duration-300 hover:scale-105 active:scale-95">
                                        Hover Scale
                                    </Button>
                                    <Button variant="secondary" className="animate-pulse">
                                        Pulse Effect
                                    </Button>
                                    <div className="h-10 w-10 bg-primary/20 rounded flex items-center justify-center animate-bounce shadow-md">
                                        🏀
                                    </div>
                                    <div className="h-10 w-10 bg-destructive/10 text-destructive rounded-full flex items-center justify-center animate-spin border border-destructive/20">
                                        🔄
                                    </div>
                                </div>
                                <p className="text-xs text-muted-foreground mt-4 text-center">
                                    Use classes como `animate-in`, `fade-in`, `zoom-in` para transições de entrada.
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid gap-6">
                        {/* Pagination */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Pagination</CardTitle>
                                <CardDescription>Navegação padrão acessível.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Pagination>
                                    <PaginationContent>
                                        <PaginationItem>
                                            <PaginationPrevious href="#" onClick={(e) => e.preventDefault()} />
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationLink href="#" onClick={(e) => e.preventDefault()}>1</PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationLink href="#" isActive onClick={(e) => e.preventDefault()}>
                                                2
                                            </PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationLink href="#" onClick={(e) => e.preventDefault()}>3</PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationEllipsis />
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationNext href="#" onClick={(e) => e.preventDefault()} />
                                        </PaginationItem>
                                    </PaginationContent>
                                </Pagination>
                            </CardContent>
                        </Card>

                        {/* Toolbar Pattern */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Pattern: Data Toolbar</CardTitle>
                                <CardDescription>Barra de ferramentas configurável para listas e tabelas. Suporta busca, filtros dinâmicos e contador de resultados.</CardDescription>
                            </CardHeader>
                            <CardContent className="bg-muted/30 p-6 rounded-lg border space-y-4">
                                <DataTableToolbar
                                    searchPlaceholder="Buscar clientes..."
                                    onSearch={(v) => console.log("Search:", v)}
                                    filters={[
                                        {
                                            key: "type",
                                            label: "Tipo",
                                            options: [
                                                { value: "all", label: "Todos os Tipos" },
                                                { value: "personal", label: "Pessoa Física" },
                                                { value: "business", label: "Empresa" },
                                            ],
                                        },
                                        {
                                            key: "status",
                                            label: "Status",
                                            options: [
                                                { value: "all", label: "Todos os Status" },
                                                { value: "active", label: "Ativo" },
                                                { value: "inactive", label: "Inativo" },
                                                { value: "pending", label: "Pendente" },
                                            ],
                                        },
                                    ]}
                                    filterValues={{ type: "all", status: "all" }}
                                    onFilterChange={(key, value) => console.log("Filter:", key, value)}
                                    onClearFilters={() => console.log("Clear filters")}
                                    resultCount={42}
                                />
                                <div className="border rounded-md h-[100px] flex items-center justify-center bg-card text-muted-foreground text-sm">
                                    [Área de Conteúdo / Tabela]
                                </div>

                                {/* Example Code */}
                                <div className="bg-zinc-900 text-zinc-300 p-4 rounded-md text-xs font-mono overflow-x-auto">
                                    <p className="text-zinc-500 mb-2">CÓDIGO DE USO</p>
                                    <pre>{`<DataTableToolbar
  searchPlaceholder="Buscar..."
  filters={[
    { key: "status", label: "Status", options: [...] },
  ]}
  filterValues={{ status: "all" }}
  onFilterChange={(key, value) => setFilters({...filters, [key]: value})}
  resultCount={items.length}
/>`}</pre>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                <Separator />

                {/* Landing Page Components */}
                <section className="space-y-6">
                    <h2 className="text-2xl font-semibold tracking-tight">Landing Page Components</h2>

                    {/* Neural Network Arsenal Section */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Neural Network Arsenal</CardTitle>
                            <CardDescription>
                                Seção de apresentação dos Agentes, Workflows e Skills com navegação por abas e animações.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-0 overflow-hidden border-t">
                            <BrainPowerSection />
                        </CardContent>
                    </Card>

                    {/* Brain Power Modals */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Resource Modals</CardTitle>
                            <CardDescription>
                                Modais de visualização detalhada para cada tipo de recurso (Agentes, Workflows, Skills).
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-wrap gap-4 pt-6">
                            <BrainPowerModal
                                type="agents"
                                trigger={
                                    <Button variant="outline" className="gap-2">
                                        Modal Agentes <Bot className="w-4 h-4" />
                                    </Button>
                                }
                            />
                            <BrainPowerModal
                                type="workflows"
                                trigger={
                                    <Button variant="outline" className="gap-2">
                                        Modal Workflows <Command className="w-4 h-4" />
                                    </Button>
                                }
                            />
                            <BrainPowerModal
                                type="skills"
                                trigger={
                                    <Button variant="outline" className="gap-2">
                                        Modal Skills <Wrench className="w-4 h-4" />
                                    </Button>
                                }
                            />
                        </CardContent>
                    </Card>
                </section>

                {/* Empty State Section */}
                <section className="space-y-4">
                    <h2 className="text-xl font-semibold">Empty States</h2>
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="bg-card rounded-lg border p-4">
                            <h3 className="text-sm font-medium mb-4">Com Ação</h3>
                            <EmptyState
                                icon={Ghost}
                                title="Nada por aqui"
                                description="Esta é uma demonstração do componente de estado vazio."
                                action={{ label: "Criar algo", onClick: () => { } }}
                                className="border-0 shadow-none min-h-[200px]"
                            />
                        </div>
                        <div className="bg-card rounded-lg border p-4">
                            <h3 className="text-sm font-medium mb-4">Simples</h3>
                            <EmptyState
                                icon={SearchX}
                                title="Busca sem resultados"
                                description="Tente buscar por outro termo."
                                className="border-0 shadow-none min-h-[200px]"
                            />
                        </div>
                    </div>
                </section>



            </div>
        </div>
    )
}

// Atualizado para aceitar interação e input manual
function ColorSwatch({ name, color, variable, dark = false, border = false, onColorChange }: {
    name: string,
    color: string,
    variable: string,
    dark?: boolean,
    border?: boolean,
    onColorChange?: (variable: string, value: string) => void
}) {
    // Se não tiver onColorChange, é apenas visualização
    const isInteractive = !!onColorChange;

    return (
        <div className={`relative group rounded-lg overflow-hidden ${border ? 'border border-border' : ''}`}>
            {/* Visual Color Block with Invisible Picker */}
            <div className="relative h-12 w-full">
                {isInteractive && (
                    <input
                        type="color"
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                        value={color}
                        onChange={(e) => onColorChange(variable, e.target.value)}
                        title={`Escolher cor para ${name}`}
                    />
                )}
                <div
                    className="h-full w-full transition-colors duration-200"
                    style={{ backgroundColor: color }}
                />
            </div>

            {/* Content Area */}
            <div className={`p-3 ${dark ? 'bg-card' : 'bg-muted'} relative flex flex-col gap-1`}>
                <p className="font-medium text-sm text-foreground">{name}</p>

                {isInteractive ? (
                    <div className="relative">
                        <input
                            type="text"
                            value={color}
                            onChange={(e) => onColorChange(variable, e.target.value)}
                            className="bg-transparent border-none p-0 text-xs text-muted-foreground uppercase focus:outline-none focus:text-primary font-mono w-full"
                            maxLength={7}
                        />
                        <div className="absolute -top-7 right-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                            <span className="text-[10px] bg-background/80 backdrop-blur px-2 py-0.5 rounded shadow-sm text-foreground border border-border">Editar</span>
                        </div>
                    </div>
                ) : (
                    <p className="text-xs text-muted-foreground uppercase">{color}</p>
                )}
            </div>
        </div>
    )
}


function DualColorSwatch({ name, lightColor, darkColor, variable, onLightChange, onDarkChange }: {
    name: string,
    lightColor: string,
    darkColor: string,
    variable: string,
    onLightChange: (value: string) => void,
    onDarkChange: (value: string) => void
}) {
    const [mode, setMode] = useState<'light' | 'dark'>('light')

    return (
        <div className="relative group rounded-lg overflow-hidden border border-border">
            {/* Mode Toggle Tabs */}
            <div className="flex border-b border-border bg-muted/50">
                <button
                    onClick={() => setMode('light')}
                    className={`flex-1 py-1.5 text-xs font-medium transition-colors flex items-center justify-center gap-1.5 ${mode === 'light' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:bg-muted/80'}`}
                >
                    <div className="w-2 h-2 rounded-full border border-border" style={{ backgroundColor: lightColor }} />
                    Light
                </button>
                <button
                    onClick={() => setMode('dark')}
                    className={`flex-1 py-1.5 text-xs font-medium transition-colors flex items-center justify-center gap-1.5 ${mode === 'dark' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:bg-muted/80'}`}
                >
                    <div className="w-2 h-2 rounded-full border border-border" style={{ backgroundColor: darkColor }} />
                    Dark
                </button>
            </div>

            {/* Visual Color Block with Invisible Picker */}
            <div className="relative h-12 w-full">
                <input
                    type="color"
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                    value={mode === 'light' ? lightColor : darkColor}
                    onChange={(e) => mode === 'light' ? onLightChange(e.target.value) : onDarkChange(e.target.value)}
                    title={`Escolher cor (${mode}) para ${name}`}
                />
                <div
                    className="h-full w-full transition-colors duration-200"
                    style={{ backgroundColor: mode === 'light' ? lightColor : darkColor }}
                />
            </div>

            {/* Content Area */}
            <div className="p-3 bg-card relative flex flex-col gap-1">
                <p className="font-medium text-sm text-foreground">{name}</p>

                <div className="relative">
                    <input
                        type="text"
                        value={mode === 'light' ? lightColor : darkColor}
                        onChange={(e) => mode === 'light' ? onLightChange(e.target.value) : onDarkChange(e.target.value)}
                        className="bg-transparent border-none p-0 text-xs text-muted-foreground uppercase focus:outline-none focus:text-primary font-mono w-full"
                        maxLength={7}
                    />
                    <div className="absolute -top-7 right-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        <span className="text-[10px] bg-background/80 backdrop-blur px-2 py-0.5 rounded shadow-sm text-foreground border border-border">
                            Editar {mode === 'light' ? 'Light' : 'Dark'}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

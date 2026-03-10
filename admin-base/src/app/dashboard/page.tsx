"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis, Line, LineChart } from "recharts"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import {
    IconStatCard,
    MiniBarChartCard,
    MiniLineChartCard,
    GaugeCard,
    AreaChartCard,
} from "@/components/ui/stat-cards"
import { TrendingUp, TrendingDown, MoreHorizontal, ArrowUpRight, DollarSign, ShoppingBag, Package, Users } from "lucide-react"

// Revenue Chart Data
const revenueData = [
    { month: "Jan", revenue: 2500 },
    { month: "Fev", revenue: 5500 },
    { month: "Mar", revenue: 10000 },
    { month: "Abr", revenue: 8500 },
    { month: "Mai", revenue: 14000 },
    { month: "Jun", revenue: 18000 },
    { month: "Jul", revenue: 16500 },
    { month: "Ago", revenue: 22000 },
]

// Sales Performance Data
const salesData = [
    { month: "Jan", desktop: 186, mobile: 80 },
    { month: "Fev", desktop: 305, mobile: 200 },
    { month: "Mar", desktop: 237, mobile: 120 },
    { month: "Abr", desktop: 73, mobile: 190 },
    { month: "Mai", desktop: 209, mobile: 130 },
    { month: "Jun", desktop: 214, mobile: 140 },
    { month: "Jul", desktop: 260, mobile: 160 },
]

// Deals Data
const dealsData = [
    { id: 1, name: "Deal Name #1", company: "Apple", amount: "$10,500.00", status: "Won" },
    { id: 2, name: "Deal Name #2", company: "Apple", amount: "$1,400.00", status: "Pending" },
    { id: 3, name: "Deal Name #3", company: "Company", amount: "$3,500.00", status: "Lost" },
    { id: 4, name: "Product Name #4", company: "Company", amount: "$5,200.00", status: "Pending" },
    { id: 5, name: "Deal Name #5", company: "Apple", amount: "$3,400.00", status: "Won" },
    { id: 6, name: "Deal Name #6", company: "Company", amount: "$1,700.00", status: "Lost" },
    { id: 7, name: "Deal Name #7", company: "Apple", amount: "$13,600.00", status: "Pending" },
]

// Tasks Data
const tasksData = [
    { id: 1, task: "Criar novo formulário para scales", deadline: "Deadline 2", highlight: false },
    { id: 2, task: "Revisar requisitos de hotline", deadline: "Deadline 3", highlight: false },
    { id: 3, task: "Enviar mensagem de volume", deadline: "Mon8 - Nov 19", highlight: true },
    { id: 4, task: "Obter aprovação de drains tulls", deadline: "Deadline 5", highlight: false },
]

// Funnel Data
const funnelData = [
    { stage: "Qualified", value: 100, color: "bg-primary" },
    { stage: "Proposal", value: 75, color: "bg-primary" },
    { stage: "Negotiation", value: 50, color: "bg-primary" },
    { stage: "Implementation", value: 35, color: "bg-primary" },
    { stage: "Closed Won", value: 25, color: "bg-accent" },
    { stage: "Closed Lost", value: 15, color: "bg-destructive" },
]

function getStatusBadge(status: string) {
    switch (status) {
        case "Won":
            return <Badge className="bg-purple-500 hover:bg-purple-600">Won</Badge>
        case "Pending":
            return <Badge className="bg-cyan-500 hover:bg-cyan-600">Pending</Badge>
        case "Lost":
            return <Badge className="bg-orange-500 hover:bg-orange-600">Lost</Badge>
        default:
            return <Badge>{status}</Badge>
    }
}

export default function DashboardPage() {
    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                </div>
                <Select defaultValue="this-year">
                    <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Período" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="this-week">Esta semana</SelectItem>
                        <SelectItem value="this-month">Este mês</SelectItem>
                        <SelectItem value="this-year">Este ano</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Stats Cards - Mix of Compact (6) + Large (1) */}
            <div className="grid gap-3 grid-cols-2 md:grid-cols-4 lg:grid-cols-8">
                <IconStatCard
                    title="Total Sales"
                    value="$1.2M"
                    change="+12.5%"
                    changeType="positive"
                    icon={DollarSign}
                    iconColor="text-violet-400"
                    iconBgColor="bg-violet-400/10"
                    size="compact"
                />
                <IconStatCard
                    title="Active Deals"
                    value="145"
                    change="+5%"
                    changeType="positive"
                    icon={ShoppingBag}
                    iconColor="text-yellow-400"
                    iconBgColor="bg-yellow-400/10"
                    size="compact"
                />
                <IconStatCard
                    title="Products Sold"
                    value="892"
                    change="+8%"
                    changeType="positive"
                    icon={Package}
                    iconColor="text-orange-400"
                    iconBgColor="bg-orange-400/10"
                    size="compact"
                />
                <IconStatCard
                    title="Customers"
                    value="234"
                    change="+15%"
                    changeType="positive"
                    icon={Users}
                    iconColor="text-pink-400"
                    iconBgColor="bg-pink-400/10"
                    size="compact"
                />
                <IconStatCard
                    title="Revenue"
                    value="$42k"
                    change="+9%"
                    changeType="positive"
                    icon={TrendingUp}
                    iconColor="text-green-400"
                    iconBgColor="bg-green-400/10"
                    size="compact"
                />
                <IconStatCard
                    title="Expenses"
                    value="$18k"
                    change="-3%"
                    changeType="negative"
                    icon={TrendingDown}
                    iconColor="text-red-400"
                    iconBgColor="bg-red-400/10"
                    size="compact"
                />
                {/* Large card spanning 2 columns */}
                <div className="col-span-2">
                    <IconStatCard
                        title="Win Rate"
                        value="32%"
                        change="+4% from last month"
                        changeType="positive"
                        icon={ArrowUpRight}
                        iconColor="text-cyan-400"
                        iconBgColor="bg-cyan-400/10"
                    />
                </div>
            </div>

            {/* Secondary Stats Row with Charts */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <MiniBarChartCard
                    title="Total Hours"
                    value="53h 28m"
                    change="+29.1%"
                    changeType="positive"
                    dateRange="This week"
                    data={[30, 45, 25, 60, 35, 80, 55, 40, 70, 45]}
                    barColor="bg-primary"
                />
                <MiniLineChartCard
                    title="Performance"
                    value="92.4%"
                    change="+8.2%"
                    changeType="positive"
                    dateRange="Last 30 days"
                    data={[20, 35, 25, 45, 30, 55, 40, 60, 45, 70]}
                />
                <AreaChartCard
                    title="Revenue Trend"
                    value="$42.5k"
                    change="+12.8%"
                    changeType="positive"
                    dateRange="This month"
                    data={[30, 45, 35, 55, 40, 65, 50, 75, 60, 80]}
                />
                <GaugeCard
                    title="Goal Progress"
                    subtitle="Monthly Target"
                    value="$85,000"
                    percentage={78}
                    description="22% remaining to reach goal"
                />
            </div>

            {/* Charts Row */}
            <div className="grid gap-6 lg:grid-cols-2">
                {/* Total Revenue Chart */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Total Revenue</CardTitle>
                            <CardDescription>Company's sales and expenses</CardDescription>
                        </div>
                        <Select defaultValue="this-year">
                            <SelectTrigger className="w-[120px]">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="this-year">This year</SelectItem>
                                <SelectItem value="last-year">Last year</SelectItem>
                            </SelectContent>
                        </Select>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={{ revenue: { label: "Revenue", color: "var(--primary)" } }} className="h-[250px] w-full">
                            <AreaChart data={revenueData} margin={{ left: 12, right: 12 }}>
                                <defs>
                                    <linearGradient id="fillRevenueDash" x1="0" y1="0" x2="0" y2="1">
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
                                    fill="url(#fillRevenueDash)"
                                    fillOpacity={1}
                                    stroke="var(--color-revenue)"
                                    strokeWidth={2}
                                />
                            </AreaChart>
                        </ChartContainer>
                    </CardContent>
                </Card>

                {/* Sales Performance Chart */}
                <Card>
                    <CardHeader>
                        <CardTitle>Sales Performance</CardTitle>
                        <CardDescription>Monthly sales breakdown</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={{
                            desktop: { label: "Desktop", color: "var(--primary)" },
                            mobile: { label: "Mobile", color: "var(--secondary)" },
                        }} className="h-[250px] w-full">
                            <BarChart data={salesData}>
                                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                                <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                                <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
                            </BarChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
            </div>

            {/* Deal Stage Funnel */}
            <Card>
                <CardHeader>
                    <CardTitle>Deal Stage Funnel</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {funnelData.map((item) => (
                            <div key={item.stage} className="flex items-center gap-4">
                                <span className="w-32 text-sm text-muted-foreground">{item.stage}</span>
                                <div className="flex-1 h-6 bg-muted rounded overflow-hidden">
                                    <div
                                        className={`h-full ${item.color} rounded transition-all duration-500`}
                                        style={{ width: `${item.value}%` }}
                                    />
                                </div>
                                <span className="w-12 text-sm text-muted-foreground text-right">{item.value}%</span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Bottom Row */}
            <div className="grid gap-6 lg:grid-cols-3">
                {/* Upcoming Tasks */}
                <Card>
                    <CardHeader>
                        <CardTitle>Upcoming Tasks</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {tasksData.map((item) => (
                            <div key={item.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
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

                {/* Recent Deals */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Recent Deals</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table withSeparator withHeaderHighlight>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Deal Name</TableHead>
                                    <TableHead>Company</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="w-[50px]"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {dealsData.map((deal) => (
                                    <TableRow key={deal.id}>
                                        <TableCell className="font-medium">{deal.name}</TableCell>
                                        <TableCell>{deal.company}</TableCell>
                                        <TableCell>{deal.amount}</TableCell>
                                        <TableCell>{getStatusBadge(deal.status)}</TableCell>
                                        <TableCell>
                                            <Button variant="ghost" size="icon">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <div className="mt-4 text-center">
                            <Button variant="link" className="text-primary">
                                Show more <ArrowUpRight className="w-4 h-4 ml-1" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

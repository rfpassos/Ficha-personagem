"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import {
    TrendingUp,
    TrendingDown,
    DollarSign,
    ShoppingBag,
    Users,
    Package,
    Zap,
    type LucideIcon
} from "lucide-react"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

// Icon Stat Card - Like the "$5k Total Sales" cards
interface IconStatCardProps {
    title: string
    value: string | number
    change?: string
    changeType?: "positive" | "negative" | "neutral"
    icon: LucideIcon
    iconColor?: string
    iconBgColor?: string
    size?: "default" | "compact"
}

export function IconStatCard({
    title,
    value,
    change,
    changeType = "positive",
    icon: Icon,
    iconColor = "text-primary",
    iconBgColor = "bg-primary/10",
    size = "default"
}: IconStatCardProps) {
    const isCompact = size === "compact"

    if (isCompact) {
        // Compact: same content sizes as default, just narrower width
        return (
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Card className="bg-card cursor-help">
                            <CardContent className="p-6">
                                <div className="flex items-start gap-4">
                                    <div className={cn("p-3 rounded-xl shrink-0", iconBgColor)}>
                                        <Icon className={cn("h-6 w-6", iconColor)} />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-3xl font-bold truncate">{value}</p>
                                        <p className="text-sm text-muted-foreground truncate">{title}</p>
                                        {change && (
                                            <p className={cn(
                                                "text-xs mt-1 truncate",
                                                changeType === "positive" && "text-success",
                                                changeType === "negative" && "text-red-500",
                                                changeType === "neutral" && "text-muted-foreground"
                                            )}>
                                                {change}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{title}: {value}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        )
    }

    // Default: horizontal layout, wider
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Card className="bg-card cursor-help">
                        <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                                <div className={cn("p-3 rounded-xl", iconBgColor)}>
                                    <Icon className={cn("h-6 w-6", iconColor)} />
                                </div>
                                <div className="flex-1">
                                    <p className="text-3xl font-bold">{value}</p>
                                    <p className="text-sm text-muted-foreground">{title}</p>
                                    {change && (
                                        <p className={cn(
                                            "text-xs mt-1",
                                            changeType === "positive" && "text-success",
                                            changeType === "negative" && "text-red-500",
                                            changeType === "neutral" && "text-muted-foreground"
                                        )}>
                                            {change}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{title}: {value}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}


// Mini Bar Chart Stat Card
interface MiniBarChartCardProps {
    title: string
    value: string | number
    change?: string
    changeType?: "positive" | "negative"
    dateRange?: string
    data: number[]
    barColor?: string
}

export function MiniBarChartCard({
    title,
    value,
    change,
    changeType = "positive",
    dateRange,
    data,
    barColor = "bg-primary"
}: MiniBarChartCardProps) {
    const maxValue = Math.max(...data)

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Card className="bg-card h-[200px] cursor-help">
                        <CardContent className="p-6 h-full flex flex-col">
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-muted-foreground">{title}</p>
                            </div>
                            <p className="text-3xl font-bold mb-2">{value}</p>

                            {/* Mini Bar Chart - fills remaining space */}
                            <div className="flex items-end gap-1 flex-1 mb-2">
                                {data.map((val, i) => (
                                    <div
                                        key={i}
                                        className={cn("flex-1 rounded-sm transition-all", barColor)}
                                        style={{ height: `${(val / maxValue) * 100}%` }}
                                    />
                                ))}
                            </div>

                            <div className="flex items-center justify-between text-xs">
                                <span className="text-muted-foreground">{dateRange}</span>
                                {change && (
                                    <span className={cn(
                                        "px-2 py-0.5 rounded",
                                        changeType === "positive" ? "bg-success/20 text-success" : "bg-red-500/20 text-red-500"
                                    )}>
                                        {change}
                                    </span>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{title}: {value}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )

}

// Mini Line Chart Stat Card
interface MiniLineChartCardProps {
    title: string
    value: string | number
    change?: string
    changeType?: "positive" | "negative"
    dateRange?: string
    data: number[]
    lineColor?: string
}

export function MiniLineChartCard({
    title,
    value,
    change,
    changeType = "positive",
    dateRange,
    data,
    lineColor = "stroke-primary"
}: MiniLineChartCardProps) {
    const id = React.useId()
    // MiniLineChartCard only uses 'data' prop
    // Note: implementation handled by specific card types, but for MiniLineChartCard below:

    // ... logic for MiniLineChartCard
    const maxValue = Math.max(...data)
    const minValue = Math.min(...data)
    const range = maxValue - minValue || 1

    // Generate SVG path
    const width = 200
    const height = 50
    const points = data.map((val, i) => ({
        x: (i / (data.length - 1)) * width,
        y: height - ((val - minValue) / range) * height
    }))

    const pathD = points.reduce((acc, point, i) => {
        if (i === 0) return `M ${point.x} ${point.y}`
        return `${acc} L ${point.x} ${point.y}`
    }, "")

    // Area path
    const areaD = `${pathD} L ${width} ${height} L 0 ${height} Z`

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Card className="bg-card h-[200px] cursor-help">
                        <CardContent className="p-6 h-full flex flex-col">
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-muted-foreground">{title}</p>
                            </div>
                            <p className="text-3xl font-bold mb-2">{value}</p>

                            {/* Mini Line Chart - fills remaining space */}
                            <div className="flex-1 mb-2 overflow-hidden">
                                <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full" preserveAspectRatio="none">
                                    <defs>
                                        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="currentColor" stopOpacity="0.3" />
                                            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                                        </linearGradient>
                                    </defs>
                                    <path
                                        d={areaD}
                                        fill={`url(#${id})`}
                                        className="text-primary"
                                    />
                                    <path
                                        d={pathD}
                                        fill="none"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className={lineColor}
                                    />
                                </svg>
                            </div>

                            <div className="flex items-center justify-between text-xs">
                                <span className="text-muted-foreground">{dateRange}</span>
                                {change && (
                                    <span className={cn(
                                        "px-2 py-0.5 rounded",
                                        changeType === "positive" ? "bg-success/20 text-success" : "bg-red-500/20 text-red-500"
                                    )}>
                                        {change}
                                    </span>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{title}: {value}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

// Gauge/Radial Chart Card - Like the "Earnings" card
interface GaugeCardProps {
    title: string
    subtitle?: string
    value: string | number
    percentage: number
    description?: string
}

export function GaugeCard({
    title,
    subtitle,
    value,
    percentage,
    description
}: GaugeCardProps) {
    const id = React.useId()
    const radius = 45
    const circumference = 2 * Math.PI * radius
    const halfCircumference = circumference / 2
    const strokeDasharray = `${(percentage / 100) * halfCircumference} ${circumference}`

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Card className="bg-card 2xl:h-[200px] cursor-help">
                        <CardContent className="p-6 h-full flex flex-col 2xl:flex-row 2xl:items-center gap-4">
                            {/* Left side / Top on narrow - Text content */}
                            <div className="flex-1 min-w-0 text-center 2xl:text-left">
                                <h3 className="text-lg font-semibold">{title}</h3>
                                {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
                                <p className="text-3xl font-bold text-primary mt-2">{value}</p>
                                {description && (
                                    <p className="text-xs text-muted-foreground mt-1">{description}</p>
                                )}
                            </div>

                            {/* Right side (wide) / Bottom (narrow) - Gauge Chart with fixed width */}
                            <div className="shrink-0 flex justify-center 2xl:justify-end">
                                <div className="relative w-[120px] h-[70px] 2xl:w-[140px] 2xl:h-[85px]">
                                    <svg viewBox="0 0 100 60" className="w-full h-full">
                                        {/* Background arc */}
                                        <path
                                            d="M 5 55 A 45 45 0 0 1 95 55"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="8"
                                            strokeLinecap="round"
                                            className="text-muted/30"
                                        />
                                        {/* Foreground arc */}
                                        <path
                                            d="M 5 55 A 45 45 0 0 1 95 55"
                                            fill="none"
                                            stroke={`url(#${id})`}
                                            strokeWidth="8"
                                            strokeLinecap="round"
                                            strokeDasharray={strokeDasharray}
                                        />
                                        <defs>
                                            <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="0%">

                                                <stop offset="0%" stopColor="#f97316" />
                                                <stop offset="50%" stopColor="#eab308" />
                                                <stop offset="100%" stopColor="#22c55e" />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                    <div className="absolute inset-0 flex items-end justify-center pb-0">
                                        <span className="text-lg font-bold">{percentage}%</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{title}: {value} ({percentage}%)</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

// Dot Matrix/Heatmap Card
interface DotMatrixCardProps {
    title: string
    value: string | number
    change?: string
    changeType?: "positive" | "negative"
    dateRange?: string
    data: number[][] // 2D array for the matrix
    dotColor?: string
}

export function DotMatrixCard({
    title,
    value,
    change,
    changeType = "positive",
    dateRange,
    data,
    dotColor = "bg-primary"
}: DotMatrixCardProps) {
    const maxValue = Math.max(...data.flat())

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Card className="bg-card cursor-help">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-sm text-muted-foreground">{title}</p>
                            </div>
                            <p className="text-3xl font-bold mb-4">{value}</p>

                            {/* Dot Matrix */}
                            <div className="grid gap-1 mb-4" style={{ gridTemplateColumns: `repeat(${data[0]?.length || 7}, 1fr)` }}>
                                {data.flat().map((val, i) => (
                                    <div
                                        key={i}
                                        className={cn(
                                            "aspect-square rounded-sm",
                                            dotColor
                                        )}
                                        style={{ opacity: 0.2 + (val / maxValue) * 0.8 }}
                                    />
                                ))}
                            </div>

                            <div className="flex items-center justify-between text-xs">
                                <span className="text-muted-foreground">{dateRange}</span>
                                {change && (
                                    <span className={cn(
                                        "px-2 py-0.5 rounded",
                                        changeType === "positive" ? "bg-success/20 text-success" : "bg-red-500/20 text-red-500"
                                    )}>
                                        {change}
                                    </span>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{title}: {value}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

// Sparkline Card with multiple lines
interface SparklineCardProps {
    title: string
    value: string | number
    change?: string
    changeType?: "positive" | "negative"
    dateRange?: string
    datasets: {
        data: number[]
        color: string
    }[]
    showLabels?: boolean
    labels?: { value: number; position: "start" | "end" }[]
}

export function SparklineCard({
    title,
    value,
    change,
    changeType = "positive",
    dateRange,
    datasets,
    showLabels = false,
    labels = []
}: SparklineCardProps) {
    const allData = datasets.flatMap(d => d.data)
    const maxValue = Math.max(...allData)
    const minValue = Math.min(...allData)
    const range = maxValue - minValue || 1

    const width = 200
    const height = 60

    const generatePath = (data: number[]) => {
        const points = data.map((val, i) => ({
            x: (i / (data.length - 1)) * width,
            y: height - ((val - minValue) / range) * height
        }))

        return points.reduce((acc, point, i) => {
            if (i === 0) return `M ${point.x} ${point.y}`
            return `${acc} L ${point.x} ${point.y}`
        }, "")
    }

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Card className="bg-card cursor-help">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-sm text-muted-foreground">{title}</p>
                            </div>
                            <p className="text-3xl font-bold mb-4">{value}</p>

                            {/* Sparkline Chart */}
                            <div className="relative h-16 mb-4">
                                <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
                                    {datasets.map((dataset, i) => (
                                        <path
                                            key={i}
                                            d={generatePath(dataset.data)}
                                            fill="none"
                                            stroke={dataset.color}
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    ))}
                                </svg>
                                {showLabels && labels.map((label, i) => (
                                    <span
                                        key={i}
                                        className={cn(
                                            "absolute text-xs text-muted-foreground",
                                            label.position === "start" ? "left-0" : "right-0"
                                        )}
                                        style={{ top: `${100 - ((label.value - minValue) / range) * 100}%` }}
                                    >
                                        {label.value}
                                    </span>
                                ))}
                            </div>

                            <div className="flex items-center justify-between text-xs">
                                <span className="text-muted-foreground">{dateRange}</span>
                                {change && (
                                    <span className={cn(
                                        "px-2 py-0.5 rounded",
                                        changeType === "positive" ? "bg-success/20 text-success" : "bg-red-500/20 text-red-500"
                                    )}>
                                        {change}
                                    </span>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{title}: {value}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

// Area Chart Card with filled area
interface AreaChartCardProps {
    title: string
    value: string | number
    change?: string
    changeType?: "positive" | "negative"
    dateRange?: string
    data: number[]
    fillColor?: string
    strokeColor?: string
    showAnnotation?: boolean
    annotationValue?: number
}

export function AreaChartCard({
    title,
    value,
    change,
    changeType = "positive",
    dateRange,
    data,
    fillColor = "fill-primary/20",
    strokeColor = "stroke-primary",
    showAnnotation = false,
    annotationValue
}: AreaChartCardProps) {
    const maxValue = Math.max(...data)
    const minValue = Math.min(...data)
    const range = maxValue - minValue || 1

    const width = 200
    const height = 60

    const points = data.map((val, i) => ({
        x: (i / (data.length - 1)) * width,
        y: height - ((val - minValue) / range) * height
    }))

    const pathD = points.reduce((acc, point, i) => {
        if (i === 0) return `M ${point.x} ${point.y}`
        return `${acc} L ${point.x} ${point.y}`
    }, "")

    const areaD = `${pathD} L ${width} ${height} L 0 ${height} Z`

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Card className="bg-card h-[200px] cursor-help">
                        <CardContent className="p-6 h-full flex flex-col">
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-muted-foreground">{title}</p>
                            </div>
                            <p className="text-3xl font-bold mb-2">{value}</p>

                            {/* Area Chart - fills remaining space */}
                            <div className="relative flex-1 mb-2 overflow-hidden">
                                <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full" preserveAspectRatio="none">
                                    <path d={areaD} className={fillColor} />
                                    <path
                                        d={pathD}
                                        fill="none"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className={strokeColor}
                                    />
                                </svg>
                                {showAnnotation && annotationValue !== undefined && (
                                    <span className="absolute right-0 top-0 text-xs bg-muted px-1 rounded">
                                        {annotationValue}
                                    </span>
                                )}
                            </div>

                            <div className="flex items-center justify-between text-xs">
                                <span className="text-muted-foreground">{dateRange}</span>
                                {change && (
                                    <span className={cn(
                                        "px-2 py-0.5 rounded",
                                        changeType === "positive" ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"
                                    )}>
                                        {change}
                                    </span>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{title}: {value}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

// Export icon presets for convenience
export const StatCardIcons = {
    sales: DollarSign,
    orders: ShoppingBag,
    customers: Users,
    products: Package,
    activity: Zap,
    trendUp: TrendingUp,
    trendDown: TrendingDown,
}

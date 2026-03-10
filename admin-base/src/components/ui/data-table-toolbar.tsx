"use client"

import * as React from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

export interface FilterOption {
    value: string
    label: string
}

export interface FilterConfig {
    key: string
    label: string
    placeholder?: string
    options: FilterOption[]
}

export interface DataTableToolbarProps {
    /** Placeholder for the search input */
    searchPlaceholder?: string
    /** Callback when search value changes */
    onSearch?: (value: string) => void
    /** Configuration for filter dropdowns */
    filters?: FilterConfig[]
    /** Current filter values */
    filterValues?: Record<string, string>
    /** Callback when filter values change */
    onFilterChange?: (key: string, value: string) => void
    /** Callback to clear all filters */
    onClearFilters?: () => void
    /** Number of results to display */
    resultCount?: number
    /** Show/hide the search input */
    showSearch?: boolean
    /** Additional class name */
    className?: string
    /** Content to render on the right side */
    rightContent?: React.ReactNode
}

export function DataTableToolbar({
    searchPlaceholder = "Buscar...",
    onSearch,
    filters = [],
    filterValues = {},
    onFilterChange,
    onClearFilters,
    resultCount,
    showSearch = true,
    className,
    rightContent,
}: DataTableToolbarProps) {
    const [searchValue, setSearchValue] = React.useState("")

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value)
        onSearch?.(e.target.value)
    }

    const hasActiveFilters = React.useMemo(() => {
        return Object.values(filterValues).some(v => v && v !== "all") || searchValue.length > 0
    }, [filterValues, searchValue])

    const handleClear = () => {
        setSearchValue("")
        onClearFilters?.()
    }

    return (
        <div className={cn("flex items-center justify-between gap-4 flex-wrap", className)}>
            <div className="flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2">
                {/* Search Input */}
                {showSearch && (
                    <Input
                        placeholder={searchPlaceholder}
                        value={searchValue}
                        onChange={handleSearch}
                        className="h-8 w-[150px] lg:w-[250px]"
                    />
                )}

                {/* Dynamic Filters */}
                {filters.map((filter) => (
                    <Select
                        key={filter.key}
                        value={filterValues[filter.key] || "all"}
                        onValueChange={(v) => onFilterChange?.(filter.key, v)}
                    >
                        <SelectTrigger className="h-8 w-[150px]">
                            <SelectValue placeholder={filter.placeholder || filter.label} />
                        </SelectTrigger>
                        <SelectContent>
                            {filter.options.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                ))}

                {/* Clear Filters Button */}
                {hasActiveFilters && (
                    <Button
                        variant="ghost"
                        onClick={handleClear}
                        className="h-8 px-2 lg:px-3"
                    >
                        Limpar
                        <X className="ml-2 h-4 w-4" />
                    </Button>
                )}
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-2">
                {/* Result Count */}
                {resultCount !== undefined && (
                    <span className="text-sm text-muted-foreground">
                        {resultCount} resultado(s)
                    </span>
                )}

                {/* Custom Right Content */}
                {rightContent}
            </div>
        </div>
    )
}

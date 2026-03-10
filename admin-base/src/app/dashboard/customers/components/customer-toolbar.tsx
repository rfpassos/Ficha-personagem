"use client"

import * as React from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

export interface CustomerFilters {
    type: string
    status: string
}

interface CustomerToolbarProps {
    filters: CustomerFilters
    onFiltersChange: (filters: CustomerFilters) => void
    resultCount?: number
    className?: string
}

export function CustomerToolbar({
    filters,
    onFiltersChange,
    resultCount,
    className,
}: CustomerToolbarProps) {
    const hasActiveFilters = filters.type !== "all" || filters.status !== "all"

    const handleTypeChange = (value: string) => {
        onFiltersChange({ ...filters, type: value })
    }

    const handleStatusChange = (value: string) => {
        onFiltersChange({ ...filters, status: value })
    }

    const handleClearFilters = () => {
        onFiltersChange({ type: "all", status: "all" })
    }

    return (
        <div className={cn("flex items-center justify-between gap-4 flex-wrap", className)}>
            <div className="flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2">
                {/* Filtro por Tipo */}
                <Select value={filters.type} onValueChange={handleTypeChange}>
                    <SelectTrigger className="h-8 w-[150px]">
                        <SelectValue placeholder="Tipo" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Todos os Tipos</SelectItem>
                        <SelectItem value="personal">Pessoa Física</SelectItem>
                        <SelectItem value="business">Empresa</SelectItem>
                    </SelectContent>
                </Select>

                {/* Filtro por Status */}
                <Select value={filters.status} onValueChange={handleStatusChange}>
                    <SelectTrigger className="h-8 w-[150px]">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Todos os Status</SelectItem>
                        <SelectItem value="active">Ativo</SelectItem>
                        <SelectItem value="inactive">Inativo</SelectItem>
                        <SelectItem value="pending">Pendente</SelectItem>
                    </SelectContent>
                </Select>

                {/* Limpar Filtros */}
                {hasActiveFilters && (
                    <Button
                        variant="ghost"
                        onClick={handleClearFilters}
                        className="h-8 px-2 lg:px-3"
                    >
                        Limpar filtros
                        <X className="ml-2 h-4 w-4" />
                    </Button>
                )}
            </div>

            {/* Contador de resultados */}
            {resultCount !== undefined && (
                <span className="text-sm text-muted-foreground">
                    {resultCount} cliente(s)
                </span>
            )}
        </div>
    )
}

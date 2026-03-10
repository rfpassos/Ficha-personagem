"use client"

import * as React from "react"
import { format, parse, isValid } from "date-fns"
import { ptBR } from "date-fns/locale"
import { CalendarIcon, X, ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
    PopoverAnchor,
} from "@/components/ui/popover"

interface DatePickerProps {
    date?: Date
    onDateChange?: (date: Date | undefined) => void
    placeholder?: string
    disabled?: boolean
    className?: string
    fromDate?: Date
    toDate?: Date
}

function DatePicker({
    date,
    onDateChange,
    placeholder = "dd/mm/aaaa",
    disabled = false,
    className,
    fromDate,
    toDate,
}: DatePickerProps) {
    const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(date)
    const [inputValue, setInputValue] = React.useState("")
    const [open, setOpen] = React.useState(false)
    const [month, setMonth] = React.useState<Date>(date || new Date())

    // Format date to display string
    const formatDateToString = (date: Date | undefined) => {
        if (!date) return ""
        return format(date, "dd/MM/yyyy")
    }

    // Parse string to date
    const parseStringToDate = (value: string): Date | undefined => {
        if (!value) return undefined
        const parsed = parse(value, "dd/MM/yyyy", new Date())
        if (isValid(parsed)) {
            // Check if within bounds
            if (fromDate && parsed < fromDate) return undefined
            if (toDate && parsed > toDate) return undefined
            return parsed
        }
        return undefined
    }

    // Handle selection from calendar
    const handleSelect = (newDate: Date | undefined) => {
        setSelectedDate(newDate)
        if (newDate) {
            setInputValue(formatDateToString(newDate))
            setMonth(newDate)
        } else {
            setInputValue("")
        }
        onDateChange?.(newDate)
        setOpen(false)
    }

    // Handle input change (typing)
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, "") // Remove non-digits

        // Auto-format as dd/mm/yyyy
        if (value.length > 2) {
            value = value.slice(0, 2) + "/" + value.slice(2)
        }
        if (value.length > 5) {
            value = value.slice(0, 5) + "/" + value.slice(5, 9)
        }
        if (value.length > 10) {
            value = value.slice(0, 10)
        }

        setInputValue(value)

        // Try to parse when we have a complete date
        if (value.length === 10) {
            const parsed = parseStringToDate(value)
            if (parsed) {
                setSelectedDate(parsed)
                setMonth(parsed)
                onDateChange?.(parsed)
            }
        }
    }

    // Handle clear
    const handleClear = () => {
        setSelectedDate(undefined)
        setInputValue("")
        onDateChange?.(undefined)
    }

    // Sync external date changes
    React.useEffect(() => {
        setSelectedDate(date)
        setInputValue(formatDateToString(date))
        if (date) setMonth(date)
    }, [date])

    // Calculate year range for dropdowns
    const fromYear = fromDate ? fromDate.getFullYear() : 1900
    const toYear = toDate ? toDate.getFullYear() : 2100

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverAnchor asChild>
                <div className={cn("relative w-[240px]", className)}>
                    <div className="relative flex items-center">
                        <CalendarIcon className="absolute left-3 h-4 w-4 text-muted-foreground pointer-events-none" />
                        <Input
                            value={inputValue}
                            onChange={handleInputChange}
                            onFocus={() => setOpen(true)}
                            onClick={() => setOpen(true)}
                            placeholder={placeholder}
                            disabled={disabled}
                            className="pl-10 pr-10 cursor-text"
                        />
                        {selectedDate && !disabled && (
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute right-1 h-7 w-7 text-muted-foreground hover:text-foreground"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    handleClear()
                                }}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                </div>
            </PopoverAnchor>
            <PopoverContent className="w-auto p-0 border shadow-lg rounded-xl" align="start">
                <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={handleSelect}
                    required
                    disabled={(date) => {
                        if (fromDate && date < fromDate) return true
                        if (toDate && date > toDate) return true
                        return false
                    }}
                    locale={ptBR}
                    fromYear={fromYear}
                    toYear={toYear}
                    month={month}
                    onMonthChange={setMonth}
                />
            </PopoverContent>
        </Popover>
    )
}

interface DateRangePickerProps {
    dateRange?: { from: Date | undefined; to: Date | undefined }
    onDateRangeChange?: (range: { from: Date | undefined; to: Date | undefined }) => void
    placeholderFrom?: string
    placeholderTo?: string
    disabled?: boolean
    className?: string
}

function DateRangePicker({
    dateRange,
    onDateRangeChange,
    placeholderFrom = "dd/mm/aaaa",
    placeholderTo = "dd/mm/aaaa",
    disabled = false,
    className,
}: DateRangePickerProps) {
    const [range, setRange] = React.useState<{ from: Date | undefined; to: Date | undefined }>(
        dateRange || { from: undefined, to: undefined }
    )
    const [fromInput, setFromInput] = React.useState("")
    const [toInput, setToInput] = React.useState("")
    const [open, setOpen] = React.useState(false)
    const [month, setMonth] = React.useState<Date>(new Date())

    // Format date to display string
    const formatDateToString = (date: Date | undefined) => {
        if (!date) return ""
        return format(date, "dd/MM/yyyy")
    }

    // Parse string to date
    const parseStringToDate = (value: string): Date | undefined => {
        if (!value) return undefined
        const parsed = parse(value, "dd/MM/yyyy", new Date())
        if (isValid(parsed)) return parsed
        return undefined
    }

    // Auto-format input as dd/mm/yyyy
    const formatInput = (value: string): string => {
        let formatted = value.replace(/\D/g, "")
        if (formatted.length > 2) {
            formatted = formatted.slice(0, 2) + "/" + formatted.slice(2)
        }
        if (formatted.length > 5) {
            formatted = formatted.slice(0, 5) + "/" + formatted.slice(5, 9)
        }
        return formatted.slice(0, 10)
    }

    // Handle calendar selection
    const handleSelect = (newRange: { from: Date | undefined; to?: Date | undefined } | undefined) => {
        let updatedRange = { from: newRange?.from, to: newRange?.to }

        // Logic check: if we are starting a new selection
        const isNewSelection = !range.from || (range.from && range.to)
        if (isNewSelection && updatedRange.from && updatedRange.to && updatedRange.from.getTime() === updatedRange.to.getTime()) {
            updatedRange.to = undefined
        }

        setRange(updatedRange)
        setFromInput(formatDateToString(updatedRange.from))
        setToInput(formatDateToString(updatedRange.to))

        // Update calendar view if from date changed
        if (updatedRange.from) {
            setMonth(updatedRange.from)
        }

        onDateRangeChange?.(updatedRange)

        if (updatedRange.from && updatedRange.to) {
            setOpen(false)
        }
    }

    // Handle from input change
    const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatInput(e.target.value)
        setFromInput(formatted)

        if (formatted.length === 10) {
            const parsed = parseStringToDate(formatted)
            if (parsed) {
                const newRange = { ...range, from: parsed }
                setRange(newRange)
                setMonth(parsed)
                onDateRangeChange?.(newRange)
            }
        }
    }

    // Handle to input change
    const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatInput(e.target.value)
        setToInput(formatted)

        if (formatted.length === 10) {
            const parsed = parseStringToDate(formatted)
            if (parsed) {
                const newRange = { ...range, to: parsed }
                setRange(newRange)
                setMonth(parsed)
                onDateRangeChange?.(newRange)
            }
        }
    }

    // Handle clear from
    const handleClearFrom = () => {
        const newRange = { from: undefined, to: range.to }
        setRange(newRange)
        setFromInput("")
        onDateRangeChange?.(newRange)
    }

    // Handle clear to
    const handleClearTo = () => {
        const newRange = { from: range.from, to: undefined }
        setRange(newRange)
        setToInput("")
        onDateRangeChange?.(newRange)
    }

    // Sync external changes
    React.useEffect(() => {
        if (dateRange) {
            setRange(dateRange)
            setFromInput(formatDateToString(dateRange.from))
            setToInput(formatDateToString(dateRange.to))
            if (dateRange.from) setMonth(dateRange.from)
        }
    }, [dateRange])

    const fromYear = 1900
    const toYear = 2100

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverAnchor asChild>
                <div className={cn("flex items-center gap-2", className)}>
                    {/* From date input */}
                    <div className="relative flex-1">
                        <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                        <Input
                            value={fromInput}
                            onChange={handleFromChange}
                            onFocus={() => setOpen(true)}
                            onClick={() => setOpen(true)}
                            placeholder={placeholderFrom}
                            disabled={disabled}
                            className="pl-10 pr-10 cursor-text"
                        />
                        {range.from && !disabled && (
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-muted-foreground hover:text-foreground"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    handleClearFrom()
                                }}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        )}
                    </div>

                    {/* Arrow separator */}
                    <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />

                    {/* To date input */}
                    <div className="relative flex-1">
                        <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                        <Input
                            value={toInput}
                            onChange={handleToChange}
                            onFocus={() => setOpen(true)}
                            onClick={() => setOpen(true)}
                            placeholder={placeholderTo}
                            disabled={disabled}
                            className="pl-10 pr-10 cursor-text"
                        />
                        {range.to && !disabled && (
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-muted-foreground hover:text-foreground"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    handleClearTo()
                                }}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                </div>
            </PopoverAnchor>
            <PopoverContent className="w-auto p-0 border shadow-lg rounded-xl" align="start">
                <Calendar
                    mode="range"
                    selected={range}
                    onSelect={handleSelect}
                    numberOfMonths={2}
                    locale={ptBR}
                    fromYear={fromYear}
                    toYear={toYear}
                    month={month}
                    onMonthChange={setMonth}
                />
            </PopoverContent>
        </Popover>
    )
}

export { DatePicker, DateRangePicker }

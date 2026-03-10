"use client"

import * as React from "react"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react"
import { DayButton, DayPicker, getDefaultClassNames } from "react-day-picker"
import { ptBR } from "date-fns/locale"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  formatters,
  components,
  locale = ptBR,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"]
}) {
  const defaultClassNames = getDefaultClassNames()

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      locale={locale}
      className={cn(
        "bg-background group/calendar p-5",
        className
      )}
      captionLayout="dropdown"
      formatters={{
        formatWeekdayName: (date) => {
          const days = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]
          return days[date.getDay()]
        },
        ...formatters,
      }}
      classNames={{
        root: cn("w-fit", defaultClassNames.root),
        months: cn(
          "relative flex flex-col gap-6 md:flex-row md:gap-8",
          defaultClassNames.months
        ),
        month: cn("flex w-full flex-col gap-4", defaultClassNames.month),
        nav: cn(
          "absolute inset-x-0 top-0 flex w-full items-center justify-between",
          defaultClassNames.nav
        ),
        button_previous: cn(
          "h-8 w-8 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors z-10",
          defaultClassNames.button_previous
        ),
        button_next: cn(
          "h-8 w-8 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors z-10",
          defaultClassNames.button_next
        ),
        month_caption: cn(
          "flex h-8 w-full items-center justify-center px-10 relative",
          defaultClassNames.month_caption
        ),
        caption_label: cn(
          "text-base font-semibold text-foreground hidden",
          defaultClassNames.caption_label
        ),
        // @ts-ignore - dropdown classes might missing in strict types
        caption_dropdowns: cn(
          "flex items-center justify-center gap-2 w-full",
          defaultClassNames.caption_dropdowns
        ),
        // @ts-ignore
        dropdown: cn(
          "appearance-none bg-transparent border-none p-1 rounded-md hover:bg-muted font-medium text-sm cursor-pointer text-center",
          defaultClassNames.dropdown
        ),
        // @ts-ignore
        dropdown_month: cn("w-auto", defaultClassNames.dropdown_month),
        // @ts-ignore
        dropdown_year: cn("w-auto", defaultClassNames.dropdown_year),
        // @ts-ignore
        dropdown_icon: "hidden",
        weekdays: cn("flex gap-1", defaultClassNames.weekdays),
        weekday: cn(
          "w-10 h-10 flex items-center justify-center text-sm font-medium text-muted-foreground",
          defaultClassNames.weekday
        ),
        week: cn("flex gap-1 mt-1", defaultClassNames.week),
        week_number_header: cn(
          "w-10 select-none",
          defaultClassNames.week_number_header
        ),
        week_number: cn(
          "text-muted-foreground select-none text-sm",
          defaultClassNames.week_number
        ),
        day: cn(
          "relative w-10 h-10 p-0 text-center",
          defaultClassNames.day
        ),
        range_start: cn(
          "rounded-l-full",
          defaultClassNames.range_start
        ),
        range_middle: cn(
          "rounded-none",
          defaultClassNames.range_middle
        ),
        range_end: cn(
          "rounded-r-full",
          defaultClassNames.range_end
        ),
        today: cn(
          "ring-1 ring-primary/50 rounded-full",
          defaultClassNames.today
        ),
        outside: cn(
          "text-muted-foreground/40",
          defaultClassNames.outside
        ),
        disabled: cn(
          "text-muted-foreground/30 cursor-not-allowed",
          defaultClassNames.disabled
        ),
        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return (
            <div
              data-slot="calendar"
              ref={rootRef}
              className={cn(className)}
              {...props}
            />
          )
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === "left") {
            return (
              <ChevronLeftIcon className={cn("h-5 w-5", className)} {...props} />
            )
          }
          return (
            <ChevronRightIcon className={cn("h-5 w-5", className)} {...props} />
          )
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className="flex w-10 h-10 items-center justify-center text-center">
                {children}
              </div>
            </td>
          )
        },
        ...components,
      }}
      {...props}
    />
  )
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const ref = React.useRef<HTMLButtonElement>(null)

  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus()
  }, [modifiers.focused])

  const isSelected = modifiers.selected
  const isRangeStart = modifiers.range_start
  const isRangeEnd = modifiers.range_end
  const isRangeMiddle = modifiers.range_middle
  const isToday = modifiers.today
  const isOutside = modifiers.outside

  return (
    <button
      ref={ref}
      type="button"
      data-day={day.date.toLocaleDateString()}
      className={cn(
        "w-10 h-10 flex items-center justify-center text-sm font-medium transition-colors rounded-full",
        // Base styles
        "hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary/20",
        // Outside days
        isOutside && "text-muted-foreground/40",
        // Today indicator
        isToday && !isSelected && "ring-1 ring-primary/50",
        // Single selection
        isSelected && !isRangeStart && !isRangeEnd && !isRangeMiddle &&
        "bg-primary text-primary-foreground hover:bg-primary/90",
        // Range start
        isRangeStart && "bg-primary text-primary-foreground rounded-l-full rounded-r-full",
        // Range end  
        isRangeEnd && "bg-primary text-primary-foreground rounded-l-full rounded-r-full",
        // Range middle
        isRangeMiddle && "bg-primary/20 text-primary rounded-none",
        className
      )}
      {...props}
    />
  )
}

export { Calendar, CalendarDayButton }

import * as React from "react"

import { cn } from "@/lib/utils"

// Context para propagação das opções de estilo da tabela
interface TableContextValue {
  withSeparator: boolean
  withHeaderHighlight: boolean
  actionsFirst: boolean
}

const TableContext = React.createContext<TableContextValue>({
  withSeparator: false,
  withHeaderHighlight: false,
  actionsFirst: false,
})

const useTableContext = () => React.useContext(TableContext)

interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  /** Habilita separadores de linha entre as rows */
  withSeparator?: boolean
  /** Habilita destaque visual no header (background) */
  withHeaderHighlight?: boolean
  /** Posiciona a coluna de ações no início da linha (requer isAction nas células) */
  actionsFirst?: boolean
}

const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className, withSeparator = false, withHeaderHighlight = false, actionsFirst = false, ...props }, ref) => (
    <TableContext.Provider value={{ withSeparator, withHeaderHighlight, actionsFirst }}>
      <div className="relative w-full overflow-auto">
        <table
          ref={ref}
          className={cn("w-full caption-bottom text-sm", className)}
          {...props}
        />
      </div>
    </TableContext.Provider>
  )
)
Table.displayName = "Table"

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => {
  const { withHeaderHighlight, withSeparator } = useTableContext()

  return (
    <thead
      ref={ref}
      className={cn(
        withSeparator && "[&_tr]:border-b [&_tr]:border-zinc-200 dark:[&_tr]:border-zinc-600",
        withHeaderHighlight && "bg-zinc-100 dark:bg-zinc-800/80",
        className
      )}
      {...props}
    />
  )
})
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => {
  const { withSeparator } = useTableContext()

  return (
    <tbody
      ref={ref}
      className={cn(
        withSeparator
          ? "[&_tr]:border-b [&_tr]:border-zinc-200 dark:[&_tr]:border-zinc-700 [&_tr:last-child]:border-0"
          : "[&_tr:last-child]:border-0",
        className
      )}
      {...props}
    />
  )
})
TableBody.displayName = "TableBody"

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      className
    )}
    {...props}
  />
))
TableFooter.displayName = "TableFooter"

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => {
  const { withSeparator, actionsFirst } = useTableContext()

  return (
    <tr
      ref={ref}
      className={cn(
        "transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
        !withSeparator && "border-b",
        // Quando actionsFirst está ativo, usa flexbox para poder reordenar
        actionsFirst && "flex items-center",
        className
      )}
      {...props}
    />
  )
})
TableRow.displayName = "TableRow"

interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  /** Marca esta célula como coluna de ação (usada com actionsFirst) */
  isAction?: boolean
}

const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, isAction = false, ...props }, ref) => {
    const { withHeaderHighlight, actionsFirst } = useTableContext()

    return (
      <th
        ref={ref}
        className={cn(
          "h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
          withHeaderHighlight && "font-semibold",
          // Quando actionsFirst está ativo, células ganham flex-1 e padding extra
          actionsFirst && "flex-1 py-3",
          // Célula de ação: tamanho fixo e reordenada para o início
          actionsFirst && isAction && "flex-none w-[50px] order-first",
          className
        )}
        {...props}
      />
    )
  }
)
TableHead.displayName = "TableHead"

interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  /** Marca esta célula como coluna de ação (usada com actionsFirst) */
  isAction?: boolean
}

const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, isAction = false, ...props }, ref) => {
    const { actionsFirst } = useTableContext()

    return (
      <td
        ref={ref}
        className={cn(
          "p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
          // Quando actionsFirst está ativo, células ganham flex-1
          actionsFirst && "flex-1",
          // Célula de ação: tamanho fixo e reordenada para o início
          actionsFirst && isAction && "flex-none w-[50px] order-first",
          className
        )}
        {...props}
      />
    )
  }
)
TableCell.displayName = "TableCell"

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-muted-foreground", className)}
    {...props}
  />
))
TableCaption.displayName = "TableCaption"

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}


"use client"

import { Customer } from "../schemas"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, Eye, MoreHorizontal, Trash2, FolderX } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { EmptyState } from "@/components/ui/empty-state"

interface CustomerTableProps {
    customers: Customer[]
    onView: (customer: Customer) => void
    onEdit: (customer: Customer) => void
    onDelete: (id: string) => void
}

export function CustomerTable({ customers, onView, onEdit, onDelete }: CustomerTableProps) {
    if (customers.length === 0) {
        return (
            <EmptyState
                icon={FolderX}
                title="Nenhum cliente encontrado"
                description="Não encontramos clientes com os filtros aplicados."
                action={{
                    label: "Limpar filtros",
                    onClick: () => window.location.reload()
                }}
            />
        )
    }

    return (
        <div className="rounded-md border animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
            <Table withSeparator withHeaderHighlight actionsFirst>
                <TableHeader>
                    <TableRow className="align-middle">
                        <TableHead className="w-[80px] align-middle">Avatar</TableHead>
                        <TableHead className="align-middle">Cliente</TableHead>
                        <TableHead className="align-middle">Tipo</TableHead>
                        <TableHead className="align-middle">Status</TableHead>
                        <TableHead className="align-middle">Cadastro</TableHead>
                        <TableHead isAction className="align-middle">Ações</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {customers.map((customer, index) => (
                        <TableRow
                            key={customer.id}
                            className="animate-in fade-in slide-in-from-bottom-2"
                            style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'both' }}
                        >
                            <TableCell>
                                <Avatar>
                                    <AvatarImage src={typeof customer.avatar === 'string' ? customer.avatar : undefined} />
                                    <AvatarFallback>{customer.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                                </Avatar>
                            </TableCell>
                            <TableCell>
                                <div className="flex flex-col">
                                    <span className="font-medium">{customer.name}</span>
                                    <span className="text-xs text-muted-foreground">{customer.email}</span>
                                    {customer.company && (
                                        <span className="text-xs text-muted-foreground/80 mt-0.5">{customer.company}</span>
                                    )}
                                </div>
                            </TableCell>
                            <TableCell>
                                <Badge variant="outline" className="capitalize">
                                    {customer.type === 'personal' ? 'Pessoa Física' : 'Empresa'}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <StatusBadge status={customer.status} />
                            </TableCell>
                            <TableCell>
                                <div className="text-sm text-muted-foreground">
                                    {customer.createdAt && format(customer.createdAt, "dd/MM/yyyy", { locale: ptBR })}
                                </div>
                            </TableCell>
                            <TableCell isAction>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                                        <DropdownMenuItem onClick={() => onView(customer)}>
                                            <Eye className="mr-2 h-4 w-4" /> Visualizar
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => onEdit(customer)}>
                                            <Edit className="mr-2 h-4 w-4" /> Editar
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem
                                            onClick={() => customer.id && onDelete(customer.id)}
                                            className="text-destructive focus:text-destructive"
                                        >
                                            <Trash2 className="mr-2 h-4 w-4" /> Excluir
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

function StatusBadge({ status }: { status: "active" | "inactive" | "pending" }) {
    const variants = {
        active: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-500/25 border-emerald-500/20",
        inactive: "bg-slate-500/15 text-slate-700 dark:text-slate-400 hover:bg-slate-500/25 border-slate-500/20",
        pending: "bg-amber-500/15 text-amber-700 dark:text-amber-400 hover:bg-amber-500/25 border-amber-500/20",
    }

    const labels = {
        active: "Ativo",
        inactive: "Inativo",
        pending: "Pendente",
    }

    return (
        <Badge variant="outline" className={`border-0 ${variants[status]}`}>
            {labels[status]}
        </Badge>
    )
}

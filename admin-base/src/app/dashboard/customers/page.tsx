"use client"

import { useState, useMemo } from "react"
import { useCustomers } from "@/hooks/use-customers"
import { Customer } from "./schemas"
import { CustomerTable } from "./components/customer-table"
import { CustomerToolbar, CustomerFilters } from "./components/customer-toolbar"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { ConfirmDialog } from "@/components/ui/confirm-dialog"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useSearch } from "@/contexts/search-context"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { CustomerStats } from "./components/customer-stats"
import { CustomerTableSkeleton } from "./components/customer-table-skeleton"

const ITEMS_PER_PAGE = 10

export default function CustomersPage() {
    const { customers, isLoading, deleteCustomer } = useCustomers()
    const { searchQuery } = useSearch()
    const router = useRouter()

    // State for Delete Dialog
    const [deleteId, setDeleteId] = useState<string | null>(null)

    // State for Toolbar Filters
    const [filters, setFilters] = useState<CustomerFilters>({
        type: "all",
        status: "all",
    })

    // State for Pagination
    const [currentPage, setCurrentPage] = useState(1)

    // Combined filter: Header search (3+ chars) + Toolbar filters
    const filteredCustomers = useMemo(() => {
        let result = customers

        // Header global search (min 3 chars, LIKE %XXX%)
        if (searchQuery.length >= 3) {
            const query = searchQuery.toLowerCase()
            result = result.filter(customer =>
                customer.name.toLowerCase().includes(query) ||
                customer.email.toLowerCase().includes(query) ||
                customer.company?.toLowerCase().includes(query) ||
                customer.role?.toLowerCase().includes(query)
            )
        }

        // Toolbar filter: Type
        if (filters.type !== "all") {
            result = result.filter(customer => customer.type === filters.type)
        }

        // Toolbar filter: Status
        if (filters.status !== "all") {
            result = result.filter(customer => customer.status === filters.status)
        }

        return result
    }, [customers, searchQuery, filters])

    // Reset to page 1 when filters change
    useMemo(() => {
        setCurrentPage(1)
    }, [searchQuery, filters])

    // Pagination calculations
    const totalPages = Math.ceil(filteredCustomers.length / ITEMS_PER_PAGE)
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    const paginatedCustomers = filteredCustomers.slice(startIndex, endIndex)

    // Generate page numbers to display
    const getPageNumbers = () => {
        const pages: number[] = []
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i)
        }
        return pages
    }

    const handleView = (customer: Customer) => {
        router.push(`/dashboard/customers/${customer.id}`)
    }

    const handleEdit = (customer: Customer) => {
        router.push(`/dashboard/customers/${customer.id}/edit`)
    }

    const handleDeleteClick = (id: string) => {
        setDeleteId(id)
    }

    const handleConfirmDelete = async () => {
        if (deleteId) {
            await deleteCustomer(deleteId)
            setDeleteId(null)
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Clientes</h1>
                    <p className="text-muted-foreground">
                        Gerencie seus clientes e empresas parceiras.
                        {searchQuery.length >= 3 && (
                            <span className="ml-2 text-primary">
                                • Buscando "{searchQuery}"
                            </span>
                        )}
                    </p>
                </div>
                <Link href="/dashboard/customers/new">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" /> Novo Cliente
                    </Button>
                </Link>
            </div>

            {/* Customer Stats */}
            {!isLoading && <CustomerStats customers={customers} />}

            {/* Toolbar with Filters */}
            <CustomerToolbar
                filters={filters}
                onFiltersChange={setFilters}
                resultCount={filteredCustomers.length}
            />

            {isLoading ? (
                <CustomerTableSkeleton />
            ) : (
                <>
                    <CustomerTable
                        customers={paginatedCustomers}
                        onView={handleView}
                        onEdit={handleEdit}
                        onDelete={handleDeleteClick}
                    />

                    {/* Pagination */}
                    {totalPages > 0 && (
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-muted-foreground">
                                Mostrando {startIndex + 1}-{Math.min(endIndex, filteredCustomers.length)} de {filteredCustomers.length} cliente(s)
                            </p>
                            <Pagination>
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious
                                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                            className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                        />
                                    </PaginationItem>

                                    {getPageNumbers().map((page) => (
                                        <PaginationItem key={page}>
                                            <PaginationLink
                                                onClick={() => setCurrentPage(page)}
                                                isActive={currentPage === page}
                                                className="cursor-pointer"
                                            >
                                                {page}
                                            </PaginationLink>
                                        </PaginationItem>
                                    ))}

                                    <PaginationItem>
                                        <PaginationNext
                                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                            className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                        />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </div>
                    )}
                </>
            )}

            {/* Delete Confirmation */}
            <ConfirmDialog
                open={!!deleteId}
                onOpenChange={(open) => !open && setDeleteId(null)}
                title="Excluir Cliente"
                description="Tem certeza que deseja excluir este cliente? Esta ação não pode ser desfeita."
                variant="destructive"
                confirmText="Excluir"
                onConfirm={handleConfirmDelete}
            />
        </div>
    )
}

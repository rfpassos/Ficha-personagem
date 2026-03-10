"use client"

import { CustomerForm } from "../../components/customer-form"
import { Customer } from "../../schemas"
import { useRouter, useParams } from "next/navigation"
import { useCustomers } from "@/hooks/use-customers"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function EditCustomerPage() {
    const router = useRouter()
    const params = useParams()
    const customerId = params.id as string
    const { customers, updateCustomer, isLoading } = useCustomers()
    const [customer, setCustomer] = useState<Customer | undefined>(undefined)

    useEffect(() => {
        if (!isLoading && customers.length > 0) {
            const found = customers.find(c => c.id === customerId)
            setCustomer(found)
        }
    }, [customers, customerId, isLoading])

    const handleSubmit = async (data: Customer) => {
        await updateCustomer(customerId, data)
        router.push("/dashboard/customers")
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        )
    }

    if (!customer) {
        return (
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard/customers">
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Cliente não encontrado</h1>
                        <p className="text-muted-foreground">O cliente solicitado não existe ou foi removido.</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link href="/dashboard/customers">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Editar Cliente</h1>
                    <p className="text-muted-foreground">Atualize as informações de {customer.name}.</p>
                </div>
            </div>

            {/* Form Container */}
            <CustomerForm initialData={customer} onSubmit={handleSubmit} />
        </div>
    )
}

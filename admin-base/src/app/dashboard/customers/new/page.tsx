"use client"

import { CustomerForm } from "../components/customer-form"
import { Customer } from "../schemas"
import { useRouter } from "next/navigation"
import { useCustomers } from "@/hooks/use-customers"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NewCustomerPage() {
    const router = useRouter()
    const { createCustomer } = useCustomers()

    const handleSubmit = async (data: Customer) => {
        await createCustomer(data)
        router.push("/dashboard/customers")
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
                    <h1 className="text-3xl font-bold tracking-tight">Novo Cliente</h1>
                    <p className="text-muted-foreground">Preencha os dados para cadastrar um novo cliente.</p>
                </div>
            </div>

            {/* Form Container (Full Width via internal Grid) */}
            <CustomerForm onSubmit={handleSubmit} />
        </div>
    )
}

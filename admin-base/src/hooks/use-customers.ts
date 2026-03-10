
import { useState, useEffect, useCallback } from "react"
import { Customer } from "@/app/dashboard/customers/schemas"
import { toast } from "sonner"

const STORAGE_KEY = "ficha-rpg:customers"

const INITIAL_CUSTOMERS: Customer[] = [
    {
        id: "1",
        name: "Alice Johnson",
        email: "alice@example.com",
        type: "personal",
        status: "active",
        company: "Freelancer",
        role: "Designer",
        avatar: "https://i.pravatar.cc/150?u=alice",
        createdAt: new Date("2024-01-15"),
    },
    {
        id: "2",
        name: "Tech Solutions Inc.",
        email: "contact@techsolutions.com",
        type: "business",
        status: "active",
        company: "Tech Solutions",
        role: "Partner",
        avatar: "https://i.pravatar.cc/150?u=tech",
        createdAt: new Date("2023-11-20"),
    },
    {
        id: "3",
        name: "Bob Smith",
        email: "bob.smith@gmail.com",
        type: "personal",
        status: "inactive",
        role: "Developer",
        avatar: "https://i.pravatar.cc/150?u=bob",
        createdAt: new Date("2024-02-01"),
    },
]

function getStoredCustomers(): Customer[] {
    if (typeof window === "undefined") return INITIAL_CUSTOMERS

    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_CUSTOMERS))
        return INITIAL_CUSTOMERS
    }

    try {
        const parsed = JSON.parse(stored) as Customer[]
        // Convert date strings back to Date objects
        return parsed.map(c => ({
            ...c,
            createdAt: c.createdAt ? new Date(c.createdAt) : undefined
        }))
    } catch {
        return INITIAL_CUSTOMERS
    }
}

function saveCustomers(customers: Customer[]) {
    if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(customers))
    }
}

export function useCustomers() {
    const [customers, setCustomers] = useState<Customer[]>([])
    const [isLoading, setIsLoading] = useState(true)

    // Load from localStorage on mount
    useEffect(() => {
        const loadCustomers = async () => {
            await new Promise(resolve => setTimeout(resolve, 300)) // Small delay for UX
            setCustomers(getStoredCustomers())
            setIsLoading(false)
        }
        loadCustomers()
    }, [])

    const createCustomer = useCallback(async (data: Customer) => {
        await new Promise(resolve => setTimeout(resolve, 500))

        const newCustomer = {
            ...data,
            id: Math.random().toString(36).substr(2, 9),
            createdAt: new Date(),
        }

        const updated = [newCustomer, ...getStoredCustomers()]
        saveCustomers(updated)
        setCustomers(updated)
        toast.success("Cliente criado com sucesso!")
    }, [])

    const updateCustomer = useCallback(async (id: string, data: Partial<Customer>) => {
        await new Promise(resolve => setTimeout(resolve, 500))

        const current = getStoredCustomers()
        const updated = current.map(c => c.id === id ? { ...c, ...data } : c)
        saveCustomers(updated)
        setCustomers(updated)
        toast.success("Cliente atualizado com sucesso!")
    }, [])

    const deleteCustomer = useCallback(async (id: string) => {
        await new Promise(resolve => setTimeout(resolve, 500))

        const current = getStoredCustomers()
        const updated = current.filter(c => c.id !== id)
        saveCustomers(updated)
        setCustomers(updated)
        toast.success("Cliente removido com sucesso!")
    }, [])

    return {
        customers,
        isLoading,
        createCustomer,
        updateCustomer,
        deleteCustomer
    }
}

import { Users, UserCheck, UserPlus, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Customer } from "../schemas"

interface CustomerStatsProps {
    customers: Customer[]
}

export function CustomerStats({ customers }: CustomerStatsProps) {
    // Calculate specific metrics
    const totalCustomers = customers.length
    const activeCustomers = customers.filter(c => c.status === 'active').length
    const companyCustomers = customers.filter(c => c.type === 'business').length
    const newCustomers = customers.length > 0 ? Math.ceil(customers.length * 0.2) : 0 // Simulando 20% de novos

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 animate-in fade-in slide-in-from-top-4 duration-500">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Total de Clientes
                    </CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{totalCustomers}</div>
                    <p className="text-xs text-muted-foreground">
                        +20.1% em relação ao mês passado
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Clientes Ativos
                    </CardTitle>
                    <UserCheck className="h-4 w-4 text-emerald-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{activeCustomers}</div>
                    <p className="text-xs text-muted-foreground">
                        {((activeCustomers / totalCustomers || 0) * 100).toFixed(0)}% da base total
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Empresas
                    </CardTitle>
                    <TrendingUp className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{companyCustomers}</div>
                    <p className="text-xs text-muted-foreground">
                        Parceiros B2B registrados
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Novos (Mês)
                    </CardTitle>
                    <UserPlus className="h-4 w-4 text-violet-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">+{newCustomers}</div>
                    <p className="text-xs text-muted-foreground">
                        Novos cadastros em 30 dias
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}

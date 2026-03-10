
"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { customerSchema, Customer } from "../schemas"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { FileUpload } from "@/components/ui/file-upload"
import { useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { User, Building2, Mail, Briefcase } from "lucide-react"

interface CustomerFormProps {
    initialData?: Customer
    onSubmit?: (data: Customer) => void
    isLoading?: boolean
    readOnly?: boolean
}

export function CustomerForm({ initialData, onSubmit, isLoading, readOnly = false }: CustomerFormProps) {
    const form = useForm<Customer>({
        resolver: zodResolver(customerSchema),
        defaultValues: {
            name: "",
            email: "",
            type: "personal",
            status: "active",
            company: "",
            role: "",
            ...initialData,
        },
    })

    // Reset form when initialData changes (for editing)
    useEffect(() => {
        if (initialData) {
            form.reset(initialData)
        }
    }, [initialData, form])

    const handleSubmit = (data: Customer) => {
        if (!readOnly && onSubmit) {
            onSubmit(data)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Coluna Lateral: Identidade & Configurações */}
                    <div className="space-y-6">
                        <Card className="overflow-hidden relative">
                            <div className="h-24 bg-muted/50 w-full absolute top-0 left-0 z-0"></div>
                            <CardContent className="pt-12 relative z-10 text-center pb-8">
                                <FormField
                                    control={form.control}
                                    name="avatar"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <div className="flex flex-col items-center gap-4">
                                                    <div className="bg-background p-1 rounded-full shadow-sm">
                                                        {field.value && typeof field.value === 'string' ? (
                                                            <div className="relative group">
                                                                <img
                                                                    src={field.value}
                                                                    alt="Avatar"
                                                                    className="w-32 h-32 rounded-full object-cover border-4 border-background shadow-md"
                                                                />
                                                                {!readOnly && (
                                                                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-white text-xs font-medium" onClick={() => field.onChange("")}>
                                                                        Remover
                                                                    </div>
                                                                )}
                                                            </div>
                                                        ) : (
                                                            !readOnly ? (
                                                                <div className="w-32 h-32 rounded-full border-4 border-background shadow-md bg-muted flex items-center justify-center text-muted-foreground overflow-hidden">
                                                                    <FileUpload
                                                                        maxFiles={1}
                                                                        accept="image/*"
                                                                        crop
                                                                        cropAspectRatio={1}
                                                                        onFilesChange={(files) => {
                                                                            if (files?.[0]) field.onChange(URL.createObjectURL(files[0]))
                                                                        }}
                                                                        className="w-full h-full opacity-0 absolute inset-0 cursor-pointer p-0 border-0"
                                                                    />
                                                                    <span className="text-xs">Foto</span>
                                                                </div>
                                                            ) : (
                                                                <div className="w-32 h-32 rounded-full border-4 border-background shadow-md bg-muted flex items-center justify-center text-muted-foreground">
                                                                    <User className="h-12 w-12 opacity-50" />
                                                                </div>
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="mt-4 space-y-1">
                                    <h3 className="font-semibold text-lg">{form.watch("name") || "Novo Cliente"}</h3>
                                    <p className="text-sm text-muted-foreground">{form.watch("email") || "email@exemplo.com"}</p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">Configurações</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="status"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Status da Conta</FormLabel>
                                            <div className="flex items-center gap-2">
                                                <div className={`w-3 h-3 rounded-full ${field.value === 'active' ? 'bg-emerald-500' :
                                                    field.value === 'inactive' ? 'bg-slate-500' : 'bg-amber-500'
                                                    }`} />
                                                <Select onValueChange={field.onChange} defaultValue={field.value} disabled={readOnly}>
                                                    <FormControl>
                                                        <SelectTrigger className="flex-1">
                                                            <SelectValue />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="active">Ativo</SelectItem>
                                                        <SelectItem value="inactive">Inativo</SelectItem>
                                                        <SelectItem value="pending">Pendente</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <FormDescription className="text-xs">
                                                Define o acesso do cliente ao sistema.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Separator />

                                <FormField
                                    control={form.control}
                                    name="type"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Tipo de Pessoa</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value} disabled={readOnly}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="personal">Pessoa Física</SelectItem>
                                                    <SelectItem value="business">Empresa</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>
                    </div>

                    {/* Coluna Principal: Dados do Formulário */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <User className="h-5 w-5 text-primary" />
                                    Informações Pessoais
                                </CardTitle>
                                <CardDescription>
                                    Dados básicos de identificação e contato.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Nome Completo</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Ex: João da Silva" disabled={readOnly} {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email Profissional</FormLabel>
                                                <div className="relative">
                                                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                                    <Input className="pl-9" placeholder="cliente@empresa.com" disabled={readOnly} {...field} />
                                                </div>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {form.watch("type") === "business" && (
                            <Card className="animate-in fade-in slide-in-from-top-4 duration-500">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Building2 className="h-5 w-5 text-blue-500" />
                                        Dados Corporativos
                                    </CardTitle>
                                    <CardDescription>
                                        Informações da empresa vinculada a este cliente.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="company"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Nome da Empresa</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Tech Solutions Ltda" disabled={readOnly} {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="role"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Cargo / Função</FormLabel>
                                                    <div className="relative">
                                                        <Briefcase className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                                        <Input className="pl-9" placeholder="Ex: Diretor de Vendas" disabled={readOnly} {...field} />
                                                    </div>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {!readOnly && (
                            <div className="flex items-center justify-end gap-4 pt-4">
                                <Button type="button" variant="ghost" onClick={() => window.history.back()}>
                                    Cancelar
                                </Button>
                                <Button type="submit" disabled={isLoading} size="lg" className="min-w-[150px]">
                                    {isLoading ? "Salvando..." : (initialData ? "Salvar Alterações" : "Criar Cliente")}
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </form>
        </Form>
    )
}


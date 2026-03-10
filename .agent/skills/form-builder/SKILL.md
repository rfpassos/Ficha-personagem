---
name: building-forms
description: Creates forms with React Hook Form, Zod validation, and proper error handling. Use when the user asks to create a form, add validation, or build input fields with validation.
---

# Form Builder

Skill para criar formulários com React Hook Form + Zod.

## Quando usar esta skill

- Criar formulário com validação
- Adicionar campos com regras específicas
- Criar wizard multi-step
- Formulários de filtros avançados

## Workflow

```markdown
## Checklist de Criação

- [ ] Definir schema Zod
- [ ] Criar componente do form
- [ ] Integrar com React Hook Form
- [ ] Adicionar tratamento de erros
- [ ] Implementar loading state
```

---

## Templates

### Schema Zod

```typescript
import { z } from "zod"

export const formSchema = z.object({
  // Campos de texto
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  
  // Campo opcional
  phone: z.string().optional(),
  
  // Enum/Select
  status: z.enum(["active", "inactive", "pending"], {
    required_error: "Selecione um status",
  }),
  
  // Número
  age: z.coerce.number().min(18, "Idade mínima: 18 anos"),
  
  // Boolean
  terms: z.boolean().refine(val => val === true, {
    message: "Você deve aceitar os termos",
  }),
  
  // Data
  birthDate: z.date({
    required_error: "Data de nascimento obrigatória",
  }),
  
  // Array
  tags: z.array(z.string()).min(1, "Selecione pelo menos uma tag"),
})

export type FormData = z.infer<typeof formSchema>
```

### Formulário Completo

```tsx
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

const formSchema = z.object({
  name: z.string().min(2, "Nome obrigatório"),
  email: z.string().email("Email inválido"),
  status: z.enum(["active", "inactive"]),
})

type FormData = z.infer<typeof formSchema>

interface MyFormProps {
  initialData?: Partial<FormData>
  onSubmit: (data: FormData) => Promise<void>
}

export function MyForm({ initialData, onSubmit }: MyFormProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name ?? "",
      email: initialData?.email ?? "",
      status: initialData?.status ?? "active",
    },
  })

  const { isSubmitting } = form.formState

  async function handleSubmit(data: FormData) {
    try {
      await onSubmit(data)
      toast.success("Salvo com sucesso!")
    } catch (error) {
      toast.error("Erro ao salvar")
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        {/* Campo de texto */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Digite o nome" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Campo de email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="email@exemplo.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Select */}
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="active">Ativo</SelectItem>
                  <SelectItem value="inactive">Inativo</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Botões */}
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Limpar
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Salvando..." : "Salvar"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
```

---

## Validações Comuns

```typescript
// CPF (apenas formato)
cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF inválido"),

// CNPJ
cnpj: z.string().regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, "CNPJ inválido"),

// Telefone BR
phone: z.string().regex(/^\(\d{2}\) \d{4,5}-\d{4}$/, "Telefone inválido"),

// CEP
cep: z.string().regex(/^\d{5}-\d{3}$/, "CEP inválido"),

// Senha forte
password: z.string()
  .min(8, "Mínimo 8 caracteres")
  .regex(/[A-Z]/, "Precisa ter maiúscula")
  .regex(/[0-9]/, "Precisa ter número"),

// Confirmação de senha
confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Senhas não conferem",
  path: ["confirmPassword"],
});

// URL
website: z.string().url("URL inválida").optional().or(z.literal("")),

// Valor monetário
price: z.coerce.number().positive("Valor deve ser positivo"),
```

---

## Instruções

1. **Definir schema**: Criar validações claras com mensagens em português

2. **Usar Form components**: 
   - `FormField` para cada campo
   - `FormLabel`, `FormControl`, `FormMessage`

3. **Tratar estados**:
   - `isSubmitting` para loading
   - `toast` para feedback

4. **Limpar após sucesso**:
   ```tsx
   form.reset()
   ```

---

## Padrões

| Elemento | Padrão |
|----------|--------|
| Espaçamento | `space-y-4` entre campos |
| Botões | `flex justify-end gap-2` |
| Loading | Desabilitar botão + texto "Salvando..." |
| Erros | `toast.error()` + `FormMessage` inline |

# Documentação da API

## Visão Geral

Este documento descreve as APIs, hooks e contextos do sistema.

> **Nota**: Este projeto é um template frontend. As operações de dados atualmente usam `localStorage` para mock. Quando integrado com um backend real (ex: Supabase), as interfaces permanecerão as mesmas.

---

## Contextos React

### SearchContext

Contexto global para gerenciar a busca pelo header do dashboard.

**Localização**: `src/contexts/search-context.tsx`

**Interface**:
```typescript
interface SearchContextType {
  searchQuery: string
  setSearchQuery: (query: string) => void
  clearSearch: () => void
}
```

**Uso**:
```tsx
import { useSearch } from "@/contexts/search-context"

function MyComponent() {
  const { searchQuery, setSearchQuery, clearSearch } = useSearch()
  
  // searchQuery contém o texto digitado no header
  // Filtrar quando length >= 3 é a convenção do projeto
}
```

**Provider**: Deve envolver o layout do dashboard (`src/app/dashboard/layout.tsx`).

---

## Custom Hooks

### useCustomers

Hook para operações CRUD de clientes.

**Localização**: `src/hooks/use-customers.ts`

**Interface**:
```typescript
interface UseCustomersReturn {
  customers: Customer[]
  isLoading: boolean
  createCustomer: (data: Customer) => Promise<void>
  updateCustomer: (id: string, data: Customer) => Promise<void>
  deleteCustomer: (id: string) => Promise<void>
}
```

**Uso**:
```tsx
import { useCustomers } from "@/hooks/use-customers"

function CustomersPage() {
  const { customers, isLoading, createCustomer, updateCustomer, deleteCustomer } = useCustomers()
  
  // customers: lista atual
  // isLoading: estado de carregamento
  // createCustomer: adiciona novo cliente
  // updateCustomer: atualiza cliente existente
  // deleteCustomer: remove cliente por ID
}
```

**Persistência**: Atualmente usa `localStorage` com a chave `customers`.

---

## Schemas de Validação

### Customer Schema

**Localização**: `src/app/dashboard/customers/schemas.ts`

```typescript
import { z } from "zod"

export const customerSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  type: z.enum(["personal", "business"]),
  status: z.enum(["active", "inactive", "pending"]),
  company: z.string().optional(),
  role: z.string().optional(),
  avatar: z.any().optional(),
  createdAt: z.date().optional(),
})

export type Customer = z.infer<typeof customerSchema>
```

---

## Componentes Reutilizáveis

### DataTableToolbar

Barra de ferramentas configurável para tabelas.

**Localização**: `src/components/ui/data-table-toolbar.tsx`

**Props**:
```typescript
interface DataTableToolbarProps {
  searchPlaceholder?: string          // Placeholder do input de busca
  onSearch?: (value: string) => void  // Callback de busca
  filters?: FilterConfig[]            // Filtros configuráveis
  filterValues?: Record<string, string>
  onFilterChange?: (key: string, value: string) => void
  onClearFilters?: () => void
  resultCount?: number                // Contador de resultados
  showSearch?: boolean                // Mostrar/ocultar busca
  rightContent?: React.ReactNode      // Conteúdo à direita
}

interface FilterConfig {
  key: string
  label: string
  placeholder?: string
  options: { value: string; label: string }[]
}
```

**Exemplo**:
```tsx
<DataTableToolbar
  searchPlaceholder="Buscar..."
  filters={[
    {
      key: "status",
      label: "Status",
      options: [
        { value: "all", label: "Todos" },
        { value: "active", label: "Ativo" },
      ],
    },
  ]}
  filterValues={{ status: "all" }}
  onFilterChange={(key, value) => setFilters({ ...filters, [key]: value })}
  resultCount={items.length}
/>
```

### CustomerForm

Formulário de cliente reutilizável (criação, edição, visualização).

**Localização**: `src/app/dashboard/customers/components/customer-form.tsx`

**Props**:
```typescript
interface CustomerFormProps {
  initialData?: Customer      // Dados para edição/visualização
  onSubmit?: (data: Customer) => void  // Callback de submit
  isLoading?: boolean         // Estado de loading
  readOnly?: boolean          // Modo somente leitura
}
```

**Modos**:
- **Criação**: Sem `initialData`, com `onSubmit`
- **Edição**: Com `initialData`, com `onSubmit`
- **Visualização**: Com `initialData`, `readOnly={true}`, sem `onSubmit`

---

## Rotas da Aplicação

### Dashboard

| Rota | Método | Descrição |
|------|--------|-----------|
| `/dashboard` | GET | Página principal do painel |
| `/dashboard/customers` | GET | Listagem de clientes |
| `/dashboard/customers/new` | GET | Formulário de novo cliente |
| `/dashboard/customers/[id]` | GET | Visualização de cliente (read-only) |
| `/dashboard/customers/[id]/edit` | GET | Formulário de edição |
| `/dashboard/design-system` | GET | Showcase de componentes |
| `/dashboard/kanban` | GET | Quadro Kanban |

### Autenticação (UI apenas)

| Rota | Descrição |
|------|-----------|
| `/login` | Tela de login |
| `/register` | Tela de registro |
| `/forgot-password` | Recuperação de senha |

---

## Integração Futura

Quando integrar com um backend real (Supabase, Prisma, etc.):

1. **Substituir localStorage** no `useCustomers` por chamadas API/Server Actions
2. **Manter as interfaces** para compatibilidade com os componentes existentes
3. **Adicionar tratamento de erros** e estados de loading mais robustos
4. **Implementar autenticação** no SearchContext e hooks

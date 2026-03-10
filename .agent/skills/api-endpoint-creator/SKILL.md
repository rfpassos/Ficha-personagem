---
name: creating-api-endpoints
description: Creates complete API endpoints/hooks with Zod validation and documentation. Use when the user asks to create a new endpoint, hook, API, CRUD, or backend integration.
---

# API Endpoint Creator

Skill para criar endpoints/hooks completos no Projeto-Base.

## Quando usar esta skill

- Criar novo hook customizado (`useXxx`)
- Adicionar CRUD para nova entidade
- Criar schema Zod para validação
- Documentar nova API

## Workflow

```markdown
## Checklist de Criação

- [ ] Definir schema Zod da entidade
- [ ] Criar hook customizado
- [ ] Implementar operações CRUD
- [ ] Atualizar `docs/SYSTEM-API.md`
- [ ] Testar funcionamento
```

## Estrutura de Arquivos

```
src/
├── app/dashboard/<entity>/
│   ├── page.tsx              # Listagem
│   ├── new/page.tsx          # Criação
│   ├── [id]/page.tsx         # Visualização
│   ├── [id]/edit/page.tsx    # Edição
│   ├── schemas.ts            # Schema Zod
│   └── components/           # Componentes específicos
├── hooks/
│   └── use-<entity>.ts       # Hook customizado
```

## Templates

### 1. Schema Zod

Localização: `src/app/dashboard/<entity>/schemas.ts`

```typescript
import { z } from "zod"

export const entitySchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  status: z.enum(["active", "inactive", "pending"]),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
})

export type Entity = z.infer<typeof entitySchema>

// Schema para criação (sem id)
export const createEntitySchema = entitySchema.omit({ id: true, createdAt: true, updatedAt: true })

// Schema para atualização (parcial)
export const updateEntitySchema = entitySchema.partial().required({ id: true })
```

### 2. Hook Customizado

Localização: `src/hooks/use-<entity>.ts`

```typescript
"use client"

import { useState, useEffect, useCallback } from "react"
import type { Entity } from "@/app/dashboard/<entity>/schemas"

const STORAGE_KEY = "<entity>s"

interface UseEntityReturn {
  items: Entity[]
  isLoading: boolean
  error: string | null
  create: (data: Omit<Entity, "id" | "createdAt">) => Promise<void>
  update: (id: string, data: Partial<Entity>) => Promise<void>
  remove: (id: string) => Promise<void>
  getById: (id: string) => Entity | undefined
  refresh: () => void
}

export function useEntity(): UseEntityReturn {
  const [items, setItems] = useState<Entity[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Load data
  const loadData = useCallback(() => {
    try {
      setIsLoading(true)
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        setItems(parsed.map((item: Entity) => ({
          ...item,
          createdAt: item.createdAt ? new Date(item.createdAt) : undefined,
        })))
      }
    } catch (err) {
      setError("Erro ao carregar dados")
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  // Save to storage
  const saveData = (data: Entity[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    setItems(data)
  }

  // Create
  const create = async (data: Omit<Entity, "id" | "createdAt">) => {
    try {
      const newItem: Entity = {
        ...data,
        id: crypto.randomUUID(),
        createdAt: new Date(),
      }
      saveData([...items, newItem])
    } catch (err) {
      setError("Erro ao criar item")
      throw err
    }
  }

  // Update
  const update = async (id: string, data: Partial<Entity>) => {
    try {
      const updated = items.map((item) =>
        item.id === id ? { ...item, ...data, updatedAt: new Date() } : item
      )
      saveData(updated)
    } catch (err) {
      setError("Erro ao atualizar item")
      throw err
    }
  }

  // Delete
  const remove = async (id: string) => {
    try {
      const filtered = items.filter((item) => item.id !== id)
      saveData(filtered)
    } catch (err) {
      setError("Erro ao remover item")
      throw err
    }
  }

  // Get by ID
  const getById = (id: string) => items.find((item) => item.id === id)

  return {
    items,
    isLoading,
    error,
    create,
    update,
    remove,
    getById,
    refresh: loadData,
  }
}
```

### 3. Documentação

Adicionar em `docs/SYSTEM-API.md`:

```markdown
### use<Entity>

Hook para operações CRUD de <Entity>.

**Localização**: `src/hooks/use-<entity>.ts`

**Interface**:
\`\`\`typescript
interface Use<Entity>Return {
  items: Entity[]
  isLoading: boolean
  error: string | null
  create: (data: Omit<Entity, "id" | "createdAt">) => Promise<void>
  update: (id: string, data: Partial<Entity>) => Promise<void>
  remove: (id: string) => Promise<void>
  getById: (id: string) => Entity | undefined
  refresh: () => void
}
\`\`\`

**Uso**:
\`\`\`tsx
import { useEntity } from "@/hooks/use-entity"

function EntityPage() {
  const { items, isLoading, create, update, remove } = useEntity()
  
  // items: lista atual
  // isLoading: estado de carregamento
  // create: adiciona novo item
  // update: atualiza item existente
  // remove: remove item por ID
}
\`\`\`

**Persistência**: Atualmente usa `localStorage` com a chave `<entity>s`.

---
```

## Instruções

1. **Definir entidade**: Nome no singular (ex: `product`, `order`, `customer`)

2. **Criar schema**:
   - Definir campos obrigatórios e opcionais
   - Adicionar validações com mensagens em português
   - Exportar tipo TypeScript

3. **Criar hook**:
   - Seguir padrão de `useCustomers` existente
   - Implementar CRUD completo
   - Tratar erros adequadamente

4. **Documentar**:
   - Atualizar `docs/SYSTEM-API.md`
   - Incluir interface e exemplo de uso

5. **Criar páginas** (se necessário):
   - Listagem com tabela e filtros
   - Formulário de criação/edição
   - Visualização read-only

## Padrão de Nomes

| Item | Convenção | Exemplo |
|------|-----------|---------|
| Schema | `<entity>Schema` | `productSchema` |
| Type | `<Entity>` | `Product` |
| Hook | `use<Entity>` | `useProducts` |
| Storage Key | `<entity>s` | `products` |
| Rota | `/dashboard/<entity>s` | `/dashboard/products` |

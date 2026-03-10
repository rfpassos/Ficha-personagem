---
name: generating-pages
description: Creates complete Next.js pages with layout, routing, and navigation. Use when the user asks to create a new page, route, dashboard section, or landing page.
---

# Page Generator

Skill para criar páginas completas no Next.js App Router.

## Quando usar esta skill

- Criar nova página no dashboard
- Criar landing page ou seção
- Adicionar nova rota ao app
- Criar página de settings/config

## Workflow

```markdown
## Checklist de Criação

- [ ] Definir rota e estrutura de pastas
- [ ] Criar page.tsx com layout
- [ ] Adicionar metadata SEO
- [ ] Atualizar navegação (sidebar/header)
- [ ] Documentar em CONTEXT.md
```

---

## Estrutura de Rotas (App Router)

```
src/app/
├── dashboard/
│   ├── layout.tsx          # Layout com sidebar
│   ├── page.tsx            # /dashboard
│   └── <nova-pagina>/
│       ├── page.tsx        # /dashboard/<nova-pagina>
│       ├── loading.tsx     # Loading state (opcional)
│       └── error.tsx       # Error boundary (opcional)
```

---

## Templates

### Página de Dashboard Básica

```tsx
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Nome da Página | Dashboard",
  description: "Descrição da página para SEO",
}

export default function NomeDaPaginaPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header da página */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Título da Página
          </h1>
          <p className="text-muted-foreground">
            Descrição breve do que esta página faz.
          </p>
        </div>
        
        {/* Ações do header */}
        <div className="flex items-center gap-2">
          <Button>Ação Principal</Button>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="grid gap-4">
        {/* Cards, tabelas, etc */}
      </div>
    </div>
  )
}
```

### Página com Tabs

```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ConfigPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h1 className="text-2xl font-semibold">Configurações</h1>
        <p className="text-muted-foreground">
          Gerencie suas preferências.
        </p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList>
          <TabsTrigger value="general">Geral</TabsTrigger>
          <TabsTrigger value="security">Segurança</TabsTrigger>
          <TabsTrigger value="notifications">Notificações</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="mt-4">
          {/* Conteúdo da tab */}
        </TabsContent>
        
        <TabsContent value="security" className="mt-4">
          {/* Conteúdo da tab */}
        </TabsContent>
        
        <TabsContent value="notifications" className="mt-4">
          {/* Conteúdo da tab */}
        </TabsContent>
      </Tabs>
    </div>
  )
}
```

### Página Split (Lista + Detalhe)

```tsx
export default function ItemsPage() {
  return (
    <div className="flex h-full">
      {/* Lista lateral */}
      <div className="w-80 border-r p-4">
        <div className="space-y-2">
          {/* Lista de itens */}
        </div>
      </div>

      {/* Área de detalhe */}
      <div className="flex-1 p-6">
        {/* Conteúdo do item selecionado */}
      </div>
    </div>
  )
}
```

---

## Instruções

1. **Definir rota**: Seguir convenção `/dashboard/<feature>`

2. **Criar estrutura**:
   - `page.tsx` — Componente principal
   - `loading.tsx` — Skeleton (opcional)
   - `components/` — Componentes específicos

3. **Adicionar metadata**:
   ```tsx
   export const metadata: Metadata = {
     title: "Título | App",
     description: "Descrição para SEO",
   }
   ```

4. **Atualizar navegação**: Adicionar link no `AppSidebar`

5. **Documentar**: Atualizar tabela de rotas em `docs/CONTEXT.md`

---

## Padrões do Projeto

| Elemento | Classe |
|----------|--------|
| Container | `p-6` ou `p-4` |
| Gap entre seções | `gap-6` |
| Título h1 | `text-2xl font-semibold tracking-tight` |
| Subtítulo | `text-muted-foreground` |
| Grid de cards | `grid gap-4 md:grid-cols-2 lg:grid-cols-3` |

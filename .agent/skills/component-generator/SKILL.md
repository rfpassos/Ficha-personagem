---
name: generating-components
description: Creates new UI components following Projeto-Base patterns (Shadcn UI + TypeScript + Tailwind). Use when the user asks to create a new component, button, card, or UI element.
---

# Component Generator

Skill para criar novos componentes UI seguindo os padrões do Projeto-Base.

## Quando usar esta skill

- Criar novo componente UI
- Adicionar variantes a componente existente
- Criar componente baseado em Shadcn UI

## Workflow

```markdown
## Checklist de Criação

- [ ] Verificar se componente similar já existe em `src/components/ui/`
- [ ] Criar arquivo do componente
- [ ] Adicionar tipagem TypeScript
- [ ] Implementar variantes (se aplicável)
- [ ] Atualizar `docs/COMPONENTS.md`
```

## Template de Componente

### Componente Básico

Localização: `src/components/ui/<component-name>.tsx`

```tsx
"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const componentVariants = cva(
  // Base styles
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ComponentNameProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof componentVariants> {
  // Custom props here
}

const ComponentName = React.forwardRef<HTMLDivElement, ComponentNameProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div
        className={cn(componentVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
ComponentName.displayName = "ComponentName"

export { ComponentName, componentVariants }
```

### Componente Composto (com subcomponentes)

```tsx
"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const CardCustom = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)}
    {...props}
  />
))
CardCustom.displayName = "CardCustom"

const CardCustomHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardCustomHeader.displayName = "CardCustomHeader"

const CardCustomContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardCustomContent.displayName = "CardCustomContent"

export { CardCustom, CardCustomHeader, CardCustomContent }
```

## Instruções

1. **Verificar existência**: Listar `src/components/ui/` e confirmar que não existe componente similar

2. **Seguir padrões**:
   - Usar `"use client"` no topo
   - Usar `React.forwardRef` para encaminhamento de ref
   - Usar `cn()` para merge de classes
   - Usar `cva()` para variantes

3. **Tipagem**:
   - Estender `React.HTMLAttributes<HTMLElement>`
   - Usar `VariantProps` para variantes
   - Exportar interface de props

4. **Documentação**: Atualizar `docs/COMPONENTS.md` com:
   - Localização do arquivo
   - Exemplo de uso
   - Tabela de props

## Template de Documentação

Adicionar em `docs/COMPONENTS.md`:

```markdown
### NomeDoComponente

Localização: `src/components/ui/nome-do-componente.tsx`

Descrição breve do componente.

\`\`\`tsx
import { NomeDoComponente } from "@/components/ui/nome-do-componente"

<NomeDoComponente variant="default">Conteúdo</NomeDoComponente>
<NomeDoComponente variant="outline">Outline</NomeDoComponente>
\`\`\`

**Props:**
| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `variant` | `"default" \| "outline" \| "ghost"` | `"default"` | Estilo visual |
| `size` | `"default" \| "sm" \| "lg"` | `"default"` | Tamanho do componente |

---
```

## Cores e Tokens Disponíveis

```css
/* Cores semânticas (suportam dark mode) */
--background / --foreground
--card / --card-foreground
--primary / --primary-foreground
--secondary / --secondary-foreground
--muted / --muted-foreground
--accent / --accent-foreground
--destructive / --destructive-foreground
--border / --input / --ring

/* Uso em Tailwind */
bg-primary text-primary-foreground
bg-secondary text-secondary-foreground
bg-muted text-muted-foreground
bg-accent text-accent-foreground
bg-destructive text-destructive-foreground
```

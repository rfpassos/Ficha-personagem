---
name: maintaining-docs
description: Maintains project documentation automatically. Use when finishing a feature, creating components, adding hooks, or when documentation needs updating. Covers CONTEXT.md, COMPONENTS.md, SYSTEM-API.md, backlogs.md, SKILLS.md, and README.md.
---

# Documentation Keeper

Skill para manter toda a documentação do projeto atualizada.

## Quando usar esta skill

- Após finalizar uma feature
- Após criar novo componente
- Após adicionar hook/endpoint
- Após criar nova skill
- Quando documentação estiver desatualizada

## Workflow

```markdown
## Checklist de Documentação

- [ ] Atualizar `docs/CONTEXT.md` (arquitetura)
- [ ] Atualizar `docs/COMPONENTS.md` (novos componentes)
- [ ] Atualizar `docs/SYSTEM-API.md` (hooks/endpoints)
- [ ] Atualizar `docs/backlogs.md` (status das features)
- [ ] Atualizar `docs/SKILLS.md` (novas skills)
- [ ] Atualizar `README.md` (overview)
```

---

## Arquivos e Responsabilidades

| Arquivo | Quando Atualizar | O que Documentar |
|---------|------------------|------------------|
| `CONTEXT.md` | Mudanças arquiteturais | Stack, estrutura de pastas, convenções |
| `COMPONENTS.md` | Novo componente UI | Props, exemplos, variantes |
| `SYSTEM-API.md` | Novo hook/endpoint | Interface, uso, persistência |
| `backlogs.md` | Feature concluída | Mover de pendente para concluído |
| `SKILLS.md` | Nova skill | Descrição, trigger, como usar |
| `README.md` | Mudanças significativas | Overview, instalação, features |

---

## Templates por Arquivo

### CONTEXT.md — Nova Rota

Adicionar na seção "Páginas Implementadas":

```markdown
| `/dashboard/<nova-rota>` | Descrição da página |
```

### COMPONENTS.md — Novo Componente

```markdown
### NomeDoComponente

Localização: `src/components/ui/nome-do-componente.tsx`

Descrição breve.

\`\`\`tsx
import { NomeDoComponente } from "@/components/ui/nome-do-componente"

<NomeDoComponente variant="default">Conteúdo</NomeDoComponente>
\`\`\`

**Props:**
| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `variant` | `"default" \| "outline"` | `"default"` | Estilo visual |

---
```

### SYSTEM-API.md — Novo Hook

```markdown
### use<Entity>

Hook para operações de <Entity>.

**Localização**: `src/hooks/use-<entity>.ts`

**Interface**:
\`\`\`typescript
interface Use<Entity>Return {
  items: Entity[]
  isLoading: boolean
  // ...
}
\`\`\`

**Uso**:
\`\`\`tsx
const { items, isLoading } = use<Entity>()
\`\`\`

**Persistência**: `localStorage` com chave `<entity>s`.

---
```

### backlogs.md — Marcar Feature Concluída

```markdown
## Concluído

### [Categoria]
- [x] Descrição da feature
```

### SKILLS.md — Nova Skill

```markdown
## N. Nome da Skill

**Arquivo:** `.agent/skills/<skill-name>/SKILL.md`

### Descrição
O que a skill faz.

### Quando usar
- Trigger 1
- Trigger 2

### Como usar
Instruções de uso ou comando.

---
```

---

## Instruções

1. **Identificar tipo de mudança**:
   - Componente → `COMPONENTS.md`
   - Hook/Endpoint → `SYSTEM-API.md`
   - Arquitetura/Rota → `CONTEXT.md`
   - Feature completa → `backlogs.md`
   - Skill → `SKILLS.md`

2. **Verificar formato existente**: Manter consistência com o estilo já usado no arquivo

3. **Incluir exemplos**: Sempre adicionar código de exemplo funcional

4. **Atualizar índices**: Se houver índice no início do documento

---

## Validação

Após atualizar, verificar:

- [ ] Links internos funcionando
- [ ] Código de exemplo correto
- [ ] Tabelas formatadas
- [ ] Sem informações duplicadas

---

## Atualização Automática

Ao finalizar qualquer tarefa significativa, perguntar:

> "A documentação precisa ser atualizada?"

Se sim, aplicar os templates acima.

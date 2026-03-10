---
name: reviewing-code
description: Provides a systematic code review checklist for the Projeto-Base. Use when the user asks to review code, check for issues, or validate changes before commit.
---

# Code Reviewer

Skill para revisão sistemática de código no Projeto-Base.

## Quando usar esta skill

- Antes de finalizar uma feature
- Quando solicitado "revisar código"
- Para validar alterações antes de commit
- Para identificar problemas de qualidade

## Checklist de Revisão

Copie este checklist e marque os itens conforme revisado:

```markdown
## Revisão de Código

### Estrutura e Imports
- [ ] Imports não utilizados removidos
- [ ] Imports organizados (React primeiro, depois libs, depois locais)
- [ ] Sem imports duplicados
- [ ] Caminhos usando alias `@/` corretamente

### TypeScript
- [ ] Tipos definidos (sem `any` desnecessário)
- [ ] Interfaces exportadas quando necessário
- [ ] Props tipadas corretamente
- [ ] Sem erros de compilação

### Componentes React
- [ ] Componentes seguem padrão funcional
- [ ] Props com valores default quando aplicável
- [ ] `key` prop em listas
- [ ] Hooks no topo do componente
- [ ] useEffect com dependências corretas

### Estilização
- [ ] Classes Tailwind organizadas
- [ ] Responsividade considerada (sm, md, lg, xl)
- [ ] Suporte a dark/light mode
- [ ] Sem estilos inline desnecessários

### Qualidade
- [ ] Tratamento de erros adequado
- [ ] Estados de loading implementados
- [ ] Mensagens de erro claras para usuário
- [ ] Console.log removidos
- [ ] Código comentado removido

### Documentação
- [ ] `docs/COMPONENTS.md` atualizado (se novo componente)
- [ ] `docs/SYSTEM-API.md` atualizado (se novo hook/endpoint)
- [ ] `docs/CONTEXT.md` atualizado (se mudança arquitetural)
- [ ] JSDoc em funções complexas

### Acessibilidade
- [ ] Atributos aria quando necessário
- [ ] Labels em inputs
- [ ] Alt em imagens
- [ ] Navegação por teclado funcional
```

## Revisão de IA & LLM (2025)

### Lógica & Alucinações
- [ ] **Cadeia de Pensamento**: A lógica segue um caminho verificável?
- [ ] **Edge Cases**: A IA considerou estados vazios, timeouts e falhas parciais?
- [ ] **Estado Externo**: O código faz suposições seguras sobre sistemas de arquivos ou redes?

### Revisão de Engenharia de Prompt

```markdown
// ❌ Prompt vago no código
const response = await ai.generate(userInput);

// ✅ Prompt Estruturado & Seguro
const response = await ai.generate({
  system: "Você é um parser especializado...",
  input: sanitize(userInput),
  schema: ResponseSchema
});
```

## Anti-Patterns para Sinalizar

```typescript
// ❌ Magic numbers
if (status === 3) { ... }

// ✅ Constantes nomeadas
if (status === Status.ACTIVE) { ... }

// ❌ Ninho profundo (Deep nesting)
if (a) { if (b) { if (c) { ... } } }

// ✅ Early returns
if (!a) return;
if (!b) return;
if (!c) return;
// executa trabalho

// ❌ Funções longas (100+ linhas)
// ✅ Funções pequenas e focadas

// ❌ tipo any
const data: any = ...

// ✅ Tipos adequados
const data: UserData = ...
```

## Guia de Comentários de Revisão

```
// Issues bloqueantes use 🔴
🔴 BLOCKING: Vulnerabilidade de injeção de SQL aqui

// Sugestões importantes use 🟡
🟡 SUGGESTION: Considere usar useMemo para performance

// Detalhes menores (nits) use 🟢
🟢 NIT: Prefira const ao invés de let para variável imutável

// Perguntas use ❓
❓ QUESTION: O que acontece se o usuário for nulo aqui?
```


## Instruções

1. **Identificar arquivos alterados**: Liste todos os arquivos modificados
2. **Aplicar checklist**: Verifique cada item aplicável
3. **Reportar problemas**: Liste issues encontradas com linha e arquivo
4. **Sugerir correções**: Proponha fix para cada problema

## Exemplo de Output

```markdown
## Resultado da Revisão

### Arquivos Revisados
- `src/components/ui/button.tsx`
- `src/hooks/use-customers.ts`

### Problemas Encontrados

#### ⚠️ `button.tsx` (linha 15)
**Problema**: Import não utilizado
**Código**: `import { useState } from 'react'`
**Sugestão**: Remover import

#### ⚠️ `use-customers.ts` (linha 42)
**Problema**: Console.log encontrado
**Código**: `console.log('debug:', data)`
**Sugestão**: Remover antes de commit

### ✅ Itens OK
- Tipagem correta
- Responsividade implementada
- Tratamento de erros adequado
```

## Validação Rápida

Para validação rápida, execute:

```bash
# Verificar erros TypeScript
npx tsc --noEmit

# Verificar lint
npm run lint
```

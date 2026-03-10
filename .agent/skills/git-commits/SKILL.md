---
name: writing-commits
description: Generates conventional commit messages following the Conventional Commits standard. Use when the user asks to commit, create a commit message, or document changes.
---

# Git Conventional Commits

Skill para gerar mensagens de commit padronizadas.

## Quando usar esta skill

- Fazer commit de alterações
- Gerar mensagem de commit
- Documentar mudanças no código

## Formato

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

---

## Tipos de Commit

| Tipo | Descrição | Exemplo |
|------|-----------|---------|
| `feat` | Nova funcionalidade | `feat(auth): add login with Google` |
| `fix` | Correção de bug | `fix(api): handle null response` |
| `docs` | Documentação | `docs: update README` |
| `style` | Formatação (não afeta código) | `style: fix indentation` |
| `refactor` | Refatoração | `refactor(hooks): simplify useAuth` |
| `perf` | Performance | `perf: optimize image loading` |
| `test` | Testes | `test: add unit tests for utils` |
| `build` | Build system | `build: update dependencies` |
| `ci` | CI/CD | `ci: add GitHub Actions` |
| `chore` | Tarefas gerais | `chore: clean up unused files` |

---

## Regras

1. **Tipo obrigatório**: Sempre começar com um tipo válido
2. **Scope opcional**: Entre parênteses, indica área afetada
3. **Descrição**:
   - Imperativo: "add" não "added"
   - Lowercase: não iniciar com maiúscula
   - Sem ponto final
   - Máximo 72 caracteres
4. **Body opcional**: Explicação detalhada se necessário
5. **Footer opcional**: Breaking changes, issues fechadas

---

## Exemplos

### Feature simples
```
feat(customers): add customer search filter
```

### Bug fix com contexto
```
fix(table): prevent crash when data is empty

The table component was throwing an error when the data
array was undefined. Added null check before mapping.
```

### Breaking change
```
feat(api)!: change response format

BREAKING CHANGE: API now returns paginated responses.
Clients need to access data via response.data instead of
response directly.
```

### Múltiplos arquivos
```
refactor(components): reorganize UI components

- Move Button to /ui folder
- Split Card into subcomponents
- Update imports across the app
```

### Fechando issue
```
fix(auth): resolve session timeout issue

Fixes #123
```

---

## Workflow

```markdown
## Checklist de Commit

- [ ] Executar `git status` para ver arquivos alterados/staged
- [ ] Verificar se há artefatos de processo (task.md, walkthrough.md) na pasta do cérebro
- [ ] Distinguir o que é código/docs do repo do que é apenas registro do agente
- [ ] Identificar o tipo de mudança (feat, fix, docs, etc.)
- [ ] Definir o scope principal
- [ ] Escrever a descrição em tom imperativo e em Português
- [ ] Adicionar body se complexo
```

---

## Scopes Comuns do Projeto

| Scope | Área |
|-------|------|
| `ui` | Componentes UI (`src/components/ui`) |
| `api` | Hooks e endpoints (`src/hooks`, `src/app/api`) |
| `auth` | Autenticação |
| `skills` | Novas habilidades do agente (`.agent/skills`) |
| `docs` | Documentação (`docs/`, `README.md`) |
| `config` | Configurações de ambiente/build |

---

## Instruções

1. **Analisar alterações**: Ver arquivos modificados. Use ferramentas de sistema para confirmar o que está pronto para ser commitado.

2. **Cuidado com Artefatos**: Se houver arquivos na pasta `brain` do Antigravity, lembre-se que eles geralmente **não** são parte do commit do repositório, a menos que o usuário peça explicitamente. Use-os apenas para extrair informações sobre o que foi feito.

3. **Escolher tipo**: Baseado na natureza da mudança. Se houver muitos tipos, use `feat` ou `chore` dependendo da predominância.

4. **Escrever descrição**:
   - Use Português do Brasil (Regra #1).
   - O que foi feito (não como).
   - Imperativo presente (ex: "adiciona" em vez de "adicionado").
   - Conciso.

5. **Revisar**: Mensagem deve fazer sentido isoladamente

---

## Template de Saída

Ao gerar uma mensagem de commit, retornar:

```markdown
## Commit Sugerido

\`\`\`
<mensagem completa>
\`\`\`

### Arquivos afetados
- `path/to/file1.tsx` - descrição breve
- `path/to/file2.ts` - descrição breve

### Alternativas
- `<tipo alternativo>: <descrição alternativa>`
```

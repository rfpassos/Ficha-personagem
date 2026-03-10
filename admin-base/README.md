# Projeto Base - Next.js + Shadcn UI + Tailwind CSS

Este repositório é um **template base** desenvolvido para acelerar a criação de novos projetos web modernos. Ele fornece uma estrutura inicial robusta, padronizada e repleta de componentes UI pré-configurados, evitando a repetição de configurações iniciais.

## 🎯 Objetivo

O objetivo deste projeto é servir como fundação para futuros desenvolvimentos, entregando:
- **Padronização**: Estrutura de pastas e código organizada.
- **Agilidade**: Componentes prontos para uso (Dashboard, CRUD, Tabelas, etc.).
- **Qualidade Visual**: Design System refinado com suporte a Dark/Light mode.
- **Escalabilidade**: Arquitetura preparada para RBAC e integração com backends.

## 🚀 Tecnologias

| Categoria | Tecnologia |
|-----------|------------|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| Linguagem | [TypeScript](https://www.typescriptlang.org/) |
| Estilização | [Tailwind CSS v4](https://tailwindcss.com/) |
| UI Toolkit | [Shadcn UI](https://ui.shadcn.com/) (Radix Primitives) |
| Formulários | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) |
| Ícones | [Lucide React](https://lucide.dev/) |
| Gráficos | [Recharts](https://recharts.org/) |
| Datas | [date-fns](https://date-fns.org/) |
| Notificações | [Sonner](https://sonner.emilkowal.ski/) |
| Cropping | [react-easy-crop](https://www.npmjs.com/package/react-easy-crop) |

## ✨ Funcionalidades Incluídas

### 1. Layout & Navegação
- Sidebar responsiva e colapsável
- Header com **busca global** integrada (SearchContext)
- Suporte nativo a Temas (Claro/Escuro) com **Dual Mode System**

### 2. Componentes UI Avançados
- **Stat Cards**: Cards de estatísticas com ícones, gráficos mini e gauges
- **Tabelas**: Tabela de dados com ações configuráveis, separadores e header highlight
- **DataTableToolbar**: Barra de filtros dinâmicos e configuráveis
- **Date Picker**: Seletores de data com digitação manual e navegação rápida
- **File Upload**: Área de upload drag-and-drop com image cropping
- **Pagination**: Navegação de páginas completa
- **Modais e Toasts**: Feedback visual padronizado (ConfirmDialog, Sonner)
- **Landing Page Components**: Seção "Brain Power" e Modais de Recursos (Agentes/Workflows/Skills)

### 3. Módulo de Clientes (CRUD Completo)
Exemplo funcional de gestão de dados com:
- 📋 **Listagem** com tabela, filtros e paginação (10 itens/página)
- 🔍 **Busca global** pelo header (3+ caracteres)
- 🎛️ **Filtros locais** por Tipo e Status
- 👁️ **Visualização** em modo read-only
- ✏️ **Criação/Edição** em páginas dedicadas
- 🗑️ **Exclusão** com confirmação
- 📷 **Avatar** com upload e cropping

### 4. Páginas Prontas
| Rota | Descrição |
|------|-----------|
| `/` | Landing Page Premium v2.0 (Neural Network Arsenal) |
| `/dashboard` | Painel com stat cards e gráficos |
| `/dashboard/customers` | CRUD completo de clientes |
| `/dashboard/kanban` | Quadro de tarefas (Drag & Drop) |
| `/dashboard/design-system` | Showcase de componentes |
| `/login`, `/register`, `/forgot-password` | Telas de autenticação |

## 📂 Estrutura do Projeto

```
src/
├── app/                    # Rotas e layouts (App Router)
│   ├── dashboard/          # Painel principal
│   │   ├── customers/      # CRUD de Clientes
│   │   ├── design-system/  # Showcase
│   │   └── kanban/         # Kanban Board
│   └── (auth)/             # Autenticação
├── components/
│   ├── ui/                 # Componentes base
│   └── dashboard/          # Componentes do dashboard
├── contexts/               # Contextos React
├── hooks/                  # Custom hooks
└── lib/                    # Utilitários
```

## 📚 Documentação

A documentação detalhada do projeto encontra-se na pasta `docs/`:

| Arquivo | Conteúdo |
|---------|----------|
| [CONTEXT.md](docs/CONTEXT.md) | Arquitetura, estrutura de pastas e convenções |
| [COMPONENTS.md](docs/COMPONENTS.md) | Guia de uso dos componentes UI |
| [SYSTEM-API.md](docs/SYSTEM-API.md) | Hooks, contextos, schemas e interfaces |
| [CAPABILITIES.md](docs/CAPABILITIES.md) | Mapeamento completo de agents, skills e workflows |
| [SKILLS.md](docs/SKILLS.md) | Skills disponíveis para o agente AI |
| [backlogs.md](docs/backlogs.md) | Funcionalidades concluídas e escopo futuro |

## 🛠️ Como Iniciar

1. **Instale as dependências:**
   ```bash
   npm install
   # ou
   pnpm install
   ```

2. **Rode o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

3. **Acesse em:** [http://localhost:3000](http://localhost:3000)

## 🔮 Escopo Futuro

Quando utilizar este template para um projeto real, considere implementar:

- [ ] **Autenticação**: Integração com Supabase Auth ou similar
- [ ] **RBAC**: Controle de acesso baseado em roles (Admin/Editor/Viewer)
- [ ] **Persistência**: Substituir localStorage por banco de dados real
- [ ] **Testes**: Unitários (Vitest) e E2E (Playwright)
- [ ] **i18n**: Internacionalização

## 🤝 Padrões de Desenvolvimento

Ao utilizar este boilerplate, recomenda-se seguir os padrões estabelecidos em `docs/CONTEXT.md`, mantendo a consistência visual e arquitetural para facilitar a manutenção e escalabilidade.

---

**Desenvolvido por Loop Studio IA** 🚀

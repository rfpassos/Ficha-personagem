# Backlog do Projeto

## Concluído

### Configuração Inicial
- [x] Inicialização do projeto Next.js (TypeScript, ESLint)
- [x] Configuração da página inicial com Logotipo Loop Studio IA
- [x] Adição da seção de Objetivo do Projeto
- [x] Configuração de estilos globais (Vanilla CSS)
- [x] Configuração de fontes (Urbanist)
- [x] Adaptação do layout responsivo e Dark/Light mode (via CSS)
- [x] Migração para Tailwind CSS e Shadcn UI

### Componentes UI
- [x] Implementar componentes Shadcn (Button, Card, Input, etc.)
- [x] Criar componentes de Stat Cards customizados
  - [x] IconStatCard (com variante compact)
  - [x] MiniBarChartCard
  - [x] MiniLineChartCard
  - [x] AreaChartCard
  - [x] GaugeCard (responsivo)
  - [x] DotMatrixCard
  - [x] SparklineCard
- [x] Modal de confirmação (ConfirmDialog)
- [x] Toast notifications (Sonner)
- [x] Date Picker e Date Range Picker
- [x] File Upload com drag-and-drop
  - [x] Image Cropping (react-easy-crop)
  - [x] Ícones de arquivo avançados (PDF, Zip, Code, etc)
- [x] Melhorias na Tabela (Separadores, Header Highlight, Ações reposicionáveis)
- [x] DataTableToolbar configurável com filtros dinâmicos

### Páginas
- [x] Página Home redesenhada
- [x] Dashboard com stat cards e gráficos
- [x] Design System (showcase de componentes)
- [x] Kanban Board com drag-and-drop
- [x] Telas de Login, Registro, Forgot Password

### Layout
- [x] Sidebar responsiva com navegação
- [x] Header com busca global integrada (SearchContext)
- [x] Suporte a tema Light/Dark mode

### Módulo de Clientes (CRUD Completo)
- [x] Listagem de clientes com tabela
- [x] Formulário de criação (página dedicada `/customers/new`)
- [x] Formulário de edição (página dedicada `/customers/[id]/edit`)
- [x] Visualização read-only (`/customers/[id]`)
- [x] Exclusão com confirmação (ConfirmDialog)
- [x] Upload de avatar com cropping
- [x] Filtros por Tipo e Status (CustomerToolbar)
- [x] Paginação (10 itens por página)
- [x] Busca global via header (3+ caracteres)
- [x] Persistência local via localStorage (mock)

### Contextos e Hooks
- [x] SearchContext para busca global
- [x] useCustomers hook para operações CRUD

### Documentação
- [x] CONTEXT.md - Arquitetura do projeto
- [x] COMPONENTS.md - Documentação de componentes UI
- [x] backlogs.md - Este arquivo

### Refinamentos
- [x] Skeleton loading states
- [x] Pagination e Filtering components
- [x] Refinar animações e transições
- [x] Personalização Dinâmica de Cores (Dual Mode)
- [x] Refinar UI do Kanban (Botões de Ação nas Colunas)
- [x] Separação View/Edit para controle de acesso futuro

### Landing Page Premium v2.0
- [x] Redesign completo com foco em "Developer Experience"
- [x] Implementação da seção "Antigravity Recommended" (Logo e Links Oficiais)
- [x] Adaptação da Tech Stack com efeitos visuais avançados (Neon Glow)
- [x] Social Proof com avatares gerados via AI
- [x] Ajustes de UX (remoção de cursores enganosos, melhoria de contraste)
- [x] Otimização de SEO e Acessibilidade básica

### Refinamento Landing Page & Design System
- [x] Refatoração da Landing Page "Neural Network Arsenal" (BrainPower Section)
- [x] Criação de Modais de Recursos (Agentes, Workflows, Skills - BrainPowerModal)
- [x] Integração de componentes da Landing Page no Design System
- [x] Adição do ThemeToggle no Design System

### Refatoração Auth Pages
- [x] Redesign Login (Split Layout + Animated Logo)
- [x] Redesign Register (Split Layout + Hero Image Exclusiva)
- [x] Redesign Forgot Password (Split Layout + Hero Image Exclusiva)
- [x] SplashScreen com Logo Animado oficial (7 pontos)

### Design System Updates
- [x] Adição da seção "Logotypes" (Static & Animated)
- [x] Componente `AnimatedLogo` com prop `enableHover`
- [x] Componente `EmptyState` genérico

---

## Escopo Futuro (Implementação do Projeto Real)

Estes itens devem ser implementados quando este template for utilizado para um projeto real.

### Autenticação e Autorização
- [ ] Integração com Supabase Auth (ou similar)
- [ ] Sistema de roles (Admin, Editor, Viewer)
- [ ] Proteção de rotas por permissão
- [ ] Middleware de autorização

### Persistência de Dados
- [ ] Integração com Supabase Database
- [ ] APIs/Server Actions para CRUD real
- [ ] Persistência do Kanban
- [ ] Persistência das configurações de tema

### Funcionalidades Avançadas
- [ ] Busca avançada com múltiplos campos
- [ ] Exportação de dados (CSV, PDF)
- [ ] Notificações em tempo real
- [ ] Histórico de alterações (audit log)
- [ ] Soft delete e recuperação

### Qualidade
- [ ] Testes unitários (Jest/Vitest)
- [ ] Testes E2E (Playwright)
- [ ] Otimização de performance
- [ ] Acessibilidade (ARIA labels, keyboard navigation)
- [ ] Internacionalização (i18n)

### Infraestrutura
- [ ] CI/CD pipeline
- [ ] Monitoramento e logs
- [ ] Rate limiting
- [ ] Cache strategies

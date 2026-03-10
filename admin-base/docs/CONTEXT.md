# Contexto do Projeto

## Arquitetura
- **Framework**: Next.js 16.1.1 (App Router)
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS v4, Vanilla CSS
- **UI Toolkit**: Shadcn UI (Radix + Tailwind)
- **Gráficos**: Recharts
- **Ícones**: Lucide React
- **Cropping**: react-easy-crop
- **Formulários**: React Hook Form + Zod
- **Gerenciamento de Estado**: React Hooks, Context API
- **Fontes**: Google Fonts (Urbanist) via `next/font`

## Estrutura de Pastas
```
src/
├── app/                    # Rotas e layouts (App Router)
│   ├── dashboard/          # Painel principal
│   │   ├── customers/      # CRUD de Clientes
│   │   │   ├── [id]/       # Visualizar cliente
│   │   │   │   └── edit/   # Editar cliente
│   │   │   ├── new/        # Novo cliente
│   │   │   └── components/ # Componentes específicos
│   │   ├── design-system/  # Showcase de componentes
│   │   └── kanban/         # Quadro Kanban
│   ├── login/              # Autenticação
│   ├── register/
│   └── forgot-password/
├── components/
│   ├── ui/                 # Componentes base (Shadcn + custom)
│   └── dashboard/          # Componentes do dashboard
├── contexts/               # Contextos React (SearchContext)
├── hooks/                  # Custom hooks (useCustomers)
└── lib/                    # Utilitários
```

## Componentes UI Disponíveis

### Shadcn UI (Base)
- Button, Input, Textarea, Checkbox, Radio Group
- Select, Switch, Slider, Label
- Card, Tabs, Separator, Scroll Area, Sheet
- Navigation Menu, Dropdown Menu, Context Menu
- Badge, Progress, Tooltip, Avatar
- DatePicker, DateRangePicker
- Form (react-hook-form + zod integration)
- **AnimatedLogo** (SVG Animations + Hover support)
- **SplashScreen** (Intro Animation)

### Componentes de Tabela
- **Table** - Tabela base com props:
  - `withSeparator` - Linhas divisórias
  - `withHeaderHighlight` - Destaque no header
  - `actionsFirst` - Posição das ações
- **DataTableToolbar** - Barra de filtros configurável:
  - Busca textual
  - Filtros dinâmicos via prop `filters`
  - Contador de resultados
  - Botão limpar filtros

### Componentes de Cards
- **IconStatCard** - Card com ícone e valor (suporta `size="compact"`)
- **MiniBarChartCard** - Card com gráfico de barras
- **MiniLineChartCard** - Card com gráfico de linhas
- **AreaChartCard** - Card com gráfico de área
- **GaugeCard** - Card com gauge (velocímetro) responsivo
- **DotMatrixCard** - Card com matriz de pontos
- **SparklineCard** - Card com múltiplas linhas

### Componentes Utilitários
- **ConfirmDialog** - Modal de confirmação
- **FileUpload** - Upload com drag-and-drop e image cropping
- **Pagination** - Navegação de páginas
- **ThemeToggle** - Botão de troca de tema (radial transition)

### Landing Page Components
- `BrainPowerSection` - Seção de abas (Agentes/Workflows/Skills)
- `BrainPowerModal` - Modal de detalhes dos recursos

### Layout Components
- `AppSidebar` - Sidebar principal com navegação
- `Header` - Header com busca global integrada
- `SidebarProvider`, `SidebarTrigger` - Controle da sidebar

## Módulos Implementados

### Landing Page Premium
A **Landing Page (v2.0)** foi inteiramente reformulada para servir como showcase principal do projeto.
- **Hero Section**: Design limpo com foco em conversão e Social Proof.
- **Tech Stack**: Ícones com efeitos avançados (Double Glow/Neon).
- [x] Antigravity Section: Bloco dedicado recomendando a IDE, posicionado estrategicamente.
- [x] **Neural Network Arsenal**: Apresentação visual interativa de Agentes, Workflows e Skills (substituindo seção estática de skills).
- [x] **Resource Modals**: Modais detalhados para exploração de cada recurso da IA.
- [x] Showcase Interativo: Mockups de alta fidelidade das telas internas (Dashboard, Kanban, Auth).
- **Theme Toggle**: Suporte completo a Dark/Light mode com persistência.

### Gestão de Clientes (`/dashboard/customers`)
CRUD completo com:
- **Listagem** com tabela, filtros e paginação (10 itens/página)
- **Busca Global** via header (3+ caracteres, LIKE query)
- **Toolbar de Filtros** (Tipo e Status)
- **Visualização** (modo read-only)
- **Criação** em página dedicada
- **Edição** em página dedicada
- **Exclusão** com ConfirmDialog
- **Avatar** com upload e cropping

**Schema do Cliente:**
```typescript
interface Customer {
  id?: string
  name: string
  email: string
  type: "personal" | "business"
  status: "active" | "inactive" | "pending"
  company?: string
  role?: string
  avatar?: string | File
  createdAt?: Date
}
```

### Contextos Globais

#### SearchContext (`/contexts/search-context.tsx`)
Gerencia busca global pelo header:
```typescript
const { searchQuery, setSearchQuery, clearSearch } = useSearch()
```

## Convenções
- Utilização de `globals.css` para temas e variáveis CSS
- Componentes UI baseados em Shadcn (Radix + Tailwind)
- TypeScript em todo o projeto
- Responsividade usando breakpoints do Tailwind
- Suporte a Dark/Light mode via CSS customizado (**Dual Mode System**)
- Formulários com validação via Zod
- Persistência local via `localStorage` (mock)

## Páginas Implementadas
| Rota | Descrição |
|------|-----------|
| `/` | Página inicial com hero e showcase |
| `/dashboard` | Painel com stat cards, gráficos e tabelas |
| `/dashboard/customers` | Listagem de clientes |
| `/dashboard/customers/new` | Novo cliente |
| `/dashboard/customers/[id]` | Visualizar cliente (read-only) |
| `/dashboard/customers/[id]/edit` | Editar cliente |
| `/dashboard/design-system` | Documentação visual dos componentes |
| `/dashboard/kanban` | Quadro Kanban com drag-and-drop |
| `/login` | Login (Split Layout, Hero Image, Animated Logo) |
| `/register` | Registro (Split Layout, Hero Image, Animated Logo) |
| `/forgot-password` | Recuperação de senha (Split Layout, Hero Image) |

## Documentação
- `CONTEXT.md` - Este arquivo (arquitetura e especificações)
- `COMPONENTS.md` - Documentação detalhada dos componentes UI
- `SYSTEM-API.md` - Documentação de APIs e hooks
- `backlogs.md` - Lista de funcionalidades e status
- `SKILLS.md` - Skills disponíveis para o agente AI

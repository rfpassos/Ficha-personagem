# Documentação de Componentes UI

Este documento descreve todos os componentes de interface do usuário disponíveis no projeto.

## Índice

1. [Stat Cards](#stat-cards)
2. [Componentes de Formulário](#componentes-de-formulário)
3. [Componentes de Layout](#componentes-de-layout)
4. [Componentes de Navegação](#componentes-de-navegação)
5. [Componentes de Feedback](#componentes-de-feedback)
6. [Componentes de Dados](#componentes-de-dados)
7. [Landing Page Components](#landing-page-components)
8. [Componentes Utilitários](#componentes-utilitarios)

---

## Stat Cards

Localização: `src/components/ui/stat-cards.tsx`

Componentes para exibição de métricas e estatísticas no Dashboard.

### IconStatCard

Card com ícone e valor estatístico. Suporta dois tamanhos. **Inclui tooltip nativo com valor detalhado.**

```tsx
import { IconStatCard } from "@/components/ui/stat-cards"
import { DollarSign } from "lucide-react"

// Tamanho padrão (largura total)
<IconStatCard
  title="Total Sales"
  value="$1.2M"
  change="+12.5% from last month"
  changeType="positive"  // "positive" | "negative" | "neutral"
  icon={DollarSign}
  iconColor="text-violet-400"
  iconBgColor="bg-violet-400/10"
/>

// Tamanho compacto (ocupa metade da largura)
<IconStatCard
  title="Total Sales"
  value="$1.2M"
  change="+12.5%"
  changeType="positive"
  icon={DollarSign}
  iconColor="text-violet-400"
  iconBgColor="bg-violet-400/10"
  size="compact"
/>
```

**Props:**
| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `title` | `string` | - | Título do card |
| `value` | `string \| number` | - | Valor principal exibido |
| `change` | `string` | - | Texto de variação (opcional) |
| `changeType` | `"positive" \| "negative" \| "neutral"` | `"positive"` | Cor do texto de variação |
| `icon` | `LucideIcon` | - | Ícone do Lucide React |
| `iconColor` | `string` | `"text-primary"` | Classe de cor do ícone |
| `iconBgColor` | `string` | `"bg-primary/10"` | Classe de fundo do ícone |
| `size` | `"default" \| "compact"` | `"default"` | Tamanho do card |

---

### MiniBarChartCard

Card com gráfico de barras mini. Altura fixa de 200px com gráfico preenchendo o espaço. **Tooltip exibe título e valor.**

```tsx
import { MiniBarChartCard } from "@/components/ui/stat-cards"

<MiniBarChartCard
  title="Total Hours"
  value="53h 28m"
  change="+29.1%"
  changeType="positive"
  dateRange="This week"
  data={[65, 45, 75, 50, 70, 55, 80, 60, 85, 95]}
  barColor="bg-primary"
/>
```

**Props:**
| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `title` | `string` | - | Título do card |
| `value` | `string \| number` | - | Valor principal |
| `change` | `string` | - | Texto de variação |
| `changeType` | `"positive" \| "negative"` | `"positive"` | Cor do badge |
| `dateRange` | `string` | - | Período exibido |
| `data` | `number[]` | - | Array de valores para as barras |
| `barColor` | `string` | `"bg-primary"` | Classe de cor das barras |

---

### MiniLineChartCard

Card com gráfico de linhas mini. **Tooltip exibe título e valor.**

```tsx
import { MiniLineChartCard } from "@/components/ui/stat-cards"

<MiniLineChartCard
  title="Performance"
  value="92.4%"
  change="+8.2%"
  changeType="positive"
  dateRange="Last 30 days"
  data={[30, 45, 32, 50, 40, 55, 48, 60, 55, 70, 65, 75]}
  lineColor="stroke-primary"
/>
```

---

### AreaChartCard

Card com gráfico de área preenchida. **Tooltip exibe título e valor.**

```tsx
import { AreaChartCard } from "@/components/ui/stat-cards"

<AreaChartCard
  title="Revenue Trend"
  value="$42.5k"
  change="+12.8%"
  changeType="positive"
  dateRange="This month"
  data={[20, 35, 30, 45, 40, 55, 50, 65, 60, 80]}
  fillColor="fill-primary/20"
  strokeColor="stroke-primary"
/>
```

---

### GaugeCard

Card com gráfico de gauge (velocímetro). Layout responsivo:
- **Desktop (2xl+)**: Horizontal com gauge à direita
- **Mobile/Tablet**: Vertical com gauge centralizado abaixo
- **Tooltip**: Exibe valor e porcentagem ao passar o mouse.

```tsx
import { GaugeCard } from "@/components/ui/stat-cards"

<GaugeCard
  title="Goal Progress"
  subtitle="Monthly Target"
  value="$85,000"
  percentage={78}
  description="22% remaining to reach goal"
/>
```

**Props:**
| Prop | Tipo | Descrição |
|------|------|-----------|
| `title` | `string` | Título principal |
| `subtitle` | `string` | Subtítulo (opcional) |
| `value` | `string \| number` | Valor principal |
| `percentage` | `number` | Porcentagem do gauge (0-100) |
| `description` | `string` | Descrição adicional |

---

### DotMatrixCard

Card com matriz de pontos (heatmap). **Tooltip exibe título e valor.**

```tsx
import { DotMatrixCard } from "@/components/ui/stat-cards"

<DotMatrixCard
  title="Activity"
  value="156 commits"
  data={[[0.2, 0.5, 0.8], [0.3, 0.6, 0.9], [0.4, 0.7, 1.0]]}
/>
```

---

### SparklineCard

Card com múltiplas linhas de tendência. **Tooltip exibe título e valor.**

```tsx
import { SparklineCard } from "@/components/ui/stat-cards"

<SparklineCard
  title="Multi-Trend"
  value="$12,450"
  lines={[
    { data: [10, 20, 15, 25, 30], color: "stroke-blue-500" },
    { data: [25, 15, 20, 10, 15], color: "stroke-green-500" }
  ]}
/>
```

---

## Componentes de Formulário

Componentes baseados no Shadcn UI para construção de formulários.

### Button

```tsx
import { Button } from "@/components/ui/button"

<Button variant="default">Clique aqui</Button>
<Button variant="destructive">Deletar</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>
```

**Variantes:** `default`, `destructive`, `outline`, `secondary`, `ghost`, `link`

**Tamanhos:** `default`, `sm`, `lg`, `icon`

---

### Input

```tsx
import { Input } from "@/components/ui/input"

<Input type="text" placeholder="Digite aqui..." />
<Input type="email" placeholder="email@exemplo.com" />
<Input type="password" placeholder="Senha" />
```

---

### Textarea

```tsx
import { Textarea } from "@/components/ui/textarea"

<Textarea placeholder="Digite sua mensagem..." />
```

---

### Checkbox

```tsx
import { Checkbox } from "@/components/ui/checkbox"

<Checkbox id="terms" />
<label htmlFor="terms">Aceito os termos</label>
```

---

### Radio Group

```tsx
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

<RadioGroup defaultValue="option-1">
  <RadioGroupItem value="option-1" id="option-1" />
  <label htmlFor="option-1">Opção 1</label>
  <RadioGroupItem value="option-2" id="option-2" />
  <label htmlFor="option-2">Opção 2</label>
</RadioGroup>
```

---

### Select

```tsx
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

<Select>
  <SelectTrigger>
    <SelectValue placeholder="Selecione..." />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Opção 1</SelectItem>
    <SelectItem value="option2">Opção 2</SelectItem>
  </SelectContent>
</Select>
```

---

### Switch

```tsx
import { Switch } from "@/components/ui/switch"

<Switch id="dark-mode" />
<label htmlFor="dark-mode">Dark Mode</label>
```

---

### Slider

```tsx
import { Slider } from "@/components/ui/slider"

<Slider defaultValue={[50]} max={100} step={1} />
```

---

### Label

```tsx
import { Label } from "@/components/ui/label"

<Label htmlFor="email">Email</Label>
<Input id="email" type="email" />
```

---

## Componentes de Layout

### Card

```tsx
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

<Card>
  <CardHeader>
    <CardTitle>Título do Card</CardTitle>
    <CardDescription>Descrição do card</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Conteúdo do card</p>
  </CardContent>
  <CardFooter>
    <Button>Ação</Button>
  </CardFooter>
</Card>
```

---

### Tabs

```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Conteúdo da Tab 1</TabsContent>
  <TabsContent value="tab2">Conteúdo da Tab 2</TabsContent>
</Tabs>
```

---

### Separator

```tsx
import { Separator } from "@/components/ui/separator"

<Separator />
<Separator orientation="vertical" />
```

---

### Scroll Area

```tsx
import { ScrollArea } from "@/components/ui/scroll-area"

<ScrollArea className="h-72 w-48">
  {/* Conteúdo longo */}
</ScrollArea>
```

---

### Sheet (Sidebar/Modal lateral)

```tsx
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

<Sheet>
  <SheetTrigger>Abrir</SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Título</SheetTitle>
      <SheetDescription>Descrição</SheetDescription>
    </SheetHeader>
    {/* Conteúdo */}
  </SheetContent>
</Sheet>
```

---

## Componentes de Navegação

### Navigation Menu

```tsx
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu"

<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Item 1</NavigationMenuTrigger>
      <NavigationMenuContent>
        {/* Links */}
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>
```

---

### Dropdown Menu

```tsx
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

<DropdownMenu>
  <DropdownMenuTrigger>Abrir</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Perfil</DropdownMenuItem>
    <DropdownMenuItem>Configurações</DropdownMenuItem>
    <DropdownMenuItem>Sair</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

---

### Context Menu

```tsx
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu"

<ContextMenu>
  <ContextMenuTrigger>Clique com botão direito</ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>Copiar</ContextMenuItem>
    <ContextMenuItem>Colar</ContextMenuItem>
    <ContextMenuItem>Deletar</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>
```

---

## Componentes de Feedback

### Badge

```tsx
import { Badge } from "@/components/ui/badge"

<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Destructive</Badge>
<Badge variant="outline">Outline</Badge>
```

---

### Progress

```tsx
import { Progress } from "@/components/ui/progress"

<Progress value={33} />
```

---

### Tooltip

```tsx
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger>Passe o mouse</TooltipTrigger>
    <TooltipContent>
      <p>Conteúdo do tooltip</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
```

---

### Avatar

```tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

<Avatar>
  <AvatarImage src="https://github.com/user.png" alt="@user" />
  <AvatarFallback>US</AvatarFallback>
</Avatar>
```

---

## Componentes de Dados

### Table

Componente de tabela flexível com opções de estilo configuráveis.

```tsx
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Tabela básica (sem separadores, sem destaque no header)
<Table>
  <TableCaption>Lista de usuários</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Nome</TableHead>
      <TableHead>Email</TableHead>
      <TableHead>Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>João Silva</TableCell>
      <TableCell>joao@email.com</TableCell>
      <TableCell>Ativo</TableCell>
    </TableRow>
  </TableBody>
</Table>

// Tabela com separadores de linha
<Table withSeparator>
  <TableHeader>
    <TableRow>
      <TableHead>Nome</TableHead>
      <TableHead>Email</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>João Silva</TableCell>
      <TableCell>joao@email.com</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>Maria Santos</TableCell>
      <TableCell>maria@email.com</TableCell>
    </TableRow>
  </TableBody>
</Table>

// Tabela com header destacado
<Table withHeaderHighlight>
  {/* ... */}
</Table>

// Tabela completa com ações no início
<Table withSeparator withHeaderHighlight actionsFirst>
  <TableHeader>
    <TableRow>
      <TableHead>Nome</TableHead>
      <TableHead>Email</TableHead>
      <TableHead isAction>Ações</TableHead> {/* isAction marca coluna para reordenação */}
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>João Silva</TableCell>
      <TableCell>joao@email.com</TableCell>
      <TableCell isAction>
        <Button size="icon">...</Button>
      </TableCell>
    </TableRow>
  </TableBody>
</Table>
```

**Props:**
| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `withSeparator` | `boolean` | `false` | Habilita separadores de linha sutis entre as rows |
| `withHeaderHighlight` | `boolean` | `false` | Destaca o header com background e texto mais forte |
| `actionsFirst` | `boolean` | `false` | Posiciona visualmente a coluna de ações no início da linha (requer `isAction`) |

**Props de Subcomponentes:**

**TableHead / TableCell:**
| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `isAction` | `boolean` | `false` | Marca a célula como coluna de ação. Necessário para `actionsFirst` funcionar corretamente (define largura fixa e ordem). |

---


### Chart

Componentes de gráficos baseados no Recharts.

```tsx
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart"

<ChartContainer config={chartConfig}>
  {/* Gráficos Recharts */}
</ChartContainer>
```

---

## Ícones Pré-definidos para Stat Cards

```tsx
import { StatCardIcons } from "@/components/ui/stat-cards"

// Ícones disponíveis:
StatCardIcons.sales      // DollarSign
StatCardIcons.orders     // ShoppingBag
StatCardIcons.customers  // Users
StatCardIcons.products   // Package
StatCardIcons.activity   // Zap
StatCardIcons.trendUp    // TrendingUp
StatCardIcons.trendDown  // TrendingDown
```

---

## Exemplos de Layout do Dashboard

### Grid de 8 colunas com cards compactos e padrão

```tsx
<div className="grid gap-3 grid-cols-2 md:grid-cols-4 lg:grid-cols-8">
  {/* 6 cards compactos (1 coluna cada) */}
  <IconStatCard size="compact" {...props} />
  <IconStatCard size="compact" {...props} />
  <IconStatCard size="compact" {...props} />
  <IconStatCard size="compact" {...props} />
  <IconStatCard size="compact" {...props} />
  <IconStatCard size="compact" {...props} />
  
  {/* 1 card padrão ocupando 2 colunas */}
  <div className="col-span-2">
    <IconStatCard {...props} />
  </div>
</div>
```

### Grid de 4 colunas com cards de gráfico

```tsx
<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
  <MiniBarChartCard {...props} />
  <MiniLineChartCard {...props} />
  <AreaChartCard {...props} />
  <GaugeCard {...props} />
</div>
```

---

## Novos Componentes

### Toast Notifications (Sonner)

Notificações temporárias para feedback do usuário.

```tsx
import { toast } from "sonner"

// Tipos de toast
toast.success("Operação concluída com sucesso!")
toast.error("Erro ao processar a solicitação")
toast.warning("Atenção: verifique os dados")
toast.info("Dica: você pode arrastar para fechar")

// Toast com promise
toast.promise(
  fetchData(),
  {
    loading: "Carregando...",
    success: "Dados carregados!",
    error: "Erro ao carregar"
  }
)

// Toast com ação
toast("Arquivo deletado", {
  action: {
    label: "Desfazer",
    onClick: () => restoreFile()
  }
})
```

> **Nota**: O `<Toaster />` já está configurado no `layout.tsx`.

---

### ThemeToggle

Botão para alternar entre temas claro e escuro com animação suave.

```tsx
import { ThemeToggle } from "@/components/theme-toggle"

<ThemeToggle />
```

---

## Landing Page Components

Componentes especializados criados para a Landing Page (v2.0), mas reutilizáveis.

### BrainPowerSection

Seção principal "Neural Network Arsenal". Exibe 3 abas (Agentes, Workflows, Skills) com listas animadas e interativas.

```tsx
import { BrainPowerSection } from "@/components/landing/brain-power-section"

<BrainPowerSection />
```

### BrainPowerModal

Modal dialog que exibe a lista completa de recursos de uma categoria específica, com busca e filtragem.

```tsx
import { BrainPowerModal } from "@/components/landing/brain-power-modal"
import { Bot } from "lucide-react"
import { Button } from "@/components/ui/button"

<BrainPowerModal
  type="agents" // "agents" | "workflows" | "skills"
  trigger={
    <Button>
       Ver Agentes <Bot className="ml-2" />
    </Button>
  }
/>
```

**Props:**
| Prop | Tipo | Descrição |
|------|------|-----------|
| `type` | `"agents" \| "workflows" \| "skills"` | Define qual conjunto de dados será carregado no modal. |
| `trigger` | `ReactNode` | Elemento (botão/link) que abrirá o modal ao ser clicado. |

---

### ConfirmDialog

Modal de confirmação com variantes visuais.

```tsx
import { ConfirmDialog } from "@/components/ui/confirm-dialog"

// Variante default
<ConfirmDialog
  trigger={<Button>Confirmar</Button>}
  title="Confirmar ação"
  description="Você tem certeza que deseja continuar?"
  onConfirm={() => { /* ação */ }}
/>

// Variante destructive (para deletar)
<ConfirmDialog
  trigger={<Button variant="destructive">Deletar</Button>}
  title="Deletar permanentemente?"
  description="Esta ação não pode ser desfeita."
  variant="destructive"
  confirmText="Sim, deletar"
  onConfirm={() => { /* deletar */ }}
/>

// Variante warning
<ConfirmDialog
  trigger={<Button variant="outline">Aviso</Button>}
  title="Atenção!"
  description="Esta ação pode ter consequências."
  variant="warning"
  confirmText="Prosseguir"
  onConfirm={() => { /* ação */ }}
/>
```

**Props:**
| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `trigger` | `ReactNode` | - | Elemento que abre o dialog |
| `title` | `string` | - | Título do dialog |
| `description` | `string` | - | Descrição/mensagem |
| `variant` | `"default" \| "destructive" \| "warning" \| "success"` | `"default"` | Estilo visual |
| `confirmText` | `string` | `"Confirmar"` | Texto do botão de confirmação |
| `cancelText` | `string` | `"Cancelar"` | Texto do botão de cancelar |
| `onConfirm` | `() => void \| Promise<void>` | - | Callback ao confirmar |
| `onCancel` | `() => void` | - | Callback ao cancelar |
| `loading` | `boolean` | `false` | Estado de carregamento |

---

### DatePicker

Seletor de data aprimorado com suporte a digitação manual, navegação por dropdown de ano/mês e localização pt-BR.

```tsx
import { DatePicker, DateRangePicker } from "@/components/ui/date-picker"

// Data única
<DatePicker
  placeholder="dd/mm/aaaa"
  onDateChange={(date) => console.log(date)}
/>

// Com data inicial e limites de ano
<DatePicker
  date={new Date()}
  fromDate={new Date(1950, 0, 1)}
  toDate={new Date(2050, 11, 31)}
  onDateChange={(date) => console.log(date)}
/>

// Período de datas
<DateRangePicker
  placeholderFrom="Início"
  placeholderTo="Fim"
  onDateRangeChange={(range) => console.log(range.from, range.to)}
/>
```

**Funcionalidades:**
- **Digitação Livre:** Permite digitar a data diretamente no input (ex: `15/05/2024`) com máscara automática.
- **Navegação Rápida:** Dropdowns para seleção direta de Mês e Ano no cabeçalho do calendário.
- **Sincronização:** Ao digitar uma data válida, o calendário navega automaticamente para o período correspondente.
- **Limpeza:** Botão "X" para limpar a seleção rapidamente.

**Props DatePicker:**
| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `date` | `Date` | - | Data selecionada |
| `onDateChange` | `(date: Date \| undefined) => void` | - | Callback ao selecionar/limpar |
| `placeholder` | `string` | `"dd/mm/aaaa"` | Placeholder do input |
| `disabled` | `boolean` | `false` | Desabilitar interação |
| `fromDate` | `Date` | `1900-01-01` | Data mínima para navegação |
| `toDate` | `Date` | `2100-12-31` | Data máxima para navegação |
| `className` | `string` | - | Classes adicionais |

**Props DateRangePicker:**
| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `dateRange` | `{ from: Date?, to: Date? }` | - | Objeto com datas inicial e final |
| `onDateRangeChange` | `(range: {from, to}) => void` | - | Callback ao alterar período |
| `placeholderFrom` | `string` | `"dd/mm/aaaa"` | Placeholder do input inicial |
| `placeholderTo` | `string` | `"dd/mm/aaaa"` | Placeholder do input final |
| `disabled` | `boolean` | `false` | Desabilitar interação |

---

### FileUpload

Upload de arquivos com drag-and-drop e preview.

```tsx
import { FileUpload } from "@/components/ui/file-upload"

// Básico
<FileUpload
  onFilesChange={(files) => console.log(files)}
/>

// Com validações
<FileUpload
  accept="image/*,.pdf,.doc,.docx"
  maxSize={5}        // 5MB
  maxFiles={3}       // Máximo 3 arquivos
  onFilesChange={(files) => handleUpload(files)}
/>

// Com cropping ativado (apenas imagens)
<FileUpload
  crop
  cropAspectRatio={1} // 1:1, ou undefined para livre
  cropLabel="Foto de Perfil"
/>
```

**Props:**
| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `onFilesChange` | `(files: File[]) => void` | - | Callback com arquivos selecionados |
| `accept` | `string` | `"*"` | Tipos de arquivo aceitos |
| `multiple` | `boolean` | `true` | Permitir múltiplos arquivos |
| `maxSize` | `number` | `10` | Tamanho máximo em MB |
| `maxFiles` | `number` | `5` | Quantidade máxima de arquivos |
| `disabled` | `boolean` | `false` | Desabilitar upload |
| `showPreview` | `boolean` | `true` | Mostrar preview dos arquivos |
| `crop` | `boolean` | `false` | Habilita editor de corte para imagens |
| `cropAspectRatio` | `number` | `undefined` | Proporção fixa de corte (ex: 1). Se omitido, corte livre |
| `cropLabel` | `string` | - | Texto de ajuda no modal de corte |

**Features:**
- Drag and drop
- Preview de imagens
- **Image Cropping**: Editor integrado com zoom e ajuste de corte
- **Ícones Estendidos**: Suporte visual rico para PDF, Planilhas, Código, Texto, Compactados, etc.
- Barra de progresso
- Validação de tamanho e quantidade
- Remoção de arquivos

---

### Skeleton

Componente para estados de carregamento (placeholders).

```tsx
import { Skeleton } from "@/components/ui/skeleton"

<Skeleton className="h-[20px] w-[100px] rounded-full" />
<Skeleton className="h-4 w-[250px]" />
```

**Features:**
- Animação de pulso suave.
- Adapta-se automaticamente ao tema (dark/light mode).
- Aceita todas as classes do Tailwind (`className`).

---

### Pagination

Componente de paginação acessível e modular.

```tsx
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" isActive>
        2
      </PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>
```

**Sub-componentes:**
- `Pagination`: Wrapper principal (`nav`).
- `PaginationContent`: Wrapper de lista (`ul`).
- `PaginationItem`: Item de lista (`li`).
- `PaginationLink`: Link de página ou ação (baseado em botão).
- `PaginationPrevious` / `PaginationNext`: Botões de navegação pré-configurados.
- `PaginationEllipsis`: Indicador de supressão (`...`).

---

### KanbanBoard

Componente de gerenciamento de tarefas visual (Kanban) com funcionalidade drag-and-drop powered by `@dnd-kit`.

```tsx
import { KanbanBoard } from "@/components/ui/kanban-board"

<KanbanBoard />
```

**Features:**
- **Drag and Drop**: Mover cards entre colunas e reordená-los.
- **Colunas Droppable**: Áreas de soltura visualmente responsivas.
- **Cards Sortable**: Reordenação suave.
- **Ações**: Botão de adicionar tarefa em cada coluna (configurável via `page.tsx`).
- **SSR Safe**: Lógica de hidratação implementada para evitar erros com IDs gerados no servidor.

---

### DataTableToolbar

Barra de ferramentas configurável para tabelas com busca e filtros dinâmicos.

Localização: `src/components/ui/data-table-toolbar.tsx`

```tsx
import { DataTableToolbar } from "@/components/ui/data-table-toolbar"

<DataTableToolbar
  searchPlaceholder="Buscar clientes..."
  onSearch={(value) => console.log(value)}
  filters={[
    {
      key: "type",
      label: "Tipo",
      options: [
        { value: "all", label: "Todos os Tipos" },
        { value: "personal", label: "Pessoa Física" },
        { value: "business", label: "Empresa" },
      ],
    },
    {
      key: "status",
      label: "Status",
      options: [
        { value: "all", label: "Todos os Status" },
        { value: "active", label: "Ativo" },
        { value: "inactive", label: "Inativo" },
      ],
    },
  ]}
  filterValues={{ type: "all", status: "all" }}
  onFilterChange={(key, value) => setFilters({ ...filters, [key]: value })}
  onClearFilters={() => setFilters({ type: "all", status: "all" })}
  resultCount={42}
/>
```

**Props:**
| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `searchPlaceholder` | `string` | `"Buscar..."` | Placeholder do input |
| `onSearch` | `(value: string) => void` | - | Callback de busca |
| `filters` | `FilterConfig[]` | `[]` | Configuração dos filtros |
| `filterValues` | `Record<string, string>` | `{}` | Valores atuais dos filtros |
| `onFilterChange` | `(key, value) => void` | - | Callback de mudança |
| `onClearFilters` | `() => void` | - | Callback de limpar |
| `resultCount` | `number` | - | Contador de resultados |
| `showSearch` | `boolean` | `true` | Mostrar/ocultar busca |
| `rightContent` | `ReactNode` | - | Conteúdo à direita |

**FilterConfig:**
```typescript
interface FilterConfig {
  key: string
  label: string
  placeholder?: string
  options: { value: string; label: string }[]
}
```

---

### CustomerForm

Formulário reutilizável para CRUD de clientes com suporte a modo read-only.

Localização: `src/app/dashboard/customers/components/customer-form.tsx`

```tsx
import { CustomerForm } from "./components/customer-form"

// Modo Criação
<CustomerForm 
  onSubmit={(data) => createCustomer(data)} 
  isLoading={false} 
/>

// Modo Edição
<CustomerForm 
  initialData={customer} 
  onSubmit={(data) => updateCustomer(id, data)} 
  isLoading={false} 
/>

// Modo Visualização (Read-Only)
<CustomerForm 
  initialData={customer} 
  readOnly 
/>
```

**Props:**
| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `initialData` | `Customer` | - | Dados para edição/visualização |
| `onSubmit` | `(data: Customer) => void` | - | Callback de submit |
| `isLoading` | `boolean` | `false` | Estado de carregamento |
| `readOnly` | `boolean` | `false` | Desabilita edição |

**Features:**
- Validação com Zod
- Upload de avatar com cropping
- Campos condicionais (Empresa/Cargo para tipo "business")
- Modo read-only oculta botões e desabilita campos

---

## Componentes Utilitários

### EmptyState

Componente para exibir estados vazios com ícone, título, descrição e ação opcional.

```tsx
import { EmptyState } from "@/components/ui/empty-state"
import { FolderX } from "lucide-react"

<EmptyState
  icon={FolderX}
  title="Nenhum item"
  description="Adicione um novo item para começar."
  action={{
    label: "Criar Novo",
    onClick: () => console.log('Action')
  }}
/>
```

**Props:**
| Prop | Tipo | Descrição |
|------|------|-----------|
| `icon` | `LucideIcon` | Ícone opcional. |
| `title` | `string` | Título principal. |
| `description` | `string` | Texto de apoio. |
| `action` | `{ label, onClick?, href? }` | Botão de ação opcional. |

| `action` | `{ label, onClick?, href? }` | Botão de ação opcional. |

### AnimatedLogo

Logo animado SVG com suporte a animação automática e hover.

```tsx
import { AnimatedLogo } from "@/components/layout/animated-logo"

<AnimatedLogo 
  className="w-16 h-16" 
  enableHover={true} // Opcional: anima apenas no hover
/>
```

**Props:**
| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `className` | `string` | `"w-16 h-16"` | Classes CSS para tamanho/estilo |
| `enableHover` | `boolean` | `false` | Se `true`, anima no hover. Se `false`, auto-play. |

### SplashScreen

Tela de introdução com animação sequencial do logo.

```tsx
import { SplashScreen } from "@/components/ui/splash-screen"

// Integrado no RootLayout
<SplashScreen />
```

**Features:**
- Animação SVG coordenada com Framer Motion
- Logo da agência com arco superior e 7 pontos inferiores
- Duração de 3s antes de desmontar

### CustomerStats

Componente de estatísticas para o topo da lista de clientes.

```tsx
<CustomerStats 
  total={100} 
  active={80} 
  business={20} 
  newThisMonth={5} 
/>
```

### CustomerTableSkeleton

Estado de carregamento visual para a tabela de clientes.

```tsx
<CustomerTableSkeleton />
```

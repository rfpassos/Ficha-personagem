---
name: designing-interfaces
description: Enforces precise, minimal design principles inspired by Linear, Notion, and Stripe. Use when building dashboards, admin interfaces, or any UI that needs clean, modern, minimalist design. Every pixel matters.
---

# Design Principles

Skill para design de interfaces enterprise/SaaS com precisão e craft.

## Quando usar esta skill

- Construir dashboards e admin interfaces
- Definir design direction de um projeto
- Criar interfaces minimalistas e polidas
- Revisar qualidade visual de componentes

## Workflow

```markdown
## Checklist de Design

- [ ] Definir design direction (personalidade)
- [ ] Escolher foundation de cores
- [ ] Definir abordagem de layout
- [ ] Escolher tipografia
- [ ] Aplicar princípios de craft
```

---

## Design Direction (Obrigatório)

Antes de escrever código, comprometa-se com uma direção:

### Personalidades Disponíveis

| Direção | Descrição | Referências |
|---------|-----------|-------------|
| **Precision & Density** | Espaçamento apertado, monocromático, informação-forward | Linear, Raycast |
| **Warmth & Approachability** | Espaçamento generoso, sombras suaves, cores amigáveis | Notion, Coda |
| **Sophistication & Trust** | Tons frios, profundidade em camadas, gravitas financeiro | Stripe, Mercury |
| **Boldness & Clarity** | Alto contraste, espaço negativo dramático, tipografia confiante | Vercel |
| **Utility & Function** | Paleta muted, densidade funcional, hierarquia clara | GitHub |
| **Data & Analysis** | Otimizado para charts, técnico mas acessível | Analytics tools |

### Foundations de Cor

- **Warm** (creams, warm grays) — approachable, comfortable
- **Cool** (slate, blue-gray) — professional, trustworthy
- **Pure** (true grays, black/white) — minimal, technical
- **Tinted** (slight color cast) — distinctive, branded

---

## Princípios Core de Craft

### Grid de 4px
```
4px   - micro (icon gaps)
8px   - tight (within components)
12px  - standard (between related)
16px  - comfortable (section padding)
24px  - generous (between sections)
32px  - major separation
```

### Padding Simétrico
TLBR deve ser igual. Exceção: quando horizontal precisa de mais espaço.

```css
/* Correto */
padding: 16px;
padding: 12px 16px;

/* Incorreto */
padding: 24px 16px 12px 16px;
```

### Border Radius Consistente
Escolha um sistema e mantenha:
- Sharp: 4px, 6px, 8px
- Soft: 8px, 12px
- Minimal: 2px, 4px, 6px

### Estratégia de Profundidade

**Escolha UMA abordagem:**

1. **Borders-only** — Clean, técnico. Linear, Raycast.
2. **Single shadow** — Lift suave. `0 1px 3px rgba(0,0,0,0.08)`
3. **Layered shadows** — Premium, dimensional. Stripe, Mercury.
4. **Surface color shifts** — Hierarquia via background.

```css
/* Borders-only */
border: 0.5px solid rgba(0, 0, 0, 0.08);

/* Single shadow */
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);

/* Layered shadows */
box-shadow:
  0 0 0 0.5px rgba(0, 0, 0, 0.05),
  0 1px 2px rgba(0, 0, 0, 0.04),
  0 2px 4px rgba(0, 0, 0, 0.03),
  0 4px 8px rgba(0, 0, 0, 0.02);
```

### Hierarquia de Tipografia

| Uso | Weight | Letter-spacing |
|-----|--------|----------------|
| Headlines | 600 | -0.02em |
| Body | 400-500 | normal |
| Labels | 500 | +tracking para uppercase |

**Escala:** 11px, 12px, 13px, 14px (base), 16px, 18px, 24px, 32px

### Monospace para Dados
Números, IDs, códigos, timestamps em monospace. Use `tabular-nums`.

### Animação
- Micro-interactions: 150ms
- Transitions: 200-250ms
- Easing: `cubic-bezier(0.25, 1, 0.5, 1)`
- **Nunca** spring/bouncy em enterprise UI

---

## Anti-Patterns

### Nunca

- Drop shadows dramáticos (`box-shadow: 0 25px 50px...`)
- Border radius grande (16px+) em elementos pequenos
- Padding assimétrico sem razão clara
- Cards branco puro em backgrounds coloridos
- Borders grossas (2px+) decorativas
- Múltiplas cores de accent na mesma interface

### Sempre Questionar

- "Pensei no que este produto precisa ou usei o default?"
- "Este elemento parece crafted?"
- "Minha estratégia de depth é consistente?"
- "Todos elementos estão no grid?"

---

## Dark Mode

- **Borders sobre shadows** — Shadows menos visíveis em dark
- **Ajustar cores semânticas** — Desaturar status colors
- **Mesma estrutura, valores diferentes** — Inverter hierarquia

---

## O Padrão

Cada interface deve parecer desenhada por um time que obsessiona sobre diferenças de 1 pixel. Não stripped — *crafted*.

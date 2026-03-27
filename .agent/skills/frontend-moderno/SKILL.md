---
name: frontend-moderno
description: Modern UI patterns, design system best practices, animations and polished interfaces for Next.js + React + Tailwind v4 + shadcn/ui + Framer Motion
---

# frontend-moderno

Instructions for creating modern, friendly, and visually appealing interfaces with personality — avoiding the "boring market standard" look.

## When to use

- Creating new UI components from scratch
- Designing interactive interfaces with smooth animations
- Building or extending a design system
- Customizing shadcn/ui components beyond defaults
- Adding visual polish to existing features

## Instructions

### 1. Design Principles

**Personality over sameness** — aim for interfaces that feel hand-crafted, not AI-generated. Consider:
- Unconventional color palettes (not just blue/gray)
- Micro-interactions that delight users
- Thoughtful typography pairings
- Playful but professional tone

### 2. Tailwind v4 Usage

This project uses Tailwind CSS v4 with CSS-based configuration. Use CSS variables for design tokens:

```css
/* app/globals.css */
@theme {
  --color-primary: oklch(70% 0.15 250);
  --color-background: oklch(98% 0.02 240);
  --radius-lg: 1rem;
  --animate-fade-in: fade-in 0.5s ease-out;
}
```

**Avoid** hardcoded values. Always reference CSS variables or theme tokens.

### 3. shadcn/ui Customization

The project uses Radix UI primitives via shadcn/ui. To customize:
- Override component styles in `components/ui/` using CSS variables
- Use `--accent` and `--muted-foreground` tokens for theming
- Extend components rather than forking when possible

### 4. Framer Motion Patterns

For smooth, polished animations:

```tsx
// Simple entrance animation
<motion.div 
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3, ease: "easeOut" }}
>

// Staggered children
<motion.div variants={staggerContainer}>
  <motion.div variants={fadeInUp}>Child 1</motion.div>
  <motion.div variants={fadeInUp}>Child 2</motion.div>
</motion.div>
```

**Common patterns:**
- `staggerContainer` = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }
- `fadeInUp` = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }
- `scaleIn` = { hidden: { scale: 0.95 }, show: { scale: 1 } }

### 5. Component Guidelines

**Cards & Surfaces:**
- Use subtle borders, not shadows, for depth
- Add hover states with scale or border color changes
- Consider rounded corners (1rem+) for friendly feel

**Buttons:**
- Prefer soft shadows over hard shadows
- Add scale transform on hover (scale: 1.02)
- Use subtle gradient backgrounds sparingly

**Inputs:**
- Use distinct focus states (ring or border color)
- Add floating labels or clear placeholders
- Consider subtle animations on focus

### 6. Accessibility First

- All interactive elements must be keyboard accessible
- Use proper ARIA labels on icon-only buttons
- Ensure color contrast meets WCAG AA
- Motion preferences respected (prefers-reduced-motion)

### 7. Implementation Checklist

When building a new component:
- [ ] Uses CSS variables from theme (no hardcoded colors)
- [ ] Has smooth hover/focus states
- [ ] Is keyboard accessible
- [ ] Respects reduced motion preference
- [ ] Fits the project's visual language
- [ ] Works on mobile (responsive)
- [ ] Has loading/error states if async

## Resources

- Tailwind v4: https://tailwindcss.com/docs/upgrade-guide
- shadcn/ui: https://ui.shadcn.com
- Framer Motion: https://www.framer.com/motion
- Radix UI: https://radix-ui.com

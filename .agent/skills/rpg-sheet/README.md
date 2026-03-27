# rpg-sheet

Skill para criar componentes e templates de fichas de RPG suportando múltiplos sistemas: D&D 5e, T20, Daggerheart, Ordem Paranormal, Skyfall, Star Trek.

## Uso

Ative esta skill quando:
- Criar novos componentes de ficha de personagem
- Criar templates HTML multi-página
- Implementar mecânicas específicas de jogos
- Construir editores de fichas multi-sistema
- Adicionar novos sistemas de jogo

## Estrutura

```
rpg-sheet/
├── SKILL.md   # Instruções completas
└── README.md  # Este arquivo
```

## Sistemas Suportados

| Sistema | Atributos | Recursos Únicos |
|---------|-----------|-----------------|
| D&D 5e | STR, DEX, CON, INT, WIS, CHA | Spellcasting, Hit Dice, Spell Slots |
| T20 | FOR, DES, CON, INT, SAB, CAR | Mana, Deidade |
| DH | Agility, Strength, Finesse, Instinct, Knowledge, Presence | Domains, Stress, Hope/Fear |
| OP | Agility, Strength, Intellect, Presence, Vigor | NEX, Sanity, Effort |
| Skyfall | Vigor, Instinct, Presence, Mind | Breath, Soul Points, Tragic Pillars |
| ST | Control, Daring, Fitness, Insight, Presence, Reason | Disciplines, Stress |

## Estrutura Multi-Página

| Página | Propósito |
|--------|-----------|
| 1 - Hero | Stats principais (HP, CA, atributos, saving throws) |
| 2 - Biography | Backstory, personalidade, metas |
| 3 - Technical | Perícias, aparências, idiomas |
| 4+ - Spellbook | Magias e habilidades |
| Final - Equipment | Equipamento, armas, ouro |

## Regras de Paginação

**IMPORTANTE: O conteúdo NUNCA pode ser cortado. Deve fluir para a próxima página.**

- Usar `min-height` ao invés de altura fixa
- Aplicar `page-break-inside: avoid` em blocks de conteúdo
- Testar com conteúdo máximo

## Modelos

- Template D&D 5e: `assets/templates/dnd-landscape-hero.html`
- Modelo T20: `assets/sheets/Modelo-T20.json`
- Modelo DH: `assets/sheets/Modelo-DH.json`
- Modelo OP: `assets/sheets/Modelo-OP.json`
- Modelo Skyfall: `assets/sheets/Modelo-Skyfall.json`
- Modelo ST: `assets/sheets/Modelo-ST.json`

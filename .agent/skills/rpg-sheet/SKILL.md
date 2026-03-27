---
name: rpg-sheet
description: Create and manage RPG character sheet components and templates supporting multiple game systems (D&D 5e, T20, Daggerheart, Ordem Paranormal, Skyfall, Star Trek)
---

# rpg-sheet

Instructions for building RPG character sheet interfaces and HTML templates supporting multiple game systems.

## When to use

- Creating new character sheet components or HTML templates
- Implementing game-specific mechanics
- Building multi-system character sheet editors
- Adding new game systems to the application

## Supported Game Systems

| System | Attributes | Unique Resources |
|--------|------------|------------------|
| D&D 5e | STR, DEX, CON, INT, WIS, CHA | Spellcasting, Hit Dice, Spell Slots |
| T20 (Tormenta 20) | FOR, DES, CON, INT, SAB, CAR | Mana Points, Deity |
| DH (Daggerheart) | Agility, Strength, Finesse, Instinct, Knowledge, Presence | Domains, Stress, Hope/Fear |
| OP (Ordem Paranormal) | Agility, Strength, Intellect, Presence, Vigor | NEX, Sanity, Effort |
| Skyfall | Vigor, Instinct, Presence, Mind | Breath, Soul Points, Tragic Pillars |
| ST (Star Trek) | Control, Daring, Fitness, Insight, Presence, Reason | Disciplines, Stress |

## Instructions

### 1. Data Model Structure

Follow the existing model files in `assets/sheets/`:
- Use `metadata.system` to identify the game system
- Store templates as JSON with `{{PLACEHOLDER}}` syntax
- Include `metadata.template_title` for display
- Use `metadata.schema_version` for versioning

### 2. D&D 5e Specific Data Model

For D&D 5e templates, use this expanded structure:

```json
{
  "character_name": "{{CHARACTER_NAME}}",
  "race": "{{RACE}}",
  "class": "{{CLASS}}",
  "subclass": "{{SUBCLASS}}",
  "level": "{{LEVEL}}",
  "background": "{{BACKGROUND}}",
  "alignment": "{{ALIGNMENT}}",
  "health_and_defense": {
    "hp_current": "{{HP_CURRENT}}",
    "hp_max": "{{HP_MAX}}",
    "temp_hp": "{{TEMP_HP}}",
    "hit_dice": "{{HIT_DICE}}",
    "hit_dice_total": "{{HIT_DICE_TOTAL}}"
  },
  "armor_class": "{{ARMOR_CLASS}}",
  "initiative": "{{INITIATIVE}}",
  "speed": "{{SPEED}}",
  "attributes": {
    "strength": { "value": 14, "modifier": 2 },
    "dexterity": { "value": 12, "modifier": 1 },
    "constitution": { "value": 16, "modifier": 3 },
    "intelligence": { "value": 8, "modifier": -1 },
    "wisdom": { "value": 10, "modifier": 0 },
    "charisma": { "value": 14, "modifier": 2 }
  },
  "saving_throws": [
    { "name": "Strength", "modifier": "+5", "proficient": true },
    { "name": "Dexterity", "modifier": "+1", "proficient": false },
    { "name": "Constitution", "modifier": "+6", "proficient": true },
    { "name": "Intelligence", "modifier": "-1", "proficient": false },
    { "name": "Wisdom", "modifier": "+2", "proficient": false },
    { "name": "Charisma", "modifier": "+2", "proficient": false }
  ],
  "passive_checks": {
    "perception": 12,
    "investigation": 9,
    "insight": 10
  },
  "proficiencies": {
    "skill_proficiencies": [
      { "name": "Acrobatics", "modifier": "+5", "proficient": true },
      { "name": "Athletics", "modifier": "+5", "proficient": true }
    ],
    "tools_and_languages": ["Thieves' Tools", "Common", "Dwarvish"],
    "weapon_proficiencies": "Simple Weapons, Martial Weapons",
    "armor_proficiencies": "Light Armor, Medium Armor, Shields"
  },
  "spellcasting": {
    "spellcasting_ability": "INT",
    "spell_save_dc": 14,
    "spell_attack_bonus": "+6",
    "cantrips": ["Fire Bolt", "Mage Hand"],
    "spell_slots": "4x Lv1, 3x Lv2, 2x Lv3, 1x Lv4"
  },
  "attacks": [
    { "name": "Longsword", "attack_bonus": "+5", "damage_and_type": "1d8+2 Slashing" }
  ],
  "equipment": {
    "armor": ["Leather Armor"],
    "weapons": ["Longsword", "Longbow"],
    "magic_items": ["Ring of Protection"],
    "general_equipment": ["Backpack", "Rope", "Torch"],
    "money": { "copper": 0, "silver": 10, "electrum": 0, "gold": 25, "platinum": 0 }
  },
  "backstory": "{{BACKSTORY}}",
  "personality": {
    "trait": "{{TRAIT}}",
    "ideal": "{{IDEAL}}",
    "bond": "{{BOND}}",
    "flaw": "{{FLAW}}"
  },
  "appearance_and_style": {
    "physical_appearance": "{{APPEARANCE}}",
    "age": "{{AGE}}",
    "height": "{{HEIGHT}}",
    "weight": "{{WEIGHT}}",
    "eyes": "{{EYES}}",
    "hair": "{{HAIR}}",
    "skin": "{{SKIN}}",
    "clothing_style": "{{CLOTHING}}",
    "unique_accessories": "{{ACCESSORIES}}",
    "signature_expression": "{{EXPRESSION}}",
    "image_file": "{{IMAGE_FILE}}",
    "image_prompt": "{{IMAGE_PROMPT}}"
  },
  "goals_and_motivations": {
    "main_goal": "{{GOAL}}",
    "motivations": "{{MOTIVATIONS}}",
    "fears": "{{FEARS}}",
    "secrets": "{{SECRETS}}"
  },
  "game_notes": {
    "combat_behavior": "{{COMBAT}}",
    "social_interactions": "{{SOCIAL}}",
    "future_development": "{{FUTURE}}"
  },
  "metadata": {
    "template_title": "{{CHARACTER_NAME}} - D&D 5e",
    "system": "D&D 5e",
    "locale": "pt-BR",
    "schema_version": "1.0.0"
  }
}
```

### 3. Multi-Page Template Structure

Templates should be designed with **multiple pages** for different content areas:

| Page | Purpose | Content |
|------|---------|---------|
| **1 - Hero** | Main character stats | Image, name, class, level, HP, CA, initiative, speed, attributes, saving throws |
| **2 - Biography** | Character story | Backstory, personality traits, goals, fears, secrets |
| **3 - Technical** | Skills & appearance | Proficiencies, languages, tools, physical description |
| **4+ - Spellbook** | Spells & abilities | Spell descriptions, spell slots, cantrips |
| **Final - Equipment** | Items & treasure | Weapons, armor, money, magic items |
| **Optional - Spell Cards** | Trading card layout | Art front + technical back |

### 4. Pagination & Content Overflow

**CRITICAL: Content must never be cut/truncated. It must flow to the next page.**

```css
/* Page container */
.page {
  width: 297mm;
  min-height: 210mm;
  page-break-after: always;
  overflow: visible;
}

/* Prevent content blocks from being cut */
.content-block {
  page-break-inside: avoid;
  break-inside: avoid-page;
  display: block;
  position: relative;
}

/* Allow content to grow beyond fixed height */
.landscape-container {
  min-height: 210mm;
  overflow: visible;
}

/* Print optimization */
@media print {
  body {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
}
```

**Best Practices:**
- Use `min-height` instead of fixed height for containers
- Apply `page-break-inside: avoid` to content blocks
- Test with maximum content to ensure proper pagination
- Use CSS columns for multi-column text that can flow
- Handle arrays/lists with pagination loops

### 5. Spell Cards Pattern (Trading Card Layout)

For spell card pages, use this dual-row layout:

```html
<div class="cards-page">
  <!-- Row 1: Fronts (art only) -->
  {{#each frontRow}}
  <div class="spell-card card-front">
    <div class="card-art-bg" style="background-image: url('{{art}}')"></div>
  </div>
  {{/each}}

  <!-- Row 2: Backs (technical) -->
  {{#each backRow}}
  <div class="spell-card card-back">
    <div class="spell-name-back">{{name}}</div>
    <div class="spell-level-back">{{level}}</div>
    <div class="spell-description">{{description}}</div>
    <div class="spell-stats-grid">
      <div>Time <span>{{casting_time}}</span></div>
      <div>Range <span>{{range}}</span></div>
    </div>
  </div>
  {{/each}}
</div>
```

**Card Dimensions:** 63mm x 88mm (standard trading card 4:5 ratio)

### 6. Component Architecture

**Base Components:**
- `AttributeDisplay` — Shows single attribute with modifier
- `ResourceBar` — HP/MP/Breath gauge with current/max
- `SkillList` — List of trained skills with bonuses
- `PowerGrid` — Grid for powers/abilities/features
- `EquipmentSlot` — Weapon/armor/item display

**System-Specific Components:**
- `T20SpellCircles` — Magic circles for Tormenta 20
- `DHDomainDice` — Domain dice display for Daggerheart
- `OPNexIndicator` — NEX percentage for Ordem Paranormal
- `SkyfallPillars` — Tragic Pillars display
- `STDisciplineMatrix` — 2x3 discipline grid for Star Trek

### 7. UI Patterns

**Attribute Block:**
```
┌─────────┐
│   FOR   │
│   14    │
│   +2    │
└─────────┘
```

**Resource Bar:**
```
HP: [████████░░] 80/100
```

**Skill Chip:**
```
[+5] Atletismo
```

### 8. Implementation Checklist

- [ ] Identify game system from `metadata.system`
- [ ] Use correct attribute names for the system
- [ ] Implement system-specific resource bars
- [ ] Add appropriate skill/proficiency display
- [ ] Include personality/backstory sections
- [ ] Support image upload and prompts
- [ ] Design for multi-page output
- [ ] Ensure content never cuts (always flows to next page)
- [ ] Add print CSS (`print-color-adjust: exact`)
- [ ] Test with maximum content for pagination

### 9. Handlebars Helpers Reference

Common helpers used in templates:
- `{{#each}}` — iterate over arrays
- `{{#if}}` — conditional rendering
- `{{#unless}}` — inverse conditional
- `{{add}}` — add numbers (for page numbers)
- `{{join}}` — join array elements
- `{{{nl2br}}}` — convert newlines to breaks

## Resources

- D&D 5e Template Reference: `assets/templates/dnd-landscape-hero.html`
- T20 Model: `assets/sheets/Modelo-T20.json`
- DH Model: `assets/sheets/Modelo-DH.json`
- OP Model: `assets/sheets/Modelo-OP.json`
- Skyfall Model: `assets/sheets/Modelo-Skyfall.json`
- ST Model: `assets/sheets/Modelo-ST.json`

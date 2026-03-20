# Antigravity Kit Architecture

> Comprehensive AI Agent Capability Expansion Toolkit

---

## 📋 Overview

Antigravity Kit is a modular system consisting of:

- **19 Specialist Agents** - Role-based AI personas
- **54 Skills** - Domain-specific knowledge modules
- **11 Workflows** - Slash command procedures

---

## 🏗️ Directory Structure

```plaintext
.agent/
├── ARCHITECTURE.md          # This file
├── agents/                  # 19 Specialist Agents
├── skills/                  # 54 Skills
├── workflows/               # 11 Slash Commands
├── rules/                   # Global Rules
└── scripts/                 # Master Validation Scripts
```

---

## 🤖 Agents (19)

Specialist AI personas for different domains.

| Agent | Focus | Key Skills |
| ----- | ----- | ----------- |
| `orchestrator` | Multi-agent coordination | parallel-agents, behavioral-modes |
| `project-planner` | Discovery, task planning | brainstorming, plan-writing, architecture |
| `frontend-specialist` | Web UI/UX | frontend-design, nextjs-react-expert, tailwind-patterns |
| `backend-specialist` | API, business logic | api-patterns, nodejs-best-practices, database-design |
| `database-architect` | Schema, SQL | database-design, database-inspector |
| `mobile-developer` | iOS, Android, RN | mobile-design |
| `game-developer` | Game logic, mechanics | game-development |
| `devops-engineer` | CI/CD, Docker | deployment-procedures |
| `security-auditor` | Security compliance | vulnerability-scanner, red-team-tactics |
| `penetration-tester` | Offensive security | red-team-tactics |
| `test-engineer` | Testing strategies | testing-patterns, tdd-workflow, webapp-testing |
| `debugger` | Root cause analysis | systematic-debugging |
| `performance-optimizer` | Speed, Web Vitals | performance-profiling |
| `seo-specialist` | Ranking, visibility | seo-fundamentals, geo-fundamentals |
| `documentation-writer` | Manuals, docs | documentation-templates |
| `product-manager` | Requirements, user stories | plan-writing, brainstorming |
| `qa-automation-engineer` | E2E testing, CI pipelines | webapp-testing, testing-patterns |
| `code-archaeologist` | Legacy code, refactoring | clean-code, code-review-checklist |
| `explorer-agent` | Codebase analysis | - |

---

## 🧩 Skills (54)

Modular knowledge domains that agents can load on-demand based on task context.

### Core & Orchestration

`behavioral-modes`, `intelligent-routing`, `parallel-agents`, `stitch-loop`, `skill-creator`, `mcp-builder`, `speaking-portuguese`

### Frontend & UI

`frontend-design`, `design-md`, `design-principles`, `nextjs-react-expert`, `tailwind-patterns`, `shadcn-ui`, `component-generator`, `page-generator`, `form-builder`, `react-components`, `web-design-guidelines`

### Backend & API

`api-patterns`, `api-endpoint-creator`, `nodejs-best-practices`, `python-patterns`, `server-management`

### Database

`database-design`, `database-inspector`

### Testing & Quality

`testing-patterns`, `webapp-testing`, `tdd-workflow`, `systematic-debugging`, `lint-and-validate`, `code-reviewer`, `code-review-checklist`, `vulnerability-scanner`, `red-team-tactics`

### Planning & Architecture

`brainstorming`, `plan-writing`, `architecture`, `app-builder`

### Utilities & Automation

`clean-code`, `git-commits`, `docs-keeper`, `documentation-templates`, `i18n-localization`, `performance-profiling`, `placeholder-generator`, `enhance-prompt`, `remotion`

### OS & Environment

`bash-linux`, `powershell-windows`

### Domain Specific

`game-development`, `seo-fundamentals`, `geo-fundamentals`

---

## 🔄 Workflows (11)

Slash command procedures. Invoke with `/command`.

| Command | Description |
| ------- | ----------- |
| `/brainstorm` | Socratic discovery |
| `/create` | Create new features |
| `/debug` | Debug issues |
| `/deploy` | Deploy application |
| `/enhance` | Improve existing code |
| `/orchestrate` | Multi-agent coordination |
| `/plan` | Task breakdown |
| `/preview` | Preview changes |
| `/status` | Check project status |
| `/test` | Run tests |
| `/ui-ux-pro-max` | Advanced UI/UX design |

---

## 🎯 Skill Loading Protocol

```plaintext
User Request → Skill Description Match → Load SKILL.md
                                             ↓
                                     Read references/
                                             ↓
                                     Read scripts/
```

### Skill Structure

```plaintext
skill-name/
├── SKILL.md           # (Required) Metadata & instructions
├── scripts/           # (Optional) Python/Bash scripts
├── references/        # (Optional) Templates, docs
└── assets/            # (Optional) Images, logos
```

---

## 📜 Scripts

Master validation scripts that orchestrate skill-level scripts.

### Master Scripts

| Script | Purpose | When to Use |
| ------ | ------- | ----------- |
| `checklist.py` | Priority-based validation (Core checks) | Development, pre-commit |
| `verify_all.py` | Comprehensive verification (All checks) | Pre-deployment, releases |

---

## 📊 Statistics

| Metric | Value |
| ------ | ----- |
| **Total Agents** | 19 |
| **Total Skills** | 54 |
| **Total Workflows** | 11 |
| **Total Scripts** | 2 (master) + ~18 (skill-level) |

---

## 🔗 Quick Reference

| Need | Agent | Skills |
| ---- | ----- | ------ |
| Web App | `frontend-specialist` | nextjs-react-expert, frontend-design |
| API | `backend-specialist` | api-patterns, nodejs-best-practices |
| Mobile | `mobile-developer` | mobile-design |
| Database | `database-architect` | database-design, database-inspector |
| Security | `security-auditor` | vulnerability-scanner |
| Testing | `test-engineer` | testing-patterns, webapp-testing |
| Debug | `debugger` | systematic-debugging |
| Plan | `project-planner` | brainstorming, plan-writing |

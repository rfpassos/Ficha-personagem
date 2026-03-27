# RPG Sheet Generator - Backlogs e Progresso

Registro de funcionalidades por prioridade e status de desenvolvimento.

## 🏁 Sprint 1: Core API & IA (CONCLUÍDO)
- [x] Configuração inicial (Fastify + TS)
- [x] Schema Prisma e Integração PostgreSQL
- [x] Integração MinIO (Storage)
- [x] Service de Imagem (Cascata Gemini/Freepik)
- [x] Service de PDF (Puppeteer)
- [x] Autenticação via API Key (Header & Query String)
- [x] CLI de geração de chaves
- [x] **Segurança:** Proxy de Download Seguro (Oculta MinIO)
- [x] **Persistência:** Registro de `pdfPath` na base de dados

## 🎨 Sprint 2: Visual & Templates (CONCLUÍDO)
- [x] Correção de Renderização de Atributos/Layout
- [x] **Layout Multi-página (A4 Landscape):** Reestruturação para 5 páginas (Capa, Bio, Perfil, Grimório, Arsenal/Equipamento).
- [x] **Sincronização de Esquema [v1.4.0]:** Unificação do prompt de extração e modelo JSON para suporte a novos campos.
- [x] **Game Notes:** Implementação de `combat_behavior`, `social_interactions` e `future_development`.
- [x] **Detailed Money:** Rastreamento de CP, SP, EP, GP, PP.
- [x] Imagem de fallback customizada (`image-error.png`)
- [x] **Spell Unification (Sinônimos):** Unificação de magias e IDs (Muralha de Força vs Muralha de Energia)
- [x] **Spell Description Layout:** Melhoria na quebra de linha de descrições longas.
- [x] **Backstory Pagination:** Divisão automática de histórias longas em múltiplas páginas com layouts adaptativos.
- [x] **Data Mapping Fixes:** Correção de Ouro (PO), Antecedente, Alinhamento e Magias Preparadas.
- [x] **Spell Deduplication:** Unificação e limpeza de magias duplicadas na ficha.


## 🖥️ Sprint 3: Painel Admin (Next.js 16)
- [ ] Setup do Projeto-Base na pasta `admin/`
- [ ] Dashboard de estatísticas (uso de IA, tempo médio, erros)
- [ ] Gerenciamento de chaves via UI
- [ ] Viewer de gerações passadas

## 🐋 Sprint 4: Infra & Deploy
- [ ] Dockerfile para API
- [ ] Docker Compose (Postgres + MinIO locais para dev)
- [ ] CI/CD via GitHub Actions

---
**Status Atual**: Layout multi-página com paginação inteligente de biografia e unificação de magias [v1.4.1]. Sistema validado com o personagem Presto Kabum.

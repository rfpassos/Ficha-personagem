# RPG Sheet Generator - Backlogs e Progresso

Registro de funcionalidades por prioridade e status de desenvolvimento.

## 🏁 Sprint 1: Core API & IA (CONCLUÍDO)
- [x] Configuração inicial (Fastify + TS)
- [x] Schema Prisma e Integração PostgreSQL
- [x] Integração MinIO (Storage)
- [x] Service de Imagem (Cascata Gemini/Freepik)
- [x] Service de PDF (Puppeteer)
- [x] Autenticação via API Key
- [x] CLI de geração de chaves

## 🎨 Sprint 2: Visual & Templates (EM ANDAMENTO)
- [ ] Design visual do PDF (estilo grimório/pergaminho)
- [ ] Implementação de `sheet.hbs` (HTML/CSS)
- [ ] Validação de fontes do Google Fonts
- [ ] Imagem de fallback customizada (`image-error.png`)

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
**Status Atual**: Backend core pronto para receber o template visual.

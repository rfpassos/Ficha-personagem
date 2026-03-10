# RPG Character Sheet Generator 🎲

Sistema automatizado para geração de fichas de personagens de RPG (estilo D&D 5e) com ilustrações geradas por Inteligência Artificial e exportação em PDF.

## 🚀 Arquitetura do Sistema

O projeto é dividido em dois módulos principais:

- **`api/`**: Backend construído com **Fastify (Node.js)** e **TypeScript**.
  - Geração de prompts via Gemini Flash.
  - Geração de imagens com cascata (Gemini → Freepik).
  - Conversão de HTML para PDF via Puppeteer.
- **`admin/`**: Painel administrativo customizado baseado em **Next.js 16**.

## 🛠️ Tech Stack

- **Linguagem**: TypeScript (Node.js)
- **Framework Web**: Fastify v5
- **ORM**: Prisma v5 (PostgreSQL)
- **Storage**: MinIO (S3 compatível)
- **Template Engine**: Handlebars
- **Geração PDF**: Puppeteer
- **IA (Texto/Prompt)**: Google Gemini 2.0 Flash
- **IA (Imagem)**: Gemini 2.0 Flash Exp / Freepik Mystic API

## 📋 Pré-requisitos

- Node.js v20+
- Docker (para PostgreSQL e MinIO)
- Chaves de API: Google AI Studio (Gemini) e Freepik API

## 🔧 Configuração e Instalação

### 1. Clonar o repositório
```bash
git clone <url-do-repositorio>
cd Ficha-personagem
```

### 2. Configurar Variáveis de Ambiente
Copie o arquivo `.env.example` para `.env` tanto na raiz quanto na pasta `api/` e preencha as chaves necessárias.

### 3. Instalar dependências (Backend)
```bash
cd api
npm install
```

### 4. Configurar Banco de Dados
```bash
npm run db:push
npm run seed
```

### 5. Gerar primeira API Key
```bash
npm run generate-key -- --name "Minha Chave de Teste"
```

### 6. Iniciar em desenvolvimento
```bash
npm run dev
```

## 🔒 Segurança

O acesso à API é protegido por **X-API-Key**. 
As chaves são armazenadas com hash **SHA-256** e lookup rápido por prefixo de 12 caracteres.
Operações administrativas exigem o header **X-Admin-Secret**.

## 📖 Documentação Detalhada

Consulte a pasta [`docs/`](./docs) para informações específicas:
- [CONTEXT.md](./docs/CONTEXT.md): Visão geral e arquitetura.
- [DATABASE.md](./docs/DATABASE.md): Schema do banco e MinIO.
- [SYSTEM-API.md](./docs/SYSTEM-API.md): Documentação dos endpoints.
- [backlogs.md](./docs/backlogs.md): Roadmap e progresso das features.

---
Desenvolvido por Google Deepmind Team (Antigravity).

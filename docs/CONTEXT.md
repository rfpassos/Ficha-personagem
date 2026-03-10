# RPG Sheet Generator - Contexto e Arquitetura

Este documento descreve as especificações técnicas e a arquitetura do gerador de fichas de RPG.

## 1. Visão Geral
O sistema recebe um JSON com dados de personagem (Nome, Raça, Classe, Nível, Atributos) e entrega um PDF profissional com design clássico e imagem customizada gerada por IA.

## 2. Fluxo de Geração (Pipeline)

1.  **Request**: Cliente envia POST com JSON e `X-API-Key`.
2.  **Auth**: Middleware valida a chave no PostgreSQL (Maestro).
3.  **Prompt Service**: Gemini Flash gera um prompt artístico em inglês baseado nos dados do personagem.
4.  **Image Service (Cascata)**:
    -   Tenta **Gemini** (rápido).
    -   Se falhar, tenta **Freepik Mystic** (30s polling).
    -   Se falhar, usa **Placeholder/Error Image** do MinIO.
5.  **Storage**: Imagem gerada é salva no MinIO (S3).
6.  **Template Service**: Handlebars compila o HTML injetando a imagem (base64) e dados.
7.  **PDF Service**: Puppeteer renderiza o HTML e gera o PDF (A4).
8.  **Database**: Registro de uso (Generation log) é atualizado com status, duração e URL da imagem.

## 3. Infraestrutura

-   **Banco de Dados**: PostgreSQL (Instância Maestro/LoopStudio).
-   **Storage**: MinIO (Bucket: `maestro.loopstudio`).
-   **Email**: SMTP via Hostinger (notificações administrativas).

## 4. Segurança

-   **Rate Limiting**: Aplicado via `@fastify/rate-limit` por IP/Key.
-   **Hashes**: API Keys nunca são salvas em texto puro (SHA-256).
-   **Admin**: Rotas `/admin/*` exigem segredo forte definido em variável de ambiente.

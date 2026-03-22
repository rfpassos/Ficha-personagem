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
6.  **Realism Service**: Converte o prompt base em um prompt detalhado e fotorrealista. Oferece dois perfis:
    -   **Personagem**: Usa `realism-meta.md` (16:9, com regra de composição lateral).
    -   **Grimório**: Usa `realism-meta-grimoire.md` (4:5, focado na arte da magia).
7.  **Template Service**: Handlebars compila o HTML injetando a imagem (base64) e dados.
8.  **PDF Service**: Puppeteer renderiza o HTML e gera o PDF (A4).
9.  **Database**: Registro de uso (Generation log) é atualizado com status, duração e URL da imagem.
10. **Spell Engine**: Unificação de magias preparando para sinônimos. Se no PDF vier "Muralha de Força", o sistema mapeia para o ID oficial "muralha-de-energia", mantendo o nome customizado do jogador no título mas a descrição oficial do compêndio.

## 3. Infraestrutura

-   **Banco de Dados**: PostgreSQL (Instância Maestro/LoopStudio).
-   **Storage**: MinIO (Bucket: `maestro.loopstudio`).
-   **Email**: SMTP via Hostinger (notificações administrativas).

## 4. Segurança

-   **Rate Limiting**: Aplicado via `@fastify/rate-limit` por IP/Key.
-   **Hashes**: API Keys nunca são salvas em texto puro (SHA-256).
-   **Download Proxy**: Proteção contra vazamento de credenciais administrativas. Os arquivos são servidos via streaming autenticado por Header ou Query String (`x-api-key`).
-   **Admin**: Rotas `/admin/*` exigem segredo forte definido em variável de ambiente.

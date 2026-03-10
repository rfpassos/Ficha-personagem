# Documentação do Banco de Dados — RPG Sheet Generator

## Conexão

- **Engine**: PostgreSQL (externo)
- **Host**: `72.61.42.171:5432`
- **Database**: `Maestro_LoopStudio`
- **Schema**: `rpgsheet` (isolado do schema `public` do Maestro)
- **ORM**: Prisma

---

## Schema Prisma (`api/prisma/schema.prisma`)

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ──────────────────────────────────
// API Keys — Autenticação da API
// ──────────────────────────────────
model ApiKey {
  id          String    @id @default(uuid())
  keyPrefix   String    @unique        // Primeiros 12 chars (identificação visual)
  keyHash     String    @unique        // SHA-256 da chave completa (nunca plain)
  name        String                   // Nome/descrição da chave
  isActive    Boolean   @default(true)
  rateLimit   Int       @default(10)   // Requisições por minuto
  createdAt   DateTime  @default(now())
  lastUsedAt  DateTime?
  usageCount  Int       @default(0)
  generations Generation[]

  @@schema("rpgsheet")
  @@map("api_keys")
}

// ──────────────────────────────────
// Generations — Log de gerações de ficha
// ──────────────────────────────────
model Generation {
  id            String    @id @default(uuid())
  apiKeyId      String
  apiKey        ApiKey    @relation(fields: [apiKeyId], references: [id])
  characterName String                   // Campo "nome" do payload
  characterRace String
  characterClass String
  status        GenerationStatus @default(PENDING)
  imageSource   ImageSource?             // Qual API gerou a imagem
  imageUrl      String?                  // URL no MinIO (se armazenado)
  pdfSizeBytes  Int?
  errorMessage  String?
  durationMs    Int?                     // Tempo total de geração em ms
  createdAt     DateTime  @default(now())

  @@schema("rpgsheet")
  @@map("generations")
}

enum GenerationStatus {
  PENDING
  SUCCESS
  ERROR

  @@schema("rpgsheet")
}

enum ImageSource {
  GEMINI
  FREEPIK
  PLACEHOLDER

  @@schema("rpgsheet")
}

// ──────────────────────────────────
// Settings — Configurações globais do sistema
// ──────────────────────────────────
model Setting {
  id        String   @id @default(uuid())
  key       String   @unique
  value     String
  updatedAt DateTime @updatedAt

  @@schema("rpgsheet")
  @@map("settings")
}
```

---

## Migrations (DDL — execução via Prisma)

```bash
# A partir da pasta api/
npx prisma migrate dev --name init
```

A migration gerada criará automaticamente:
- Schema `rpgsheet` no banco
- Tabelas: `api_keys`, `generations`, `settings`
- Enums: `GenerationStatus`, `ImageSource`
- Índices únicos em `keyPrefix` e `keyHash`

---

## DDL Manual (referência — sem ORM)

```sql
-- Criar schema isolado
CREATE SCHEMA IF NOT EXISTS rpgsheet;

-- Enum de status
CREATE TYPE rpgsheet."GenerationStatus" AS ENUM ('PENDING', 'SUCCESS', 'ERROR');
CREATE TYPE rpgsheet."ImageSource" AS ENUM ('GEMINI', 'FREEPIK', 'PLACEHOLDER');

-- Tabela de API Keys
CREATE TABLE rpgsheet.api_keys (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key_prefix  VARCHAR(20)  NOT NULL UNIQUE,
    key_hash    CHAR(64)     NOT NULL UNIQUE,  -- SHA-256 = 64 hex chars
    name        VARCHAR(255) NOT NULL,
    is_active   BOOLEAN      NOT NULL DEFAULT TRUE,
    rate_limit  INTEGER      NOT NULL DEFAULT 10,
    created_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    last_used_at TIMESTAMPTZ,
    usage_count INTEGER      NOT NULL DEFAULT 0
);

-- Tabela de Logs de Geração
CREATE TABLE rpgsheet.generations (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    api_key_id      UUID NOT NULL REFERENCES rpgsheet.api_keys(id),
    character_name  VARCHAR(255) NOT NULL,
    character_race  VARCHAR(100) NOT NULL,
    character_class VARCHAR(100) NOT NULL,
    status          rpgsheet."GenerationStatus" NOT NULL DEFAULT 'PENDING',
    image_source    rpgsheet."ImageSource",
    image_url       TEXT,          -- URL no MinIO
    pdf_size_bytes  INTEGER,
    error_message   TEXT,
    duration_ms     INTEGER,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Tabela de Configurações
CREATE TABLE rpgsheet.settings (
    id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key        VARCHAR(100) NOT NULL UNIQUE,
    value      TEXT NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Índices de performance
CREATE INDEX idx_generations_api_key_id ON rpgsheet.generations(api_key_id);
CREATE INDEX idx_generations_created_at ON rpgsheet.generations(created_at DESC);
CREATE INDEX idx_generations_status ON rpgsheet.generations(status);
```

---

## Seed (Carga inicial)

```sql
-- Configurações padrão do sistema
INSERT INTO rpgsheet.settings (key, value) VALUES
  ('fallback_image_url', ''),         -- URL da imagem de erro no MinIO
  ('rate_limit_global', '10'),        -- req/min padrão para novas keys
  ('gemini_timeout_ms', '30000'),     -- Timeout Gemini Image em ms
  ('freepik_polling_interval_ms', '2000'),  -- Intervalo de polling Freepik
  ('freepik_polling_timeout_ms', '30000'),  -- Timeout total do polling Freepik
  ('minio_bucket', 'maestro.loopstudio'),
  ('system_version', '1.0.0');
```

```bash
# Seed via Prisma (api/prisma/seed.ts)
npx prisma db seed
```

---

## MinIO — Armazenamento de Imagens

### Por que usar MinIO?
O MinIO é **recomendado** para este projeto pelos seguintes motivos:
1. **Cache de imagens**: Imagem gerada para um personagem pode ser reutilizada se chamada novamente com os mesmos dados, evitando rechamadas à API do Gemini/Freepik.
2. **Imagem de fallback**: A `image-error.png` fica hospedada no MinIO — fácil de trocar pelo Admin sem redeploy.
3. **Auditoria**: Mantém histórico das imagens geradas (útil para debug e melhoria dos prompts).

### Estrutura de buckets

```
maestro.loopstudio/
└── rpgsheet/
    ├── images/
    │   ├── {generation_id}.png    # Imagem gerada para cada ficha
    │   └── fallback/
    │       └── image-error.png    # Imagem de erro configurável pelo Admin
    └── pdfs/                      # (Opcional) PDF cacheado
```

### Configuração SDK (Node.js)

```typescript
// api/src/lib/minio.ts
import { Client } from 'minio';

export const minioClient = new Client({
  endPoint:  process.env.MINIO_ENDPOINT!,
  port:      parseInt(process.env.MINIO_PORT!),
  useSSL:    process.env.MINIO_USE_SSL === 'true',
  accessKey: process.env.MINIO_ACCESS_KEY!,
  secretKey: process.env.MINIO_SECRET_KEY!,
});

export const MINIO_BUCKET = process.env.MINIO_BUCKET!;
```

### Operações utilizadas

| Operação | Método | Quando |
|----------|--------|--------|
| Upload imagem gerada | `putObject` | Após geração bem-sucedida |
| Download fallback | `getObject` | Quando Gemini + Freepik falham |
| URL pública | `presignedGetObject` | Para log no Admin |
| Upload nova imagem de erro | `putObject` | Via endpoint Admin |

---

## Variáveis de Ambiente — Referência completa

```env
# Banco de dados
DATABASE_URL="postgresql://maestro_app_user:<senha>@72.61.42.171:5432/Maestro_LoopStudio?schema=public"

# MinIO
MINIO_ENDPOINT=n8n-minio.vazxzm.easypanel.host
MINIO_PORT=443
MINIO_USE_SSL=true
MINIO_ACCESS_KEY=admin_agencia
MINIO_SECRET_KEY=<secret>
MINIO_BUCKET=maestro.loopstudio

# APIs de IA
GEMINI_API_KEY=
FREEPIK_API_KEY=
OPEN_AI_API_KEY=        # Reservado para uso futuro

# SMTP
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_USER=contato@loopstudio.ia.br
SMTP_PASSWORD=
SMTP_FROM="Maestro LoopStudio" <contato@loopstudio.ia.br>

# Aplicação
PORT=3000
RATE_LIMIT_MAX=10
RATE_LIMIT_WINDOW=60000
ADMIN_SECRET=<gerado-automaticamente>
```

---

## Diagrama ER

```
api_keys ──┐
           │ 1:N
           └── generations
                  (apiKeyId → api_keys.id)

settings   (tabela standalone de configurações chave-valor)
```

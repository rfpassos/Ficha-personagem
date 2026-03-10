# RPG Sheet Generator - Documentação de API

## 🛡️ Autenticação

Todas as requisições públicas (exceto `/health`) exigem o header:
- `X-API-Key`: Sua chave de API gerada no Admin ou CLI.

Requisições administrativas exigem o header:
- `X-Admin-Secret`: Segredo global definido no `.env`.

---

## 🎲 Endpoints Públicos

### 1. Geração de Ficha
`POST /api/generate-sheet`

**Payload (JSON):**
```json
{
  "nome": "Aragorn",
  "raca": "Humano",
  "classe": "Ranger",
  "nivel": 5,
  "atributos": {
    "forca": 16,
    "destreza": 14,
    "constituicao": 15,
    "inteligencia": 10,
    "sabedoria": 14,
    "carisma": 12
  },
  "aparencia": "Cabelos longos, capa verde, olhar determinado.",
  "historia": "Herdeiro do trono de Gondor..."
}
```

**Resposta:**
- `200 OK`: Buffer binário do arquivo PDF (`Content-Type: application/pdf`).
- `401 Unauthorized`: Chave de API inválida ou ausente.
- `429 Too Many Requests`: Limite de taxa excedido.
- `500 Internal Error`: Falha no pipeline (detalhes no JSON de erro).

---

## 🛠️ Endpoints Administrativos (Prefix: `/admin`)

### 1. Listar API Keys
`GET /admin/api-keys`
Retorna metadados das chaves (exceto o hash/segredo).

### 2. Criar API Key
`POST /admin/api-keys`
**Body:** `{ "name": "Prod App", "rateLimit": 50 }`
**Importante:** A chave em plain-text é exibida apenas uma vez na resposta.

### 3. Listar Gerações (Logs)
`GET /admin/generations?page=1&status=SUCCESS`
Retorna histórico de fichas geradas com métricas de tempo e links de imagem.

### 4. Gerenciar Settings
- `GET /admin/settings`: Lista todas as configs (`settings` table).
- `PATCH /admin/settings`: Atualiza em massa (Body: `{ "key": "value" }`).

---

## 💓 Monitoramento
`GET /health`
Resposta: `{"status": "ok", "timestamp": "...", "version": "1.0.0"}`

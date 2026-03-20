# RPG Sheet Generator - Documentação de API

## 🛡️ Autenticação

Todas as requisições públicas (exceto `/health`) exigem autenticação via:
- **Header:** `x-api-key: SUA_CHAVE`
- **Query Param:** `?x-api-key=SUA_CHAVE` (Ideal para links de download direto no navegador)

Requisições administrativas exigem o header:
- `x-admin-secret`: Segredo global definido no `.env`.

---

## 🎲 Endpoints de Geração (Versão 1 - Assíncrona)

O processo de geração é demorado (IA + Imagem + PDF), por isso a API utiliza um modelo de **Jobs**.

### 1. Iniciar Geração de Ficha
`POST /api/v1/sheets`

**Payload:**
```json
{
  "contentType": "markdown", // "json" ou "markdown"
  "content": "# Nome: Aragorn\n...", // Texto bruto ou JSON da ficha
  "options": {
    "refreshImage": false
  }
}
```

**Resposta:**
- `202 Accepted`: Job iniciado.
```json
{
  "jobId": "uuid-aqui",
  "status": "PENDING",
  "links": { 
    "status": "/api/v1/sheets/uuid-aqui",
    "download": "/api/v1/sheets/uuid-aqui/download"
  }
}
```

---

### 2. Consultar Status/Polling
`GET /api/v1/sheets/:id`

**Resposta (Concluído):**
```json
{
  "jobId": "uuid",
  "status": "SUCCESS",
  "character": "Aragorn",
  "downloadUrl": "/api/v1/sheets/uuid/download",
  "createdAt": "..."
}
```

---

### 3. Download Seguro (Proxy)
`GET /api/v1/sheets/:id/download`

Este endpoint faz o streaming do arquivo PDF diretamente do armazenamento seguro.

**Exemplo de uso via Link:**
`http://localhost:3000/api/v1/sheets/ID/download?x-api-key=SUA_CHAVE`

**Resposta (Erro):**
```json
{
  "jobId": "uuid",
  "status": "ERROR",
  "error": "Mensagem amigável de erro aqui."
}
```

---

## 🛠️ Endpoints Administrativos (Prefix: `/admin`)

### 1. Expurgo de Arquivos (Cleanup)
`DELETE /admin/purge?emergency=false`

Remove arquivos antigos do MinIO e limpa logs de erro na DB.
- `emergency=false` (Padrão): Remove arquivos com mais de 5 dias.
- `emergency=true`: Remove tudo com mais de 24 horas (excedente).

**Resposta:**
```json
{
  "message": "Expurgo concluído",
  "deletedFiles": 150,
  "deletedDbRecords": 45,
  "policy": "5 dias"
}
```

### 2. Listar Gerações (Monitor)
`GET /admin/generations?page=1&status=SUCCESS`

### 3. API Keys e Settings
Consulte os endpoints `/admin/api-keys` e `/admin/settings` para gerenciamento de chaves e variáveis do sistema.

---

## 💓 Health Check
`GET /health`
Resumo do estado do sistema.

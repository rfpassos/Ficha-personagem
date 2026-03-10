---
name: generating-placeholders
description: Creates coherent placeholder images using Google Gemini's image generation. Use when the user needs placeholder images for landing pages, prototypes, cards, banners, or hero sections.
---

# Nano Banana Placeholders

Skill para gerar imagens placeholder coerentes com o conteúdo do site usando Google Gemini.

## Quando usar esta skill

- Landing pages, sites institucionais e blogs
- Protótipos rápidos de UI
- Cards, banners e áreas hero
- Substituir blocos cinza por placeholders úteis

**Não use** para imagens com marcas reais, pessoas específicas ou texto legível.

## Workflow

```markdown
## Checklist de Geração

- [ ] Definir contexto do site (tema, público, tom)
- [ ] Identificar seções que precisam de imagem
- [ ] Gerar prompts para cada seção
- [ ] Executar geração via API
- [ ] Extrair e salvar imagens
```

---

## Entradas Esperadas

```json
{
  "site_topic": "Tema geral do site",
  "audience": "Público-alvo",
  "tone": "moderno | sóbrio | divertido",
  "style": "foto | ilustração | 3D | flat",
  "sections": [
    {
      "id": "hero",
      "title": "Título da seção",
      "copy": "Breve descrição",
      "aspect": "16:9",
      "usage": "hero background"
    }
  ]
}
```

Campos ausentes podem ser inferidos automaticamente.

---

## Saídas da Skill

Para cada seção:

```json
{
  "final_prompt": "Prompt para geração",
  "alt_text": "Texto alternativo objetivo",
  "filename_suggestion": "nome-do-arquivo-1k.png",
  "notes": "Observação de uso"
}
```

---

## Regras de Prompt

- Prompt curto, visual e direto
- **Nunca** pedir texto dentro da imagem
- Sempre indicar estilo, composição e iluminação
- Evitar marcas, logos, rostos em close
- Manter consistência visual entre seções

---

## Template de Request

```json
{
  "contents": [
    {
      "role": "user",
      "parts": [
        {
          "text": "Photorealistic placeholder for landing page hero, modern workspace, soft daylight, wide composition, clean background, no text, no logos."
        }
      ]
    }
  ],
  "generationConfig": {
    "responseModalities": ["IMAGE", "TEXT"],
    "imageConfig": {
      "image_size": "1K"
    }
  }
}
```

---

## Script de Execução

```bash
#!/bin/bash
set -e -E

: "${GEMINI_API_KEY:?Need GEMINI_API_KEY}"

MODEL_ID="gemini-3-pro-image-preview"
GENERATE_CONTENT_API="streamGenerateContent"

prompt="$1"
outname="$2"

cat > request.json <<EOF
{
  "contents": [
    {
      "role": "user",
      "parts": [
        { "text": "$prompt" }
      ]
    }
  ],
  "generationConfig": {
    "responseModalities": ["IMAGE", "TEXT"],
    "imageConfig": { "image_size": "1K" }
  }
}
EOF

curl -sS -X POST \
  -H "Content-Type: application/json" \
  "https://generativelanguage.googleapis.com/v1beta/models/${MODEL_ID}:${GENERATE_CONTENT_API}?key=${GEMINI_API_KEY}" \
  -d '@request.json' > "${outname}.json"
```

---

## Extração da Imagem

```bash
cat hero.json \
  | jq -r '.. | objects | select(has("inlineData")) | .inlineData.data' \
  | head -n 1 \
  | base64 --decode > hero.png
```

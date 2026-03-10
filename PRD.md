# RPG Sheet Generator API

## Objetivo
Criar uma API REST em Node.js + TypeScript que recebe um JSON com os dados
de um personagem de RPG e retorna um PDF com a ficha completa do personagem,
combinando uma imagem gerada por IA com os dados estruturados em um template HTML.

---

## Stack Tecnológica
- Runtime: Node.js + TypeScript
- Framework: Fastify
- Geração de imagem IA: Google Gemini API (modelo: gemini-2.0-flash-exp-image-generation)
- Geração de prompt para imagem: Google Gemini API (modelo: gemini-2.0-flash, texto)
- Template HTML: Handlebars (hbs)
- HTML → PDF: Puppeteer (headless Chrome)
- Containerização: Docker (usar imagem base ghcr.io/puppeteer/puppeteer)
- Variáveis de ambiente: dotenv

---

## Estrutura de Pastas
src/
├── routes/
│   └── sheet.route.ts
├── services/
│   ├── prompt.service.ts       # Gera o prompt de imagem com LLM
│   ├── image.service.ts        # Chama a API do Gemini para gerar imagem
│   ├── template.service.ts     # Renderiza o HTML com Handlebars
│   └── pdf.service.ts          # Converte HTML em PDF com Puppeteer
├── templates/
│   └── sheet.hbs               # Template HTML da ficha de personagem
├── types/
│   └── character.types.ts      # Tipagem TypeScript do JSON de entrada
└── index.ts                    # Entry point do Fastify

---

## Contrato da API

### Endpoint
POST /api/generate-sheet
Content-Type: application/json
Response: application/pdf (binary download)

### JSON de Entrada (exemplo)
{
  "nome": "Arion Flamewing",
  "raca": "Meio-Elfo",
  "classe": "Mago",
  "nivel": 7,
  "background": "Sábio",
  "alinhamento": "Neutro e Bom",
  "aparencia": "Cabelos prateados longos, olhos dourados, cicatriz no rosto, veste robes azuis",
  "personalidade": "Curioso, reservado, obcecado por conhecimento arcano",
  "atributos": {
    "forca": 8,
    "destreza": 14,
    "constituicao": 12,
    "inteligencia": 18,
    "sabedoria": 13,
    "carisma": 11
  },
  "habilidades": ["Arcana", "História", "Percepção"],
  "magias": ["Bola de Fogo", "Míssil Mágico", "Teletransporte"],
  "equipamentos": ["Cajado arcano", "Grimório", "Bolsa de componentes"],
  "historia": "Filho de uma humana e um elfo, Arion cresceu em uma biblioteca secreta...",
  "pontos_de_vida": 42,
  "classe_armadura": 13
}

---

## Fluxo de Execução Detalhado

1. A rota POST /api/generate-sheet recebe o JSON do personagem
2. prompt.service.ts usa o Gemini Flash (texto) para gerar um prompt
   descritivo para geração de imagem a partir dos campos: raca, classe,
   aparencia e personalidade. O prompt deve ser em inglês, detalhado e
   voltado para arte de fantasia estilo D&D.
3. image.service.ts chama a API Gemini com o modelo de geração de imagem
   e retorna a imagem como string base64 (PNG).
4. template.service.ts compila o template sheet.hbs com Handlebars,
   injetando todos os dados do JSON + a imagem base64 como data URI
   no formato: data:image/png;base64,{base64string}
5. pdf.service.ts lança o Puppeteer, carrega o HTML renderizado via
   page.setContent(), aguarda networkidle0 e exporta como PDF buffer
   com formato A4, margens de 10mm e print background ativado.
6. A rota retorna o PDF como buffer com os headers:
   Content-Type: application/pdf
   Content-Disposition: attachment; filename="ficha-{nome}.pdf"

---

## Template HTML (sheet.hbs) — Estrutura Esperada
O template deve ter um design visual de ficha de RPG com:
- Fundo com textura escura estilo pergaminho ou grimório
- Seção superior: imagem do personagem (lado esquerdo, ~280x380px,
  bordas arredondadas) + nome, raça, classe, nível, background,
  alinhamento (lado direito)
- Grid de atributos (FOR, DES, CON, INT, SAB, CAR) com os valores
  em destaque visual, estilo "caixas de atributo" de fichas de D&D
- Seção de habilidades, magias e equipamentos em listas organizadas
- Seção de história/background no rodapé
- HP e CA em destaque visual (badges coloridos)
- Fontes: usar Google Fonts (MedievalSharp ou Cinzel para títulos,
  Lato para corpo) importadas via @import no CSS do template
- Paleta de cores sugerida: tons de marrom escuro, dourado e vermelho
  vinho, com textos em creme/bege
- Deve caber em uma página A4 (ajustar font-size e espaçamentos)

---

## Configurações do Puppeteer
- Usar args: ['--no-sandbox', '--disable-setuid-sandbox'] para
  compatibilidade com Docker
- waitUntil: 'networkidle0' no setContent para garantir carregamento
  das fontes do Google Fonts
- Formato: A4, printBackground: true, margens de 10mm em todos os lados

---

## Docker
Criar Dockerfile usando como base: ghcr.io/puppeteer/puppeteer:latest
Expor porta 3000
Copiar e instalar dependências, compilar TypeScript e rodar dist/index.js
Criar também docker-compose.yml com a variável GEMINI_API_KEY via .env

---

## Variáveis de Ambiente (.env)
GEMINI_API_KEY=sua_chave_aqui
PORT=3000

---

## Observações Importantes
- Toda a lógica deve ser assíncrona (async/await)
- Tratar erros em cada service com try/catch e retornar erros 500
  formatados em JSON pelo Fastify
- O Puppeteer deve fechar o browser após cada geração (browser.close())
  para evitar vazamento de memória
- Adicionar um timeout de 60 segundos na rota pois a geração de imagem
  + PDF pode demorar
- Instalar tipos: @types/node, @types/puppeteer, @types/handlebars

Por favor, gere o projeto completo com todos os arquivos listados na
estrutura de pastas, prontos para rodar.

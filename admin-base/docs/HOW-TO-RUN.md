# Como Rodar o Projeto Base

Este guia descreve o passo a passo exato para baixar, configurar e rodar o projeto em um novo ambiente.

## Pré-requisitos

1.  **Node.js**: Versão 20 ou superior (LTS recomendada).
2.  **Git**: Para versionamento de código.
3.  **Visual Studio Code** / **Antigravity**: Editor recomendado.

---

## Passo 1: Instalar Dependências

Abra o terminal na pasta raiz do projeto e instale as bibliotecas necessárias:

```bash
npm install
```

> **Dica:** Se houver erros de dependência ou cache, tente deletar a pasta `node_modules` e rodar o comando novamente.

## Passo 2: Configurar Variáveis de Ambiente (.env)

O projeto utiliza o Google Gemini para algumas funcionalidades de IA (geração de personas, avatares, imagens).

1.  Na raiz do projeto, crie um arquivo chamado `.env.local` (você pode copiar de `.env.example`).
2.  Adicione sua chave de API:

```ini
# .env.local
GEMINI_API_KEY="SUA_CHAVE_API_DO_GOOGLE_GEMINI"
```

> ℹ️ **Nota:** Sem essa chave, o projeto irá rodar, mas as funcionalidades de Inteligência Artificial falharão ao serem acionadas.

## Passo 3: Rodar o Servidor

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Acesse **http://localhost:3000** no seu navegador.

---

## Notas Importantes

### Banco de Dados
Este projeto (versão Frontend/UI) utiliza **persistência local (localStorage)** e mocks para simular o backend e banco de dados.
**Não é necessário** configurar Docker, Postgres, Prisma ou Supabase para rodar esta versão da interface.

### Scripts Úteis

-   **`npm run build`**: Gera a versão de produção.
-   **`npm run start`**: Roda o servidor de produção (após o build).
-   **`npm run lint`**: Verifica erros de código (ESLint).
-   **`npm run generate:image`**: Gera placeholders via IA (requer `GEMINI_API_KEY`).

## Resolução de Problemas Comuns

### Erro: "Command not found" ou erros de Node
Verifique se você está na versão correta do Node:
```bash
node -v
# Deve ser v20+
```

### Estilos quebrados ou erros de Tailwind
Como usamos **Tailwind CSS v4**, certifique-se de que a extensão do Tailwind no VS Code está atualizada. Se os estilos não carregarem, tente reiniciar o servidor (`Ctrl+C` e `npm run dev` novamente).

# 📜 Regras Globais da IA

Este documento descreve as regras fundamentais que regem o comportamento da IA neste projeto. Estas regras são carregadas antes de qualquer agente ou skill.

---

## 📋 Arquivos de Regras

| Arquivo | Descrição |
| :--- | :--- |
| **GEMINI.md** | **[CRÍTICO]** O arquivo mestre de regras. Define o protocolo de ativação de agentes, classificação de requisições, regras de código limpo (Tier 0), portões socráticos e checklists de segurança. É a "constituição" do sistema. |

---

## 🔑 Principais Protocolos (Resumo do GEMINI.md)

### 1. Protocolo de Agente & Skill
> **Mandatório**: Ler o arquivo do agente e suas skills ANTES de implementar.

### 2. Classificador de Requisição
Identifica se é uma PERGUNTA, PESQUISA, CÓDIGO SIMPLES, CÓDIGO COMPLEXO ou DESIGN, acionando o fluxo correto (ex: exigir `task.md` para tarefas complexas).

### 3. Roteamento Inteligente
Analisa o pedido e seleciona o agente especialista (ex: `backend-specialist` para APIs). O agente deve anunciar sua identidade: *"🤖 Applying knowledge of @[agent-name]..."*.

### 4. Gate Socrático
Para pedidos complexos ou vagos, o agente **DEVE PARAR e FAZER PERGUNTAS** antes de gerar código. Não assumir requisitos.

### 5. Tier 0: Regras Universais
- **Idioma**: Responder sempre no idioma do usuário (PT-BR neste projeto).
- **Clean Code**: Código conciso, sem over-engineering.
- **Testes**: Obrigatório seguir a pirâmide de testes.
- **System Map**: Ler `ARCHITECTURE.md` no início da sessão.

---

## 📂 Estrutura

Os arquivos de regras estão localizados em:
`c:\Projetos\Projeto-Base\.agent\rules\`

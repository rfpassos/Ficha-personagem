# 🧠 Skills e Habilidades da IA

Este documento lista todas as **Skills (Habilidades Especializadas)** disponíveis para o agente neste projeto. As skills são módulos de conhecimento que permitem realizar tarefas complexas com precisão e seguindo padrões estabelecidos.

---

## 📋 Lista Completa de Skills

| Skill | Descrição e Foco |
| :--- | :--- |
| **api-patterns** | Padrões de design de API (REST/GraphQL), versionamento, paginação e response formats. |
| **app-builder** | Orquestrador principal para criar aplicações full-stack do zero (analisa requisitos, stack, etc). |
| **architecture** | Tomada de decisão arquitetural, ADRs e análise de trade-offs. |
| **bash-linux** | Padrões de terminal Bash/Linux e scripting. |
| **behavioral-modes** | Modos de comportamento da IA (Brainstorm, Implement, Debug, Review, Teach). |
| **brainstorming** | Protocolo socrático para planejamento e refinamento de ideias complexas. |
| **building-forms** | Criação de formulários robustos com React Hook Form e Zod. |
| **clean-code** | Padrões de código limpo, pragmático e livre de over-engineering. |
| **code-review-checklist** | Checklist de segurança e qualidade para revisão de código. |
| **creating-api-endpoints** | Geração de endpoints/hooks de API completos com validação e documentação. |
| **database-design** | Design de schemas, modelagem de dados e estratégias de banco de dados. |
| **deployment-procedures** | Procedimentos seguros para deploy e verificação em produção. |
| **designing-interfaces** | Princípios de design minimalista e preciso (estilo Linear/Notion). |
| **design-md** | Analisa projetos Stitch e sintetiza design systems semânticos em arquivos DESIGN.md. |
| **documentation-templates** | Templates padronizados para README, Docs de API e Code Comments. |
| **enhance-prompt** | Transforma ideias vagas de UI em prompts otimizados para Stitch. |
| **frontend-design** | Design thinking focado em interfaces web modernas e estéticas. |
| **game-development** | Orquestração especializada para desenvolvimento de jogos. |
| **generating-components** | Gerador de componentes UI (Shadcn + Tailwind) prontos para uso. |
| **generating-pages** | Criação de páginas e rotas Next.js completas. |
| **generating-placeholders** | Geração de imagens placeholder contextuais via IA (Gemini). |
| **geo-fundamentals** | Otimização para motores de busca generativa (GEO - Generative Engine Optimization). |
| **i18n-localization** | Padrões de internacionalização e localização. |
| **intelligent-routing** | Sistema automático de seleção do melhor especialista para cada tarefa. |
| **lint-and-validate** | Controle de qualidade automático: linting, validação e análise estática. |
| **maintaining-docs** | Manutenção automática da documentação do projeto (CONTEXT, COMPONENTS, etc). |
| **managing-databases** | Ferramentas de inspeção segura de banco de dados (PostgreSQL). |
| **mcp-builder** | Construção de servidores e ferramentas MCP (Model Context Protocol). |
| **mobile-design** | Princípios de design Mobile-First para Apps (iOS/Android). |
| **nextjs-react-expert** | Otimização de performance e padrões avançados para Next.js e React. |
| **nodejs-best-practices** | Padrões de arquitetura e segurança para Node.js. |
| **parallel-agents** | Orquestração de múltiplos agentes trabalhando em paralelo. |
| **performance-profiling** | Técnicas de medição e otimização de performance. |
| **plan-writing** | Escrita de planos de implementação estruturados. |
| **powershell-windows** | Comandos e padrões para PowerShell no Windows. |
| **python-patterns** | Padrões de desenvolvimento Python. |
| **react-components** | Converte designs Stitch em componentes Vite/React modulares com validação AST. |
| **red-team-tactics** | Táticas de segurança ofensiva para identificar falhas. |
| **remotion** | Gera vídeos de walkthrough de projetos Stitch usando Remotion. |
| **reviewing-code** | Processo sistemático de revisão de código. |
| **seo-fundamentals** | Fundamentos de SEO, Core Web Vitals e E-E-A-T. |
| **server-management** | Gerenciamento de servidores e infraestrutura. |
| **shadcn-ui** | Integração e personalização de componentes shadcn/ui. |
| **skill-creator** | Criação de novas skills seguindo convenções Antigravity. |
| **speaking-portuguese** | **[MANDATÓRIO]** Garante comunicação e documentação em PT-BR. |
| **stitch-loop** | Construção iterativa de websites com Stitch usando padrão baton-passing. |
| **systematic-debugging** | Metodologia científica de 4 passos para debugging. |
| **tailwind-patterns** | Padrões avançados de Tailwind CSS v4 e Design Tokens. |
| **tdd-workflow** | Fluxo de desenvolvimento orientado a testes (Red-Green-Refactor). |
| **testing-patterns** | Padrões de testes automatizados (Unitários, Integração, E2E). |
| **vulnerability-scanner** | Escaneamento e análise de vulnerabilidades de segurança. |
| **web-design-guidelines** | Diretrizes de conformidade visual e usabilidade web. |
| **webapp-testing** | Testes End-to-End focados em aplicações web (Playwright). |
| **writing-commits** | Geração de mensagens de commit no padrão Conventional Commits. |

---

## 🛠️ Como Utilizar

As skills são ativadas automaticamente pelo **Intelligent Routing** com base no contexto da sua solicitação. No entanto, você pode invocar explicitamente uma skill se desejar um comportamento específico.

**Exemplo:**
> "Use a skill `designing-interfaces` para criar o layout deste dashboard."

> "Aplique `clean-code` e `typescript-best-practices` nesta refatoração."

---

## ➕ Adicionando Novas Skills

Para adicionar uma nova capacidade ao agente:

1. Crie uma pasta em `.agent/skills/<nome-da-skill>/`
2. Adicione um arquivo `SKILL.md` com o frontmatter:
   ```yaml
   ---
   name: nome-da-skill
   description: Uma descrição clara do que a skill faz.
   ---
   ```
3. Documente as instruções, templates e regras da skill no arquivo Markdown.
4. Execute o comando de atualização de documentação ou peça ao agente para atualizar este arquivo.

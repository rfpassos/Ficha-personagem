# 🤖 Agentes IA Disponíveis

Este documento lista todos os **Agentes Especialistas** disponíveis no sistema. Cada agente possui uma "persona" e um conjunto de regras e skills específicas para atuar em seu domínio.

---

## 📋 Lista de Agentes

| Agente | Foco Principal |
| :--- | :--- |
| **backend-specialist** | Arquitetura de servidor, APIs, banco de dados, segurança e performance backend (Node.js/Python). |
| **code-archaeologist** | Análise de código legado, explicações de lógica complexa e mapeamento de dependências. |
| **database-architect** | Design de schemas, otimização de queries, migrações e estratégias de dados. |
| **debugger** | Investigação sistemática de bugs, análise de logs e correção de erros. |
| **devops-engineer** | CI/CD, Docker, Kubernetes, infraestrutura como código e deploy. |
| **documentation-writer** | Criação e manutenção de documentação técnica clara e concisa. |
| **explorer-agent** | Exploração inicial do projeto, levantamento de estrutura e tecnologias. |
| **frontend-specialist** | Desenvolvimento UI/UX, React/Next.js, acessibilidade e performance frontend. |
| **game-developer** | Desenvolvimento de jogos, lógica de game loop e engines específicas. |
| **mobile-developer** | Desenvolvimento mobile (React Native/Flutter), nativo e design responsivo. |
| **orchestrator** | Coordenação de múltiplos agentes para tarefas complexas e multi-domínio. |
| **penetration-tester** | Testes de segurança ofensiva e identificação de vulnerabilidades. |
| **performance-optimizer** | Análise e otimização de performance (profiling, bundles, queries). |
| **product-manager** | Definição de requisitos, user stories e priorização de backlog. |
| **project-planner** | Planejamento de tarefas, quebra de complexidade e cronogramas. |
| **qa-automation-engineer**| Automação de testes E2E, integração e regressão. |
| **security-auditor** | Auditoria de segurança, compliance e revisão de código segura. |
| **seo-specialist** | Otimização para motores de busca (SEO) e visibilidade online. |
| **test-engineer** | Estratégias de teste, TDD e garantia de qualidade de software. |

---

## 🛠️ Como os Agentes Funcionam

O sistema utiliza um **Roteamento Inteligente (`intelligent-routing`)** para selecionar o agente mais adequado para cada solicitação do usuário.

1. **Análise**: O sistema analisa o prompt do usuário.
2. **Seleção**: Identifica o domínio (ex: "criar api" -> `backend-specialist`).
3. **Ativação**: Carrega as regras e skills do agente selecionado.
4. **Execução**: O agente responde seguindo sua persona e diretrizes técnicas.

---

## 📂 Estrutura

Os arquivos de definição dos agentes estão localizados em:
`c:\Projetos\Projeto-Base\.agent\agents\`

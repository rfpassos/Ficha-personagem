# ⚡ Workflows (Comandos Slash)

Este documento lista os workflows automatizados disponíveis no sistema. Workflows são sequências de passos pré-definidos para realizar tarefas comuns ou complexas de forma padronizada. Eles podem ser acionados via comandos de barra (ex: `/create`).

---

## 📋 Lista de Workflows

| Comando | Descrição |
| :--- | :--- |
| **/brainstorm** | Inicia uma sessão estruturada de brainstorming para explorar ideias, requisitos e soluções antes da implementação. |
| **/create** | **Criar Nova App**: Inicia o assistente interativo para criar uma nova aplicação ou funcionalidade do zero. |
| **/debug** | **Modo de Debug**: Ativa o protocolo de solução de problemas sistemática para investigar erros e bugs. |
| **/deploy** | **Deploy Seguro**: Executa checklist de pré-deploy, testes e procedimentos de lançamento para produção. |
| **/enhance** | **Melhorar**: Fluxo para adicionar funcionalidades ou fazer melhorias em código existente. |
| **/orchestrate** | **Orquestrador**: Coordena múltiplos agentes para tarefas que exigem visão holística ou múltiplos domínios. |
| **/plan** | **Planejamento**: Gera um plano de projeto detalhado (sem código) usando o `project-planner`. |
| **/preview** | **Preview Local**: Gerencia o servidor de desenvolvimento local (start/stop/status). |
| **/status** | **Status do Projeto**: Exibe um resumo do estado atual, tarefas em andamento e saúde do projeto. |
| **/test** | **Suíte de Testes**: Gera e executa testes automatizados para garantir a qualidade do código. |
| **/ui-ux-pro-max** | **Expert UI/UX**: Workflow especializado para planejamento e implementação de interfaces de alta qualidade. |

---

## 🚀 Como Usar

Para iniciar um workflow, basta digitar o comando correspondente no chat.

**Exemplo:**
> "/create Quero um novo dashboard de vendas."

> "/debug O login não está funcionando."

Os workflows garantem que nenhum passo importante (como validação, testes ou segurança) seja esquecido durante processos críticos.

---

## 📂 Estrutura

Os arquivos de definição de workflows estão localizados em:
`c:\Projetos\Projeto-Base\.agent\workflows\`

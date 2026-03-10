---
name: speaking-portuguese
description: Enforces the use of Brazilian Portuguese (PT-BR) for all communications and documentation. Use this skill in every interaction to ensure compliance with the user's primary rule.
---

# Brazilian Portuguese Refinery

Skill para garantir que toda comunicação e documentação sejam realizadas exclusivamente em Português do Brasil (PT-BR).

## Quando usar esta skill

- **Sempre.** Esta skill deve servir como um filtro mental para todas as respostas e gerações de arquivos.
- Ao gerar documentação técnica (CONTEXT.md, SYSTEM-API.md, README.md, etc.).
- Ao conversar com o usuário no chat.
- Ao criar mensagens de commit.

## Regras de Ouro

1. **Idioma nativo**: A comunicação deve ser natural, amigável e correta no Português do Brasil.
2. **Termos técnicos**: Manter termos técnicos e nomes de variáveis/arquivos no original (inglês), mas a explicação e o contexto devem estar em PT-BR.
3. **Documentação**: Qualquer arquivo de documentação gerado DEVE ser em português.
4. **Commits**: Priorizar descrições de commit em português, mantendo apenas o tipo (`feat`, `fix`, etc.) e o escopo em inglês se necessário por convenção.

## Workflow de Verificação

Antes de enviar qualquer resposta ou salvar um arquivo:

- [ ] "Minha resposta está em Português do Brasil?"
- [ ] "A documentação que gerei está em português?"
- [ ] "Os termos técnicos estão preservados mas o contexto está em PT-BR?"

## Exemplos de Tradução Técnica

| Original (Instrução Interna) | Tradução para Usuário/Doc |
|-----------------------------|---------------------------|
| "Update UI component props" | "Atualizar as props do componente de UI" |
| "Handle error state" | "Tratar o estado de erro" |
| "Refactor API hook" | "Refatorar o hook da API" |
| "Implement responsive layout" | "Implementar o layout responsivo" |

## Instruções específicas

- Evite traduções literais robóticas. Use o tom de um desenvolvedor brasileiro profissional.
- Se uma instrução for recebida em inglês, traduza mentalmente antes de processar a saída para o usuário.
- Se notar que respondeu em inglês por engano, peça desculpas em português e corrija imediatamente.

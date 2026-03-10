---
name: managing-databases
description: Consulta o banco de dados PostgreSQL local para verificar schemas, dados de usuários e estado do sistema. Use quando o usuário pedir para "ver o banco", "listar tabelas" ou "checar dados".
---

# Database Inspector

Skill para consulta segura e inspeção do banco de dados PostgreSQL local do projeto.

## Quando usar esta skill

- Quando precisar verificar se um dado foi persistido corretamente.
- Para inspecionar o schema (estrutura) de uma tabela.
- Para obter estatísticas rápidas sobre os dados (ex: "quantos clientes ativos temos?").
- Para debug de problemas relacionados a dados.

## Workflow

```markdown
## Checklist de Inspeção

- [ ] Entender a necessidade de dados do usuário
- [ ] Validar se a consulta é apenas de leitura (SELECT)
- [ ] Formular SQL compatível com PostgreSQL
- [ ] Executar o script `scripts/query_runner.py`
- [ ] Formatar o resultado em uma tabela Markdown limpa
- [ ] Resumir se houver mais de 50 linhas
```

---

## Como Usar

### 1. Requisitos
- Python 3 instalado.
- Dependência: `pip install psycopg2-binary`.
- Variáveis de ambiente no `.env.local`:
  - `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`.

### 2. Comando Base
O agente deve executar o script via terminal:

```bash
python scripts/query_runner.py "SUA QUERY SELECT AQUI"
```

### 3. Exemplos de Triggers

- **"Quais são as tabelas do banco?"**
  ```sql
  SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';
  ```

- **"Mostre o schema da tabela customers"**
  ```sql
  SELECT column_name, data_type, is_nullable FROM information_schema.columns WHERE table_name = 'customers';
  ```

- **"Quantos usuários temos por status?"**
  ```sql
  SELECT status, count(*) FROM customers GROUP BY status;
  ```

---

## Restrições e Segurança

1. **Apenas Leitura**: Somente comandos `SELECT` são permitidos. Comandos de escrita (`INSERT`, `UPDATE`, `DELETE`, `DROP`) são bloqueados pelo script e pelo bom senso do agente.
2. **Dados Sensíveis**: Nunca exiba senhas (hashes), chaves de API ou tokens no chat.
3. **Volume de Dados**: Se a query retornar muitos registros, utilize `LIMIT` ou resuma os resultados para não poluir o chat.
4. **Erros de Conexão**: Se o script falhar, verifique se o banco de dados local está rodando e se as credenciais no `.env.local` estão corretas.

---

## Instruções Adicionais

- Sempre explique o que a query faz antes de executá-la.
- Se o usuário pedir algo vago ("o banco tá ok?"), comece listando as tabelas e contando registros principais.
- Prefira queries que usem o schema `public`.
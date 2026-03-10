# Plano de Implementação: Redesign Premium do Formulário de Clientes

**Objetivo:** Transformar as telas de Cadastro, Edição e Visualização em interfaces de "Perfil Profissional", substituindo o formulário vertical simples por um layout em grid com cards e hierarquia visual clara.

## 1. Refatoração do `CustomerForm.tsx`

Transformar o formulário monolítico em um layout de duas colunas (Desktop):

- **Grid:** `grid lg:grid-cols-3 gap-6`
- **Coluna Principal (2/3):**
    - **Card "Informações Básicas":** Nome, Email.
    - **Card "Dados Corporativos":** (Condicional) Empresa, Cargo.
    - **Ações (Rodapé):** Botões alinhados à direita com destaque visual.
- **Coluna Lateral (1/3):**
    - **Card "Identidade":** Avatar (com destaque), Tipo de Cliente, Status.
    - **Visual:** Destaque para a foto e badges de status.

## 2. Ajustes nas Páginas (Wrappers)

### A. `new/page.tsx`, `[id]/page.tsx`, `edit/page.tsx`
- Remover o `Card` wrapper externo atual (pois o formulário terá seus próprios Cards internos).
- Ajustar o layout para largura total (`max-w-5xl` ou `container`) para acomodar as colunas.
- Manter o Header da página (Título + Botão Voltar) mas alinhar com o novo layout.

## 3. Detalhes Visuais (Premium Feel)
- **Separadores:** Uso de `<Separator />` entre seções se necessário.
- **Títulos de Seção:** Pequenos headers dentro dos Cards (`font-semibold text-lg`).
- **Estados de Leitura:** No modo `readOnly`, os inputs parecerão texto estático ou campos desabilitados estilizados (sem borda grosseira).

## 4. Plano de Execução

1.  [ ] Refatorar `src/app/dashboard/customers/components/customer-form.tsx`:
    - Implementar Grid Layout.
    - Mover Avatar e Status para card lateral.
    - Agrupar inputs em Cards do Shadcn.
2.  [ ] Atualizar `src/app/dashboard/customers/new/page.tsx`:
    - Remover container/card antigo.
    - Aumentar `max-w`.
3.  [ ] Atualizar `src/app/dashboard/customers/[id]/page.tsx`:
    - Idem acima.
4.  [ ] Atualizar `src/app/dashboard/customers/[id]/edit/page.tsx`:
    - Idem acima.
5.  [ ] Verificar responsividade (Mobile deve virar coluna única).

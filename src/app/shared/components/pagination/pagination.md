<p align="right"><a href="./pagination.en.md">English</a></p>

# Pagination (Standalone, HTML + Sass)

Componente de **paginação independente** (não acopla à Tabela), pensado para funcionar tanto com **fatiamento client-side** quanto **server-side**. Visual em “bolhas”, setas laterais e controles acessíveis.

---

## Objetivo
- Exibir/alterar a **página atual** de uma lista maior.
- **Não** decide quais itens mostrar — isso fica por conta do container (componente/página) que fatia os dados e passa para a Tabela (ou qualquer outra view).

---

## Arquivos
```
src/app/shared/components/pagination/
  ├─ pagination.component.ts
  ├─ pagination.component.html
  └─ pagination.component.sass
```

---

## API

### Inputs
| Propriedade | Tipo        | Padrão | Descrição |
|-------------|-------------|:------:|-----------|
| `total`     | `number`    |   —    | **Total** de itens na coleção. |
| `pageSize`  | `number`    | `10`   | Itens por página. |
| `pageIndex` | `number`    | `0`    | Índice da página atual (**0‑based**). |
| `maxVisible`| `number`    | `5`    | Máximo de botões numéricos exibidos. |

### Outputs
| Evento       | Payload   | Quando dispara |
|--------------|-----------|----------------|
| `pageChange` | `number`  | Emite o **novo** `pageIndex` (0‑based). |

### Comportamento
- O componente **só é exibido** quando `pageCount > 1` (já no template via `*ngIf`).
- Botões “‹/›” são desativados no início/fim.
- Numeração exibida com janela deslizante até `maxVisible`.
- Acessível: `aria-label`/`aria-current`, foco visível.

---

## Exemplo — uso **independente**
```html
<app-pagination
  [total]="42"
  [pageSize]="10"
  [pageIndex]="pageIndex"
  [maxVisible]="5"
  (pageChange)="pageIndex = $event">
</app-pagination>
```

---

## Exemplo — uso **com Tabela** (container controla os dados)

### TS (container)
```ts
// sinais apenas para exemplo; pode ser qualquer estado/serviço
pageSize = 5;
pageIndex = signal(0);
pagedRows = computed(() => {
  const start = this.pageIndex() * this.pageSize;
  return this.rows.slice(start, start + this.pageSize);
});
```

### HTML
```html
<app-table
  [columns]="columns"
  [data]="pagedRows()"
  [actions]="['edit']"
  (action)="onAction($event)">
</app-table>

<div class="tbl-footer" *ngIf="rows.length > pageSize">
  <span class="total">Total de {{ rows.length }} registro(s)</span>
  <app-pagination
    [total]="rows.length"
    [pageSize]="pageSize"
    [pageIndex]="pageIndex()"
    (pageChange)="pageIndex.set($event)">
  </app-pagination>
</div>
```

---

## Theming (CSS Custom Properties)
Defina no wrapper (ou globalmente) — o componente já possui *fallbacks*:

```sass
:root
  --pg-active-bg: var(--tbl-action, #058075)
  --pg-active-fg: #ffffff
  --pg-page-bg: #eef6f4       // bolhas inativas
  --pg-ghost-bg: #eeeeee      // setas
  --pg-hover: color-mix(in oklab, var(--pg-active-bg) 12%, white)
  --pg-fg: #0f1720
```

---

## Acessibilidade
- Botões com `aria-label` (setas) e `aria-current="page"` (ativo).
- Suporte a navegação por Tab; foco visível.
- Títulos com `<nav aria-label="Paginação">` no HTML.

---

## Boas práticas
- Ao mudar `pageSize`, **garanta** que o `pageIndex` continua válido (ex.: resetar para `0` se necessário).
- Para paginação **server-side**, dispare `pageChange` → chame sua API → atualize a lista e `total`.

---

## Roadmap
- [ ] Botão “Primeira/Última” (opcional).
- [ ] Atalhos de teclado (←/→).
- [ ] Versão compacta.

<p align="right"><a href="./table.en.md">English</a></p>

# Table (HTML + Sass, Standalone Angular)

Uma **tabela personalizável** com seleção por checkbox, coluna de ações, _chips_ e células customizáveis — tudo em **HTML + Sass**, exposta como componente **standalone** (sem framework de UI).

---

## Recursos

- **Colunas declarativas** via `ColumnDef` (texto, chip ou custom).
- **Seleção**: checkbox por linha + “selecionar tudo”.
- **Ações**:
  - **Declarativas** via `[actions]` (ex.: `['edit', 'delete']`) com ícones padrão.
  - **Customizadas** via *slot* `appActions` quando você precisa de controle total do markup.
  - `appActions` **sobrepõe** `[actions]` quando ambos forem usados.
- **Células custom**: *slot* por coluna (`appCell="chave"`) com contexto (`value`, `row`, `index`).
- **Chips**: mapeamento valor → rótulo + variante de cor (`chipMap`).
- **Theming** por **CSS Custom Properties** (fácil de casar com seu DS).
- **Acessibilidade**: tabela semântica, `aria-label` nos checkboxes/ações, _header_ “sticky”.

---

## Arquivos

```
src/app/shared/components/table/
  ├─ table.component.ts
  ├─ table.component.html
  ├─ table.component.sass
  └─ table.directives.ts   # appCell e appActions (standalone)
```

---

## Uso

### Opção A — Ações **declarativas** (recomendado para casos simples)
```html
<app-table
  [columns]="columns"
  [data]="rows"
  [selectable]="true"
  [actions]="['edit']"
  [selected]="selected()"
  (selectedChange)="selected.set($event)"
  (action)="onAction($event)">
</app-table>
```

```ts
// evento único para todas as ações declarativas
onAction(e: { type: 'edit' | 'delete' | 'view' | 'download'; row: AdicionalRow; index: number }) {
  if (e.type === 'edit') this.onEdit(e.row, e.index);
}
```

> Quer usar um **asset** específico para um ícone?  
> Passe um objeto em vez da string:
```ts
actions = [{ kind: 'edit', ariaLabel: 'Editar', iconUrl: '/icons/svg/pen-box.svg' }];
```

### Opção B — Ações **custom** (controle total)
```html
<app-table [columns]="columns" [data]="rows" [selectable]="true">
  <ng-template appActions let-row let-index="index">
    <button class="icon-btn icon-btn--ghost" type="button"
            (click)="onEdit(row, index)" aria-label="Editar">
      <img src="/icons/svg/pen-box.svg" width="18" height="18" alt="" />
    </button>
  </ng-template>
</app-table>
```

> Quando `appActions` é fornecido, `[actions]` é ignorado (o template **sempre** vence).

---

## API

### Types
```ts
export type Align = 'left' | 'center' | 'right';
export type CellType = 'text' | 'chip' | 'custom';

export interface ChipMapEntry {
  label: string;
  variant?: string; // 'teal' | 'orange' | etc. (defina no CSS)
}

export interface ColumnDef<T = any> {
  key: keyof T | string;
  header: string;
  type?: CellType;
  width?: string;
  align?: Align;
  chipMap?: Record<string, ChipMapEntry>; // para type='chip'
}

// Ações declarativas
export type ActionKind = 'edit' | 'delete' | 'view' | 'download';

export interface TableAction<T = any> {
  kind: ActionKind;
  label?: string;               // tooltip ou texto auxiliar
  ariaLabel?: string;           // acessibilidade
  visible?: (row: T, index: number) => boolean;
  disabled?: (row: T, index: number) => boolean;
  iconUrl?: string;             // se fornecido, usa <img>; senão, ícone inline (currentColor)
}
```

### Inputs
| Propriedade     | Tipo                            |                                                               Padrão                                                                | Descrição                                                                                                    |
|-----------------|---------------------------------|:-----------------------------------------------------------------------------------------------------------------------------------:|--------------------------------------------------------------------------------------------------------------|
| `data`          | `T[]`                           |                                                                  —                                                                  | Linhas da tabela.                                                                                            |
| `columns`       | `ColumnDef<T>[]`                |                                                                  —                                                                  | Colunas declarativas.                                                                                        |
| `selectable`    | `boolean`                       |                                                               `false`                                                               | Mostra checkbox por linha e “selecionar tudo”.                                                               |
| `showActions`   | `boolean`                       |                                                               `false`                                                               | (Opcional) força a coluna de ações. Normalmente **não precisa** quando você usa `[actions]` ou `appActions`. |
| `actions`       | `(TableAction \| ActionKind)[]` |                                                                `[]`                                                                 | Define ações **declarativas** com ícones padrão ou por `iconUrl`.                                            |
| `loading`       | `boolean`                       |                                                               `false`                                                               | Mostra estado de carregamento com skeleton.                                                                  |
| `loadingRows`   | `number`                        |                                                                 `5`                                                                 | Quantidade de linhas do skeleton.                                                                            |
| `emptyMessage`  | `string`                        |                                                    `Nenhum registro encontrado`                                                     | Mensagem para o estado vazio.                                                                                |
| `sortKey`       | `string`                        |                                                                  —                                                                  | Chave da coluna ordenada (controlado).                                                                       |
| `sortDir`       | `'asc' '\| desc'`               |                                                               `'asc'`                                                               | Direção da ordenação (controlado).                                                                           |

### Outputs
| Evento            | Payload                                         | Quando dispara                                            |
|-------------------|-------------------------------------------------|-----------------------------------------------------------|
| `selectedChange`  | `number[]`                                      | Alterou seleção (linha ou “selecionar tudo”).             |
| `action`          | `{ type: ActionKind; row: T; index: number }`   | Clique numa ação declarativa (quando usando `[actions]`). |
| `sortChange`      | `{ key: string; dir: 'asc'                      | 'desc' }`                                                 | Usuário clicou no cabeçalho e mudou a ordenação. |

### Templates projetáveis
- **Célula custom (`appCell`)**  
  Contexto: `$implicit` (valor), `row` (linha), `index` (índice).
  ```html
  <ng-template appCell="documento" let-value let-row="row" let-index="index">
    {{ value }}
  </ng-template>
  ```

- **Ações (`appActions`)**  
  Contexto: `row`, `index`. Substitui **completamente** o render de `[actions]`.
  ```html
  <ng-template appActions let-row let-index="index">
    <button class="icon-btn icon-btn--ghost" (click)="onEdit(row, index)">✏️</button>
  </ng-template>
  ```

---
### Ordenação (controlada)

O componente emite `sortChange` e expõe `aria-sort` no `<th>`. Controle a ordenação no host:

```ts
type SortState = { key: string; dir: 'asc'|'desc' };

const sort = signal<SortState|null>(null);
const collator = new Intl.Collator(undefined, { numeric:true, sensitivity:'base' });

const sortedRows = computed(() => {
  const s = sort(); if (!s) return rows;
  const k = s.key as keyof Row;
  const dir = s.dir === 'asc' ? 1 : -1;
  return [...rows].sort((a,b) => {
    const av = a[k] as any, bv = b[k] as any;
    const cmp = (typeof av === 'number' && typeof bv === 'number')
      ? av - bv
      : collator.compare(String(av ?? ''), String(bv ?? ''));
    return cmp * dir;
  });
});
```

```html
<app-table
  [columns]="columns"
  [data]="sortedRows()"
  (sortChange)="sort.set($event)">
</app-table>
```

---
## Loading e Empty

```md
### Loading e vazio

```html
<app-table
  [columns]="columns"
  [data]="rows"
  [loading]="loading()"
  [loadingRows]="5"
  [emptyMessage]="'Sem registros para exibir'">
</app-table>
```

---

## Theming (CSS Custom Properties)

Declare/ajuste tokens no `styles.sass` (ou no wrapper da página):

```sass
:root
  --tbl-header-bg: #07363c
  --tbl-header-fg: #ffffff
  --tbl-row-bg: #f2f5f7
  --tbl-row-gray-medium: #ffffff
  --tbl-row-border: #e6e9ed
  --tbl-fg: #0f1720
  --tbl-muted: #6b7280
  --tbl-action: #058075     // cor dos ícones de ação

  // chips
  --chip-radius: 9999px
  --chip-h: 24px
  --chip-pad-x: .6rem
  --chip-fs: .8rem

  // variações de chip (exemplos)
  --chip-teal-border: #087a6a
  --chip-teal-bg: #e8f6f3
  --chip-teal-fg: #0b5f54

  --chip-orange-border: #d17b30
  --chip-orange-bg: #fff2e8
  --chip-orange-fg: #9f5313
```

No Sass do componente essas variáveis já são usadas em header, linhas, bordas, chips e botões.


## Acessibilidade
Adicionar uma bullet:
```md
- Cabeçalho clicável com `aria-sort="ascending|descending|none"` e foco visível no `th` (Enter/Espaço para alternar).
```

---
## Estilos dos botões de ação

Para evitar borda/fundo nativos e deixar “ghost”:
```sass
.icon-btn
  appearance: none
  -webkit-appearance: none
  border: 0
  background: none
  box-shadow: none
  padding: 0
  width: 32px
  height: 32px
  display: inline-grid
  place-items: center
  border-radius: .5rem
  cursor: pointer
  color: var(--tbl-action, #058075)

.icon-btn--ghost
  border: 0
  background: transparent
  &:hover
    background: color-mix(in oklab, var(--tbl-action, #058075) 12%, transparent)
  &:focus-visible
    outline: 2px solid color-mix(in oklab, var(--tbl-action, #058075) 40%, white)
    outline-offset: 2px
```

> Evite um reset **global** `button { border: none !important; background: transparent; }`. Prefira escopar (`.tbl .icon-btn`), para não interferir em outros componentes (ex.: Stepper).

---

## Dicas & Solução de problemas

- **Asset 404**: usando `public/` em `angular.json`, coloque o SVG em `public/icons/svg/pen-box.svg` e referencie com `/icons/svg/pen-box.svg`. Se preferir `src/assets`, inclua a pasta nos `assets` do `angular.json` e use `/assets/...`.
- **Cor do ícone**: `<img>` usa a cor embutida no arquivo. Para herdar do CSS, use SVG **inline** com `fill="currentColor"`.
- **Types no template**: use `$any(...)` em vez de casts TS (ex.: `$any(row)[$any(col).key]`).

---

## Roadmap

- [x] Ordenação por coluna
- [x] Empty/Loading/Error states
- [ ] Paginação
- [ ] Ações em massa (seleção)
- [ ] Responsivo com colunas colapsáveis

---

## Licença

MIT — use e adapte à vontade dentro do projeto.

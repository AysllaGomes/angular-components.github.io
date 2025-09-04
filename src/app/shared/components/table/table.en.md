<p align="right"><a href="./table.md">Português (BR)</a></p>

# Table (Standalone, HTML + Sass)

A **customizable table** with optional row selection (checkbox), **actions column** (declarative via `[actions]` or via `appActions` slot), **chips**, and **custom cells** — all in **plain HTML + Sass** as a **standalone Angular** component.

---

## Files
```
src/app/shared/components/table/
  ├─ table.component.ts
  ├─ table.component.html
  ├─ table.component.sass
  └─ table.directives.ts   # appCell / appActions
```

---

## Column model

```ts
export type Align = 'left' | 'center' | 'right';
export type CellType = 'text' | 'chip' | 'custom';

export interface ChipMapEntry {
  label: string;
  variant?: string; // 'teal' | 'orange' | etc. (style in CSS)
}

export interface ColumnDef<T = any> {
  key: keyof T | string;
  header: string;
  type?: CellType;
  width?: string;
  align?: Align;
  chipMap?: Record<string, ChipMapEntry>; // for type='chip'
}
```

---

## API

### Inputs
| Input            | Type                             |         Default         | Description                                                                           |
|------------------|----------------------------------|:-----------------------:|---------------------------------------------------------------------------------------|
| `data`           | `T[]`                            |            —            | Table rows.                                                                           |
| `columns`        | `ColumnDef<T>[]`                 |            —            | Declarative columns.                                                                  |
| `selectable`     | `boolean`                        |         `false`         | Show row checkbox and “select all”.                                                   |
| `showActions`    | `boolean`                        |         `false`         | Show actions column. (Automatically true if `[actions]` or `appActions` is provided.) |
| `selected`       | `number[]`                       |          `[]`           | Controlled selection (row indices).                                                   |
| `actions`        | `(TableAction<T>\|ActionKind)[]` |          `[]`           | Declarative actions rendered automatically when no `appActions` slot is provided.     |
| `loading`        | `boolean`                        |         `false`         | Shows skeleton loading state.                                                         |
| `loadingRows`    | `number`                         |           `5`           | Number of skeleton rows.                                                              |
| `emptyMessage`   | `string`                         | `No records to display` | Empty-state message.                                                                  |
| `sortKey`        | `string`                         |            —            | Controlled sort column key.                                                           |
| `sortDir`        | `'asc'\|'desc'`                  |         `'asc'`         | Controlled sort direction.                                                            |

### Outputs
| Output           | Payload                                   | When                                                  |
|------------------|-------------------------------------------|-------------------------------------------------------|
| `selectedChange` | `number[]`                                | Row or “select all” changes.                          |
| `action`         | `{ type: string; row: T; index: number }` | When a declarative action is clicked (auto-rendered). |
| `sortChange`     | `{ key: string; dir: 'asc'                | 'desc' }`                                             | User clicked a header and changed sorting. |

### Projectable templates
- **Custom cell (`appCell`)** — context: `$implicit` (value), `row`, `index`
  ```html
  <ng-template appCell="documento" let-value="" let-row="row" let-index="index">
    {{ value }}
  </ng-template>
  ```

- **Actions (`appActions`)** — context: `row`, `index`
  ```html
  <ng-template appActions let-row="" let-index="index">
    <button class="icon-btn icon-btn--ghost" (click)="onEdit(row, index)" aria-label="Edit">
      ✏️
    </button>
  </ng-template>
  ```

---
### Sorting (controlled)

The component emits `sortChange` and sets `aria-sort` on `<th>`. Keep the sorted view in the host:

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

### Loading & Empty

```html
<app-table
  [columns]="columns"
  [data]="rows"
  [loading]="loading()"
  [loadingRows]="5"
  [emptyMessage]="'No records to display'">
</app-table>
```

---

## Declarative actions

```ts
export type ActionKind = 'edit' | 'delete' | 'view' | 'download';

export interface TableAction<T = any> {
  kind: ActionKind | string;
  label?: string;
  ariaLabel?: string;
  iconUrl?: string;                     // optional external icon (e.g. /icons/svg/pen-box.svg)
  visible?: (row: T, index: number) => boolean;
  disabled?: (row: T, index: number) => boolean;
}
```

If you pass `[actions]`, the component auto-renders an action list **unless** you provide an `appActions` slot (which overrides the default). Inline SVGs inherit `currentColor`; `iconUrl` works with external assets.

---

## Usage

### Basic
```html
<app-table
  [columns]="columns"
  [data]="rows"
  [selectable]="true"
  [actions]="['edit']"
  (action)="onAction($event)">
</app-table>
```

### With chips and custom actions

```html

<app-table
  [columns]="columns"
  [data]="rows"
  [selectable]="true"
  [actions]="actions"
  (action)="onAction($event)">

  <ng-template appActions let-row="" let-index="index">
    <button class="icon-btn icon-btn--ghost" (click)="onEdit(row, index)" aria-label="Edit">
      <img src="/icons/svg/pen-box.svg" width="24" height="24" alt=""/>
    </button>
  </ng-template>
</app-table>
```

---

## Theming

Global tokens (override as needed):
```sass
:root
  --tbl-header-bg: #07363c
  --tbl-header-fg: #ffffff
  --tbl-row-bg: #f2f5f7
  --tbl-row-gray-medium: #ffffff
  --tbl-row-border: #e6e9ed
  --tbl-fg: #0f1720
  --tbl-muted: #6b7280
  --tbl-action: #058075     // action icon color (via currentColor)
```

Chip variants (`chip--teal`, `chip--orange`, …) are styled in the component Sass using your tokens.

---

## Accessibility
- Semantic `<table>`, sticky `<thead>`, labeled checkboxes (`aria-label`).
- Visible focus on action buttons (`:focus-visible`).
- Avoid global resets like `button { border: none !important; ... }` — scope styles to `.icon-btn` instead.
- Clickable header with `aria-sort="ascending|descending|none"` and visible focus on the `th` (Enter/Space toggles).

---

## Troubleshooting
- **Asset 404**: if using `public/` assets, put your SVG at `public/icons/...` and reference as `/icons/...`. If you prefer `src/assets`, ensure it’s listed under `assets` in `angular.json` and reference as `/assets/...`.
- **Selection across pages** (if you paginate outside the table): keep a global selection list and map indices with the page offset.

---

## Roadmap
- [x] Sorting
- [x] Empty/Loading/Error states
- [ ] Pagination helpers & bulk actions
- [ ] Responsive columns for small screens

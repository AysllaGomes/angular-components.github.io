<p align="right"><a href="./pagination.md">Português (BR)</a></p>

# Pagination (Standalone, HTML + Sass)

A **standalone pagination** component (numeric bubbles + arrows). It **doesn’t** slice data; the **container** controls `pageIndex/pageSize` and passes the sliced array to whatever view (e.g., the Table).

---

## Files
```
src/app/shared/components/pagination/
  ├─ pagination.component.ts
  ├─ pagination.component.html
  └─ pagination.component.sass
```

---

## API

### Inputs
| Input        | Type      | Default | Description |
|--------------|-----------|:------:|-------------|
| `total`      | `number`  |   —    | Total item count. |
| `pageSize`   | `number`  | `10`   | Items per page. |
| `pageIndex`  | `number`  | `0`    | Zero‑based page index. |
| `maxVisible` | `number`  | `5`    | Maximum visible numeric buttons. |

### Output
| Output      | Payload  | When |
|-------------|----------|------|
| `pageChange`| `number` | Emits the new `pageIndex` (0‑based). |

Behavior:
- Only renders when `pageCount > 1`.
- Prev/Next disabled at bounds.
- Sliding window for numeric buttons up to `maxVisible`.
- Accessible labels and `aria-current="page"` on the active button.

---

## Usage with the Table

```ts
pageSize = 5;
pageIndex = signal(0);
pagedRows = computed(() => {
  const start = this.pageIndex() * this.pageSize;
  return this.rows.slice(start, start + this.pageSize);
});
```

```html
<app-table [columns]="columns" [data]="pagedRows()" (action)="onAction($event)"></app-table>

<div class="tbl-footer" *ngIf="rows.length > pageSize">
  <span class="total">Total: {{ rows.length }}</span>
  <app-pagination
    [total]="rows.length"
    [pageSize]="pageSize"
    [pageIndex]="pageIndex()"
    (pageChange)="pageIndex.set($event)">
  </app-pagination>
</div>
```

---

## Theming

```sass
:root
  --pg-active-bg: var(--tbl-action, #058075)
  --pg-active-fg: #ffffff
  --pg-page-bg: #eef6f4
  --pg-ghost-bg: #eeeeee
  --pg-hover: color-mix(in oklab, var(--pg-active-bg) 12%, white)
  --pg-fg: #0f1720
```

---

## Accessibility & tips
- `<nav aria-label="Pagination">` in the template.
- Visible focus and proper labels on the arrows.
- When `pageSize` changes, ensure `pageIndex` is still valid (often reset to `0`).

---

## Roadmap
- [ ] First/Last buttons (optional)
- [ ] Keyboard shortcuts (←/→)
- [ ] Compact density

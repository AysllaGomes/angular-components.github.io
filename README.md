<p align="right"><a href="./README.pt-BR.md">Português (BR)</a></p>

[![Deploy](https://github.com/AysllaGomes/angular-components.github.io/actions/workflows/deploy.yml/badge.svg)](.github/workflows/deploy.yml)
### **[Demo](https://aysllagomes.github.io/angular-components.github.io/demo/)**

- **[CHANGELOG.md](./CHANGELOG.md):**
---

# Angular Components (Standalone, HTML + Sass)

> **Purpose:** build **reusable UI components** (e.g., Stepper, Table, Pagination, Toast) using **Angular Standalone** with plain **HTML + Sass**, **without UI frameworks**. Lightweight, accessible, and easy to extract/“decapsulate” when needed.

- **Local demo:** `http://localhost:4200/demo`
- **Stack:** Angular 20 (standalone, SSR), Sass (`.sass`), CSS Custom Properties (theming).

---

## Components

| Component | Description | Docs | Demo |
|---------:|-------------|------|------|
| **Stepper** | Horizontal, clickable stepper with states (active, done, disabled) and theme tokens. | [EN](src/app/shared/components/stepper/stepper.en.md) · [PT-BR](src/app/shared/components/stepper/stepper.md) | `/demo#stepper` |
| **Table** | Flexible table with row checkboxes, actions (declarative via `[actions]` or `appActions` slot), chips, and custom cells. | [EN](src/app/shared/components/table/table.en.md) · [PT-BR](src/app/shared/components/table/table.md) | `/demo#table` |
| **Pagination** | Standalone pagination (numeric bubbles + arrows), controlled by `total`, `pageSize`, and `pageIndex`. | [EN](src/app/shared/components/pagination/pagination.en.md) · [PT-BR](src/app/shared/components/pagination/pagination.md) | `/demo#pagination` |
| **Toast** | Lightweight toast (service + container), accessible and themeable. | [EN](src/app/shared/components/toast/toast.en.md) · [PT-BR](src/app/shared/components/toast/toast.md) | `/demo#toast` |

---

## Global theming

```sass
:root
  /* Stepper */
  --stepper-color-active:   #00a39b
  --stepper-color-done:     #2fbf71
  --stepper-color-default:  #c8ccd2
  --stepper-color-disabled: #dcdfe4
  --stepper-text:           #1f2937
  --stepper-caption:        #6b7280
  --stepper-connector:      #e6e9ed
  --stepper-bullet-bg:      #ffffff
  --stepper-color-number-active: #ffffff

  /* Table */
  --tbl-header-bg: #07363c
  --tbl-header-fg: #ffffff
  --tbl-row-bg: #f2f5f7
  --tbl-row-gray-medium: #ffffff
  --tbl-row-border: #e6e9ed
  --tbl-fg: #0f1720
  --tbl-muted: #6b7280
  --tbl-action: #058075

  /* Pagination */
  --pg-active-bg: var(--tbl-action, #058075)
  --pg-active-fg: #ffffff
  --pg-page-bg: #eef6f4
  --pg-ghost-bg: #eeeeee
  --pg-hover: color-mix(in oklab, var(--pg-active-bg) 12%, white)
  --pg-fg: #0f1720

  /* Toast */
  --toast-radius: .75rem
  --toast-shadow: 0 6px 20px rgba(0,0,0,.12)
```

---

## License

MIT — feel free to use, adapt, and contribute.

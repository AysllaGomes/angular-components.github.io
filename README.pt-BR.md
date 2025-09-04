<p align="right"><a href="./README.md">English</a></p>

# Angular Components (Standalone, HTML + Sass)

> **Propósito:** criar **componentes de UI reutilizáveis** (ex.: Stepper, Table, Pagination, Toast) com **Angular Standalone** em **HTML + Sass**, **sem depender de frameworks de UI**. Base leve, acessível e fácil de portar/“desencapsular”.

- **Demo local:** `http://localhost:4200/demo`
- **Stack:** Angular 20 (standalone, SSR), Sass (`.sass`), CSS Custom Properties (theming).

---

## Componentes

| Componente | Descrição | Docs | Demo |
|-----------:|-----------|------|------|
| **Stepper** | Stepper horizontal, clicável, com estados (ativo, feito, desabilitado) e tokens de tema. | [PT-BR](src/app/shared/components/stepper/stepper.md) · [EN](src/app/shared/components/stepper/stepper.en.md) | `/demo#stepper` |
| **Table** | Tabela flexível com checkbox por linha, coluna de ações (declarativa via `[actions]` ou *slot* `appActions`), *chips* e células custom. | [PT-BR](src/app/shared/components/table/table.md) · [EN](src/app/shared/components/table/table.en.md) | `/demo#table` |
| **Pagination** | Paginação independente (bolhas numéricas + setas), controlada por `total`, `pageSize` e `pageIndex`. | [PT-BR](src/app/shared/components/pagination/pagination.md) · [EN](src/app/shared/components/pagination/pagination.en.md) | `/demo#pagination` |
| **Toast** | Toast leve (serviço + container), acessível e tematizável. | [PT-BR](src/app/shared/components/toast/toast.md) · [EN](src/app/shared/components/toast/toast.en.md) | `/demo#toast` |

---

## Theming global

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

## Licença

MIT — use, adapte e contribua.

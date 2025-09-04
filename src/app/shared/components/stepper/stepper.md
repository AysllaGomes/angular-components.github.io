<p align="right"><a href="./stepper.en.md">English</a></p>

# Stepper (HTML + Sass, Standalone Angular)

Um **componente de etapas** leve e acessível, implementado em **HTML + Sass**, exposto como Angular **Standalone**. Sem dependência de UI framework.

---

## Recursos

- **Estados**: `pending`, `active`, `done`, `disabled`
- **Interação**: clique opcional para navegar (`clickable`), regra padrão permite voltar e avançar até `current + 1`
- **Acessibilidade**: `role="tablist"/"tab"`, `aria-selected`, `aria-disabled`
- **Theming**: via **CSS Custom Properties** (cores/tamanhos), com fallbacks
- **Responsivo**: textos abaixo e centralizados em relação ao bullet; captions ocultas em telas pequenas

---

## Arquivos

```
src/app/shared/components/stepper/
  ├─ stepper.component.ts
  ├─ stepper.component.html
  └─ stepper.component.sass
```

---

## Uso básico

### Template
```html
<app-stepper
  [steps]="steps"
  [current]="current"
  [clickable]="true"
  [showIndex]="true"
  [showCaption]="true"
  (stepChange)="goTo($event)">
</app-stepper>
```

### Componente
```ts
export type StepState = 'pending' | 'active' | 'done' | 'disabled';

export interface StepItem {
  label: string;
  caption?: string;
  state?: StepState;
  id?: string | number;
}

steps: StepItem[] = [
  { label: 'Entrega',         caption: 'Confira o endereço' },
  { label: 'Produto',         caption: 'Defina o cartão' },
  { label: 'Personalização',  caption: 'Personalize o cartão' },
  { label: 'Adicional',       caption: 'Configure os adicionais' },
  { label: 'Resumo',          caption: 'Confira a solicitação' },
];

current = 0;
goTo(i: number) { this.current = i; }
```

---

## API

### Inputs

| Propriedade   | Tipo       | Padrão | Descrição |
|---------------|------------|:------:|-----------|
| `steps`       | `StepItem[]` | —    | Lista ordenada de etapas. |
| `current`     | `number`   | `0`    | Índice base-0 da etapa ativa. |
| `clickable`   | `boolean`  | `true` | Habilita clique para navegar (até `current + 1`). |
| `showIndex`   | `boolean`  | `true` | Exibe número dentro do bullet nas etapas não concluídas. |
| `showCaption` | `boolean`  | `true` | Exibe legenda abaixo do rótulo. |

### Output

| Evento       | Payload  | Descrição |
|--------------|----------|-----------|
| `stepChange` | `number` | Emite o índice clicado quando permitido. |

---

## Estrutura HTML (resumo)

```
nav.stepper (role="tablist")
└─ ol.stepper-list
   └─ li.stepper-item
      ├─ button.stepper-button (role="tab")
      │  ├─ span.bullet
      │  │  ├─ span.check (✓ se "done")
      │  │  └─ span.index (número)
      │  └─ span.texts
      │     ├─ span.label
      │     └─ span.caption
      └─ span.connector
```

---

## Theming (CSS vars)

Defina no `styles.sass` (global) para padronizar em todo o app:

```sass
:root
  --stepper-connector: #A4A4A4
  --stepper-connector-active: var(--stepper-color-active)
  --stepper-bullet-bg: #FFFFFF
  --stepper-color-number-active: #FFFFFF
  --stepper-color-active: #058075
  --stepper-color-done: #058075
  --stepper-color-default: #c8ccd2
  --stepper-color-disabled: #dcdfe4
  --stepper-text: #0A655E
  --stepper-caption: #818181
  --stepper-bullet-muted-bg: #eff1f3

  --stepper-bullet-size: 28px
```

Você pode sobrescrever **por página** ou **por instância** (via `[style.--token]` no componente).

### Principais pontos no Sass do componente
- **Bullet** usa `--stepper-bullet-size` para altura/largura
- **Conector** é `position: absolute` e alinha no **meio** do bullet:  
  `top: calc(var(--stepper-bullet-size) / 2 - 1px)` e `left: calc(50% + var(--stepper-bullet-size) / 2)`
- **Ativa**: bullet preenchido com `--stepper-color-active` e número branco (`--stepper-color-number-active`)

---

## Exemplos

### Etapa desabilitada
```ts
steps = [
  { label: 'Etapa 1' },
  { label: 'Etapa 2' },
  { label: 'Etapa 3', state: 'disabled' },
  { label: 'Etapa 4' },
];
```

### Modo compacto (por wrapper)
```html
<div class="compact">
  <app-stepper [steps]="steps" [current]="current" [clickable]="false"></app-stepper>
</div>
```
```sass
/* page.sass */
.compact
  --stepper-bullet-size: 24px
  .stepper-item .texts .label
    font-size: .9rem
```

---

## Acessibilidade & Navegação

- `aria-selected` marca a etapa atual.
- `aria-disabled` quando o clique não é permitido.
- Regra padrão de clique: voltar livre; avançar **até** `current + 1` (evita “pular” validações).  
  Ajuste essa regra no método `canClick()` conforme seu fluxo.

---

## Roadmap

- [ ] Modo **vertical**
- [ ] Suporte a **ícones** por etapa
- [ ] Navegação por **teclado** (setas) e `aria-controls` para painéis

---

## Licença

MIT — use e adapte à vontade dentro do projeto.


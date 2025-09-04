<p align="right"><a href="./stepper.md">Português (BR)</a></p>

# Stepper (Standalone, HTML + Sass)

An **accessible, framework-free** horizontal stepper built with **plain HTML + Sass** and exposed as a **standalone Angular** component. It supports active/done/disabled states, optional index/caption, and theme tokens via CSS variables.

---

## Overview
- Pure markup: `nav → ol → li → button → bullet/texts + connector`.
- Clickable steps (optional).
- Visual states: **active**, **done** (completed), **disabled** (future/blocked).
- Responsive: captions can collapse on small viewports.
- Theming via **CSS Custom Properties**.

---

## Files
```
src/app/shared/components/stepper/
  ├─ stepper.component.ts
  ├─ stepper.component.html
  └─ stepper.component.sass
```

---

## API

### Inputs
| Input          | Type                         | Default | Description |
|----------------|------------------------------|:------:|-------------|
| `steps`        | `{ label: string; caption?: string }[]` |  —  | Step list (label + optional caption). |
| `current`      | `number`                     |  `0`   | Zero‑based index of the active step. |
| `clickable`    | `boolean`                    | `false`| If `true`, allows clicking on previous/next steps. |
| `showIndex`    | `boolean`                    | `true` | Show numeric index inside the bullet when not done. |
| `showCaption`  | `boolean`                    | `true` | Show the caption under the label (hidden on narrow screens). |

### Outputs
| Output        | Payload    | When |
|---------------|------------|------|
| `stepChange`  | `number`   | When a step is clicked (if `clickable`) or programmatically triggered. |

---

## Usage

### Component (container)
```ts
import { Component, signal } from '@angular/core';
import { StepperComponent } from '.../stepper/stepper.component';

@Component({
  selector: 'app-order-flow',
  standalone: true,
  imports: [StepperComponent],
  templateUrl: './order-flow.component.html'
})
export class OrderFlowComponent {
  steps = [
    { label: 'Entrega',        caption: 'Confira o endereço' },
    { label: 'Produto',        caption: 'Defina o cartão' },
    { label: 'Personalização', caption: 'Personalize o cartão' },
    { label: 'Adicional',      caption: 'Configure os adicionais' },
    { label: 'Resumo',         caption: 'Confira a solicitação' },
  ];

  current = signal(0);
  goTo(i: number) { this.current.set(i); }
  next() { this.current.update(v => Math.min(v + 1, this.steps.length - 1)); }
  prev() { this.current.update(v => Math.max(v - 1, 0)); }
}
```

### Template
```html
<app-stepper
  [steps]="steps"
  [current]="current()"
  [clickable]="true"
  (stepChange)="goTo($event)">
</app-stepper>
```

---

## Theming (CSS Custom Properties)

Define tokens globally (e.g. in `styles.sass`) or in a wrapper element. Defaults exist in the component’s Sass.

```sass
:root
  --stepper-color-default: #9ea3aa
  --stepper-color-active:  #0a7cff
  --stepper-color-done:    #1f9d55
  --stepper-color-disabled:#c8ccd2
  --stepper-text:          #1f2937
  --stepper-caption:       #6b7280
  --stepper-bullet-bg:     #ffffff
  --stepper-connector:     #e5e7eb
  --stepper-connector-active: var(--stepper-color-active)
  --stepper-color-number-active: #ffffff
```

> Tips: The “active” connector uses a gradient to partially fill the next segment.

---

## Accessibility
- Semantic structure: `nav[aria-valuenow/aria-valuemax] > ol > li > button`.
- Focus visible on buttons; bullets use `aria-hidden` for decorative content.
- Use short labels; captions are optional and collapse below ~720px.

---

## Notes
- Prefer **component-scoped** variables over global resets (avoid global `button { ... !important }`).  
- To center captions below the bullet, the component uses grid alignment on the button (`inline-grid`) and aligns texts accordingly.

---

## Roadmap
- [ ] Vertical variant / icon bullets
- [ ] Keyboard navigation (←/→, Home/End)
- [ ] Optional validation states per step

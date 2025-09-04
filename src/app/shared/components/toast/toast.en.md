<p align="right"><a href="./toast.md">Português (BR)</a></p>

# Toast (Standalone, HTML + Sass)

A lightweight, accessible **toast** solution built from **service + container**. The **service** manages the queue (signals) and the **container** renders the stack. No UI framework.

---

## Files
```
src/app/shared/components/toast/
  ├─ toast.types.ts
  ├─ toast.service.ts
  ├─ toast-container.component.ts
  ├─ toast-container.component.html
  └─ toast-container.component.sass
```

---

## API

### Types
```ts
export type ToastKind = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: number;
  kind: ToastKind;
  message: string;
  duration?: number;          // ms (0 = do not auto-dismiss)
  dismissible?: boolean;      // default: true
  actionLabel?: string;
  onAction?: () => void;
}
```

### Service (`ToastService`)
Core methods:
- `show(message, kind?, options?)` → `id`
- `success(message, options?)`
- `error(message, options?)`
- `info(message, options?)`
- `warning(message, options?)`
- `dismiss(id)`
- `clear()`

> **SSR-safe:** timers are created in the browser only.

### Container (`<app-toast-container>`)  
No `@Input()`s — reads `toast.toasts()` (signal) from the service and renders. Uses `role="status"` (polite) and `role="alert"` for errors.

---

## Usage

1) **Place the container** once (e.g., on Demo Page / App):
```html
<app-toast-container></app-toast-container>
```

2) **Inject & trigger** in your component:
```ts
import { Component, inject } from '@angular/core';
import { ToastService } from './toast.service';

@Component({ standalone: true, template: `
  <button (click)="ok()">Success</button>
  <button (click)="fail()">Error</button>
`})
export class Example {
  private toast = inject(ToastService);

  ok()   { this.toast.success('Request completed.'); }
  fail() { this.toast.error('Something went wrong.', { duration: 7000 }); }
  withAction() {
    this.toast.info('File is ready.', { actionLabel: 'Download', onAction: () => {/*...*/} });
  }
}
```

---

## Theming (CSS Custom Properties)

Global tokens (override in `:root` or per page):

```sass
:root
  --toast-radius: .75rem
  --toast-shadow: 0 6px 20px rgba(0,0,0,.12)
```
Variant colors are baked into the container Sass:
- **success**: `#ecfdf5` / `#86efac` / `#065f46`
- **error**:   `#fee2e2` / `#fca5a5` / `#7f1d1d`
- **info**:    `#eff6ff` / `#93c5fd` / `#1e3a8a`
- **warning**: `#fff7ed` / `#fdba74` / `#7c2d12`

---

## Accessibility
- `aria-live="polite"` on the stack; `role="alert"` for errors (assertive).
- Close button with `aria-label="Close"`.
- Visible focus styles for action/close buttons.

---

## Tips
- Keep it until closed: `{ duration: 0 }`.
- Queue limit: service keeps a capped stack (e.g., 5 toasts).
- Action: `actionLabel` + `onAction()`; it closes after executing.

---

## Troubleshooting
- **Toasts don’t show**: missing `<app-toast-container>` in the DOM.
- **SSR timer issues**: make sure no extra `setTimeout` runs outside the service (which is SSR-safe).

---

## Roadmap
- [ ] Inline/stacked layout in wide screens
- [ ] Exit animation with swipe
- [ ] Custom icon slot & compact density

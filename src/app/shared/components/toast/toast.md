<p align="right"><a href="./toast.en.md">English</a></p>

# Toast (Standalone, HTML + Sass)

Componente de **toasts** leve e acessível: **serviço + container**. O **serviço** gerencia a fila (signals) e o **container** apenas renderiza a pilha. Sem framework de UI.

---

## Arquivos
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

### Tipos
```ts
export type ToastKind = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: number;
  kind: ToastKind;
  message: string;
  duration?: number;          // ms (0 = não auto-fecha)
  dismissible?: boolean;      // default: true
  actionLabel?: string;
  onAction?: () => void;
}
```

### Serviço (`ToastService`)
Métodos principais:
- `show(message, kind?, options?)` → `id`
- `success(message, options?)`
- `error(message, options?)`
- `info(message, options?)`
- `warning(message, options?)`
- `dismiss(id)`
- `clear()`

> **SSR-safe**: timers só são criados no browser.

### Container (`<app-toast-container>`)  
Sem `@Input()`s — lê `toast.toasts()` (signal) do serviço e renderiza. Define `role="status"` (polite) e `role="alert"` para erros.

---

## Uso

1) **Coloque o container** uma vez (ex.: na Demo Page / App):
```html
<app-toast-container></app-toast-container>
```

2) **Injete e dispare** no seu componente:
```ts
import { Component, inject } from '@angular/core';
import { ToastService } from './toast.service';

@Component({ standalone: true, template: `
  <button (click)="ok()">Success</button>
  <button (click)="fail()">Error</button>
`})
export class Exemplo {
  private toast = inject(ToastService);

  ok()   { this.toast.success('Cartão solicitado com sucesso.'); }
  fail() { this.toast.error('Falha ao solicitar cartão.', { duration: 7000 }); }
  withAction() {
    this.toast.info('Arquivo pronto.', { actionLabel: 'Baixar', onAction: () => {/*...*/} });
  }
}
```

---

## Theming (CSS Custom Properties)

Tokens globais (sobrescreva no `:root` ou por página):

```sass
:root
  --toast-radius: .75rem
  --toast-shadow: 0 6px 20px rgba(0,0,0,.12)
```
Cores por variante (já definidas no Sass do container):
- **success**: `#ecfdf5` / `#86efac` / `#065f46`
- **error**:   `#fee2e2` / `#fca5a5` / `#7f1d1d`
- **info**:    `#eff6ff` / `#93c5fd` / `#1e3a8a`
- **warning**: `#fff7ed` / `#fdba74` / `#7c2d12`

---

## Acessibilidade
- `aria-live="polite"` na pilha; para erro, `role="alert"` (assertivo).
- Botão de fechar com `aria-label="Fechar"`.
- Foco visível em botões de ação/fechar.

---

## Dicas
- Manter na tela até fechar: `{ duration: 0 }`.
- Limitar fila: o serviço mantém uma pilha com tamanho máximo configurável (ex.: 5).
- Ação custom: `actionLabel` + `onAction()` fecha após executar.

---

## Troubleshooting
- **Toasts não aparecem**: faltou `<app-toast-container>` no DOM.
- **Estouro de timers no SSR**: verifique se não criou `setTimeout` fora do serviço (que já é SSR-safe).

---

## Roadmap
- [ ] Empilhar lado a lado em telas largas (layout “stacked/inline”)
- [ ] Animação de saída com swipe
- [ ] Suporte a ícones custom (slot) e densidade compacta

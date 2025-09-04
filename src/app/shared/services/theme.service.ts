import { isPlatformBrowser } from '@angular/common';
import { Injectable, effect, signal, PLATFORM_ID, inject, DOCUMENT } from '@angular/core';

import { Theme } from '../model/type/theme.type';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);
  private doc: Document | null = this.isBrowser ? inject(DOCUMENT) : null;

  readonly theme = signal<Theme>(this.load());

  constructor() {
    if (this.isBrowser) {
      // só no browser: sincroniza <html data-theme="..."> e persiste no localStorage
      effect(() => {
        const t = this.theme();
        try {
          const root = this.doc!.documentElement as HTMLElement;
          root.dataset['theme'] = t;
          globalThis.localStorage?.setItem('demo-theme', t);
        } catch { /* ignore */ }
      });
    }
  }

  toggle() {
    this.theme.update(v => (v === 'light' ? 'dark' : 'light'));
  }

  private load(): Theme {
    if (this.isBrowser) {
      try {
        return (localStorage.getItem('demo-theme') as Theme) ?? 'light';
      } catch { /* ignore */ }
    }
    // no servidor (ou se falhar), usa 'light'
    return 'light';
  }
}

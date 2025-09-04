import { isPlatformBrowser } from '@angular/common';
import { Injectable, inject, PLATFORM_ID, signal } from '@angular/core';

import { ToastKind } from '../model/type/toast.types';

import { Toast } from '../model/interface/toast.interface';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  private _toasts = signal<Toast[]>([]);
  toasts = this._toasts;

  private id = 0;
  private timers = new Map<number, any>();
  private MAX = 5;

  show(message: string, kind: ToastKind = 'info', opt: Partial<Toast> = {}) {
    const id = ++this.id;
    const t: Toast = {
      id, kind, message,
      duration: opt.duration ?? 4000,
      dismissible: opt.dismissible ?? true,
      actionLabel: opt.actionLabel,
      onAction: opt.onAction
    };

    const next = [t, ...this._toasts()];
    this._toasts.set(next.slice(0, this.MAX));

    if (t.duration! > 0 && this.isBrowser) {
      this.timers.set(id, setTimeout(() => this.dismiss(id), t.duration));
    }
    return id;
  }

  success(m: string, opt: Partial<Toast> = {}) { return this.show(m, 'success', opt); }
  error(m: string, opt: Partial<Toast> = {})   { return this.show(m, 'error', opt); }
  info(m: string, opt: Partial<Toast> = {})    { return this.show(m, 'info', opt); }
  warning(m: string, opt: Partial<Toast> = {}) { return this.show(m, 'warning', opt); }

  dismiss(id: number) {
    const timer = this.timers.get(id);
    if (timer) { clearTimeout(timer); this.timers.delete(id); }
    this._toasts.set(this._toasts().filter(t => t.id !== id));
  }

  clear() {
    this._toasts().forEach(t => this.dismiss(t.id));
  }
}

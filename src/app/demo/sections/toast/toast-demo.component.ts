import { Component, inject } from '@angular/core';

import { TPipe } from '../../../shared/i18n/t.pipe';

import { I18nService } from '../../../shared/services/i18n.service';
import { ToastService } from '../../../shared/services/toast.service';

@Component({
  selector: 'app-toast-demo',
  standalone: true,
  templateUrl: './toast-demo.component.html',
  styleUrl: './toast-demo.component.sass',
  imports: [
    TPipe
  ]
})
export class ToastDemoComponent {
  private toast = inject(ToastService);
  private i18n  = inject(I18nService);

  ok() {
    this.toast.success(this.i18n.t('toast.msg.success'));
  }

  warn() {
    this.toast.warning(this.i18n.t('toast.msg.warn'));
  }

  info() {
    this.toast.info(this.i18n.t('toast.msg.info'));
  }

  fail() {
    this.toast.error(this.i18n.t('toast.msg.error'), { duration: 7000 });
  }

  withAction() {
    this.toast.info(this.i18n.t('toast.msg.action'), {
      actionLabel: this.i18n.t('toast.action.download'),
      onAction: () => console.log('→', this.i18n.t('toast.action.download'))
    });
  }

  many() {
    this.toast.success(this.i18n.t('toast.msg.many.1'));
    this.toast.info(this.i18n.t('toast.msg.many.2'));
    this.toast.warning(this.i18n.t('toast.msg.many.3'));
    this.toast.error(this.i18n.t('toast.msg.many.4'));
  }

  sticky() {
    this.toast.info(this.i18n.t('toast.msg.sticky'), { duration: 0 });
  }
}

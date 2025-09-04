import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ToastService } from '../../services/toast.service';

import { Toast } from '../../model/interface/toast.interface';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast-container.component.html',
  styleUrl: './toast-container.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToastContainerComponent {
  constructor(public toast: ToastService) {}
  trackById = (_: number, t: Toast) => t.id;

  onAction(t: Toast) {
    t.onAction?.();
    this.toast.dismiss(t.id);
  }
}

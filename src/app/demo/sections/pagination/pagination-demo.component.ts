import { NgIf } from '@angular/common';
import { Component, signal, computed } from '@angular/core';

import { TPipe } from '../../../shared/i18n/t.pipe';

import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';

@Component({
  selector: 'app-pagination-demo',
  standalone: true,
  imports: [NgIf, PaginationComponent, TPipe],
  templateUrl: './pagination-demo.component.html'
})
export class PaginationDemoComponent {
  total = signal(42);
  pageSize = signal(5);
  pageIndex = signal(0);

  // helpers para usar no template
  start = computed(() => this.pageIndex() * this.pageSize() + 1);
  end   = computed(() => Math.min(this.total(), this.start() + this.pageSize() - 1));

  onPageSizeChange(size: number) {
    this.pageSize.set(size);
    const last = Math.max(0, Math.ceil(this.total() / size) - 1);
    if (this.pageIndex() > last) this.pageIndex.set(last);
  }
}

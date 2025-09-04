import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.sass',
  imports: [NgFor, NgIf],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent {
  /** total de itens */
  @Input({ required: true }) total = 0;
  /** itens por página */
  @Input() pageSize = 10;
  /** índice da página (0-based) */
  @Input() pageIndex = 0;
  /** máx. de botões numéricos visíveis */
  @Input() maxVisible = 5;

  /** emite o novo índice (0-based) */
  @Output() pageChange = new EventEmitter<number>();

  get pageCount(): number {
    return Math.max(1, Math.ceil(this.total / this.pageSize));
  }

  get canPrev() { return this.pageIndex > 0; }
  get canNext() { return this.pageIndex < this.pageCount - 1; }

  pages(): number[] {
    const count = this.pageCount;
    if (count <= this.maxVisible) return Array.from({ length: count }, (_, i) => i);

    const half = Math.floor((this.maxVisible - 1) / 2);
    let start = Math.max(0, this.pageIndex - half);
    let end = start + this.maxVisible;

    if (end > count) {
      end = count;
      start = Math.max(0, end - this.maxVisible);
    }
    return Array.from({ length: end - start }, (_, i) => start + i);
  }

  goTo(i: number) {
    if (i === this.pageIndex) return;
    this.pageChange.emit(i);
  }
  prev() { if (this.canPrev) this.pageChange.emit(this.pageIndex - 1); }
  next() { if (this.canNext) this.pageChange.emit(this.pageIndex + 1); }
}

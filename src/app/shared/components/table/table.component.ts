import { CommonModule } from '@angular/common';
import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChild, ContentChildren, EventEmitter, Input, Output, QueryList, TemplateRef } from '@angular/core';

import { ActionKind } from '../../model/type/action-kind.type';

import { ColumnDef } from '../../model/interface/column-def.interface';
import { TableAction } from '../../model/interface/table-action.interface';

import { TableActionsTemplateDirective, TableCellTemplateDirective } from './table.directives';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent<T = any> implements AfterContentInit {
  @Input({ required: true }) data: T[] = [];
  @Input() actions: (TableAction<T> | ActionKind)[] = [];
  @Input({ required: true }) columns: ColumnDef<T>[] = [];

  @Input() loading = false;
  @Input() loadingRows = 5;
  @Input() emptyMessage = 'Nenhum registro encontrado';
  @Input() sortKey?: string;
  @Input() sortDir: 'asc'|'desc' = 'asc';

  /** Mostra coluna de seleção por checkbox */
  @Input() selectable = false;

  /** Mostra coluna de ações (usa slot appActions) */
  @Input() showActions = false;

  /** linhas selecionadas por índice */
  @Input() selected: number[] = [];
  @Output() selectedChange = new EventEmitter<number[]>();
  @Output() sortChange = new EventEmitter<{ key: string; dir: 'asc'|'desc' }>();

  /** evento para ações padrão (se você quiser escutar) */
  @Output() action = new EventEmitter<{ type: string; row: T; index: number }>();

  @ContentChildren(TableCellTemplateDirective) cellTemplates!: QueryList<TableCellTemplateDirective>;
  @ContentChild(TableActionsTemplateDirective) actionsTpl?: TableActionsTemplateDirective;

  get skeletonArray() {
    return Array.from({ length: Math.max(1, this.loadingRows) });
  }

  private cellTplMap = new Map<string, TemplateRef<any>>();

  ngAfterContentInit(): void {
    this.cellTplMap.clear();
    this.cellTemplates?.forEach((d) => this.cellTplMap.set(String(d.name), d.tpl));
  }

  getTemplate(name: string): TemplateRef<any> | null {
    return this.cellTplMap.get(String(name)) ?? null;
  }

  // ===== seleção =====
  isSelected(i: number) {
    return this.selected.includes(i);
  }

  toggleRow(i: number, checked: boolean) {
    const set = new Set(this.selected);
    if (checked) set.add(i); else set.delete(i);
    this.selected = [...set].sort((a,b)=>a-b);
    this.selectedChange.emit(this.selected);
  }

  get allSelected() {
    return this.data.length > 0 && this.selected.length === this.data.length;
  }

  toggleAll(checked: boolean) {
    this.selected = checked ? this.data.map((_, i) => i) : [];
    this.selectedChange.emit(this.selected);
  }

  // ===== chip helpers =====
  chipLabel(col: ColumnDef<T>, value: any): string {
    if (!col.chipMap) return String(value ?? '');
    const entry = col.chipMap[String(value)] ?? { label: String(value ?? '') };
    return entry.label;
  }

  chipClass(col: ColumnDef<T>, value: any): string {
    if (!col.chipMap) return 'chip';
    const entry = col.chipMap[String(value)];
    const variant = entry?.variant ? ` chip--${entry.variant}` : '';
    return `chip${variant}`;
  }

  get normalizedActions(): TableAction<T>[] {
    return (this.actions ?? []).map(a => typeof a === 'string' ? ({ kind: a }) : a);
  }

  get hasActions(): boolean {
    // renderiza a coluna se: showActions=true OU foram passadas actions OU existe template projetado
    return !!(this.showActions || (this.actions && this.actions.length) || this.actionsTpl);
  }

  isActionDisabled(a: TableAction<T>, row: T, index: number) {
    return a.disabled ? !!a.disabled(row, index) : false;
  }

  emitAction(kind: ActionKind, row: T, index: number) {
    this.action.emit({ type: kind, row, index });
  }

  onHeaderClick(col: ColumnDef<T>) {
    if (!col.key || col.type === 'custom') return;
    const key = String(col.key);
    const dir = (this.sortKey === key && this.sortDir === 'asc') ? 'desc' : 'asc';
    this.sortKey = key; this.sortDir = dir;
    this.sortChange.emit({ key, dir });
  }

  trackByIndex = (_: number, __: unknown) => _;
  trackByCol = (_: number, c: ColumnDef) => c.key as string;
  protected readonly String = String;
}

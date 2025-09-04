import { NgIf } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';

import { TPipe } from '../../../shared/i18n/t.pipe';

import { I18nService } from '../../../shared/services/i18n.service';

import { ColumnDef } from '../../../shared/model/interface/column-def.interface';
import { TableAction } from '../../../shared/model/interface/table-action.interface';
import { AdicionalRow } from '../../../shared/model/interface/adicional-row.interface';

import { TableComponent } from '../../../shared/components/table/table.component';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import {SortState} from '../../../shared/model/type/sort-state.type';

@Component({
  selector: 'app-table-demo',
  standalone: true,
  imports: [NgIf, TableComponent, PaginationComponent, TPipe],
  templateUrl: './table-demo.component.html',
  styleUrl: './table-demo.component.sass'
})
export class TableDemoComponent {
  private i18n = inject(I18nService);

  actions = computed<TableAction<AdicionalRow>[]>(() => [
    { kind: 'edit', ariaLabel: this.i18n.t('table.action.edit'), iconUrl: '/icons/svg/pen-box.svg' }
  ]);

  rows: AdicionalRow[] = [
    { nome: 'Nome Colaborador',   tipo: 'Correntista',     documento: '111.222.333-44', limite: 'Limite máximo atribuído', nomeImpresso: 'NOME IMPRESSO' },
    { nome: 'Nome Colaborador - Não correntista', tipo: 'Não correntista', documento: '555.666.777-88', limite: 'Limite máximo atribuído', nomeImpresso: 'NOME IMPRESSO 2' },
    { nome: 'Nome Colaborador - Correntista 2',tipo: 'Correntista', documento: '012.345.678-90', limite: 'Limite máximo atribuído', nomeImpresso: 'NOME IMPRESSO 3' },
    { nome: 'Nome Colaborador - Não correntista 3',tipo: 'Não correntista', documento: '098.765.432-10', limite: 'Limite máximo atribuído', nomeImpresso: 'NOME IMPRESSO 4' },
    { nome: 'Nome Colaborador - Correntista 3',tipo: 'Correntista', documento: '111.111.111-11', limite: 'Limite máximo atribuído', nomeImpresso: 'NOME IMPRESSO 5' },
    { nome: 'Nome Colaborador - Não correntista 5',tipo: 'Não correntista', documento: '999.000.111-22', limite: 'Limite máximo atribuído', nomeImpresso: 'NOME IMPRESSO 6' },
  ];

  loading = signal(false);
  empty = signal(false);

  selected = signal<number[]>([]);

  columns: ColumnDef<AdicionalRow>[] = [
    { key: 'nome',        header: 'Nome do adicional' },
    {
      key: 'tipo',
      header: 'Tipo de adicional',
      type: 'chip',
      align: 'center',
      width: '180px',
      chipMap: {
        'Correntista':     { label: 'Correntista',     variant: 'orange' },
        'Não correntista': { label: 'Não correntista', variant: 'teal'   },
      }
    },
    { key: 'documento',   header: 'Documento',         width: '160px' },
    { key: 'limite',      header: 'Limite atribuído',  width: '220px' },
    { key: 'nomeImpresso',header: 'Nome impresso',     width: '180px' },
  ];

  pageSize = 5;

  pageIndex = signal(0);

  sort = signal<SortState | null>(null);

  // comparador amigável p/ strings e números
  private collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });

  sortedRows = computed(() => {
    const rows = this.empty() ? [] : this.rows;
    const s = this.sort();
    if (!s) return rows;

    const key = s.key as keyof AdicionalRow;
    const dir = s.dir === 'asc' ? 1 : -1;

    return [...rows].sort((a, b) => {
      const av = a[key] as any;
      const bv = b[key] as any;
      const cmp = (typeof av === 'number' && typeof bv === 'number')
        ? av - bv
        : this.collator.compare(String(av ?? ''), String(bv ?? ''));
      return cmp * dir;
    });
  });

  pagedRows = computed(() => {
    const start = this.pageIndex() * this.pageSize;
    return this.sortedRows().slice(start, start + this.pageSize);
  });

  onSort(e: SortState) {
    this.sort.set(e);
    this.pageIndex.set(0); // volta pra primeira página ao ordenar
  }

  onEdit(row: AdicionalRow, index: number) {
    console.log('editar', index, row);
  }

  onAction(e: { type: string; row: AdicionalRow; index: number }) {
    if (e.type === 'edit') this.onEdit(e.row, e.index);
  }

  simulateLoad() {
    if (this.loading()) return;
    this.loading.set(true);
    setTimeout(() => this.loading.set(false), 1500);
  }

  toggleEmpty() {
    this.empty.update(v => !v);
    // opcional: voltar para a primeira página ao esvaziar
    this.pageIndex.set(0);
  }
}

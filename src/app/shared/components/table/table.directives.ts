import { Directive, Input, TemplateRef } from '@angular/core';

/** Célula custom de uma coluna específica */
@Directive({
  selector: 'ng-template[appCell]',
  standalone: true
})
export class TableCellTemplateDirective {
  /** nome da coluna (mesmo 'key' do ColumnDef) */
  @Input('appCell') name!: string;
  constructor(public tpl: TemplateRef<any>) {}
}

/** Template da coluna de ações (última coluna) */
@Directive({
  selector: 'ng-template[appActions]',
  standalone: true
})
export class TableActionsTemplateDirective {
  constructor(public tpl: TemplateRef<any>) {}
}

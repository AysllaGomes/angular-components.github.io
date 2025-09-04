import { Dict } from '../../model/type/dict.type';

export const TABLE: Dict = {
  // seção (título/lead já estão em sections.ts)
  'section.table.title': { pt: 'Tabela', en: 'Table' },
  'section.table.lead':  {
    pt: 'Tabela personalizável com seleção, chips e ações.',
    en: 'Customizable table with selection, chips and actions.'
  },

  // toolbar da demo
  'table.toolbar.simulate':         { pt: 'Simular loading (1.5s)', en: 'Simulate loading (1.5s)' },
  'table.toolbar.simulate.loading': { pt: 'Carregando…',            en: 'Loading…' },
  'table.toolbar.toggleEmpty.show': { pt: 'Mostrar vazio',          en: 'Show empty' },
  'table.toolbar.toggleEmpty.hide': { pt: 'Mostrar dados',          en: 'Show data' },

  // mensagens/labels
  'table.empty': { pt: 'Sem registros para exibir', en: 'No records to display' },
  'table.action.edit': { pt: 'Editar', en: 'Edit' },

  // (opcional) cabeçalhos das colunas
  'table.col.nome':         { pt: 'Nome do adicional',  en: 'Additional name' },
  'table.col.tipo':         { pt: 'Tipo de adicional',  en: 'Additional type' },
  'table.col.documento':    { pt: 'Documento',          en: 'Document' },
  'table.col.limite':       { pt: 'Limite atribuído',   en: 'Assigned limit' },
  'table.col.nomeImpresso': { pt: 'Nome impresso',      en: 'Printed name' },
};

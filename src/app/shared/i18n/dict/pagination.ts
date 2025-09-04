import { Dict } from '../../model/type/dict.type';

export const PAGINATION: Dict = {
  // seção
  'section.pagination.title': { pt: 'Paginação', en: 'Pagination' },
  'section.pagination.lead':  {
    pt: 'Componente independente, sem dependência da Tabela. Mostra botões somente quando há mais itens que o pageSize.',
    en: 'Standalone component, independent from the Table. Only shows controls when there are more items than pageSize.'
  },

  // rótulos/legendas da demo
  'pagination.itemsPerPage': { pt: 'Itens por página', en: 'Items per page' },
  'pagination.range':       { pt: 'Mostrando {{start}}–{{end}} de {{total}}',
    en: 'Showing {{start}}–{{end}} of {{total}}' },

  // (opcional) se quiser usar no próprio componente de paginação
  'pagination.first':       { pt: 'Primeira', en: 'First' },
  'pagination.prev':        { pt: 'Anterior', en: 'Prev' },
  'pagination.next':        { pt: 'Próxima',  en: 'Next' },
  'pagination.last':        { pt: 'Última',   en: 'Last' },
};

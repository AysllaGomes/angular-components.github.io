import { Dict } from '../../model/type/dict.type';

export const TOAST: Dict = {
  // seção
  'section.toast.title': { pt: 'Toast', en: 'Toast' },
  'section.toast.lead':  {
    pt: 'Exemplos de disparo de toasts (success, error, info, warning, com ação).',
    en: 'Examples of firing toasts (success, error, info, warning, with action).'
  },

  // botões da toolbar
  'toast.btn.success': { pt: 'Sucesso',  en: 'Success' },
  'toast.btn.error':   { pt: 'Erro',     en: 'Error' },
  'toast.btn.info':    { pt: 'Info',     en: 'Info' },
  'toast.btn.warn':    { pt: 'Alerta',   en: 'Warning' },
  'toast.btn.ghost':   { pt: 'Com ação', en: 'With action' },
  'toast.btn.many':    { pt: 'Vários de uma vez', en: 'Many at once' },
  'toast.btn.sticky':  { pt: 'Ficar na tela (duration: 0)', en: 'Sticky (duration: 0)' },

  // mensagens
  'toast.msg.success': { pt: 'Mensagem de sucesso.', en: 'Success message.' },
  'toast.msg.warn':    { pt: 'Mensagem de alerta.',  en: 'Warning message.' },
  'toast.msg.info':    { pt: 'Mensagem de info.',    en: 'Info message.' },
  'toast.msg.error':   {
    pt: 'Recomece sua jornada ou entre em contato com o suporte.',
    en: 'Restart your journey or contact support.'
  },
  'toast.msg.action':  {
    pt: 'Arquivo pronto para download.',
    en: 'File is ready to download.'
  },
  'toast.msg.many.1':  { pt: 'Pedido enviado!',        en: 'Order submitted!' },
  'toast.msg.many.2':  { pt: 'Processando…',           en: 'Processing…' },
  'toast.msg.many.3':  { pt: 'Atenção: revise os campos.', en: 'Warning: review the fields.' },
  'toast.msg.many.4':  { pt: 'Falha ao salvar.',       en: 'Failed to save.' },
  'toast.msg.sticky':  {
    pt: 'Este toast só sai no X (duration: 0).',
    en: 'This toast only closes on X (duration: 0).'
  },

  // rótulos de ação
  'toast.action.download': { pt: 'Baixar', en: 'Download' },
};

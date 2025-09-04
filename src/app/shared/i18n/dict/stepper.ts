import { Dict } from '../../model/type/dict.type';

export const STEPPER: Dict = {
  'stepper.demo.basic.title':     { pt: '1) Básico (clique habilitado)', en: '1) Basic (click enabled)' },
  'stepper.demo.basic.prev':      { pt: '← Voltar',                      en: '← Back' },
  'stepper.demo.basic.next':      { pt: 'Avançar →',                     en: 'Next →' },

  'stepper.demo.disabled.title':  { pt: '2) Etapa desabilitada',         en: '2) Disabled step' },

  'stepper.demo.compact.title':   { pt: '3) Compacto (exemplo de tema local)', en: '3) Compact (local theming example)' },
  'stepper.demo.compact.note':    { pt: 'Wrapper aplica variáveis CSS para reduzir espaçamentos/tamanhos.',
    en: 'Wrapper applies CSS variables to reduce spacings/sizes.' },

  // etapas
  'stepper.step.delivery':            { pt: 'Entrega',        en: 'Delivery' },
  'stepper.step.delivery.caption':    { pt: 'Confira o endereço', en: 'Check the address' },
  'stepper.step.product':             { pt: 'Produto',        en: 'Product' },
  'stepper.step.product.caption':     { pt: 'Defina o cartão', en: 'Choose the card' },
  'stepper.step.customization':       { pt: 'Personalização', en: 'Customization' },
  'stepper.step.customization.caption': { pt: 'Personalize o cartão', en: 'Customize the card' },
  'stepper.step.addons':              { pt: 'Adicional',      en: 'Add-ons' },
  'stepper.step.addons.caption':      { pt: 'Configure os adicionais', en: 'Configure add-ons' },
  'stepper.step.summary':             { pt: 'Resumo',         en: 'Summary' },
  'stepper.step.summary.caption':     { pt: 'Confira a solicitação', en: 'Review the request' },
};

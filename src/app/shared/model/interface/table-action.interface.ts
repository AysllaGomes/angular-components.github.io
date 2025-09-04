import { ActionKind } from '../type/action-kind.type';

export interface TableAction<T = any> {
  kind: ActionKind;                     // 'edit', 'delete', 'view', 'download'...
  label?: string;                       // tooltip/aria (fallback usa o kind)
  ariaLabel?: string;                   // acessibilidade
  visible?: (row: T, index: number) => boolean;   // exibir por linha?
  disabled?: (row: T, index: number) => boolean;  // desabilitar por linha?
  // opcional: se quiser trocar por um asset específico
  iconUrl?: string;                     // se fornecido, usa <img>, senão ícone inline (currentColor)
}

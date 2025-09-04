import { ToastKind } from '../type/toast.types';

export interface Toast {
  id: number;
  kind: ToastKind;
  message: string;
  duration?: number;         // ms (0 = não auto-fecha)
  dismissible?: boolean;     // default: true
  actionLabel?: string;
  onAction?: () => void;
}

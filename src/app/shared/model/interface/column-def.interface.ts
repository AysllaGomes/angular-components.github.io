import { Cell } from '../type/cell.type';
import { Align } from '../type/align.type';

import { ChipMapEntry } from './chip-map-entry.interface';

export interface ColumnDef<T = any> {
  /** chave do objeto (ex.: 'nome', 'tipo', ...) */
  key: keyof T | string;
  header: string;
  type?: Cell;
  width?: string;
  align?: Align;
  chipMap?: Record<string, ChipMapEntry>;
}

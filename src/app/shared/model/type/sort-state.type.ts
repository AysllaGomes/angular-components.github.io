import { SortDir } from './sort-dir.type';

import { AdicionalRow } from '../interface/adicional-row.interface';

export type SortState = { key: keyof AdicionalRow | string; dir: SortDir };

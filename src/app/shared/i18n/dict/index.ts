import { COMMON } from './common';
import { SECTIONS } from './sections';
import { STEPPER } from './stepper';
import { TABLE } from './table';
import { PAGINATION } from './pagination';
import { TOAST } from './toast';

import { Dict } from '../../model/type/dict.type';

export const DICT: Dict = {
  ...COMMON,
  ...SECTIONS,
  ...STEPPER,
  ...TABLE,
  ...PAGINATION,
  ...TOAST,
};

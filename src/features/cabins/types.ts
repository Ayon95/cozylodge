import { Tables } from '@/types/database';

export type SelectedCabinInfo = Pick<Tables<'cabin'>, 'id' | 'name'>;

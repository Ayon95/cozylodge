import { Tables } from './database';

export type CabinDTO = Omit<Tables<'cabin'>, 'id' | 'created_at' | 'image_url'>;

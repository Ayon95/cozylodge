import { Tables } from './database';

export type SettingsUpdateDTO = Partial<Omit<Tables<'settings'>, 'id' | 'user_id' | 'created_at'>>;

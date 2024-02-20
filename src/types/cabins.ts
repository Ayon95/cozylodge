import { Tables } from './database';

export type CabinCreateDTO = Omit<Tables<'cabin'>, 'id' | 'created_at' | 'image_url'> & {
	image: FileList;
};
export type CabinUpdateDTO = Partial<
	Omit<Tables<'cabin'>, 'id' | 'user_id' | 'created_at'> & { image: FileList }
>;

export type CabinFields = keyof Tables<'cabin'>;

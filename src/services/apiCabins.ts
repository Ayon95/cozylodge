import supabase from './supabase';

export async function getCabins(userId: string | null | undefined) {
	if (!userId) return [];

	const { data: cabins, error } = await supabase.from('cabin').select('*').eq('user_id', userId);

	if (error) {
		console.error(error);
		throw new Error('Cabins could not be loaded');
	}

	return cabins;
}

export async function deleteCabin(id: number) {
	const { error } = await supabase.from('cabin').delete().eq('id', id);

	if (error) {
		console.error(error);
		throw new Error('Cabin could not be deleted');
	}
}

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

import supabase from './supabase';
import { SettingsUpdateDTO } from '@/types/settings';

export async function getSettings(userId: string | null | undefined) {
	if (!userId) return null;

	// There will be only one row of settings
	const { data: settings, error } = await supabase.from('settings').select('*').single();

	if (error) {
		console.error(error);
		throw new Error('Settings could not be loaded');
	}

	return settings;
}

export async function updateSettings({
	settingsId,
	updatedData,
}: {
	settingsId: number;
	updatedData: SettingsUpdateDTO;
}) {
	const { error } = await supabase.from('settings').update(updatedData).eq('id', settingsId);

	if (error) {
		console.error(error);
		throw new Error('Settings could not be updated');
	}
}

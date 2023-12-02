import { CabinDTO } from '@/types/cabins';
import supabase from './supabase';
import { createUniqueId } from '@/utils/helpers';
import { CABIN_IMAGES_BUCKET } from '@/utils/constants';

export async function getCabins(userId: string | null | undefined) {
	if (!userId) return [];

	const { data: cabins, error } = await supabase.from('cabin').select('*').eq('user_id', userId);

	if (error) {
		console.error(error);
		throw new Error('Cabins could not be loaded');
	}

	return cabins;
}

export async function createCabin({
	cabinData,
	cabinImage,
}: {
	cabinData: CabinDTO;
	cabinImage: File;
}) {
	const uniqueImageName = `${createUniqueId()}_${cabinImage.name}`;
	const imageUrl = `${
		import.meta.env.VITE_SUPABASE_URL
	}/storage/v1/object/public/${CABIN_IMAGES_BUCKET}/${uniqueImageName}`;

	const { data: createdCabin, error } = await supabase
		.from('cabin')
		.insert({ ...cabinData, image_url: imageUrl })
		.select();

	if (error) {
		console.error(error);
		throw new Error('Cabin could not be created');
	}

	const { error: imageUploadError } = await supabase.storage
		.from(CABIN_IMAGES_BUCKET)
		.upload(`/${uniqueImageName}`, cabinImage);

	if (imageUploadError) {
		await supabase.from('cabin').delete().eq('id', createdCabin[0].id);
		console.error(error);
		throw new Error('Failed to upload image and cabin was not created');
	}
}

export async function deleteCabin(id: number) {
	const { error } = await supabase.from('cabin').delete().eq('id', id);

	if (error) {
		console.error(error);
		throw new Error('Cabin could not be deleted');
	}
}

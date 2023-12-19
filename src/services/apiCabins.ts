import { CabinCreateDTO, CabinUpdateDTO } from '@/types/cabins';
import supabase from './supabase';
import { createUniqueId, getImageNameFromUrl } from '@/utils/helpers';
import { CABIN_IMAGES_BUCKET, SUPABASE_STORAGE_BASE_URL } from '@/utils/constants';
import { Tables } from '@/types/database';

export async function getCabins(userId: string | null | undefined) {
	if (!userId) return [];

	const { data: cabins, error } = await supabase.from('cabin').select('*').eq('user_id', userId);

	if (error) {
		console.error(error);
		throw new Error('Cabins could not be loaded');
	}

	return cabins;
}

export async function createCabin(cabinData: CabinCreateDTO) {
	const { image, ...cabinDataWithoutImage } = cabinData;
	const uniqueImageName = `${createUniqueId()}_${image[0].name}`;
	const imageUrl = `${SUPABASE_STORAGE_BASE_URL}/public/${CABIN_IMAGES_BUCKET}/${uniqueImageName}`;

	const { data: createdCabin, error } = await supabase
		.from('cabin')
		.insert({ ...cabinDataWithoutImage, image_url: imageUrl })
		.select();

	if (error) {
		console.error(error);
		throw new Error('Cabin could not be created');
	}

	const { error: imageUploadError } = await supabase.storage
		.from(CABIN_IMAGES_BUCKET)
		.upload(`/${uniqueImageName}`, image[0]);

	if (imageUploadError) {
		await supabase.from('cabin').delete().eq('id', createdCabin[0].id);
		console.error(error);
		throw new Error('Failed to upload image and cabin was not created');
	}
}

export async function updateCabin({
	cabin,
	updatedData,
}: {
	cabin: Tables<'cabin'>;
	updatedData: CabinUpdateDTO;
}) {
	if (Object.keys(updatedData).length === 0) return;

	const { image, ...updatedDataWithoutImage } = updatedData;
	const existingImageName = getImageNameFromUrl(cabin.image_url);

	const { error: cabinUpdateError } = await supabase
		.from('cabin')
		.update(updatedDataWithoutImage)
		.eq('id', cabin.id);

	if (cabinUpdateError) {
		console.error(cabinUpdateError);
		throw new Error('Cabin could not be updated');
	}

	if (image) {
		const { error: imageUpdateError } = await supabase.storage
			.from(CABIN_IMAGES_BUCKET)
			.update(`/${existingImageName}`, image[0]);

		if (imageUpdateError) {
			console.error(imageUpdateError);
			throw new Error('Failed to update cabin image');
		}
	}
}

export async function deleteCabin(id: number) {
	const { error } = await supabase.from('cabin').delete().eq('id', id);

	if (error) {
		console.error(error);
		throw new Error('Cabin could not be deleted');
	}
}

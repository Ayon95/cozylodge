import { Tables } from '@/types/database';
import { CABINS_BASE_URL, CABIN_IMAGES_BUCKET, SUPABASE_STORAGE_BASE_URL } from '@/utils/constants';
import { DefaultBodyType, PathParams, rest } from 'msw';
import { db } from '../db';
import { getIdFromQueryString } from '@/utils/helpers';

export const cabinHandlers = [
	rest.get<DefaultBodyType, PathParams<string>, Tables<'cabin'>[]>(
		CABINS_BASE_URL,
		(_req, res, ctx) => {
			const cabins = db.cabin.getAll();
			return res(ctx.json(cabins));
		}
	),
	rest.post(CABINS_BASE_URL, async (req, res, ctx) => {
		const data = await req.json();
		db.cabin.create({ ...data, id: 3 });
		return res(ctx.status(201));
	}),
	rest.patch(CABINS_BASE_URL, async (req, res, ctx) => {
		const cabinId = getIdFromQueryString(req.url);
		const data = await req.json();

		db.cabin.update({ where: { id: { equals: cabinId } }, data });
		return res(ctx.status(204));
	}),
	rest.delete(CABINS_BASE_URL, (req, res, ctx) => {
		const cabinId = getIdFromQueryString(req.url);

		db.cabin.delete({ where: { id: { equals: cabinId } } });
		return res(ctx.status(204));
	}),
	// endpoint for uploading images to Supabase storage bucket
	rest.post(`${SUPABASE_STORAGE_BASE_URL}/${CABIN_IMAGES_BUCKET}/*`, (_req, res, ctx) => {
		return res(ctx.status(200));
	}),
	// endpoint for updating images in Supabase storage bucket
	rest.put(`${SUPABASE_STORAGE_BASE_URL}/${CABIN_IMAGES_BUCKET}/*`, (_req, res, ctx) => {
		return res(ctx.status(200));
	}),
];

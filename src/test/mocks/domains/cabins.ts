import { Tables } from '@/types/database';
import { CABINS_BASE_URL, CABIN_IMAGES_BUCKET } from '@/utils/constants';
import { DefaultBodyType, PathParams, rest } from 'msw';
import { db } from '../db';

export const cabinHandlers = [
	rest.get<DefaultBodyType, PathParams<string>, Tables<'cabin'>[]>(
		CABINS_BASE_URL,
		(_req, res, ctx) => {
			const cabins = db.cabin.getAll();
			return res(ctx.json(cabins));
		}
	),
	// endpoint for uploading images to Supabase storage bucket
	rest.post(
		`${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/${CABIN_IMAGES_BUCKET}/*`,
		(_req, res, ctx) => {
			return res(ctx.status(200));
		}
	),
	rest.post(CABINS_BASE_URL, async (req, res, ctx) => {
		const data = await req.json();
		db.cabin.create({ ...data, id: 3 });
		return res(ctx.status(201));
	}),
	rest.delete(CABINS_BASE_URL, (req, res, ctx) => {
		const queryParams = new URL(req.url).searchParams;
		// cabin ID will be in this format -> ?id=eq.1
		const cabinId = Number(queryParams.get('id')?.split('.')[1]);

		db.cabin.delete({ where: { id: { equals: cabinId } } });
		return res(ctx.status(204));
	}),
];

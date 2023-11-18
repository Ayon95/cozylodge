import { Tables } from '@/types/database';
import { CABINS_BASE_URL } from '@/utils/constants';
import { DefaultBodyType, PathParams, rest } from 'msw';
import { db } from '../db';

export const cabinHandlers = [
	rest.get<DefaultBodyType, PathParams<string>, Tables<'cabin'>[]>(
		CABINS_BASE_URL,
		(_, res, ctx) => {
			const cabins = db.cabin.getAll();
			return res(ctx.json(cabins));
		}
	),
	rest.delete(CABINS_BASE_URL, (req, res, ctx) => {
		const queryParams = new URL(req.url).searchParams;
		// cabin ID will be in this format -> ?id=eq.1
		const cabinId = Number(queryParams.get('id')?.split('.')[1]);

		db.cabin.delete({ where: { id: { equals: cabinId } } });
		return res(ctx.status(204));
	}),
];

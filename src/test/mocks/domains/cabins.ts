import { cabins } from '@/test/fixtures/cabins';
import { Tables } from '@/types/database';
import { CABINS_BASE_URL } from '@/utils/constants';
import { DefaultBodyType, PathParams, rest } from 'msw';

export const cabinHandlers = [
	rest.get<DefaultBodyType, PathParams<string>, Tables<'cabin'>[]>(
		CABINS_BASE_URL,
		(_, res, ctx) => {
			return res(ctx.json(cabins));
		}
	),
	rest.delete(CABINS_BASE_URL, (_, res, ctx) => {
		return res(ctx.status(204));
	}),
];

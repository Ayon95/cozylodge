import { cabins } from '@/test/fixtures/cabins';
import { Tables } from '@/types/database';
import { DefaultBodyType, PathParams, rest } from 'msw';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

export const cabinHandlers = [
	rest.get<DefaultBodyType, PathParams<string>, Tables<'cabin'>[]>(
		`${SUPABASE_URL}/rest/v1/cabin`,
		(req, res, ctx) => {
			return res(ctx.json(cabins));
		}
	),
];

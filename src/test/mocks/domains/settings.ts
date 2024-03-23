import { rest } from 'msw';

import { SETTINGS_BASE_URL } from '@/utils/constants';
import { db } from '../db';
import { getIdFromQueryString } from '@/utils/helpers';

export const settingsHandlers = [
	rest.get(SETTINGS_BASE_URL, (_req, res, ctx) => {
		const settings = db.settings.getAll()[0];
		return res(ctx.json(settings));
	}),
	rest.patch(SETTINGS_BASE_URL, async (req, res, ctx) => {
		const settingsId = getIdFromQueryString(req.url);
		const data = await req.json();

		db.settings.update({ where: { id: { equals: settingsId } }, data });
		return res(ctx.status(204));
	}),
];

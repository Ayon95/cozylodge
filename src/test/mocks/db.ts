import { factory } from '@mswjs/data';
import Cabin from './models/cabin';
import { cabins } from '../fixtures/cabins';

export const db = factory({
	cabin: Cabin,
});

// Seed database with initial data

for (const cabin of cabins) {
	db.cabin.create(cabin);
}

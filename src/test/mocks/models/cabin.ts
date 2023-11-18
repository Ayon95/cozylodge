import { nullable, primaryKey } from '@mswjs/data';

const Cabin = {
	created_at: () => new Date().toISOString(),
	description: String,
	discount: nullable(Number),
	id: primaryKey(Number),
	image_url: String,
	max_capacity: Number,
	name: String,
	regular_price: Number,
	user_id: String,
};

export default Cabin;

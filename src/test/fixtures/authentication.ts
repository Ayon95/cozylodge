import { AuthTokenResponse } from '@supabase/supabase-js';

const user = {
	id: 'testId',
	aud: 'authenticated',
	role: 'authenticated',
	email: 'user@example.com',
	email_confirmed_at: '2023-09-28T04:22:23.540006Z',
	phone: '',
	confirmed_at: '2023-09-28T04:22:23.540006Z',
	last_sign_in_at: '2023-10-16T15:52:55.42521423Z',
	app_metadata: {
		provider: 'email',
		providers: ['email'],
	},
	user_metadata: {},
	identities: [
		{
			id: 'testId',
			user_id: 'testId',
			identity_data: {
				email: 'user@example.com',
				sub: 'testId',
			},
			provider: 'email',
			last_sign_in_at: '2023-09-28T04:22:23.526699Z',
			created_at: '2023-09-28T04:22:23.526732Z',
			updated_at: '2023-09-28T04:22:23.526732Z',
		},
	],
	created_at: '2023-09-28T04:22:23.500637Z',
	updated_at: '2023-10-16T15:52:55.440889Z',
};

const session = {
	access_token: 'test',
	token_type: 'bearer',
	expires_in: 3600,
	refresh_token: 'test',
	user,
	expires_at: 1696999505,
};

export const authResponse: AuthTokenResponse = {
	data: {
		user,
		session,
	},
	error: null,
};

export const userSession = {
	data: {
		session,
	},
	error: null,
};

export const nonExistentSession = {
	data: {
		session: null,
	},
	error: null,
};

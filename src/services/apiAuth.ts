import supabase from './supabase';

interface UserData {
	fullName: string;
	email: string;
	password: string;
}

export async function signup({ fullName, email, password }: UserData) {
	const { data, error } = await supabase.auth.signUp({
		email,
		password,
		options: { data: { full_name: fullName, avatar: '' } },
	});

	if (error) throw new Error(error.message);

	return data;
}

export async function login(credentials: { email: string; password: string }) {
	const { data, error } = await supabase.auth.signInWithPassword(credentials);

	if (error) {
		throw new Error(error.message);
	}

	return data;
}

export async function getCurrentUser() {
	const sessionResponse = await supabase.auth.getSession();

	if (!sessionResponse.data.session) return null;

	return sessionResponse.data.session.user;
}

export async function logout() {
	await supabase.auth.signOut();
}

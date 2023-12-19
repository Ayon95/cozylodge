export const MIN_PASSWORD_LENGTH = 6;
export const MIN_FULL_NAME_LENGTH = 3;
export const USER_QUERY_KEY = 'user';
// In milliseconds
export const ACCESS_TOKEN_EXPIRATION_TIME = 1 * 60 * 60 * 1000;

export const SUPABASE_STORAGE_BASE_URL = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object`;

export const CABINS_QUERY_KEY = 'cabins';
export const CABINS_BASE_URL = `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/cabin`;
export const MIN_CABIN_NAME_LENGTH = 3;
export const MAX_CABIN_DISCOUNT = 100;
// In bytes
export const MAX_CABIN_IMAGE_SIZE = 5 * 1024 * 1024;
export const CABIN_IMAGES_BUCKET = 'cabin-images';

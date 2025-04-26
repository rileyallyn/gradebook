import { INSTANT_APP_ADMIN_TOKEN, INSTANT_APP_ID } from '$env/static/private';
import { init } from '@instantdb/admin';
import schema, { type AppSchema } from '../../../instant.schema';

export const db = init({
	appId: INSTANT_APP_ID,
	adminToken: INSTANT_APP_ADMIN_TOKEN,
	schema
});

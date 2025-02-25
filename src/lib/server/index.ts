import { INSTANT_APP_ADMIN_TOKEN, INSTANT_APP_ID } from '$env/static/private';
import { init } from '@instantdb/admin';
import schema from '../../../instant.schema';

const db = init({
	appId: INSTANT_APP_ID,
	adminToken: INSTANT_APP_ADMIN_TOKEN,
	schema
});

export const api = {
	getHomerooms: async () =>
		db.query({
			homerooms: {
				teachers: {},
				students: {}
			}
		}),
	getTeachers: async () =>
		db.query({
			teachers: {}
		}),
	getStudents: async () =>
		db.query({
			students: {
				homeroom: {},
				teachers: {},
				classes: {
					assignemnts: {
						grades: {}
					}
				},
				assignments: {
					grades: {}
				},
				grades: {}
			}
		}),
	getClasses: async () =>
		db.query({
			classes: {
				assignemnts: {}
			}
		}),
	getAssignments: async () =>
		db.query({
			assignments: {
				grades: {},
				students: {
					grades: {}
				},
				class: {
					teachers: {}
				}
			}
		})
};

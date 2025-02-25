import { INSTANT_APP_ADMIN_TOKEN, INSTANT_APP_ID } from '$env/static/private';
import { id, init, tx } from '@instantdb/admin';
import schema from '../../../instant.schema';

const db = init({
	appId: INSTANT_APP_ID,
	adminToken: INSTANT_APP_ADMIN_TOKEN,
	schema
});

export const api = {
	getHomerooms: async () =>
		await db.query({
			homerooms: {
				teachers: {},
				students: {}
			},
			classGrades: {}
		}),
	addHomeroom: async (homeroomName: string, grade: string) =>
		await db.transact([db.tx.homerooms[id()].update({ name: homeroomName, grade })]),
	getClassGrades: async () => await db.query({ classGrades: {} }),
	getTeachers: async () =>
		await db.query({
			teachers: {}
		}),
	getStudents: async () =>
		await db.query({
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
		await db.query({
			classes: {
				assignemnts: {}
			}
		}),
	getAssignments: async () =>
		await db.query({
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

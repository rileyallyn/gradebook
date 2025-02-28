import { INSTANT_APP_ADMIN_TOKEN, INSTANT_APP_ID } from '$env/static/private';
import { id, init, tx, type InstaQLEntity } from '@instantdb/admin';
import schema, { type AppSchema } from '../../../instant.schema';

const db = init({
	appId: INSTANT_APP_ID,
	adminToken: INSTANT_APP_ADMIN_TOKEN,
	schema
});

type Entity<T extends keyof AppSchema['entities']> = InstaQLEntity<AppSchema, T>;
type NoIdEntity<T extends keyof AppSchema['entities']> = Omit<InstaQLEntity<AppSchema, T>, 'id'>;

export const api = {
	getHomerooms: async () =>
		await db.query({
			homerooms: {
				teachers: {},
				students: {}
			},
			classGradeOptions: {}
		}),
	getHomeroom: async (homeroomId: string) =>
		await db.query({
			homerooms: {
				$: {
					where: {
						id: homeroomId
					}
				},
				teachers: {},
				students: {}
			}
		}),
	addHomeroom: async (newHomeroom: NoIdEntity<'homerooms'>) =>
		await db.transact([db.tx.homerooms[id()].update(newHomeroom)]),
	deleteHomeroom: async (homeroomId: string) =>
		await db.transact([db.tx.homerooms[homeroomId].delete()]),
	editHomeroom: async (homeroomId: string, updatedHomeroom: NoIdEntity<'homerooms'>) =>
		await db.transact([db.tx.homerooms[homeroomId].update(updatedHomeroom)]),
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
		}),
	getClassGradeOptions: async () => await db.query({ classGradeOptions: {} })
};
